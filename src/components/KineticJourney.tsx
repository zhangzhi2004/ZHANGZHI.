import React from 'react';
import { motion } from 'framer-motion';

export const KineticJourney: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C07B" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#A68445" />
          </linearGradient>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Glow */}
        <motion.circle
          cx="100"
          cy="100"
          r="60"
          fill="url(#coreGlow)"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Outer Ring - Rotating */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          {[0, 90, 180, 270].map((angle) => (
            <circle
              key={angle}
              cx={100 + 80 * Math.cos((angle * Math.PI) / 180)}
              cy={100 + 80 * Math.sin((angle * Math.PI) / 180)}
              r="2"
              fill="#C5A059"
            />
          ))}
        </motion.g>

        {/* Middle Ring - Counter Rotating */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#C5A059"
            strokeWidth="1"
            strokeDasharray="1 10"
            opacity="0.3"
          />
          
          {/* Subtle Mechanical Gear Teeth */}
          {[...Array(24)].map((_, i) => (
            <rect
              key={i}
              x="98"
              y="35"
              width="4"
              height="8"
              fill="#C5A059"
              opacity="0.2"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}
        </motion.g>

        {/* The "Physical" Compass Base */}
        <motion.g
          filter="url(#dropShadow)"
          animate={{
            y: [0, -5, 0],
            rotateX: [0, 10, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "100px", originY: "100px", perspective: "1000px" }}
        >
          {/* Main Body */}
          <circle cx="100" cy="100" r="40" fill="white" stroke="#F3F4F6" strokeWidth="1" />
          <circle cx="100" cy="100" r="35" fill="none" stroke="url(#metalGradient)" strokeWidth="2" opacity="0.8" />
          
          {/* Glass Reflection */}
          <defs>
            <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="40%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="38" fill="url(#glassReflect)" pointerEvents="none" />
          
          {/* Compass Markings */}
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="65"
              x2="100"
              y2="70"
              stroke="#D1D5DB"
              strokeWidth="1"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}

          {/* Floating Needle */}
          <motion.g
            animate={{
              rotate: [0, 45, -30, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "100px", originY: "100px" }}
          >
            {/* Needle Shadow */}
            <path
              d="M100 60 L105 100 L100 140 L95 100 Z"
              fill="rgba(0,0,0,0.1)"
              transform="translate(2, 2)"
            />
            {/* North Half */}
            <path d="M100 60 L108 100 L100 100 Z" fill="#C5A059" />
            <path d="M100 60 L92 100 L100 100 Z" fill="#A68445" />
            {/* South Half */}
            <path d="M100 140 L108 100 L100 100 Z" fill="#4B5563" />
            <path d="M100 140 L92 100 L100 100 Z" fill="#1F2937" />
            
            {/* Center Pin */}
            <circle cx="100" cy="100" r="4" fill="url(#metalGradient)" />
            <circle cx="100" cy="100" r="1.5" fill="white" opacity="0.5" />
          </motion.g>
        </motion.g>

        {/* Floating Puzzle Piece - Thematic Link */}
        <motion.g
          initial={{ x: 140, y: 140, opacity: 0, rotate: 15 }}
          animate={{ 
            x: [140, 135, 140], 
            y: [140, 145, 140], 
            opacity: 0.6,
            rotate: [15, 20, 15]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <path 
            d="M0 0 H15 V15 H0 Z" 
            fill="#C5A059" 
            opacity="0.4"
            transform="translate(10, 10)"
          />
          <path 
            d="M0 0 H15 V15 H0 Z" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="0.5"
            transform="translate(10, 10)"
          />
        </motion.g>

        {/* Floating Particles around */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            r={1 + Math.random() * 2}
            fill="#C5A059"
            initial={{
              x: 100 + (Math.random() - 0.5) * 160,
              y: 100 + (Math.random() - 0.5) * 160,
              opacity: 0,
            }}
            animate={{
              y: [null, "-=20", null],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};
