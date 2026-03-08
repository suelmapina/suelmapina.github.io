import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleField = ({ count = 500 }) => {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
      mesh.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticleField;
