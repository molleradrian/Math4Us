import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function PhaseTransitionVisual() {
  const [points, setPoints] = useState<{ s: number; c: number; id: number }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState({ s: 0.8, c: 1.2 });

  useEffect(() => {
    // Initial stochastic noise points
    const initialPoints = Array.from({ length: 40 }).map((_, i) => ({
      s: 50 + (Math.random() - 0.5) * 40,
      c: 50 + (Math.random() - 0.5) * 40,
      id: i,
    }));
    setPoints(initialPoints);
  }, []);

  const triggerTransition = () => {
    setIsTransitioning(true);
    setCurrentMetrics({ s: 0.5, c: 1.618 }); // Fibonacci Threshold
    
    setPoints(prev => prev.map(p => ({
      ...p,
      // Spiral toward the Omega Point (50, 50 in view space)
      s: 50 + (Math.random() - 0.5) * 5,
      c: 50 + (Math.random() - 0.5) * 5,
    })));
    
    setTimeout(() => setIsTransitioning(false), 3000);
  };

  const simulatePerturbation = () => {
    setCurrentMetrics(prev => ({ 
      s: prev.s + 0.1, 
      c: prev.c - 0.1 
    }));
    
    setPoints(prev => prev.map(p => ({
      ...p,
      s: p.s + (Math.random() - 0.5) * 30,
      c: p.c + (Math.random() - 0.5) * 30,
    })));
    
    setTimeout(() => {
      setPoints(prev => prev.map(p => ({
        ...p,
        s: 50 + (Math.random() - 0.5) * 10,
        c: 50 + (Math.random() - 0.5) * 10,
      })));
      setCurrentMetrics({ s: 0.8, c: 1.2 });
    }, 1500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] rounded-xl border border-[#2A2A2A] group">
      {/* 2D Coordinate Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full border-t border-b border-[#C5A059] flex divide-x divide-[#C5A059]">
          {Array.from({ length: 10 }).map((_, i) => <div key={i} className="flex-1" />)}
        </div>
      </div>

      <svg className="w-full h-full p-8" viewBox="0 0 100 100">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Phase Tracks */}
        <motion.path
          d="M 10 90 L 90 10"
          stroke="#C5A059"
          strokeWidth="0.1"
          strokeDasharray="2 2"
          opacity="0.2"
        />

        {/* The Point Cloud (Stochastic Resonance) */}
        {points.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.s}
            cy={p.c}
            r={isTransitioning ? 0.5 : 0.8}
            fill={isTransitioning ? "#F5F2ED" : "#C5A059"}
            opacity={isTransitioning ? 0.8 : 0.3}
            animate={{ 
              cx: p.s, 
              cy: p.c,
              opacity: isTransitioning ? [0.3, 1, 0.3] : 0.3 
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            filter="url(#glow)"
          />
        ))}

        {/* The Attractor (Omega Point) */}
        <motion.circle
          cx="50"
          cy="50"
          r="2"
          fill="none"
          stroke="#C5A059"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 1 : 0.2, scale: isTransitioning ? [1, 1.5, 1] : 1 }}
        />
      </svg>

      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-sans text-white/40">S̃ (Entropy)</span>
          <span className="text-[10px] font-mono text-[#C5A059]">{currentMetrics.s.toFixed(3)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-sans text-white/40">C (Clustering)</span>
          <span className="text-[10px] font-mono text-[#C5A059]">{currentMetrics.c.toFixed(3)}</span>
        </div>
      </div>

      <div className="absolute bottom-6 w-full px-6 flex justify-between items-center bg-[#0D0D0D]/80 backdrop-blur-sm pt-4 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[8px] font-sans uppercase tracking-widest text-[#C5A059]">Manifold State</span>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-light">
            {isTransitioning ? "PHASE LOCK ENGAGED" : "RESONANCE DRIFT"}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={simulatePerturbation}
            disabled={isTransitioning}
            className="px-4 py-2 border border-[#2A2A2A] text-[#E0D7D0] text-[9px] uppercase tracking-widest hover:border-[#C5A059] transition-all disabled:opacity-30 rounded-sm font-bold opacity-60 hover:opacity-100"
          >
            Perturb
          </button>
          <button 
            onClick={triggerTransition}
            disabled={isTransitioning}
            className="px-4 py-2 border border-[#C5A059] text-[#C5A059] text-[9px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#0F0F0F] transition-all disabled:opacity-30 rounded-sm font-bold shadow-[0_0_15px_rgba(197,160,89,0.1)]"
          >
            Phase Flip
          </button>
        </div>
      </div>
    </div>
  );
}

