import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Creates a flowing "cloud" of particles that emanates from the globe (left)
 * and dissolves towards the right — like the Claire Mazzetti reference.
 */
const DataFlowParticles = ({ count = 600 }) => {
  const mesh = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { basePositions, speeds, offsets } = useMemo(() => {
    const base = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // t controls position along the flow (0 = globe edge, 1 = far right)
      const t = Math.pow(Math.random(), 0.7); // more particles near globe

      // X: from globe edge (-1.3) flowing right to (+4)
      const x = -1.3 + t * 5.5;

      // Y/Z: tight near globe, spreading out, then thinning — creates the "cloud" shape
      const envelope = Math.sin(t * Math.PI) * (1 - t * 0.3);
      const waveY = Math.sin(t * 6 + i * 0.1) * 0.3;
      const y = (Math.random() - 0.5) * envelope * 2.5 + waveY * (1 - t);
      const z = (Math.random() - 0.5) * envelope * 0.8;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      spd[i] = 0.3 + Math.random() * 0.7;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { basePositions: base, speeds: spd, offsets: off };
  }, [count]);

  // Create color gradient: brighter near globe, fading out
  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (basePositions[i * 3] + 1.3) / 5.5; // 0 near globe, 1 far
      // Purple to cyan gradient
      const r = 0.54 - t * 0.2;
      const g = 0.17 + t * 0.6;
      const b = 0.89 + t * 0.11;
      cols[i * 3] = r;
      cols[i * 3 + 1] = g;
      cols[i * 3 + 2] = b;
    }
    return cols;
  }, [count, basePositions]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(basePositions.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [basePositions, colors]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    timeRef.current += delta;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const t = (basePositions[ix] + 1.3) / 5.5;

      // Flowing wave motion — more movement in the middle of the flow
      const wave = Math.sin(timeRef.current * speeds[i] + offsets[i]);
      const waveStrength = Math.sin(t * Math.PI) * 0.4;

      pos[ix] = basePositions[ix] + Math.sin(timeRef.current * 0.2 + i * 0.01) * 0.05;
      pos[ix + 1] = basePositions[ix + 1] + wave * waveStrength;
      pos[ix + 2] = basePositions[ix + 2] + Math.cos(timeRef.current * speeds[i] * 0.5 + offsets[i]) * waveStrength * 0.3;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DataFlowParticles;
