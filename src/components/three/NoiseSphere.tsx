"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWebGL } from "./useWebGL";

// The brand in one object: a sphere of points made of "noise". Where the cursor is, the noise falls
// to zero and the surface is perfectly smooth ("less noise"); holding the pointer silences all of it.

const VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uHold;
uniform vec3  uHit;
uniform float uHitOn;
uniform float uSize;
attribute float aSeed;
varying float vAlpha;

// 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vec3 n = normalize(position);
  float f = snoise(n*1.9 + vec3(0.0, uTime*0.22, 0.0))*0.62
          + snoise(n*4.6 - vec3(uTime*0.31, 0.0, 0.0))*0.28
          + snoise(n*10.0 + vec3(0.0, 0.0, uTime*0.4))*0.10;
  float d = distance(n, normalize(uHit));
  float calm = uHitOn * (1.0 - smoothstep(0.10, 0.80, d));
  float amp = uAmp * (1.0 - calm) * (1.0 - uHold);
  vec3 p = n * (1.0 + f * amp);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.75 + aSeed * 0.7) * (1.0 + calm * 0.35) / -mv.z;
  float facing = smoothstep(-0.35, 0.95, normalize(mat3(modelMatrix) * n).z);
  vAlpha = (0.16 + 0.84 * facing) * mix(0.62, 1.0, max(calm, uHold));
}
`;

const FRAG = /* glsl */ `
varying float vAlpha;
void main(){
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  float a = smoothstep(0.5, 0.18, r);
  gl_FragColor = vec4(vec3(1.0), a * vAlpha);
}
`;

function fibonacciSphere(n: number): { pos: Float32Array; seed: Float32Array } {
  const pos = new Float32Array(n * 3);
  const seed = new Float32Array(n);
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = ga * i;
    pos[i * 3] = Math.cos(t) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(t) * r;
    seed[i] = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
  }
  return { pos, seed };
}

interface InnerProps {
  noise: number;
  still: boolean;
  count: number;
  /** horizontal offset of the object in world units (lets the hero push it to the right). */
  offsetX: number;
  scale: number;
  interactive: boolean;
}

function Sphere({ noise, still, count, offsetX, scale, interactive }: InnerProps) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const ptr = useRef({ x: 0, y: 0, inside: false, down: false });
  const hit = useRef(new THREE.Vector3(0, 0, 1));
  const tmp = useMemo(() => ({ inv: new THREE.Matrix4(), o: new THREE.Vector3(), d: new THREE.Vector3(), ray: new THREE.Raycaster() }), []);
  const { gl, camera, invalidate } = useThree();

  const geo = useMemo(() => {
    const { pos, seed } = fibonacciSphere(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);
  useEffect(() => () => geo.dispose(), [geo]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 8 },
      uAmp: { value: noise },
      uHold: { value: 0 },
      uHit: { value: new THREE.Vector3(0, 0, 1) },
      uHitOn: { value: 0 },
      uSize: { value: 2.4 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const ringGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 160; i++) { const a = (i / 160) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a))); }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  useEffect(() => () => ringGeo.dispose(), [ringGeo]);

  useEffect(() => {
    if (!interactive) return;
    const el = gl.domElement;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ptr.current.x = x; ptr.current.y = y;
      ptr.current.inside = Math.abs(x) <= 1 && Math.abs(y) <= 1;
      if (still) invalidate();
    };
    const down = () => { ptr.current.down = true; };
    const up = () => { ptr.current.down = false; };
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

  useFrame((state, dt) => {
    const g = group.current;
    const m = mat.current;
    if (!g || !m) return;
    const u = m.uniforms;
    const k = 1 - Math.pow(0.0008, dt);
    u.uSize.value = state.size.height * state.viewport.dpr * 0.0135; // pixel size at distance 1: keeps dots the same on any screen
    u.uAmp.value += (noise - u.uAmp.value) * k;
    g.position.x += (offsetX - g.position.x) * k;
    g.scale.setScalar(scale);
    if (still) { g.rotation.set(0.25, 0.6, 0); return; }

    u.uTime.value += dt;
    const p = ptr.current;
    g.rotation.y += dt * 0.06;
    g.rotation.x += ((p.inside ? -p.y * 0.22 : 0) + 0.18 - g.rotation.x) * k * 0.6;
    g.rotation.z += ((p.inside ? p.x * 0.08 : 0) - g.rotation.z) * k * 0.6;
    if (ringA.current) ringA.current.rotation.y += dt * 0.12;
    if (ringB.current) ringB.current.rotation.y -= dt * 0.08;

    // Cursor ray -> unit sphere in the object's own space (it rotates, so it is not the screen position).
    g.updateMatrixWorld();
    tmp.inv.copy(g.matrixWorld).invert();
    tmp.ray.setFromCamera(new THREE.Vector2(p.x, p.y), camera);
    tmp.o.copy(tmp.ray.ray.origin).applyMatrix4(tmp.inv);
    tmp.d.copy(tmp.ray.ray.direction).transformDirection(tmp.inv).normalize();
    const b = tmp.o.dot(tmp.d);
    const disc = b * b - (tmp.o.lengthSq() - 1);
    let on = 0;
    if (p.inside && disc > 0) {
      const t = -b - Math.sqrt(disc);
      hit.current.copy(tmp.o).addScaledVector(tmp.d, t).normalize();
      on = 1;
    }
    u.uHit.value.lerp(hit.current, 1 - Math.pow(0.0005, dt));
    u.uHitOn.value += (on - u.uHitOn.value) * (1 - Math.pow(0.002, dt));
    u.uHold.value += ((p.down && p.inside ? 1 : 0) - u.uHold.value) * (1 - Math.pow(0.01, dt));
  });

  return (
    <group ref={group}>
      <points geometry={geo}>
        <shaderMaterial ref={mat} vertexShader={VERT} fragmentShader={FRAG} uniforms={uniforms} transparent depthWrite={false} />
      </points>
      <group ref={ringA}>
        <group rotation={[1.15, 0, 0.69]} scale={1.55}>
          <lineLoop geometry={ringGeo}><lineBasicMaterial color="#ffffff" transparent opacity={0.16} /></lineLoop>
        </group>
      </group>
      <group ref={ringB}>
        <group rotation={[-0.55, 0, -0.33]} scale={1.8}>
          <lineLoop geometry={ringGeo}><lineBasicMaterial color="#ffffff" transparent opacity={0.16} /></lineLoop>
        </group>
      </group>
    </group>
  );
}

interface SceneProps {
  /** 0 = perfectly calm, 1 = very noisy. */
  noise?: number;
  /** render once and stop (reduced motion). */
  still?: boolean;
  /** pause rendering while off screen. */
  active?: boolean;
  mobile?: boolean;
  offsetX?: number;
  scale?: number;
  interactive?: boolean;
  className?: string;
  fallback: React.ReactNode;
  label: string;
}

/** WebGL canvas with the noise sphere. Falls back to a static image without WebGL. */
export default function NoiseScene({ noise = 0.4, still = false, active = true, mobile = false, offsetX = 0, scale = 1.28, interactive = true, className, fallback, label }: SceneProps) {
  const ok = useWebGL();
  if (!ok) return <div className={className} role="img" aria-label={label}>{fallback}</div>;
  return (
    <div className={className} role="img" aria-label={label}>
      <Canvas
        frameloop={still ? "demand" : active ? "always" : "never"}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <Sphere noise={noise} still={still} count={mobile ? 6500 : 16000} offsetX={offsetX} scale={scale} interactive={interactive} />
      </Canvas>
    </div>
  );
}
