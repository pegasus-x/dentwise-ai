"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

interface DentWiseLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function DentWiseLoader({
  onComplete,
  duration = 8000,
}: DentWiseLoaderProps) {
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(0, { stiffness: 40, damping: 12 });
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const RADIUS = 28;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    if (bgRef.current) spawnBackground(bgRef.current);

    const timer = setTimeout(() => {
      startTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tick(now: number) {
    if (!startTimeRef.current) return;
    const elapsed = now - startTimeRef.current;
    const linear = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - linear, 2);
    const value = eased * 100;
    setProgress(value);
    springProgress.set(value);
    
    if (value < 100) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setProgress(100);
      springProgress.set(100);
      setTimeout(onComplete || (() => {}), 1000);
    }
  }

  function spawnBackground(container: HTMLDivElement) {
    // 30 glowing particles (optimized)
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 2 + 0.5;
      Object.assign(p.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: "#FF9F43",
        borderRadius: "50%",
        boxShadow: "0 0 5px #FF9F43",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100 + 100}%`,
        animation: `dw-float-particle ${Math.random() * 15 + 10}s linear infinite`,
        animationDelay: `${Math.random() * 15}s`,
        opacity: String(Math.random() * 0.3),
        pointerEvents: "none",
      });
      container.appendChild(p);
    }

    // Floating data streams (bits)
    for (let i = 0; i < 8; i++) {
      const stream = document.createElement("div");
      Object.assign(stream.style, {
        position: "absolute",
        fontFamily: "monospace",
        fontSize: "6px",
        color: "rgba(255, 159, 67, 0.1)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        left: `${Math.random() * 100}%`,
        top: "0",
        writingMode: "vertical-rl",
        animation: `dw-data-fall ${Math.random() * 20 + 20}s linear infinite`,
        animationDelay: `${Math.random() * 10}s`,
      });
      stream.innerText = Array.from({length: 40}, () => Math.round(Math.random())).join("");
      container.appendChild(stream);
    }

    // Clinical data mesh nodes
    const nodeCount = 15;
    const nodes: { x: number; y: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      nodes.push({ x, y });

      const node = document.createElement("div");
      Object.assign(node.style, {
        position: "absolute",
        width: "2px",
        height: "2px",
        background: "#FF9F43",
        borderRadius: "50%",
        left: `${x}%`,
        top: `${y}%`,
        animation: "dw-node-pulse 6s infinite ease-in-out",
        animationDelay: `${Math.random() * 6}s`,
        opacity: "0.2",
      });
      container.appendChild(node);
    }

    nodes.forEach((node, index) => {
      nodes
        .map((other, i) => ({ index: i, dist: Math.hypot(node.x - other.x, node.y - other.y) }))
        .filter((c) => c.index !== index && c.dist < 20)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2)
        .forEach((conn) => {
          const target = nodes[conn.index];
          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          const line = document.createElement("div");
          Object.assign(line.style, {
            position: "absolute",
            background: "linear-gradient(90deg, transparent, rgba(255,159,67,0.1), transparent)",
            height: "0.5px",
            width: `${length}vw`,
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "left center",
            opacity: "0.1",
          });
          container.appendChild(line);
        });
    });
  }

  const arcOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <>
      <style>{`
        @keyframes dw-float-particle {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(40px); opacity: 0; }
        }
        @keyframes dw-data-fall {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes dw-rotate-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dw-rotate-reverse {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes dw-node-pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50%      { transform: scale(1.5); opacity: 0.3; }
        }
        @keyframes dw-scan-line {
          0%   { transform: translateY(-100%); opacity: 0; }
          50%  { opacity: 0.05; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes dw-holo-rotate {
          0%   { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(360deg); }
        }
        @keyframes dw-status-ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes dw-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes dw-pulse-ring {
          0%   { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          50%  { opacity: 0.05; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .dw-segmented-ring {
          stroke-dasharray: 8 16;
          animation: dw-rotate-slow 20s linear infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        .dw-dot-reverse {
          animation: dw-rotate-reverse 15s linear infinite;
          transform-origin: 50px 50px;
        }
        .dw-scan-line-el {
          animation: dw-scan-line 8s linear infinite;
        }
        .dw-status-ping {
          animation: dw-status-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .dw-pulse-ring {
          animation: dw-pulse-ring 10s ease-out infinite;
        }
        .dw-glass {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 159, 67, 0.1);
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .dw-glow-text {
          text-shadow: 0 0 20px rgba(255, 159, 67, 0.3);
        }
        .dw-data-mesh {
          background-image:
            radial-gradient(circle at 50% 50%, rgba(255,159,67,0.06) 0%, transparent 70%),
            linear-gradient(rgba(255,159,67,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,159,67,0.04) 1px, transparent 1px);
          background-size: 100% 100%, 80px 80px, 80px 80px;
        }
        .dw-holo-shape {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 360px;
          height: 420px;
          border: 1px solid rgba(255, 159, 67, 0.3);
          border-radius: 40% 40% 30% 30% / 20% 20% 80% 80%;
          transform-style: preserve-3d;
          animation: dw-holo-rotate 35s linear infinite;
        }
        .dw-shield {
          background: radial-gradient(circle, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.4) 60%, rgba(15,15,15,0.6) 100%);
          backdrop-filter: blur(1px);
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #FF9F43 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: dw-shimmer 4s linear infinite;
        }
        .hud-border {
          border: 1px solid rgba(255, 159, 67, 0.3);
        }
      `}</style>

      {/* Root fullscreen overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden bg-[#0d0d0d] text-[#fff]"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {/* ── Background canvas ── */}
        <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 dw-data-mesh opacity-90" />

          {/* Concentric scanning rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[900px] md:h-[900px] border border-orange-500/25 rounded-full dw-pulse-ring" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] border border-orange-500/15 rounded-full dw-pulse-ring animation-delay-[-2s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] border border-orange-500/15 rounded-full dw-pulse-ring animation-delay-[-5s]" />

          {/* Scan line sweep */}
          <div
            className="dw-scan-line-el absolute top-0 left-0 w-full h-full"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(255,159,67,0.08), transparent)" }}
          />

          {/* Holographic molar wireframe */}
          <div
            className="hidden sm:block"
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: 500, height: 500,
              perspective: 1500,
              opacity: 0.3,
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className="dw-holo-shape">
              <div style={{
                position: "absolute", inset: "-40px",
                border: "1px solid rgba(255,159,67,0.2)",
                borderRadius: "50%",
                transform: "rotateX(90deg)",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                border: "1px solid rgba(255,159,67,0.25)",
                borderRadius: "50%",
                transform: "scale(0.85) rotate(45deg)",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                border: "1px solid rgba(255,159,67,0.15)",
                borderRadius: "50%",
                transform: "scale(1.15) rotate(-15deg)",
              }} />
            </div>
          </div>

          {/* Ambient glows */}
          <div
            className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full mix-blend-screen"
            style={{ background: "radial-gradient(circle, rgba(255,159,67,0.1) 0%, transparent 70%)", filter: "blur(70px)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full mix-blend-screen"
            style={{ background: "radial-gradient(circle, rgba(255,159,67,0.08) 0%, transparent 70%)", filter: "blur(90px)" }}
          />
        </div>

        {/* ── HUD Corner Elements ── */}
        <div className="fixed inset-0 z-20 pointer-events-none opacity-80 p-4 md:p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1 md:w-1.5 h-3 md:h-4 bg-orange-500/50" />
                <span className="text-[10px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.4em] text-white/80">SYS_V4</span>
              </div>
              <span className="text-[8px] md:text-[10px] font-mono text-orange-500/50 uppercase">Sync_Active</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.4em] text-white/80">DENT_WISE</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i} 
                    animate={{ opacity: [0.4, 1, 0.4] }} 
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-orange-500/70 rounded-full shadow-[0_0_5px_rgba(255,159,67,0.5)]" 
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end text-[8px] md:text-[9px] font-mono tracking-[0.2em] md:tracking-[0.3em] text-orange-500/40">
            <div className="flex flex-col gap-1 uppercase">
              <span className="hidden sm:block">Latitude: 34.0522° N</span>
              <span className="hidden sm:block">Longitude: 118.2437° W</span>
              <span className="text-[7px] md:text-[8px] text-white/30 lowercase">dw_secure_mirror</span>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="hidden sm:block">ENCRYPT_STRENGTH: 4096B</span>
              <span>HIPAA_V2_HTTPS</span>
              <span className="hud-border px-2 md:px-3 py-1 mt-1 md:mt-2 text-white/60 border-orange-500/30">OK</span>
            </div>
          </div>
        </div>

        {/* Legibility shield */}
        <div className="fixed inset-0 pointer-events-none dw-shield" style={{ zIndex: 5 }} />

        {/* ── Main content ── */}
        <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ zIndex: 10 }}>

          {/* Brand */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center mb-8 md:mb-10 text-center"
          >
            <h1
              className="font-bold text-5xl md:text-8xl tracking-tighter mb-4 md:mb-6 dw-glow-text"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Dent<span className="shimmer-text">Wise</span>
            </h1>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full dw-glass"
            >
              <div className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="dw-status-ping absolute inline-flex h-full w-full rounded-full" style={{ background: "#FF9F43", opacity: 0.75 }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2" style={{ background: "#FF9F43" }} />
              </div>
              <span className="text-[9px] md:text-[10px] uppercase font-bold" style={{ letterSpacing: "0.3em md:0.5em", color: "rgba(255,255,255,0.8)" }}>
                AI clinical active
              </span>
            </motion.div>
          </motion.div>

          {/* Progress rings + counter */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative flex items-center justify-center mb-10 md:mb-14"
          >
            <svg className="absolute w-[260px] h-[260px] md:w-[420px] md:h-[420px]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeOpacity={0.08} strokeWidth="0.2" />
              <circle className="dw-segmented-ring" cx="50" cy="50" r="32" fill="none" stroke="#FF9F43" strokeWidth="0.6" strokeDasharray="8 16" opacity={0.3} />
              <circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeOpacity={0.15} strokeWidth="0.1" />
              
              <motion.circle
                cx="50" cy="50" r="28"
                fill="none" stroke="#FF9F43"
                strokeWidth="3" strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                animate={{ strokeDashoffset: arcOffset }}
                transition={{ type: "spring", stiffness: 30, damping: 10 }}
                style={{ 
                  filter: "drop-shadow(0 0 10px rgba(255,159,67,0.7))" 
                }}
                transform="rotate(-90 50 50)"
              />
              <g className="dw-dot-reverse">
                <circle cx="50" cy="22" r="1.8" fill="#FF9F43" style={{ filter: "drop-shadow(0 0 8px #FF9F43)" }} />
              </g>
            </svg>

            {/* Number counter */}
            <div className="relative text-center flex flex-col items-center">
              <div className="flex items-baseline">
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-light leading-none dw-glow-text tracking-tighter"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(70px, 16vw, 150px)" }}
                >
                  {Math.floor(progress)}
                </motion.span>
                <span className="text-orange-500/60 font-light ml-2" style={{ fontSize: "clamp(20px, 6vw, 40px)" }}>
                  %
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={progress > 90 ? "4" : progress > 60 ? "3" : progress > 30 ? "2" : "1"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.5 }}
                  className="text-[9px] md:text-[11px] uppercase font-bold mt-2 text-white/70"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.3em md:0.6em" }}
                >
                  {progress > 90 ? "SUCCESS" : progress > 60 ? "NEURAL_SYNC" : progress > 30 ? "ANALYZING" : "INITIALIZING"}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bento phase cards */}
          <div className="w-full max-w-sm md:max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 px-2">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 md:p-5 rounded-2xl dw-glass"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-[8px] md:text-[10px] uppercase font-bold opacity-60 tracking-wider">
                  Protocol_V3
                </p>
                <div className="w-2 h-2 rounded-full dw-status-ping" style={{ background: "rgba(255,159,67,0.6)" }} />
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl md:text-2xl" style={{ color: "#FF9F43", fontVariationSettings: "'FILL' 1" }}>
                  clinical_notes
                </span>
                <p className="text-xs md:text-sm font-bold tracking-tight text-white uppercase" style={{ letterSpacing: "0.1em" }}>Volumetric Analysis</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-4 md:p-5 rounded-2xl dw-glass"
            >
              <p className="text-[8px] md:text-[10px] uppercase font-bold mb-2 opacity-60 tracking-wider">
                Neural_Sync
              </p>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl md:text-2xl animate-pulse" style={{ color: "#FF9F43" }}>
                  dentistry
                </span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1 text-[9px] font-bold text-orange-500/80">
                    <span className="uppercase">Pathology</span>
                    <span>{Math.floor(progress)}%</span>
                  </div>
                  <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${progress}%` }}
                      style={{ background: "#FF9F43", boxShadow: "0 0 10px rgba(255,159,67,0.7)" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 md:mt-12 text-center w-full px-4"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-6 md:h-8 mb-2" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,159,67,0.6))" }} />
              <p className="text-[8px] md:text-[10px] max-w-xs mx-auto leading-relaxed uppercase font-bold opacity-40 tracking-[0.4em]">
                Initializing System
              </p>
            </div>
          </motion.div>
        </main>

        {/* Vignette */}
        <div className="fixed inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.6)", zIndex: 20 }} />
      </motion.div>
    </>
  );
}