"use client";

import { Float, RoundedBox, Sparkles, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CanvasTexture,
  DoubleSide,
  SRGBColorSpace,
  Shape,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
} from "three";

import { PROFILE } from "@/constants";

type SceneProps = {
  /** Becomes true when the section scrolls into view — the envelope opens. */
  opened: boolean;
  onEmail: () => void;
  onPhone: () => void;
};

const makeTexture = (
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D) => void
) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext("2d")!);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

const setCursor = (c: "pointer" | "auto") => {
  document.body.style.cursor = c;
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ───────────────────────── Envelope ───────────────────────── */

const Envelope = ({ opened, onEmail }: Pick<SceneProps, "opened" | "onEmail">) => {
  const [hover, setHover] = useState(false);
  const flap = useRef<Group>(null);
  const letter = useRef<Mesh>(null);
  const seal = useRef<Mesh>(null);
  const progress = useRef(0);

  const flapShape = useMemo(() => {
    const s = new Shape();
    s.moveTo(-1.5, 0);
    s.lineTo(1.5, 0);
    s.lineTo(0, -1.05);
    s.closePath();
    return s;
  }, []);

  const { texture: letterTex } = useMemo(() => {
    const texture = makeTexture(1040, 720, (ctx) => {
      ctx.fillStyle = "#fffaf0";
      ctx.fillRect(0, 0, 1040, 720);
      ctx.strokeStyle = "rgba(112,66,248,0.12)";
      ctx.lineWidth = 2;
      for (let y = 250; y < 700; y += 56) {
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(980, y);
        ctx.stroke();
      }
      ctx.fillStyle = "#2a1066";
      ctx.font = "700 84px Georgia, 'Times New Roman', serif";
      ctx.fillText("Hi there 👋", 70, 120);
      ctx.font = "600 62px Georgia, 'Times New Roman', serif";
      ctx.fillText("Let's build something", 70, 220);
      ctx.fillText("together.", 70, 296);
      ctx.fillStyle = "#7042f8";
      ctx.font = "500 40px system-ui, sans-serif";
      ctx.fillText("Ideas  ·  Suggestions  ·  Collaboration", 70, 420);
      ctx.fillStyle = "#2a1066";
      ctx.font = "italic 600 58px 'Brush Script MT', 'Segoe Script', cursive";
      ctx.fillText(`— ${PROFILE.firstName}`, 600, 620);
    });
    return { texture };
  }, []);

  useEffect(() => () => letterTex.dispose(), [letterTex]);

  useFrame((_s, delta) => {
    const target = opened || hover ? 1 : 0;
    progress.current += (target - progress.current) * Math.min(1, delta * 2.4);
    const p = progress.current;

    if (flap.current) flap.current.rotation.x = smooth(0, 0.55, p) * Math.PI * 0.97;
    if (seal.current) seal.current.visible = p < 0.25;
    if (letter.current) {
      const rise = smooth(0.35, 1, p);
      letter.current.position.y = 0.02 + rise * 1.2;
      letter.current.position.z = smooth(0.7, 1, p) * 0.3;
      letter.current.rotation.z = Math.sin(p * Math.PI) * 0.03;
    }
  });

  return (
    <group
      position={[-2.35, -0.35, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        setCursor("pointer");
      }}
      onPointerOut={() => {
        setHover(false);
        setCursor("auto");
      }}
      onClick={(e) => {
        e.stopPropagation();
        onEmail();
      }}
    >
      {/* body */}
      <mesh>
        <boxGeometry args={[3, 2, 0.24]} />
        <meshStandardMaterial
          color="#3b1d8f"
          emissive="#7042f8"
          emissiveIntensity={hover ? 0.55 : 0.22}
          roughness={0.45}
          metalness={0.25}
        />
      </mesh>
      {/* front folds */}
      {(
        [
          [[-1.5, 1, 0.13], [0, -0.05, 0.13], [1.5, 1, 0.13]],
          [[-1.5, -1, 0.13], [-0.25, 0.05, 0.13]],
          [[1.5, -1, 0.13], [0.25, 0.05, 0.13]],
        ] as Array<Array<[number, number, number]>>
      ).map((pts, i) => (
        <Line key={i} points={pts} color="#c4b5fd" lineWidth={1.5} transparent opacity={0.6} />
      ))}

      {/* letter (starts hidden inside, slides out) */}
      <mesh ref={letter} position={[0, 0.02, 0]}>
        <planeGeometry args={[2.6, 1.8]} />
        <meshBasicMaterial map={letterTex} />
      </mesh>

      {/* flap hinged on the top edge */}
      <group ref={flap} position={[0, 1, 0.14]}>
        <mesh>
          <shapeGeometry args={[flapShape]} />
          <meshStandardMaterial
            color="#5b34c9"
            emissive="#7042f8"
            emissiveIntensity={0.3}
            side={DoubleSide}
            roughness={0.5}
          />
        </mesh>
        <mesh ref={seal} position={[0, -0.82, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.05, 28]} />
          <meshStandardMaterial
            color="#facc15"
            emissive="#facc15"
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
};

/* ─────────────────────────── Phone ─────────────────────────── */

const Wave = ({ index, active }: { index: number; active: boolean }) => {
  const mesh = useRef<Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const frac = (state.clock.elapsedTime * 0.7 + index / 3) % 1;
    const s = 1 + frac * 1.5;
    mesh.current.scale.set(s, s, s);
    (mesh.current.material as MeshBasicMaterial).opacity =
      (active ? 0.75 : 0.28) * (1 - frac);
  });
  return (
    <mesh ref={mesh} position={[0, 0, -0.05]}>
      <torusGeometry args={[1.05, 0.014, 8, 80]} />
      <meshBasicMaterial color="#4ade80" transparent opacity={0.4} />
    </mesh>
  );
};

const Phone = ({ onPhone }: Pick<SceneProps, "onPhone">) => {
  const [hover, setHover] = useState(false);
  const body = useRef<Group>(null);

  const screen = useMemo(
    () =>
      makeTexture(480, 900, (ctx) => {
        const g = ctx.createLinearGradient(0, 0, 0, 900);
        g.addColorStop(0, "#1a0b45");
        g.addColorStop(1, "#05010f");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 480, 900);
        ctx.textAlign = "center";
        ctx.fillStyle = "#a89bd8";
        ctx.font = "500 34px system-ui, sans-serif";
        ctx.fillText("Let's talk", 240, 110);
        // avatar
        const ag = ctx.createLinearGradient(140, 170, 340, 370);
        ag.addColorStop(0, "#7042f8");
        ag.addColorStop(1, "#22d3ee");
        ctx.fillStyle = ag;
        ctx.beginPath();
        ctx.arc(240, 270, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "700 80px system-ui, sans-serif";
        ctx.fillText("ST", 240, 300);
        ctx.font = "700 44px system-ui, sans-serif";
        ctx.fillText(PROFILE.firstName, 240, 450);
        ctx.fillStyle = "#c4b5fd";
        ctx.font = "500 30px system-ui, sans-serif";
        ctx.fillText(PROFILE.phoneDisplay, 240, 500);
        // call button
        ctx.fillStyle = "#22c55e";
        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur = 40;
        ctx.beginPath();
        ctx.arc(240, 700, 82, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff";
        ctx.font = "700 74px system-ui, sans-serif";
        ctx.fillText("📞", 240, 726);
        ctx.fillStyle = "#86efac";
        ctx.font = "500 28px system-ui, sans-serif";
        ctx.fillText("Tap to call", 240, 840);
      }),
    []
  );
  useEffect(() => () => screen.dispose(), [screen]);

  useFrame((state) => {
    if (!body.current) return;
    const t = state.clock.elapsedTime;
    const ringing = hover || t % 4.5 < 1.2;
    const shake = ringing ? Math.sin(t * 42) * 0.08 : 0;
    body.current.rotation.z += (shake - body.current.rotation.z) * 0.45;
    const s = hover ? 1.07 : 1;
    body.current.scale.setScalar(body.current.scale.x + (s - body.current.scale.x) * 0.15);
  });

  return (
    <group
      position={[2.5, -0.2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        setCursor("pointer");
      }}
      onPointerOut={() => {
        setHover(false);
        setCursor("auto");
      }}
      onClick={(e) => {
        e.stopPropagation();
        onPhone();
      }}
    >
      {[0, 1, 2].map((i) => (
        <Wave key={i} index={i} active={hover} />
      ))}
      <group ref={body} rotation={[0, -0.25, 0]}>
        <RoundedBox args={[1.45, 2.7, 0.18]} radius={0.17} smoothness={4}>
          <meshStandardMaterial
            color="#0c0a1d"
            metalness={0.7}
            roughness={0.25}
            emissive="#22c55e"
            emissiveIntensity={hover ? 0.18 : 0.04}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.095]}>
          <planeGeometry args={[1.28, 2.4]} />
          <meshBasicMaterial map={screen} />
        </mesh>
      </group>
    </group>
  );
};

/* ───────────────────────── Scene ───────────────────────── */

const Autoscale = () => {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.set(0, 0.3, Math.max(9.5, 13.6 / aspect));
  }, [camera, size]);
  return null;
};

const Rig = ({ children }: { children: React.ReactNode }) => {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (state.pointer.x * 0.3 - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (-state.pointer.y * 0.14 - group.current.rotation.x) * 0.06;
  });
  return <group ref={group}>{children}</group>;
};

export const ContactCanvas = ({ opened, onEmail, onPhone }: SceneProps) => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 0.3, 9.5], fov: 40 }}
    aria-label="Interactive 3D scene: an envelope that opens to reveal a letter, and a ringing phone. Click the envelope to email, or the phone to call."
  >
    <ambientLight intensity={0.9} />
    <directionalLight position={[4, 6, 6]} intensity={1.5} />
    <pointLight position={[-4, 2, 4]} intensity={28} color="#7042f8" />
    <pointLight position={[5, -1, 4]} intensity={16} color="#22c55e" />
    <Autoscale />
    <Rig>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
        <Envelope opened={opened} onEmail={onEmail} />
      </Float>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Phone onPhone={onPhone} />
      </Float>
      <Sparkles
        count={90}
        scale={[11, 6, 4]}
        size={3.2}
        speed={opened ? 0.7 : 0.3}
        color="#c4b5fd"
      />
    </Rig>
  </Canvas>
);
