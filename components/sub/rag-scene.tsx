"use client";

import { Float, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

// One colour per agentic pattern (matches the architecture stack).
const PATTERN_COLORS = ["#b49bff", "#38bdf8", "#2dd4bf", "#facc15", "#f472b6"];
const CORE = "#c4b5fd";
const GOLD = "#facc15";

const PatternRing = () => {
  const ring = useRef<Group>(null);
  const nodes = useMemo(
    () =>
      PATTERN_COLORS.map((color, i) => {
        const a = (i / PATTERN_COLORS.length) * Math.PI * 2;
        return { color, pos: [Math.cos(a) * 2.7, 0.7, Math.sin(a) * 2.7] as [number, number, number] };
      }),
    []
  );
  useFrame((_s, delta) => {
    if (ring.current) ring.current.rotation.y += delta * 0.35;
  });
  return (
    <group ref={ring}>
      {nodes.map(({ color, pos }) => (
        <group key={color}>
          <Float speed={2} floatIntensity={0.6} rotationIntensity={0.8}>
            <mesh position={pos}>
              <sphereGeometry args={[0.32, 24, 24]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.7}
                roughness={0.25}
                metalness={0.3}
              />
            </mesh>
          </Float>
          <Line
            points={[pos, [0, 0.7, 0]]}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.5}
          />
        </group>
      ))}
    </group>
  );
};

const AgentCore = () => {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y -= delta * 0.5;
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
  });
  return (
    <group position={[0, 0.7, 0]}>
      <mesh ref={mesh}>
        <dodecahedronGeometry args={[0.95]} />
        <meshStandardMaterial
          color={CORE}
          emissive="#7042f8"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.5}
          flatShading
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.25, 24, 24]} />
        <meshBasicMaterial color="#7042f8" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
};

/** Vector store: a stack of glowing discs. */
const VectorStore = () => (
  <group position={[0, -1.7, 0]}>
    {[0, 1, 2, 3].map((i) => (
      <mesh key={i} position={[0, i * 0.34, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.2, 48]} />
        <meshStandardMaterial
          color={i % 2 ? "#2dd4bf" : "#0f766e"}
          emissive="#2dd4bf"
          emissiveIntensity={i % 2 ? 0.5 : 0.15}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
    ))}
  </group>
);

/** The guardrail: a thin gold ring around the whole system. */
const Shield = () => {
  const ref = useRef<Mesh>(null);
  useFrame((_s, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.25;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.15, 0, 0]} position={[0, 0.2, 0]}>
      <torusGeometry args={[3.7, 0.03, 12, 120]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.65} />
    </mesh>
  );
};

const Scene = () => {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x +=
      (state.pointer.y * 0.15 - group.current.rotation.x) * 0.05;
  });
  return (
    <group ref={group}>
      <AgentCore />
      <PatternRing />
      <VectorStore />
      <Shield />
    </group>
  );
};

export const RagScene = () => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 2.2, 12], fov: 38 }}
    aria-label="Interactive 3D model of UnitedAir AI: an agent core orbited by five agentic patterns, above a vector store, inside a guardrail ring — drag to rotate"
  >
    <ambientLight intensity={0.8} />
    <directionalLight position={[5, 8, 6]} intensity={1.5} />
    <pointLight position={[0, 1, 3]} intensity={28} color="#7042f8" />
    <Scene />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={1.2}
      minPolarAngle={Math.PI / 3.2}
      maxPolarAngle={Math.PI / 1.8}
    />
  </Canvas>
);
