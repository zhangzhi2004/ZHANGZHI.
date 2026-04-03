import React from 'react';
import { motion } from 'framer-motion';

export const PuzzleAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Background Glow */}
        <motion.circle
          cx="75"
          cy="75"
          r="20"
          fill="rgba(197, 160, 89, 0.15)"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Piece 1: Top Left */}
        <path 
          d="M20 20 H45 C48 20 48 25 50 25 C52 25 52 20 55 20 H80 V45 C80 48 75 48 75 50 C75 52 80 52 80 55 V80 H55 C52 80 52 75 50 75 C48 75 48 80 45 80 H20 V55 C20 52 25 52 25 50 C25 48 20 48 20 45 Z" 
          fill="none" 
          stroke="#e5e7eb" 
          strokeWidth="1"
          className="opacity-20"
        />

        {/* Static Pieces (Simplified for elegant look) */}
        {/* Top Left */}
        <path d="M20 20 H48 V48 H20 Z" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />
        {/* Top Right */}
        <path d="M52 20 H80 V48 H52 Z" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />
        {/* Bottom Left */}
        <path d="M20 52 H48 V80 H20 Z" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />

        {/* The "Missing" Piece - Bottom Right */}
        <motion.g
          initial={{ x: 30, y: 30, opacity: 0, rotate: 10, scale: 0.8 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: [0.16, 1, 0.3, 1],
            repeatDelay: 1.5
          }}
        >
          {/* Piece Shape */}
          <path 
            d="M52 52 H80 V80 H52 Z" 
            fill="#c5a059" 
            className="drop-shadow-md"
          />
          {/* Inner Detail */}
          <path 
            d="M60 60 L72 72 M72 60 L60 72" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="1" 
            strokeLinecap="round" 
          />
          
          {/* Sparkle effect when fitting */}
          <motion.circle
            cx="66"
            cy="66"
            r="2"
            fill="white"
            animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3, delay: 2 }}
          />
        </motion.g>

        {/* Connecting Lines (Subtle) */}
        <line x1="50" y1="20" x2="50" y2="80" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};
