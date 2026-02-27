import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const RobotFollower: React.FC = () => {
  const [isIdle, setIsIdle] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  
  // Mouse position state
  const mouseX = useMotionValue(window.innerWidth - 100);
  const mouseY = useMotionValue(window.innerHeight / 2);

  // Smooth springs for easing
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Constraints: Stay on the right side of the screen (right 40%)
      const minX = window.innerWidth * 0.6;
      const targetX = Math.max(minX, e.clientX);
      
      mouseX.set(targetX);
      mouseY.set(e.clientY);
      setIsIdle(false);
    };

    const idleTimer = setInterval(() => {
      setIsIdle(true);
    }, 2000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(idleTimer);
    };
  }, [mouseX, mouseY]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

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
        zIndex: 50,
        pointerEvents: 'none', // Don't block content
      }}
      className="flex items-center justify-center"
    >
      <motion.div
        animate={isIdle ? {
          y: [0, -10, 0],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        } : {}}
        style={{ pointerEvents: 'auto' }} // Allow clicking the robot itself
        onClick={handleClick}
        className="relative cursor-pointer group"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
        
        {/* Click Pulse */}
        {isClicked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 border-2 border-primary rounded-full"
          />
        )}

        {/* Robot Body - Minimalist Tech Design */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Head/Body Unit */}
          <rect x="25" y="25" width="50" height="50" rx="12" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
          
          {/* Eye Visor */}
          <rect x="35" y="40" width="30" height="8" rx="4" fill="#000" />
          
          {/* Glowing Eyes */}
          <motion.rect
            x="40" y="43" width="20" height="2" rx="1"
            fill="hsl(var(--primary))"
            animate={{
              opacity: [0.5, 1, 0.5],
              boxShadow: ["0 0 5px var(--primary)", "0 0 15px var(--primary)", "0 0 5px var(--primary)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Side Details/Antennas */}
          <path d="M25 40L20 35M75 40L80 35" stroke="#444" strokeWidth="2" strokeLinecap="round" />
          
          {/* Floating Base Detail */}
          <motion.path
            d="M40 85C40 85 45 90 50 90C55 90 60 85 60 85"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default RobotFollower;
