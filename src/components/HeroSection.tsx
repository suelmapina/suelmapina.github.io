import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { motion } from "framer-motion";
import NetworkGlobe from "./NetworkGlobe";
import DataFlowParticles from "./DataFlowParticles";
import { BarChart3, Brain, Database, Settings, TrendingUp, Cpu } from "lucide-react";

// Icon node positions in viewBox coordinates (0-100 space)
const iconNodes = [
  { Icon: BarChart3, cx: 8, cy: 25 },
  { Icon: Brain, cx: 4, cy: 48 },
  { Icon: Database, cx: 10, cy: 70 },
  { Icon: Settings, cx: 22, cy: 22 },
  { Icon: TrendingUp, cx: 24, cy: 72 },
  { Icon: Cpu, cx: 20, cy: 48 },
];

// Connections between node pairs
const connections: [number, number][] = [
  [0, 3], [0, 5], [1, 2], [1, 5], [2, 4], [3, 5], [4, 5], [0, 1], [3, 4],
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

      {/* Icon network overlay with animated data flow */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines - pulsing opacity */}
          {connections.map(([a, b], i) => (
            <g key={`conn-${i}`}>
              {/* Base line */}
              <line
                x1={iconNodes[a].cx}
                y1={iconNodes[a].cy}
                x2={iconNodes[b].cx}
                y2={iconNodes[b].cy}
                stroke="hsl(270, 60%, 55%)"
                strokeWidth="0.15"
              >
                <animate
                  attributeName="opacity"
                  values="0.1;0.4;0.1"
                  dur={`${2 + i * 0.6}s`}
                  repeatCount="indefinite"
                />
              </line>

              {/* Traveling data dot */}
              <circle r="0.4" fill="hsl(185, 70%, 60%)" filter="url(#glow)">
                <animateMotion
                  dur={`${1.8 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M${iconNodes[a].cx},${iconNodes[a].cy} L${iconNodes[b].cx},${iconNodes[b].cy}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  dur={`${1.8 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Reverse traveling dot (data flows both ways) */}
              <circle r="0.3" fill="hsl(270, 70%, 70%)" filter="url(#glow)">
                <animateMotion
                  dur={`${2.5 + i * 0.4}s`}
                  repeatCount="indefinite"
                  path={`M${iconNodes[b].cx},${iconNodes[b].cy} L${iconNodes[a].cx},${iconNodes[a].cy}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.7;0.7;0"
                  dur={`${2.5 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* Node glow rings */}
          {iconNodes.map(({ cx, cy }, i) => (
            <circle
              key={`ring-${i}`}
              cx={cx}
              cy={cy}
              r="2.5"
              fill="none"
              stroke="hsl(270, 60%, 55%)"
              strokeWidth="0.1"
            >
              <animate
                attributeName="r"
                values="2;3;2"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.1;0.3"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        {/* Icon nodes with pulsing light */}
        {iconNodes.map(({ Icon, cx, cy }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            className="absolute flex items-center justify-center"
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Outer pulsing glow ring */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.3, ease: "easeInOut" }}
              className="absolute w-12 h-12 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(185, 70%, 50%, 0.4) 0%, transparent 70%)",
              }}
            />
            {/* Inner pulsing glow */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{ repeat: Infinity, duration: 1.5 + i * 0.2, ease: "easeInOut", delay: 0.3 }}
              className="absolute w-10 h-10 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(270, 60%, 55%, 0.5) 0%, transparent 70%)",
              }}
            />
            {/* Icon container */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-muted/30 border border-primary/40 backdrop-blur-sm">
              <motion.div
                animate={{
                  opacity: [0.7, 1, 0.7],
                  filter: [
                    "drop-shadow(0 0 2px hsl(185, 70%, 50%))",
                    "drop-shadow(0 0 8px hsl(185, 70%, 50%))",
                    "drop-shadow(0 0 2px hsl(185, 70%, 50%))",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
              >
                <Icon size={16} className="text-secondary" />
              </motion.div>
            </div>
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
