import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NetworkGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { nodeGeo, edgeGeo } = useMemo(() => {
    const nodeCount = 50;
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 2.2;
      nodes.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }

    // Edges
    const edgeVerts: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.8) {
          edgeVerts.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const nGeo = new THREE.BufferGeometry();
    const nPos = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => { nPos[i*3]=n.x; nPos[i*3+1]=n.y; nPos[i*3+2]=n.z; });
    nGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));

    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edgeVerts), 3));

    return { nodeGeo: nGeo, edgeGeo: eGeo };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[-3.5, 0, 0]}>
      {/* Subtle wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshBasicMaterial color="#4c1d95" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Outer ring glow */}
      <mesh>
        <sphereGeometry args={[2.35, 24, 24]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Network edges */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#6d28d9" transparent opacity={0.15} />
      </lineSegments>

      {/* Network nodes */}
      <points geometry={nodeGeo}>
        <pointsMaterial
          size={0.08}
          color="#a78bfa"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default NetworkGlobe;
