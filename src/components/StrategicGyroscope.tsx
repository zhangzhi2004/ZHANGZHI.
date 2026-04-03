import React from 'react';
import { motion } from 'framer-motion';

export const StrategicGyroscope: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#C5A059" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbit Ring - Vertical-ish */}
        <motion.ellipse
          cx="100"
          cy="100"
          rx="90"
          ry="30"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="0.75"
          strokeDasharray="10 5"
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        />

        {/* Middle Orbit Ring - Horizontal-ish */}
        <motion.ellipse
          cx="100"
          cy="100"
          rx="35"
          ry="85"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="1"
          strokeDasharray="5 15"
          opacity="0.4"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        />

        {/* Inner Core Housing */}
        <motion.g
          animate={{
            y: [0, -10, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "100px", originY: "100px" }}
        >
          {/* Main Sphere Glow */}
          <circle cx="100" cy="100" r="45" fill="url(#orbGlow)" opacity="0.6" />
          
          {/* The Physical Orb */}
          <circle 
            cx="100" 
            cy="100" 
            r="30" 
            fill="white" 
            stroke="#F3F4F6" 
            strokeWidth="0.5" 
            filter="url(#softGlow)"
          />
          
          {/* Internal Pulsing "Insight" Core */}
          <motion.circle
            cx="100"
            cy="100"
            r="18"
            fill="url(#ringGradient)"
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.7, 1, 0.7],
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Latitude/Longitude Lines (Simulated 3D Sphere) */}
          <ellipse cx="100" cy="100" rx="30" ry="8" fill="none" stroke="#C5A059" strokeWidth="0.25" opacity="0.3" />
          <ellipse cx="100" cy="100" rx="8" ry="30" fill="none" stroke="#C5A059" strokeWidth="0.25" opacity="0.3" />
        </motion.g>

        {/* Floating "Data Satellites" */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.g
            key={angle}
            animate={{
              rotate: [angle, angle + 360],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <motion.circle
              cx="100"
              cy="25"
              r="2.5"
              fill="white"
              stroke="#C5A059"
              strokeWidth="1"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
            {/* Connection Line to Core */}
            <line 
              x1="100" y1="30" 
              x2="100" y2="70" 
              stroke="#C5A059" 
              strokeWidth="0.5" 
              strokeDasharray="2 4" 
              opacity="0.15" 
            />
          </motion.g>
        ))}

        {/* Ambient Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            r={0.8 + Math.random()}
            fill="#C5A059"
            initial={{
              x: 100 + (Math.random() - 0.5) * 160,
              y: 100 + (Math.random() - 0.5) * 160,
              opacity: 0,
            }}
            animate={{
              y: [null, "-=40", null],
              opacity: [0, 0.4, 0],
              x: [null, (Math.random() > 0.5 ? "+=10" : "-=10"), null]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
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
