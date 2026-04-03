
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  scrolled?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ scrolled = false, className = "" }) => {
  return (
    <motion.div 
      className={`relative flex items-center justify-center transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg 
        width="44" 
        height="44" 
        viewBox="0 0 44 44" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md cursor-pointer"
        onClick={() => console.log('Logo clicked!')}
      >
        {/* Outer Orbit Ring - Rotating with flowing dash */}
        <motion.circle 
          cx="22" 
          cy="22" 
          r="20" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="6 12"
          className="text-stone-300"
          animate={{ 
            rotate: 360,
            strokeDashoffset: [0, -48]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            strokeDashoffset: { duration: 5, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Inner Flowing Path */}
        <motion.path 
          d="M36 22C36 29.732 29.732 36 22 36C14.268 36 8 29.732 8 22C8 14.268 14.268 8 22 8" 
          stroke="#C5A059" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray="40 120"
          animate={{ 
            strokeDashoffset: [0, -160],
            stroke: ["#C5A059", "#E5C07B", "#C5A059"]
          }}
          transition={{ 
            strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" },
            stroke: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Stylized Z - Fluid Drawing */}
        <motion.path 
          d="M16 16H28L16 28H28" 
          stroke="#C5A059" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            stroke: ["#C5A059", "#1c1917", "#C5A059"]
          }}
          transition={{ 
            pathLength: { duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.5 },
            opacity: { duration: 2, delay: 0.5 },
            stroke: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        />
        
        {/* Quantum Dot - Orbiting smoothly */}
        <motion.circle 
          cx="22" 
          cy="22" 
          r="2.5" 
          fill="#C5A059"
          style={{ originX: "22px", originY: "22px" }}
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          initial={{ x: 20 }} // Offset from center to orbit
        />
      </svg>
      
      {/* Dynamic Background Glow */}
      <motion.div 
        className="absolute inset-0 bg-nobel-gold/15 blur-2xl rounded-full -z-10"
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};
