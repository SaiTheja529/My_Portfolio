"use client";

import { Float, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

const TEAL = "#2dd4bf"; // deterministic signals
const PURPLE = "#b49bff"; // AI-assisted evaluation
const CYAN = "#22d3ee"; // the resulting score

const SIGNALS: Array<[number, number, number]> = [
  [-3.2, 1.6, 0.4],
  [-3.6, 0.3, -0.8],
  [-3.0, -1.0, 0.9],
  [-3.7, -2.1, -0.3],
];
const AI_NODES: Array<[number, number, number]> = [
  [3.2, 1.6, -0.4],
  [3.6, 0.3, 0.8],
  [3.0, -1.0, -0.9],
  [3.7, -2.1, 0.3],
];

const Core = () => {
  const mesh = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.6;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      mesh.current.scale.setScalar(pulse);
    }
    if (ring.current) ring.current.rotation.z += delta * 0.8;
  });
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.5}
          flatShading
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.5, 0.025, 12, 80]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const Node = ({
  position,
  color,
  shape,
}: {
  position: [number, number, number];
  color: string;
  shape: "cube" | "gem";
}) => (
  <Float speed={2} rotationIntensity={1.4} floatIntensity={0.8}>
    <mesh position={position}>
      {shape === "cube" ? (
        <boxGeometry args={[0.6, 0.6, 0.6]} />
      ) : (
        <octahedronGeometry args={[0.45]} />
      )}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        roughness={0.3}
        metalness={0.35}
      />
    </mesh>
  </Float>
);

const Scene = () => {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x +=
      (state.pointer.y * 0.18 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      {SIGNALS.map((p) => (
        <group key={p.join()}>
          <Node position={p} color={TEAL} shape="cube" />
          <Line
            points={[p, [0, 0, 0]]}
            color={TEAL}
            lineWidth={1}
            transparent
            opacity={0.45}
          />
        </group>
      ))}
      {AI_NODES.map((p) => (
        <group key={p.join()}>
          <Node position={p} color={PURPLE} shape="gem" />
          <Line
            points={[p, [0, 0, 0]]}
            color={PURPLE}
            lineWidth={1}
            transparent
            opacity={0.45}
          />
        </group>
      ))}
      <Core />
    </group>
  );
};

export const ScoreScene = () => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 1.5, 11], fov: 40 }}
    aria-label="Interactive 3D model: deterministic signals and AI evaluation feeding one effort score — drag to rotate"
  >
    <ambientLight intensity={0.8} />
    <directionalLight position={[5, 8, 6]} intensity={1.5} />
    <pointLight position={[0, 0, 3]} intensity={25} color={CYAN} />
    <Scene />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={1.4}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.7}
    />
  </Canvas>
);
