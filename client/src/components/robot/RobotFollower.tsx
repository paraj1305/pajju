import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const RobotFollower: React.FC = () => {
  const [isIdle, setIsIdle] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [expression, setExpression] = useState<'happy' | 'blink' | 'neutral'>('neutral');
  
  // Mouse position state - start at center
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Smooth springs for easing - slightly snappier for "cute" movement
  const springConfig = { damping: 20, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsIdle(false);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 1500);
    };

    // Random blinking
    const blinkInterval = setInterval(() => {
      setExpression('blink');
      setTimeout(() => setExpression('neutral'), 150);
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
      clearTimeout(timeout);
    };
  }, [mouseX, mouseY]);

  const handleClick = () => {
    setIsClicked(true);
    setExpression('happy');
    setTimeout(() => {
      setIsClicked(false);
      setExpression('neutral');
    }, 1000);
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
        zIndex: 9999, // Ensure it's above everything
        pointerEvents: 'none',
      }}
      className="flex items-center justify-center"
    >
      <motion.div
        animate={isIdle ? {
          y: [0, -15, 0],
          rotate: [0, 2, -2, 0],
          transition: { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        } : {
          rotate: (smoothX.get() - mouseX.get()) * 0.1 // Slight tilt based on velocity
        }}
        style={{ pointerEvents: 'auto' }}
        onClick={handleClick}
        className="relative cursor-pointer"
      >
        {/* Soft Glow */}
        <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full scale-150 animate-pulse" />
        
        {/* Click Effect */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-cyan-400/30 rounded-full"
            />
          )}
        </AnimatePresence>

        {/* Cute Cartoon Robot SVG */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Body/Head - Rounded Square */}
          <rect x="20" y="25" width="60" height="55" rx="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          <path d="M20 45C20 33.9543 28.9543 25 40 25H60C71.0457 25 80 33.9543 80 45V60C80 71.0457 71.0457 80 60 80H40C28.9543 80 20 71.0457 20 60V45Z" fill="white" />
          
          {/* Face Display */}
          <rect x="30" y="38" width="40" height="25" rx="8" fill="#1e293b" />
          
          {/* Eyes */}
          {expression === 'blink' ? (
            <>
              <rect x="38" y="48" width="8" height="2" rx="1" fill="#38bdf8" />
              <rect x="54" y="48" width="8" height="2" rx="1" fill="#38bdf8" />
            </>
          ) : expression === 'happy' ? (
            <>
              <path d="M38 52C38 50 40 48 42 48C44 48 46 50 46 52" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <path d="M54 52C54 50 56 48 58 48C60 48 62 50 62 52" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="42" cy="50" r="3.5" fill="#38bdf8">
                <animate attributeName="r" values="3.5;4;3.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="58" cy="50" r="3.5" fill="#38bdf8">
                <animate attributeName="r" values="3.5;4;3.5" dur="3s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Antennas */}
          <circle cx="50" cy="18" r="4" fill="#38bdf8" />
          <line x1="50" y1="25" x2="50" y2="18" stroke="#cbd5e1" strokeWidth="3" />
          
          {/* Cheeks (Appear when happy) */}
          {expression === 'happy' && (
            <>
              <circle cx="35" cy="58" r="3" fill="#fb7185" fillOpacity="0.4" />
              <circle cx="65" cy="58" r="3" fill="#fb7185" fillOpacity="0.4" />
            </>
          )}

          {/* Floating Feet */}
          <motion.rect 
            x="35" y="82" width="10" height="4" rx="2" fill="#cbd5e1" 
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.rect 
            x="55" y="82" width="10" height="4" rx="2" fill="#cbd5e1"
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default RobotFollower;
