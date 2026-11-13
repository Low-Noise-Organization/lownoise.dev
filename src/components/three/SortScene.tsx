"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { SortStep } from "@/lib/algorithms";

export type BarState = 0 | 1 | 2 | 3; // unsorted, comparing, swapping, sorted
export interface SortView { array: number[]; states: BarState[] }

const COLORS = [new THREE.Color("#3b3b3b"), new THREE.Color("#ffffff"), new THREE.Color("#ffffff"), new THREE.Color("#a6a6a6")];

export function toView(step: Pick<SortStep, "array" | "comparing" | "swapping" | "sorted">): SortView {
  const states: BarState[] = new Array(step.array.length).fill(0);
  for (const i of step.sorted) states[i] = 3;
  if (step.swapping) { states[step.swapping[0]] = 2; states[step.swapping[1]] = 2; }
  else if (step.comparing) { states[step.comparing[0]] = 1; states[step.comparing[1]] = 1; }
  return { array: step.array, states };
}

function Bars({ view }: { view: React.RefObject<SortView> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const drag = useRef({ down: false, x: 0, y: 0, ry: -0.35, rx: 0.42, vy: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { gl } = useThree();
  const MAX = 96;

  useEffect(() => {
    const el = gl.domElement;
    const d = drag.current;
    const down = (e: PointerEvent) => { d.down = true; d.x = e.clientX; d.y = e.clientY; el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!d.down) return;
      d.ry += (e.clientX - d.x) * 0.006;
      d.rx = Math.min(1.2, Math.max(0.05, d.rx + (e.clientY - d.y) * 0.004));
      d.x = e.clientX; d.y = e.clientY;
    };
    const up = () => { d.down = false; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => { el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); };
  }, [gl]);

  useFrame((state, dt) => {
    const m = mesh.current, g = group.current;
    if (!m || !g) return;
    const d = drag.current;
    if (!d.down) d.ry += Math.sin(state.clock.elapsedTime * 0.35) * dt * 0.05; // slow idle sway
    g.scale.setScalar(Math.min(1, state.size.width / state.size.height / 1.55)); // narrow screens: shrink instead of cropping
    g.rotation.y += (d.ry - g.rotation.y) * (1 - Math.pow(0.0005, dt));
    g.rotation.x += (d.rx - g.rotation.x) * (1 - Math.pow(0.0005, dt));

    const { array, states } = view.current;
    const n = Math.min(array.length, MAX);
    const max = Math.max(...array, 1);
    const span = 9.2;
    const step = span / Math.max(n, 1);
    const w = step * 0.78;
    m.count = n;
    for (let i = 0; i < n; i++) {
      const s = states[i] ?? 0;
      const h = Math.max(0.05, (array[i] / max) * 3.6);
      dummy.position.set((i - (n - 1) / 2) * step, h / 2, s === 2 ? 0.55 : 0);
      dummy.scale.set(w, h, w * 1.6);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      m.setColorAt(i, COLORS[s]);
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={group} position={[0, -1.5, 0]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, MAX]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.55} metalness={0.05} toneMapped={false} />
      </instancedMesh>
      <gridHelper args={[11, 22, "#444444", "#222222"]} position={[0, -0.001, 0]} />
    </group>
  );
}

/** 3D bar towers. `view` is a ref the animation loop writes to; the scene reads it every frame (no React re-render per step). */
export default function SortScene({ view, mobile }: { view: React.RefObject<SortView>; mobile: boolean }) {
  return (
    <Canvas dpr={mobile ? [1, 1.5] : [1, 2]} camera={{ position: [0, 3.4, 9.6], fov: 40 }} gl={{ antialias: true, alpha: true }} style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 7, 6]} intensity={2.6} />
      <directionalLight position={[-5, 2, -4]} intensity={0.8} />
      <Bars view={view} />
    </Canvas>
  );
}
