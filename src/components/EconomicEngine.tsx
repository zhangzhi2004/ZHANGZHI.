import React from 'react';
import { motion } from 'framer-motion';

export const EconomicEngine: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="engineGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>

          <filter id="engineShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="2" dy="6" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Glow */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill="url(#engineGlow)"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Outer Mechanical Ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="0.5"
            strokeDasharray="2 10"
          />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <circle cx="100" cy="15" r="3" fill="#C5A059" opacity="0.6" />
              <line x1="100" y1="15" x2="100" y2="25" stroke="#C5A059" strokeWidth="0.5" opacity="0.4" />
            </g>
          ))}
        </motion.g>

        {/* Middle Gear Ring */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="65"
            fill="none"
            stroke="#C5A059"
            strokeWidth="1"
            strokeDasharray="20 10"
            opacity="0.2"
          />
          {/* Gear Teeth */}
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x="97"
              y="32"
              width="6"
              height="6"
              fill="#C5A059"
              opacity="0.3"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </motion.g>

        {/* The "Value Core" - Central Physical Entity */}
        <motion.g
          filter="url(#engineShadow)"
          animate={{
            y: [0, -8, 0],
            rotateY: [0, 15, 0],
            rotateX: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "100px", originY: "100px", perspective: "1000px" }}
        >
          {/* Main Metallic Body */}
          <rect
            x="75"
            y="75"
            width="50"
            height="50"
            rx="12"
            fill="white"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          <rect
            x="80"
            y="80"
            width="40"
            height="40"
            rx="8"
            fill="none"
            stroke="url(#goldMetal)"
            strokeWidth="2.5"
          />
          
          {/* Internal Pulsing Core */}
          <motion.circle
            cx="100"
            cy="100"
            r="12"
            fill="url(#goldMetal)"
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Cross-hair details */}
          <line x1="100" y1="85" x2="100" y2="115" stroke="#C5A059" strokeWidth="0.5" opacity="0.3" />
          <line x1="85" y1="100" x2="115" y2="100" stroke="#C5A059" strokeWidth="0.5" opacity="0.3" />
          
          {/* Corner Bolts */}
          {[78, 122].map(x => [78, 122].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#D1D5DB" />
          )))}
        </motion.g>

        {/* Floating Data Nodes - Connected to Core */}
        {[0, 120, 240].map((angle, i) => (
          <motion.g
            key={angle}
            animate={{
              rotate: [angle, angle + 360],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <motion.g
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <line 
                x1="100" y1="100" 
                x2={100 + 110 * Math.cos(0)} 
                y2={100 + 110 * Math.sin(0)} 
                stroke="#C5A059" 
                strokeWidth="0.5" 
                strokeDasharray="4 4"
                opacity="0.2"
              />
              <circle 
                cx={100 + 110 * Math.cos(0)} 
                cy={100 + 110 * Math.sin(0)} 
                r="4" 
                fill="white" 
                stroke="#C5A059" 
                strokeWidth="1.5" 
              />
              <circle 
                cx={100 + 110 * Math.cos(0)} 
                cy={100 + 110 * Math.sin(0)} 
                r="1.5" 
                fill="#C5A059" 
              />
            </motion.g>
          </motion.g>
        ))}

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            r={1 + Math.random() * 1.5}
            fill="#C5A059"
            initial={{
              x: 100 + (Math.random() - 0.5) * 180,
              y: 100 + (Math.random() - 0.5) * 180,
              opacity: 0,
            }}
            animate={{
              y: [null, "-=30", null],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
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
