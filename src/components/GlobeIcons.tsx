import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { BarChart3, Brain, Database, Settings, TrendingUp, Cpu } from "lucide-react";

const iconData = [
  { icon: BarChart3, angle: 0 },
  { icon: Brain, angle: Math.PI * 0.35 },
  { icon: Database, angle: Math.PI * 0.7 },
  { icon: Settings, angle: Math.PI * 1.05 },
  { icon: TrendingUp, angle: Math.PI * 1.4 },
  { icon: Cpu, angle: Math.PI * 1.75 },
];

const GlobeIcons = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  const positions = useMemo(() => {
    return iconData.map(({ angle }) => {
      const r = 2.6;
      const phi = Math.PI * 0.3 + Math.sin(angle * 2) * 0.5;
      return new THREE.Vector3(
        r * Math.cos(angle) * Math.sin(phi),
        r * Math.sin(angle) * Math.sin(phi),
        r * Math.cos(phi)
      );
    });
  }, []);

  return (
    <group ref={groupRef} position={[-3.5, 0, 0]}>
      {iconData.map(({ icon: Icon }, i) => (
        <Html
          key={i}
          position={[positions[i].x, positions[i].y, positions[i].z]}
          center
          distanceFactor={8}
          style={{ pointerEvents: "none" }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/30 border border-primary/20 backdrop-blur-sm">
            <Icon size={14} className="text-secondary" />
          </div>
        </Html>
      ))}
    </group>
  );
};

export default GlobeIcons;
