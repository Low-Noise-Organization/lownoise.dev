"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import * as THREE from "three";
import { useWebGL } from "./useWebGL";

// A small white robot that looks at the cursor wherever it is on the page. Built from primitives
// (no model file), so it weighs nothing and matches the site's black-and-white identity.

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const damp = (cur: number, to: number, lambda: number, dt: number) => cur + (to - cur) * (1 - Math.exp(-lambda * dt));

function Bot({ still, interactive }: { still: boolean; interactive: boolean }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const tip = useRef<THREE.Mesh>(null);
  const state = useRef({ px: 0, py: 0, inside: false, down: false, yaw: 0, pitch: 0, blinkAt: 2.5, blink: 0, press: 0 });
  const { gl, invalidate } = useThree();

  const g = useMemo(() => ({
    body: new RoundedBoxGeometry(1.2, 1.2, 0.86, 6, 0.3),
    head: new RoundedBoxGeometry(1.75, 1.12, 1.1, 6, 0.4),
    visor: new RoundedBoxGeometry(1.42, 0.66, 0.16, 5, 0.26),
    chest: new RoundedBoxGeometry(0.66, 0.4, 0.08, 4, 0.1),
    eye: new THREE.CapsuleGeometry(0.075, 0.15, 6, 12),
    arm: new THREE.CapsuleGeometry(0.12, 0.5, 6, 12),
    ear: new THREE.CylinderGeometry(0.24, 0.24, 0.2, 40),
    pin: new THREE.CylinderGeometry(0.03, 0.03, 0.4, 12),
    ball: new THREE.SphereGeometry(0.08, 24, 16),
    dot: new THREE.SphereGeometry(0.04, 16, 12),
    neck: new THREE.CylinderGeometry(0.2, 0.26, 0.2, 24),
    ring: new THREE.RingGeometry(0.98, 1.0, 96),
  }), []);
  useEffect(() => () => Object.values(g).forEach((x) => x.dispose()), [g]);

  useEffect(() => {
    if (!interactive) return;
    const s = state.current;
    const move = (e: PointerEvent) => {
      const r = gl.domElement.getBoundingClientRect();
      // Relative to the robot, scaled by the viewport: it follows the cursor anywhere on the page, not just over itself.
      s.px = clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth * 0.38), -1, 1);
      s.py = clamp(-(e.clientY - (r.top + r.height * 0.42)) / (innerHeight * 0.38), -1, 1);
      s.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (still) invalidate();
    };
    const down = () => { if (s.inside) s.down = true; };
    const up = () => { s.down = false; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl, interactive, still, invalidate]);

  useFrame((st, dt) => {
    const s = state.current;
    const t = st.clock.elapsedTime;
    if (!root.current || !head.current || !body.current || !eyes.current) return;
    const k = still ? 100 : 7;
    s.yaw = damp(s.yaw, s.px, k, dt);
    s.pitch = damp(s.pitch, s.py, k, dt);
    s.press = damp(s.press, s.down ? 1 : 0, 14, dt);

    root.current.position.y = still ? 0 : Math.sin(t * 1.3) * 0.07;
    head.current.rotation.y = s.yaw * 0.62;
    head.current.rotation.x = -s.pitch * 0.32;
    head.current.rotation.z = -s.yaw * 0.07;
    body.current.rotation.y = s.yaw * 0.28;
    eyes.current.position.x = s.yaw * 0.085;
    eyes.current.position.y = s.pitch * 0.05;

    // Blink every few seconds; wide eyes while pressed.
    if (!still) {
      if (t > s.blinkAt) { s.blink = 0.14; s.blinkAt = t + 2.4 + Math.random() * 3; }
      s.blink = Math.max(0, s.blink - dt);
    }
    const open = (s.blink > 0 ? 0.08 : 1) * (1 + s.press * 0.35);
    if (eyeL.current && eyeR.current) { eyeL.current.scale.y = open; eyeR.current.scale.y = open; eyeL.current.scale.x = eyeR.current.scale.x = 1 + s.press * 0.2; }

    // Arms sway a little and lift when the robot is pressed.
    const sway = still ? 0 : Math.sin(t * 1.3 + 1) * 0.06;
    if (armL.current) armL.current.rotation.z = damp(armL.current.rotation.z, -0.18 + sway - s.yaw * 0.04, 8, dt);
    if (armR.current) armR.current.rotation.z = damp(armR.current.rotation.z, 0.18 - sway - s.yaw * 0.04 + s.press * 2.0, 10, dt);
    if (tip.current) tip.current.scale.setScalar(still ? 1 : 0.8 + (Math.sin(t * 3) * 0.5 + 0.5) * 0.5 + s.press * 0.8);
  });

  const white = <meshStandardMaterial color="#f1f1f1" roughness={0.36} metalness={0.04} />;
  const grey = <meshStandardMaterial color="#8d8d8d" roughness={0.5} metalness={0.2} />;
  const glass = <meshPhysicalMaterial color="#040404" roughness={0.1} metalness={0.65} clearcoat={1} clearcoatRoughness={0.05} />;
  const glow = <meshBasicMaterial color="#ffffff" toneMapped={false} />;

  return (
    <group ref={root} position={[0, -0.15, 0]}>
      <group ref={body} position={[0, -0.78, 0]}>
        <mesh geometry={g.body}>{white}</mesh>
        <mesh geometry={g.chest} position={[0, 0.12, 0.43]}>{glass}</mesh>
        {[-0.17, 0, 0.17].map((x) => <mesh key={x} geometry={g.dot} position={[x, 0.12, 0.48]}>{glow}</mesh>)}
        <group ref={armL} position={[-0.74, 0.3, 0]}><mesh geometry={g.arm} position={[0, -0.32, 0]}>{white}</mesh></group>
        <group ref={armR} position={[0.74, 0.3, 0]}><mesh geometry={g.arm} position={[0, -0.32, 0]}>{white}</mesh></group>
      </group>
      <mesh geometry={g.neck} position={[0, -0.06, 0]}>{grey}</mesh>
      <group ref={head} position={[0, 0.58, 0]}>
        <mesh geometry={g.head}>{white}</mesh>
        <mesh geometry={g.visor} position={[0, 0.02, 0.56]}>{glass}</mesh>
        <group ref={eyes} position={[0, 0.02, 0.66]}>
          <mesh ref={eyeL} geometry={g.eye} position={[-0.3, 0, 0]}>{glow}</mesh>
          <mesh ref={eyeR} geometry={g.eye} position={[0.3, 0, 0]}>{glow}</mesh>
        </group>
        <mesh geometry={g.ear} position={[-0.93, 0, 0]} rotation={[0, 0, Math.PI / 2]}>{glass}</mesh>
        <mesh geometry={g.ear} position={[0.93, 0, 0]} rotation={[0, 0, Math.PI / 2]}>{glass}</mesh>
        <mesh geometry={g.pin} position={[0, 0.76, 0]}>{grey}</mesh>
        <mesh ref={tip} geometry={g.ball} position={[0, 1.0, 0]}>{glow}</mesh>
      </group>
      <mesh geometry={g.ring} position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.1}><meshBasicMaterial color="#ffffff" transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>
      <mesh geometry={g.ring} position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.6}><meshBasicMaterial color="#ffffff" transparent opacity={0.14} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

interface Props {
  still?: boolean;
  active?: boolean;
  mobile?: boolean;
  interactive?: boolean;
  className?: string;
  label: string;
  fallback: React.ReactNode;
}

export default function RobotScene({ still = false, active = true, mobile = false, interactive = true, className, label, fallback }: Props) {
  const ok = useWebGL();
  if (!ok) return <div className={className} role="img" aria-label={label}>{fallback}</div>;
  return (
    <div className={className} role="img" aria-label={label}>
      <Canvas
        frameloop={still ? "demand" : active ? "always" : "never"}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.35, 6.4], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} />
        <directionalLight position={[-4, 2, -3]} intensity={1.8} />
        <pointLight position={[0, -2, 3]} intensity={6} distance={9} />
        <Bot still={still} interactive={interactive} />
      </Canvas>
    </div>
  );
}
