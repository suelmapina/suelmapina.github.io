import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { motion } from "framer-motion";
import NetworkGlobe from "./NetworkGlobe";
import DataFlowParticles from "./DataFlowParticles";
import { BarChart3, Brain, Database, Settings, TrendingUp, Cpu } from "lucide-react";

// Icon positions placed around the globe area (fixed, not rotating)
const iconNodes = [
  { Icon: BarChart3, x: "6%", y: "25%" },
  { Icon: Brain, x: "3%", y: "45%" },
  { Icon: Database, x: "8%", y: "65%" },
  { Icon: Settings, x: "20%", y: "20%" },
  { Icon: TrendingUp, x: "22%", y: "70%" },
  { Icon: Cpu, x: "18%", y: "45%" },
];

// Connection lines between icon pairs (indices)
const connections: [number, number][] = [
  [0, 3], [0, 5], [1, 2], [1, 5], [2, 4], [3, 5], [4, 5],
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
          <Suspense fallback={null}>
            <NetworkGlobe />
            <DataFlowParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* Fixed icons with pulsing data connections */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* SVG connection lines with pulse animation */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map(([a, b], i) => (
            <line
              key={i}
              x1={iconNodes[a].x}
              y1={iconNodes[a].y}
              x2={iconNodes[b].x}
              y2={iconNodes[b].y}
              stroke="hsl(270, 60%, 55%)"
              strokeWidth="1"
              opacity="0.15"
            >
              <animate
                attributeName="opacity"
                values="0.08;0.3;0.08"
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}

          {/* Traveling data dots along connections */}
          {connections.map(([a, b], i) => (
            <circle key={`dot-${i}`} r="2" fill="hsl(185, 70%, 50%)">
              <animateMotion
                dur={`${2.5 + i * 0.4}s`}
                repeatCount="indefinite"
                path={`M ${iconNodes[a].x.replace('%','')} ${iconNodes[a].y.replace('%','')} L ${iconNodes[b].x.replace('%','')} ${iconNodes[b].y.replace('%','')}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${2.5 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        {/* Icon nodes - fixed position, pulsing glow */}
        {iconNodes.map(({ Icon, x, y }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-muted/25 border border-primary/25 backdrop-blur-sm"
            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
            >
              <Icon size={16} className="text-secondary" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[1] bg-gradient-to-t from-background to-transparent" />

      {/* Name positioned inside the flow cloud, right of globe */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="ml-[35%] md:ml-[40%]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="text-secondary font-mono text-xs mb-3 tracking-[0.4em] uppercase"
            >
              Senior Data Scientist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] text-foreground/90"
            >
              SUELMA{" "}
              <span className="text-gradient font-normal">PINA</span>
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5"
      >
        <a href="mailto:suelmapina@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/suelmapina" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://github.com/suelmapina" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
      </motion.div>

      {/* Bottom copyright */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <p className="text-[10px] text-muted-foreground/40 tracking-[0.3em] uppercase">
          All Rights Reserved &nbsp;|&nbsp; © Suelma Pina {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
