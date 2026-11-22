"use client";

import { Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { CanvasTexture, SRGBColorSpace, Vector3, type Group, type Mesh } from "three";

import { SHIFT_NODES } from "@/constants";

type Vec = [number, number, number];

const color = (id: string) =>
  SHIFT_NODES.find((n) => n.id === id)?.color ?? "#ffffff";
const label = (id: string) => {
  const t = SHIFT_NODES.find((n) => n.id === id)?.title ?? id;
  return t.replace(" Service", "");
};

const SPA: Vec = [0, 3.3, 0];
const GATEWAY: Vec = [0, 1.4, 0];
const CONSUL: Vec = [4.4, 1.4, 0];
const SERVICES: Array<{ id: string; pos: Vec }> = [
  { id: "user", pos: [-4.5, -0.9, 0] },
  { id: "roster", pos: [-1.5, -0.9, 0] },
  { id: "patient", pos: [1.5, -0.9, 0] },
  { id: "shift", pos: [4.5, -0.9, 0] },
];
const dbPos = (p: Vec): Vec => [p[0], -3.0, p[2]];

/* ───────── helpers ───────── */

type SceneProps = {
  selected?: string | null;
  onSelect?: (id: string | null) => void;
  interactive: boolean;
};

/** In-scene text label drawn to a canvas texture (no DOM, no external fonts). */
const Label = ({
  text,
  tint,
  active,
}: {
  text: string;
  tint: string;
  active: boolean;
}) => {
  const { texture, aspect } = useMemo(() => {
    const font = "600 42px system-ui, -apple-system, Segoe UI, sans-serif";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width) + 52;
    const h = 76;
    canvas.width = w;
    canvas.height = h;
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.beginPath();
    ctx.roundRect(3, 3, w - 6, h - 6, 16);
    ctx.fillStyle = active ? `${tint}66` : "rgba(3,0,20,0.78)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = active ? tint : `${tint}99`;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, 26, h / 2 + 2);
    const tex = new CanvasTexture(canvas);
    tex.colorSpace = SRGBColorSpace;
    return { texture: tex, aspect: w / h };
  }, [text, tint, active]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite scale={[aspect * 0.4, 0.4, 1]} renderOrder={10}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  );
};

/** Clickable / hoverable wrapper for a node. */
const Node = ({
  id,
  position,
  scale = 1,
  props,
  children,
  labelOffset = 1,
}: {
  id: string;
  position: Vec;
  scale?: number;
  props: SceneProps;
  children: ReactNode;
  labelOffset?: number;
}) => {
  const group = useRef<Group>(null);
  const active = props.selected === id;

  useFrame((_s, delta) => {
    if (!group.current) return;
    const target = active ? 1.1 : 1;
    const k = Math.min(1, delta * 8);
    group.current.scale.x += (target * scale - group.current.scale.x) * k;
    group.current.scale.y += (target * scale - group.current.scale.y) * k;
    group.current.scale.z += (target * scale - group.current.scale.z) * k;
  });

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      onPointerOver={
        props.interactive
          ? (e) => {
              e.stopPropagation();
              props.onSelect?.(id);
              document.body.style.cursor = "pointer";
            }
          : undefined
      }
      onPointerOut={
        props.interactive ? () => (document.body.style.cursor = "auto") : undefined
      }
      onClick={
        props.interactive
          ? (e) => {
              e.stopPropagation();
              props.onSelect?.(id);
            }
          : undefined
      }
    >
      {children}
      {props.interactive && (
        <group position={[0, labelOffset, 0]}>
          <Label text={label(id)} tint={color(id)} active={active} />
        </group>
      )}
    </group>
  );
};

const Glow = ({ id, selected, base = 0.25 }: { id: string; selected?: string | null; base?: number }) => ({
  emissive: color(id),
  emissiveIntensity: selected === id ? 1 : base,
});

const Db = ({ pos, serviceId, selected }: { pos: Vec; serviceId: string; selected?: string | null }) => {
  const hot = selected === serviceId;
  return (
    <group position={pos}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, i * 0.3, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.2, 40]} />
          <meshStandardMaterial
            color={i % 2 ? color(serviceId) : "#101028"}
            emissive={color(serviceId)}
            emissiveIntensity={hot ? 0.8 : i % 2 ? 0.35 : 0.08}
            roughness={0.4}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

/** A glowing dot that travels along a polyline, looping. */
const Pulse = ({
  path,
  tint,
  speed = 0.22,
  offset = 0,
}: {
  path: Vec[];
  tint: string;
  speed?: number;
  offset?: number;
}) => {
  const mesh = useRef<Mesh>(null);
  const { points, lengths, total } = useMemo(() => {
    const pts = path.map((p) => new Vector3(...p));
    const ls: number[] = [];
    let sum = 0;
    for (let i = 1; i < pts.length; i++) {
      const l = pts[i].distanceTo(pts[i - 1]);
      ls.push(l);
      sum += l;
    }
    return { points: pts, lengths: ls, total: sum };
  }, [path]);

  useFrame((state) => {
    if (!mesh.current) return;
    let d = (((state.clock.elapsedTime * speed + offset) % 1) + 1) % 1 * total;
    for (let i = 0; i < lengths.length; i++) {
      if (d <= lengths[i]) {
        mesh.current.position.lerpVectors(points[i], points[i + 1], d / lengths[i]);
        return;
      }
      d -= lengths[i];
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.13, 16, 16]} />
      <meshBasicMaterial color={tint} />
    </mesh>
  );
};

const Autoscale = () => {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.set(0, 1.2, Math.max(13.5, 15.95 / aspect));
  }, [camera, size]);
  return null;
};

/* ───────── scene ───────── */

const Scene = (props: SceneProps) => {
  const { selected } = props;
  const gwRing = useRef<Mesh>(null);
  useFrame((_s, delta) => {
    if (gwRing.current) gwRing.current.rotation.z += delta * 0.6;
  });

  return (
    <group>
      {/* links */}
      <Line points={[SPA, GATEWAY]} color={color("spa")} lineWidth={1.5} transparent opacity={0.6} />
      <Line
        points={[CONSUL, GATEWAY]}
        color={color("consul")}
        lineWidth={1.5}
        dashed
        dashSize={0.25}
        gapSize={0.18}
        transparent
        opacity={0.7}
      />
      {SERVICES.map(({ id, pos }) => (
        <group key={id}>
          <Line points={[GATEWAY, pos]} color={color(id)} lineWidth={1.5} transparent opacity={0.55} />
          <Line points={[pos, dbPos(pos)]} color={color(id)} lineWidth={1.5} transparent opacity={0.55} />
        </group>
      ))}

      {/* React SPA */}
      <Node id="spa" position={SPA} props={props} labelOffset={0.7}>
        <mesh>
          <boxGeometry args={[3.6, 0.38, 1.7]} />
          <meshStandardMaterial
            color="#0b2a44"
            {...Glow({ id: "spa", selected })}
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
      </Node>

      {/* API Gateway */}
      <Node id="gateway" position={GATEWAY} props={props} labelOffset={1.1}>
        <mesh>
          <cylinderGeometry args={[1.05, 1.05, 0.7, 6]} />
          <meshStandardMaterial
            color="#0e7490"
            {...Glow({ id: "gateway", selected, base: 0.45 })}
            roughness={0.25}
            metalness={0.5}
            flatShading
          />
        </mesh>
        <mesh ref={gwRing} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[1.55, 0.03, 12, 80]} />
          <meshBasicMaterial color={color("gateway")} transparent opacity={0.7} />
        </mesh>
      </Node>

      {/* Consul */}
      <Node id="consul" position={CONSUL} props={props} labelOffset={0.95}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[0.5, 0.18, 16, 48]} />
          <meshStandardMaterial
            color="#9d174d"
            {...Glow({ id: "consul", selected, base: 0.4 })}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      </Node>

      {/* Services + their own databases */}
      {SERVICES.map(({ id, pos }) => (
        <group key={id}>
          <Node id={id} position={pos} props={props} labelOffset={1.15}>
            <mesh>
              <boxGeometry args={[1.3, 1.3, 1.3]} />
              <meshStandardMaterial
                color="#17122e"
                {...Glow({ id, selected, base: 0.35 })}
                roughness={0.35}
                metalness={0.45}
              />
            </mesh>
            <mesh scale={1.04}>
              <boxGeometry args={[1.3, 1.3, 1.3]} />
              <meshBasicMaterial color={color(id)} wireframe transparent opacity={0.55} />
            </mesh>
          </Node>
          <Db pos={dbPos(pos)} serviceId={id} selected={selected} />
        </group>
      ))}

      {/* request pulses: SPA -> gateway -> service -> its database */}
      {SERVICES.map(({ id, pos }, i) => (
        <Pulse
          key={id}
          path={[SPA, GATEWAY, pos, dbPos(pos)]}
          tint={color(id)}
          offset={i * 0.25}
        />
      ))}
    </group>
  );
};

export const ServicesCanvas = ({
  interactive = false,
  selected,
  onSelect,
}: {
  interactive?: boolean;
  selected?: string | null;
  onSelect?: (id: string | null) => void;
}) => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 1.2, 13.5], fov: 40 }}
    aria-label="3D microservices architecture: a React SPA calls an API Gateway, which routes to four services, each with its own database. Consul provides discovery and configuration."
  >
    <ambientLight intensity={0.85} />
    <directionalLight position={[5, 8, 8]} intensity={1.4} />
    <pointLight position={[0, 2, 5]} intensity={22} color="#22d3ee" />
    <Autoscale />
    <Scene interactive={interactive} selected={selected} onSelect={onSelect} />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={!interactive}
      autoRotateSpeed={1.1}
      target={[0, 0.2, 0]}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.8}
      minAzimuthAngle={interactive ? -Math.PI / 3 : -Infinity}
      maxAzimuthAngle={interactive ? Math.PI / 3 : Infinity}
    />
  </Canvas>
);
