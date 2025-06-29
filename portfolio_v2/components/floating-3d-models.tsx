"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Text3D,
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion } from "framer-motion";
import type * as THREE from "three";

function FloatingLaptop() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Laptop Base */}
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Laptop Screen */}
      <mesh position={[0, 1, -0.9]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2.8, 1.8, 0.1]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Screen Content */}
      <mesh position={[0, 1, -0.85]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function FloatingCode() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        position={[-1, 0, 0]}
      >
        {"</>"}
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
        />
      </Text3D>
    </Float>
  );
}

function TechIcons() {
  const iconsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (iconsRef.current) {
      iconsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const technologies = [
    { name: "React", color: "#61dafb", position: [2, 1, 0] },
    { name: "Next", color: "#ffffff", position: [-2, 1, 0] },
    { name: "TS", color: "#3178c6", position: [0, 2, 1] },
    { name: "JS", color: "#f7df1e", position: [0, -1, -1] },
  ];

  return (
    <group ref={iconsRef}>
      {technologies.map((tech, index) => (
        <Float key={tech.name} speed={1 + index * 0.2} rotationIntensity={0.1}>
          <mesh position={tech.position as [number, number, number]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={tech.color}
              emissive={tech.color}
              emissiveIntensity={0.2}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.15}
            height={0.02}
            position={[
              tech.position[0] - 0.1,
              tech.position[1] - 0.5,
              tech.position[2],
            ]}
          >
            {tech.name}
            <meshStandardMaterial color={tech.color} />
          </Text3D>
        </Float>
      ))}
    </group>
  );
}

export function Floating3DModels() {
  const [activeModel, setActiveModel] = useState<"laptop" | "code" | "tech">(
    "laptop"
  );

  return (
    <motion.div
      className="w-full h-96 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <OrbitControls enableZoom={false} enablePan={false} />

          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#0ea5e9"
          />

          <Suspense fallback={null}>
            <Environment preset="city" />
            {activeModel === "laptop" && <FloatingLaptop />}
            {activeModel === "code" && <FloatingCode />}
            {activeModel === "tech" && <TechIcons />}
          </Suspense>
        </Canvas>

        {/* Loading indicator that shows while 3D models are loading */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Model Selector */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[
            { key: "laptop", label: "💻" },
            { key: "code", label: "</>" },
            { key: "tech", label: "⚛️" },
          ].map((model) => (
            <button
              key={model.key}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveModel(model.key as any)}
              className={`w-10 h-10 rounded-xl backdrop-blur-md border transition-all duration-300 ${
                activeModel === model.key
                  ? "bg-cyan-500/30 border-cyan-400/50 text-cyan-300"
                  : "bg-slate-800/30 border-slate-600/30 text-slate-400 hover:bg-slate-700/30"
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
