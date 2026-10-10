"use client";

import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import {
  BufferAttribute,
  BufferGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Points,
  PointsMaterial,
  type PointLight,
} from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function LinkedParticles() {
  const group = useRef<Group>(null);
  const field = useMemo(() => {
    const count = 640;
    const maxSeg = 480;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      base[i * 3] = (Math.random() - 0.5) * 7;
      base[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      base[i * 3 + 2] = (Math.random() - 0.5) * 4;
      positions[i * 3] = base[i * 3];
      positions[i * 3 + 1] = base[i * 3 + 1];
      positions[i * 3 + 2] = base[i * 3 + 2];
    }
    const pointGeom = new BufferGeometry();
    pointGeom.setAttribute("position", new BufferAttribute(positions, 3));
    const points = new Points(
      pointGeom,
      new PointsMaterial({
        color: "#c4b5fd",
        size: 0.03,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      }),
    );
    const linePositions = new Float32Array(maxSeg * 6);
    const lineGeom = new BufferGeometry();
    const lineAttr = new BufferAttribute(linePositions, 3);
    lineGeom.setAttribute("position", lineAttr);
    lineGeom.setDrawRange(0, 0);
    const lines = new LineSegments(
      lineGeom,
      new LineBasicMaterial({ color: "#67e8f9", transparent: true, opacity: 0.35 }),
    );
    return { count, maxSeg, positions, base, points, lines, linePositions, lineAttr };
  }, []);

  useFrame((state) => {
    const { count, maxSeg, positions, base, points, lines, linePositions, lineAttr } = field;
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.x = state.pointer.x * 0.45;
      group.current.position.y = state.pointer.y * 0.28;
    }
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = base[i * 3] + Math.sin(t * 0.25 + i) * 0.08;
      positions[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.2 + i * 0.3) * 0.06;
      positions[i * 3 + 2] = base[i * 3 + 2];
    }
    const pointAttr = points.geometry.getAttribute("position");
    pointAttr.needsUpdate = true;

    let seg = 0;
    const thresholdSq = 0.62 * 0.62;
    for (let i = 0; i < count && seg < maxSeg; i += 3) {
      for (let j = i + 1; j < Math.min(count, i + 16) && seg < maxSeg; j += 1) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz > thresholdSq) continue;
        const offset = seg * 6;
        linePositions[offset] = positions[i * 3];
        linePositions[offset + 1] = positions[i * 3 + 1];
        linePositions[offset + 2] = positions[i * 3 + 2];
        linePositions[offset + 3] = positions[j * 3];
        linePositions[offset + 4] = positions[j * 3 + 1];
        linePositions[offset + 5] = positions[j * 3 + 2];
        seg += 1;
      }
    }
    lineAttr.needsUpdate = true;
    lines.geometry.setDrawRange(0, seg * 2);
  });

  return (
    <group ref={group}>
      <primitive object={field.points} />
      <primitive object={field.lines} />
    </group>
  );
}

function PointerLight() {
  const light = useRef<PointLight>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!light.current) return;
    light.current.position.x = pointer.x * 3.2;
    light.current.position.y = pointer.y * 2.2;
    light.current.position.z = 2.4;
  });

  return <pointLight ref={light} color="#22d3ee" intensity={18} distance={10} />;
}

function Workspace() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        <group position={[0, -0.15, 0]}>
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[1.7, 1.05, 0.06]} />
            <meshStandardMaterial color="#818cf8" wireframe />
          </mesh>
          <mesh rotation={[-1.15, 0, 0]} position={[0, -0.12, 0.42]}>
            <planeGeometry args={[1.7, 1.05]} />
            <meshStandardMaterial color="#67e8f9" wireframe />
          </mesh>
        </group>
      </Float>
      {[
        [-1.6, 0.4, -0.4],
        [1.7, 0.2, -0.2],
        [1.1, 0.9, -0.8],
        [-0.9, -0.6, 0.4],
        [0.2, 1.1, 0.6],
      ].map((position) => (
        <Float key={position.join("-")} speed={1.8} rotationIntensity={0.8} floatIntensity={0.5}>
          <mesh position={position as [number, number, number]}>
            <boxGeometry args={[0.38, 0.38, 0.38]} />
            <meshStandardMaterial color="#a78bfa" wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

class SceneBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <HeroSceneFallback />;
    return this.props.children;
  }
}

function HeroCanvas() {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-[320px] md:h-[420px] w-full rounded-2xl overflow-hidden glass">
      <Canvas
        camera={{ position: [0, 0.2, 4.2], fov: 48 }}
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "demand"}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#070712"]} />
        <ambientLight intensity={0.35} />
        <PointerLight />
        <LinkedParticles />
        <Workspace />
        <Environment preset="city" environmentIntensity={0.35} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reducedMotion && visible}
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}

export function HeroScene() {
  return (
    <SceneBoundary>
      <HeroCanvas />
    </SceneBoundary>
  );
}

export function HeroSceneFallback() {
  return (
    <div
      className="h-[320px] md:h-[420px] w-full rounded-2xl glass flex items-center justify-center text-zinc-400 text-sm"
      aria-hidden
    >
      Interactive 3D preview unavailable
    </div>
  );
}
