import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DataFlowParticles = ({ count = 300 }) => {
  const mesh = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, velocities, basePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Particles flow from left (globe area) to right (name area)
      const t = Math.random();
      const startX = -3 + Math.random() * 1.5;
      const endX = 1 + Math.random() * 3;
      const x = startX + (endX - startX) * t;

      // Create a flowing wave/cloud shape
      const spread = Math.sin(t * Math.PI) * 1.5;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread * 0.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      vel[i * 3] = 0.1 + Math.random() * 0.3;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions: pos, velocities: vel, basePositions: base };
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    timeRef.current += delta;

    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Flow from left to right
      posArray[ix] = basePositions[ix] + Math.sin(timeRef.current * velocities[ix] + i) * 0.15;
      posArray[ix + 1] = basePositions[ix + 1] + Math.sin(timeRef.current * 0.5 + i * 0.3) * 0.1;
      posArray[ix + 2] = basePositions[ix + 2] + Math.cos(timeRef.current * 0.3 + i * 0.2) * 0.05;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DataFlowParticles;
