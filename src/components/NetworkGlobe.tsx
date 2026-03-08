import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

const NetworkGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create network nodes and connections
  const { nodes, edges } = useMemo(() => {
    const nodeCount = 40;
    const nodePositions: THREE.Vector3[] = [];

    // Place nodes on a sphere surface
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 1.8;
      nodePositions.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }

    // Create connections between nearby nodes
    const edgePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.5) {
          edgePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    return {
      nodes: nodePositions,
      edges: new Float32Array(edgePositions),
    };
  }, []);

  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      pos[i * 3] = n.x;
      pos[i * 3 + 1] = n.y;
      pos[i * 3 + 2] = n.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [nodes]);

  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(edges, 3));
    return geo;
  }, [edges]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[-2.5, 0, 0]}>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 20, 20]} />
        <meshBasicMaterial
          color="#4c1d95"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Network edges */}
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.2}
        />
      </lineSegments>

      {/* Network nodes */}
      <points geometry={nodeGeometry}>
        <pointsMaterial
          size={0.06}
          color="#a78bfa"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default NetworkGlobe;
