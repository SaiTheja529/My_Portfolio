"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture, SRGBColorSpace, type Group, type Mesh } from "three";

import { TOOLS } from "@/constants/devin";

const ORBS = [
  { id: "devin", ...TOOLS.devin, offset: 0 },
  { id: "claude", ...TOOLS.claude, offset: (Math.PI * 2) / 3 },
  { id: "copilot", ...TOOLS.copilot, offset: (Math.PI * 4) / 3 },
] as const;

const RADIUS = 2.7;

/** Text drawn to a canvas texture — no DOM, no external fonts. */
const Label = ({ text, tint, big }: { text: string; tint: string; big?: boolean }) => {
  const { texture, aspect } = useMemo(() => {
    const size = big ? 52 : 42;
    const font = `700 ${size}px system-ui, -apple-system, Segoe UI, sans-serif`;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width) + 56;
    const h = size + 36;
    canvas.width = w;
    canvas.height = h;
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.beginPath();
    ctx.roundRect(3, 3, w - 6, h - 6, h / 2.4);
    ctx.fillStyle = "rgba(3,0,20,0.78)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = tint;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fillText(text, 28, h / 2 + 2);
    const t = new CanvasTexture(canvas);
    t.colorSpace = SRGBColorSpace;
    return { texture: t, aspect: w / h };
  }, [text, tint, big]);
  useEffect(() => () => texture.dispose(), [texture]);
  const hgt = big ? 0.55 : 0.4;
  return (
    <sprite scale={[aspect * hgt, hgt, 1]} renderOrder={10}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  );
};

const Orb = ({
  color,
  name,
  offset,
  merged,
}: {
  color: string;
  name: string;
  offset: number;
  merged: boolean;
}) => {
  const group = useRef<Group>(null);
  const r = useRef(RADIUS);
  const angle = useRef(offset);

  useFrame((state, delta) => {
    if (!group.current) return;
    const target = merged ? 0.0 : RADIUS;
    r.current += (target - r.current) * Math.min(1, delta * 2.6);
    // spin faster as they converge — it feels like they're being pulled in
    angle.current += delta * (0.55 + (1 - r.current / RADIUS) * 2.2);
    const a = angle.current;
    group.current.position.set(
      Math.cos(a) * r.current,
      Math.sin(state.clock.elapsedTime * 1.4 + offset) * 0.35 * (r.current / RADIUS),
      Math.sin(a) * r.current
    );
    const s = merged && r.current < 0.25 ? 0 : 1;
    group.current.scale.setScalar(group.current.scale.x + (s - group.current.scale.x) * Math.min(1, delta * 6));
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      <mesh scale={1.35}>
        <sphereGeometry args={[0.55, 20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.13} />
      </mesh>
      {!merged && (
        <group position={[0, 1.0, 0]}>
          <Label text={name} tint={color} />
        </group>
      )}
    </group>
  );
};

const Core = ({ merged }: { merged: boolean }) => {
  const core = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (core.current) {
      const target = merged ? 1 : 0;
      const s = core.current.scale.x + (target - core.current.scale.x) * Math.min(1, delta * 2.2);
      core.current.scale.setScalar(Math.max(0.0001, s * (1 + Math.sin(state.clock.elapsedTime * 3) * 0.04)));
      core.current.rotation.y += delta * 0.9;
      core.current.rotation.x += delta * 0.4;
    }
    if (ring.current) {
      const target = merged ? 1 : 0;
      const s = ring.current.scale.x + (target - ring.current.scale.x) * Math.min(1, delta * 2);
      ring.current.scale.setScalar(Math.max(0.0001, s));
      ring.current.rotation.z += delta * 0.7;
    }
  });
  return (
    <group>
      <mesh ref={core} scale={0.0001}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.6}
          flatShading
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.3, 0, 0]} scale={0.0001}>
        <torusGeometry args={[1.7, 0.03, 12, 90]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} />
      </mesh>
      {merged && (
        <group position={[0, 1.9, 0]}>
          <Label text="Devin + Claude Code + Copilot" tint="#22d3ee" big />
        </group>
      )}
    </group>
  );
};

/** Faint orbit tracks so the paths read as orbits. */
const Tracks = ({ merged }: { merged: boolean }) => (
  <group visible={!merged}>
    {[0, 1, 2].map((i) => (
      <mesh key={i} rotation={[Math.PI / 2 + i * 0.12, i * 0.2, 0]}>
        <torusGeometry args={[RADIUS, 0.008, 6, 120]} />
        <meshBasicMaterial color="#7042f8" transparent opacity={0.35} />
      </mesh>
    ))}
  </group>
);

const Autoscale = () => {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.set(0, 4.2, Math.max(7.4, 9.6 / aspect));
    camera.lookAt(0, 0, 0);
  }, [camera, size]);
  return null;
};

const Rig = ({ children }: { children: React.ReactNode }) => {
  const g = useRef<Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.y += (state.pointer.x * 0.35 - g.current.rotation.y) * 0.05;
    g.current.rotation.x += (-state.pointer.y * 0.18 - g.current.rotation.x) * 0.05;
  });
  return <group ref={g}>{children}</group>;
};

export const TrinityCanvas = ({ merged }: { merged: boolean }) => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 1.6, 10], fov: 40 }}
    aria-label="3D scene: three glowing orbs for Devin, Claude Code and GitHub Copilot orbit each other. Use the Combine button to fuse them into one core."
  >
    <ambientLight intensity={0.8} />
    <directionalLight position={[5, 8, 6]} intensity={1.4} />
    <pointLight position={[0, 0, 0]} intensity={merged ? 40 : 8} color="#22d3ee" />
    <Autoscale />
    <Rig>
      <Tracks merged={merged} />
      {ORBS.map((o) => (
        <Orb key={o.id} color={o.color} name={o.name} offset={o.offset} merged={merged} />
      ))}
      <Float speed={2} floatIntensity={0.3} rotationIntensity={0}>
        <Core merged={merged} />
      </Float>
      <Sparkles
        key={merged ? "merged" : "apart"}
        count={merged ? 140 : 40}
        scale={[9, 5, 6]}
        size={3}
        speed={merged ? 0.9 : 0.3}
        color={merged ? "#67e8f9" : "#c4b5fd"}
      />
    </Rig>
  </Canvas>
);
