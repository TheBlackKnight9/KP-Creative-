"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── Shared clay material settings ──────────────────────── */
const CLAY_COLORS = {
  terracotta: "#C4501A",
  terraLight: "#E8744A",
  terraMuted: "#D4845A",
  sand: "#FAF5F2",
  blush: "#F5EDE8",
  blushDeep: "#EDE0D8",
};

/* ── Floating Clay Sphere ───────────────────────────────── */
function ClaySphere({ position, color, size = 1, speed = 1, distort = 0.3 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      ref.current.rotation.y += 0.003 * speed;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} castShadow>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.85}
          metalness={0.05}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ── Floating Clay Cube (Rounded) ───────────────────────── */
function ClayCube({ position, color, size = 1, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.3;
      ref.current.rotation.y += 0.005 * speed;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.5} floatIntensity={0.5}>
      <RoundedBox
        ref={ref}
        position={position}
        args={[size, size, size]}
        radius={size * 0.2}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.9}
          metalness={0.05}
        />
      </RoundedBox>
    </Float>
  );
}

/* ── Floating Clay Torus ────────────────────────────────── */
function ClayTorus({ position, color, size = 1, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.4;
      ref.current.rotation.y += 0.004 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.4}>
      <mesh ref={ref} position={position} castShadow>
        <torusGeometry args={[size * 0.7, size * 0.3, 32, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

/* ── Floating Clay Cone ─────────────────────────────────── */
function ClayCone({ position, color, size = 1, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.15;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={speed * 1.3} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={ref} position={position} castShadow>
        <coneGeometry args={[size * 0.6, size * 1.2, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

/* ── Floating Clay Capsule ──────────────────────────────── */
function ClayCapsule({ position, color, size = 1, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z =
        Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.5;
      ref.current.rotation.y += 0.003 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref} position={position} castShadow>
        <capsuleGeometry args={[size * 0.35, size * 0.8, 16, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRE-BUILT SCENE COMPOSITIONS
   ═══════════════════════════════════════════════════════════ */

/** Home hero — laptop-inspired composition */
function HomeScene() {
  return (
    <>
      {/* Main rounded-box "laptop" */}
      <ClayCube position={[0, 0, 0]} color={CLAY_COLORS.terracotta} size={1.8} speed={0.6} />
      {/* Floating accents */}
      <ClaySphere position={[-2.2, 1.4, -0.5]} color={CLAY_COLORS.sand} size={0.45} speed={1.2} distort={0.2} />
      <ClaySphere position={[2.0, -1.0, 0.5]} color={CLAY_COLORS.terraMuted} size={0.35} speed={0.9} distort={0.15} />
      <ClayCube position={[2.3, 1.2, -1]} color={CLAY_COLORS.blushDeep} size={0.5} speed={1.5} />
      <ClayTorus position={[-1.8, -1.2, 0.8]} color={CLAY_COLORS.terraLight} size={0.5} speed={1} />
      <ClayCone position={[1.5, 1.8, -0.3]} color={CLAY_COLORS.blush} size={0.4} speed={0.8} />
    </>
  );
}

/** About hero — stacked geometric shapes */
function AboutScene() {
  return (
    <>
      <ClaySphere position={[0, 1.2, 0]} color={CLAY_COLORS.terracotta} size={0.9} speed={0.7} distort={0.25} />
      <ClayCube position={[0, -0.2, 0]} color={CLAY_COLORS.terraMuted} size={1.4} speed={0.5} />
      <ClayCone position={[0, -1.8, 0]} color={CLAY_COLORS.terraLight} size={1} speed={0.6} />
      <ClaySphere position={[-2, 0.5, -0.5]} color={CLAY_COLORS.sand} size={0.3} speed={1.3} distort={0.1} />
      <ClaySphere position={[2.2, -0.8, 0.3]} color={CLAY_COLORS.blushDeep} size={0.25} speed={1} distort={0.1} />
      <ClayTorus position={[1.8, 1.5, -0.8]} color={CLAY_COLORS.blush} size={0.4} speed={1.2} />
    </>
  );
}

/** Services hero — toolbox-inspired shapes */
function ServicesScene() {
  return (
    <>
      <ClayCube position={[0, 0, 0]} color={CLAY_COLORS.terracotta} size={1.5} speed={0.5} />
      <ClayCapsule position={[-1.2, 1.2, 0.5]} color={CLAY_COLORS.terraLight} size={0.8} speed={0.9} />
      <ClayCapsule position={[1.3, -0.8, 0.3]} color={CLAY_COLORS.terraMuted} size={0.7} speed={1.1} />
      <ClaySphere position={[1.8, 1.5, -0.5]} color={CLAY_COLORS.sand} size={0.35} speed={1.3} distort={0.15} />
      <ClayCone position={[-1.8, -1.3, -0.3]} color={CLAY_COLORS.blush} size={0.5} speed={0.7} />
      <ClayTorus position={[0.5, -1.8, 0.5]} color={CLAY_COLORS.blushDeep} size={0.4} speed={1} />
    </>
  );
}

/** Portfolio hero — floating frame compositions */
function PortfolioScene() {
  return (
    <>
      {/* "Frames" as thin rounded cubes at angles */}
      <group rotation={[0.2, 0.3, 0.1]}>
        <RoundedBox position={[-0.8, 0.5, 0]} args={[1.8, 1.3, 0.15]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={CLAY_COLORS.terracotta} roughness={0.88} metalness={0.05} />
        </RoundedBox>
      </group>
      <group rotation={[-0.15, -0.2, -0.05]}>
        <RoundedBox position={[0.9, -0.4, 0.5]} args={[1.5, 1.1, 0.15]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={CLAY_COLORS.terraMuted} roughness={0.88} metalness={0.05} />
        </RoundedBox>
      </group>
      <group rotation={[0.1, -0.4, 0.15]}>
        <RoundedBox position={[-0.3, -1.2, -0.3]} args={[1.3, 0.95, 0.15]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={CLAY_COLORS.terraLight} roughness={0.88} metalness={0.05} />
        </RoundedBox>
      </group>
      <ClaySphere position={[2, 1.2, -0.5]} color={CLAY_COLORS.sand} size={0.3} speed={1.2} distort={0.1} />
      <ClaySphere position={[-2, -0.8, 0.3]} color={CLAY_COLORS.blushDeep} size={0.25} speed={0.9} distort={0.1} />
    </>
  );
}

/** Contact hero — phone/envelope shapes */
function ContactScene() {
  return (
    <>
      {/* "Phone" tall rounded box */}
      <group rotation={[0.1, 0.2, -0.15]}>
        <RoundedBox position={[0, 0.3, 0]} args={[1, 2, 0.2]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color={CLAY_COLORS.terracotta} roughness={0.88} metalness={0.05} />
        </RoundedBox>
      </group>
      {/* "Envelope" flat wide box */}
      <group rotation={[-0.2, -0.3, 0.1]}>
        <RoundedBox position={[0.5, -1.2, 0.3]} args={[1.8, 1.2, 0.15]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={CLAY_COLORS.terraMuted} roughness={0.88} metalness={0.05} />
        </RoundedBox>
      </group>
      <ClaySphere position={[-1.8, 1, -0.5]} color={CLAY_COLORS.sand} size={0.35} speed={1} distort={0.15} />
      <ClayCone position={[2, 1.5, -0.3]} color={CLAY_COLORS.terraLight} size={0.4} speed={0.8} />
      <ClayTorus position={[-1.5, -1.5, 0.5]} color={CLAY_COLORS.blush} size={0.35} speed={1.2} />
    </>
  );
}

/** Audit hero — magnifying glass shapes */
function AuditScene() {
  return (
    <>
      {/* Magnifying glass = torus + capsule handle */}
      <ClayTorus position={[0, 0.5, 0]} color={CLAY_COLORS.terracotta} size={1.2} speed={0.5} />
      <ClayCapsule position={[1.2, -1.2, 0]} color={CLAY_COLORS.terracotta} size={1} speed={0.5} />
      {/* "Screen" being inspected */}
      <group rotation={[0.1, -0.2, 0]}>
        <RoundedBox position={[-0.5, -0.3, -0.8]} args={[2, 1.4, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={CLAY_COLORS.blushDeep} roughness={0.88} metalness={0.05} />
        </RoundedBox>
      </group>
      <ClaySphere position={[2.2, 1, 0.3]} color={CLAY_COLORS.sand} size={0.3} speed={1.3} distort={0.1} />
      <ClaySphere position={[-2, -1, 0.5]} color={CLAY_COLORS.terraLight} size={0.25} speed={1} distort={0.1} />
    </>
  );
}

/** 404 hero — crumpled ball */
function NotFoundScene() {
  return (
    <>
      <ClaySphere position={[0, 0, 0]} color={CLAY_COLORS.terracotta} size={1.6} speed={0.4} distort={0.5} />
      <ClaySphere position={[-1.8, 1.2, -0.5]} color={CLAY_COLORS.sand} size={0.3} speed={1.2} distort={0.15} />
      <ClayCube position={[2, -0.8, 0.3]} color={CLAY_COLORS.blushDeep} size={0.4} speed={1} />
      <ClayCone position={[-1.5, -1.5, 0.5]} color={CLAY_COLORS.terraLight} size={0.35} speed={0.8} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN CANVAS WRAPPER
   ═══════════════════════════════════════════════════════════ */

const SCENES = {
  home: HomeScene,
  about: AboutScene,
  services: ServicesScene,
  portfolio: PortfolioScene,
  contact: ContactScene,
  audit: AuditScene,
  notFound: NotFoundScene,
};

export default function ClayScene({ scene = "home", className = "", style = {} }) {
  const SceneComponent = SCENES[scene] || HomeScene;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 380,
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[-3, -2, 4]} intensity={0.4} />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#E8744A" />

        <SceneComponent />

        <Environment preset="studio" environmentIntensity={0.3} />
      </Canvas>
    </div>
  );
}
