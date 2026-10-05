"use client";

/**
 * Quiet 3D atmosphere that lives *behind* the hero portrait: a branch that
 * passes behind the frame, a few slowly swaying leaves, a handmade clay
 * vessel near the base and soft floating dust in warm light.
 *
 * It never overlaps the photograph (the canvas sits underneath it) and it
 * stops rendering when off-screen or when the visitor prefers reduced motion.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const SAGE = ["#7f9070", "#93a283", "#6c7d5f", "#a3ae8f"];

function makeLeafGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.13, 0.08, 0.17, 0.32, 0, 0.56);
  s.bezierCurveTo(-0.17, 0.32, -0.13, 0.08, 0, 0);
  const g = new THREE.ShapeGeometry(s, 14);
  // Cup the leaf slightly along its midrib so light falls across it.
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    p.setZ(i, -x * x * 2.2 + Math.sin(y * 4) * 0.02);
  }
  g.computeVertexNormals();
  return g;
}

type LeafSpec = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  color: string;
  phase: number;
};

function Branch({ motion }: { motion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const leafRefs = useRef<(THREE.Mesh | null)[]>([]);

  const { curve, twig, leaves, leafGeo } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.85, -2.0, -0.6),
      new THREE.Vector3(1.5, -0.9, -0.4),
      new THREE.Vector3(1.3, 0.25, -0.3),
      new THREE.Vector3(0.9, 1.15, -0.45),
      new THREE.Vector3(0.1, 1.6, -0.6),
      new THREE.Vector3(-0.9, 1.72, -0.8),
    ]);
    const twig = new THREE.CatmullRomCurve3([
      curve.getPoint(0.42),
      new THREE.Vector3(1.8, 0.5, -0.2),
      new THREE.Vector3(2.1, 0.85, -0.1),
    ]);

    const leaves: LeafSpec[] = [];
    const add = (c: THREE.Curve<THREE.Vector3>, t: number, side: number, scale: number, i: number) => {
      const pos = c.getPoint(t);
      const tan = c.getTangent(t);
      const angle = Math.atan2(tan.y, tan.x) - Math.PI / 2;
      leaves.push({
        position: pos,
        rotation: new THREE.Euler(0.35 * side, 0.5 * side, angle + side * 0.95),
        scale,
        color: SAGE[i % SAGE.length],
        phase: i * 1.37,
      });
    };
    [0.18, 0.27, 0.36, 0.5, 0.58, 0.67, 0.76, 0.85, 0.93].forEach((t, i) =>
      add(curve, t, i % 2 ? 1 : -1, 0.85 + ((i * 7) % 4) * 0.12, i),
    );
    [0.45, 0.7, 0.95].forEach((t, i) => add(twig, t, i % 2 ? -1 : 1, 0.75, i + 3));

    return { curve, twig, leaves, leafGeo: makeLeafGeometry() };
  }, []);

  useFrame(({ clock }) => {
    if (!motion) return;
    const t = clock.getElapsedTime();
    leafRefs.current.forEach((m, i) => {
      if (!m) return;
      const base = leaves[i].rotation;
      m.rotation.z = base.z + Math.sin(t * 0.55 + leaves[i].phase) * 0.07;
      m.rotation.x = base.x + Math.sin(t * 0.4 + leaves[i].phase * 0.6) * 0.05;
    });
    if (group.current) group.current.rotation.z = Math.sin(t * 0.18) * 0.012;
  });

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[curve, 96, 0.03, 8, false]} />
        <meshStandardMaterial color="#6f523b" roughness={0.9} />
      </mesh>
      <mesh>
        <tubeGeometry args={[twig, 32, 0.017, 6, false]} />
        <meshStandardMaterial color="#7a5c43" roughness={0.9} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh
          key={i}
          ref={(m) => {
            leafRefs.current[i] = m;
          }}
          geometry={leafGeo}
          position={l.position}
          rotation={l.rotation}
          scale={l.scale}
        >
          <meshStandardMaterial color={l.color} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function DriftingLeaves({ motion }: { motion: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const geo = useMemo(makeLeafGeometry, []);
  const specs = useMemo(
    () => [
      { x: -1.75, y: 0.9, z: -1.6, s: 0.6, c: SAGE[1] },
      { x: -1.45, y: -0.4, z: -2.0, s: 0.5, c: SAGE[3] },
      { x: 1.95, y: -1.25, z: -1.5, s: 0.55, c: SAGE[0] },
      { x: 0.4, y: -1.75, z: -1.8, s: 0.45, c: SAGE[2] },
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!motion) return;
    const t = clock.getElapsedTime();
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.position.y = specs[i].y + Math.sin(t * 0.3 + i * 2) * 0.12;
      m.position.x = specs[i].x + Math.cos(t * 0.22 + i) * 0.08;
      m.rotation.z = Math.sin(t * 0.35 + i) * 0.5 + i;
      m.rotation.y = Math.cos(t * 0.25 + i) * 0.6;
    });
  });

  return (
    <>
      {specs.map((s, i) => (
        <mesh
          key={i}
          ref={(m) => {
            refs.current[i] = m;
          }}
          geometry={geo}
          position={[s.x, s.y, s.z]}
          rotation={[0.4, 0.3, i]}
          scale={s.s}
        >
          <meshStandardMaterial color={s.c} roughness={0.8} side={THREE.DoubleSide} transparent opacity={0.75} />
        </mesh>
      ))}
    </>
  );
}

/** Now and then a single leaf comes loose and drifts down beside the portrait. */
function FallingLeaf({ motion }: { motion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const geo = useMemo(makeLeafGeometry, []);
  const CYCLE = 24; // seconds between falls
  const FALL = 15; // seconds the fall takes

  useFrame(({ clock }) => {
    if (!ref.current || !mat.current) return;
    const t = (clock.getElapsedTime() + 8) % CYCLE;
    if (!motion || t > FALL) {
      mat.current.opacity = 0;
      return;
    }
    const k = t / FALL;
    // swinging side to side as it falls, like a real leaf
    ref.current.position.set(1.45 + Math.sin(k * Math.PI * 3.2) * 0.32, 1.2 - k * 3.5, -0.2 + Math.sin(k * 5) * 0.15);
    ref.current.rotation.set(0.6 + Math.sin(k * 9) * 0.5, Math.cos(k * 7) * 0.8, Math.sin(k * Math.PI * 3.2) * 0.9 + 2.4);
    mat.current.opacity = Math.min(1, k / 0.08, (1 - k) / 0.18) * 0.9;
  });

  return (
    <mesh ref={ref} geometry={geo} scale={0.7}>
      <meshStandardMaterial ref={mat} color="#9aa684" roughness={0.75} side={THREE.DoubleSide} transparent opacity={0} />
    </mesh>
  );
}

function ClayVessel({ motion }: { motion: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const profile = useMemo(() => {
    // Hand-thrown silhouette: foot, round belly, narrow neck, lip.
    const pts: [number, number][] = [
      [0, 0], [0.22, 0], [0.26, 0.04], [0.38, 0.2], [0.44, 0.38], [0.42, 0.56],
      [0.32, 0.72], [0.18, 0.84], [0.15, 0.95], [0.19, 1.02], [0.17, 1.04],
    ];
    return pts.map(([x, y]) => new THREE.Vector2(x, y));
  }, []);

  useFrame(({ clock }) => {
    if (!motion || !ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <group position={[-1.5, -1.72, 0.3]} rotation={[0.08, 0, -0.04]}>
      <group ref={ref}>
        <mesh scale={0.56}>
          <latheGeometry args={[profile, 48]} />
          <meshStandardMaterial color="#bf9479" roughness={0.95} metalness={0} />
        </mesh>
      </group>
      {/* a smooth river stone beside it */}
      <mesh position={[0.42, 0.05, 0.15]} scale={[0.15, 0.08, 0.12]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#d6c5ad" roughness={0.85} />
      </mesh>
    </group>
  );
}

function Dust({ motion, count = 70 }: { motion: boolean; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    // Deterministic pseudo-random so server/client and re-renders agree.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 5;
      positions[i * 3 + 1] = (rand() - 0.5) * 5;
      positions[i * 3 + 2] = -rand() * 2;
      speeds[i] = 0.02 + rand() * 0.05;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!motion || !ref.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + speeds[i] * delta * 2;
      if (y > 2.6) y = -2.6;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f1d9b3" size={0.03} sizeAttenuation transparent opacity={0.65} depthWrite={false} />
    </points>
  );
}

/** Very gentle parallax towards the pointer. */
function Rig({ motion, children }: { motion: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!motion || !ref.current) return;
    ref.current.rotation.y += (pointer.x * 0.06 - ref.current.rotation.y) * 0.03;
    ref.current.rotation.x += (-pointer.y * 0.04 - ref.current.rotation.x) * 0.03;
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene({ active, motion }: { active: boolean; motion: boolean }) {
  return (
    <Canvas
      frameloop={active && motion ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <hemisphereLight args={["#fff4e2", "#b59a7a", 0.9]} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#ffe2bd" />
      <directionalLight position={[-3, -1, 2]} intensity={0.35} color="#e7efe0" />
      <Rig motion={motion}>
        <Branch motion={motion} />
        <DriftingLeaves motion={motion} />
        <FallingLeaf motion={motion} />
        <ClayVessel motion={motion} />
        <Dust motion={motion} />
      </Rig>
    </Canvas>
  );
}
