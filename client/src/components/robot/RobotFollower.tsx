import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const RobotFollower: React.FC = () => {
  const [isIdle, setIsIdle] = useState(true);
  
  // Target position (offset from cursor)
  const targetX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 + 100 : 100);
  const targetY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 - 100 : -100);

  // Smooth springs for high-quality floating movement
  const springConfig = { damping: 35, stiffness: 80 };
  const smoothX = useSpring(targetX, springConfig);
  const smoothY = useSpring(targetY, springConfig);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by 80px to the right and 80px up to avoid blocking clicks
      targetX.set(e.clientX + 80);
      targetY.set(e.clientY - 80);
      
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [targetX, targetY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 40, 
        pointerEvents: 'none', 
      }}
    >
      <motion.div
        animate={isIdle ? {
          y: [0, -12, 0],
          rotate: [0, 1.5, -1.5, 0],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        } : {
          rotate: (smoothX.get() - targetX.get()) * 0.04
        }}
        className="relative"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20">
            <motion.div 
              className="w-full h-full relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-600/40 blur-[1px]" />
              <div className="absolute top-0 left-1/2 w-[2px] h-full bg-zinc-600/40 blur-[1px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-800 rounded-full border border-zinc-700" />
            </motion.div>
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-zinc-700" />
          <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_20px_rgba(25,230,189,0.2)]">
            <defs>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3f3f46" />
                <stop offset="50%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M30 30 L70 30 L85 50 L70 80 L30 80 L15 50 Z" fill="url(#metalGrad)" stroke="#52525b" strokeWidth="1.5" />
            <path d="M25 45 L75 45" stroke="#27272a" strokeWidth="1" />
            <path d="M35 30 L35 80" stroke="#27272a" strokeWidth="0.5" />
            <path d="M65 30 L65 80" stroke="#27272a" strokeWidth="0.5" />
            <circle cx="50" cy="55" r="18" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="50" cy="55" r="10" fill="#134e4a" />
            <circle cx="50" cy="55" r="6" fill="#14b8a6" filter="url(#glow)">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="54" cy="51" r="2.5" fill="white" fillOpacity="0.4" />
            <circle cx="25" cy="40" r="1.5" fill="#14b8a6" opacity="0.8" />
            <circle cx="75" cy="40" r="1.5" fill="#14b8a6" opacity="0.8" />
          </svg>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-teal-500/30 blur-sm rounded-full animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RobotFollower;
