"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

type Block = { x: number; z: number; h: number; w: number; color: string };

// Deterministic pseudo-random so the scene is stable between renders.
const rand = (n: number) => {
  const v = Math.sin(n * 127.1) * 43758.5453;
  return v - Math.floor(v);
};

const TEAL = "#2dd4bf"; // Harness Lab — towers
const INDIGO = "#818cf8"; // Knowledge Hub — shelves
const AMBER = "#facc15"; // Project Ideas — lanterns

const buildCity = (): Block[] => {
  const blocks: Block[] = [];
  const N = 7;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const id = i * N + j;
      const x = (i - (N - 1) / 2) * 1.05;
      const z = (j - (N - 1) / 2) * 1.05;
      if (i + j < N - 2) {
        blocks.push({ x, z, h: 0.8 + rand(id) * 2.6, w: 0.8, color: TEAL });
      } else if (i > j + 1) {
        blocks.push({ x, z, h: 0.25 + rand(id) * 0.5, w: 0.85, color: INDIGO });
      } else if (i + j > N + 1) {
        blocks.push({ x, z, h: 0.9 + rand(id) * 1.6, w: 0.35, color: AMBER });
      }
    }
  }
  return blocks;
};

const City = () => {
  const group = useRef<Group>(null);
  const blocks = useMemo(() => buildCity(), []);

  useFrame((state) => {
    if (!group.current) return;
    // gentle parallax toward the pointer
    group.current.rotation.x +=
      (state.pointer.y * 0.12 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      {/* ground plate */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[8, 0.16, 8]} />
        <meshStandardMaterial color="#0d0b1f" roughness={0.9} />
      </mesh>

      {blocks.map((b) => (
        <mesh key={`${b.x}-${b.z}`} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.45}
            metalness={0.25}
            emissive={b.color}
            emissiveIntensity={b.color === AMBER ? 0.55 : 0.12}
          />
        </mesh>
      ))}

      {/* the "AI" gem hovering over the city */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[0, 4.4, 0]}>
          <octahedronGeometry args={[0.55]} />
          <meshStandardMaterial
            color="#b49bff"
            emissive="#7042f8"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
};

export const CityScene = () => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [10.5, 8.2, 10.5], fov: 34 }}
    aria-label="Interactive 3D city — drag to rotate"
  >
    <ambientLight intensity={0.7} />
    <directionalLight position={[6, 10, 4]} intensity={1.6} />
    <pointLight position={[-6, 4, -4]} intensity={30} color="#7042f8" />
    <City />
    <OrbitControls
      target={[0, 1.2, 0]}
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={1.2}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.6}
    />
  </Canvas>
);
