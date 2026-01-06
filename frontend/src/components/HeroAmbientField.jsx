import React from 'react';
import { motion } from 'framer-motion';

const HeroAmbientField = () => {
  // WorkVillage color palette
  const colors = [
    '#9E005C', // Primary brand
    '#FF4D94', // Accent pink
    '#6D28D9', // Purple
    '#A855F7'  // Light purple
  ];

  // Generate 8 ambient orbs with random properties
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: Math.random() * 100, // Random horizontal position (0-100%)
    y: Math.random() * 100, // Random vertical position (0-100%)
    size: 60 + Math.random() * 60, // Size between 60-120px
    opacity: 0.12 + Math.random() * 0.13, // Opacity between 0.12-0.25
    blur: 40 + Math.random() * 40, // Blur between 40-80px
    duration: 8 + Math.random() * 8, // Duration between 8-16s
    delay: Math.random() * 2 // Random delay up to 2s
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Ambient orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            backgroundColor: orb.color,
            opacity: orb.opacity,
            filter: `blur(${orb.blur}px)`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            x: [-12, 12, -12], // X drift ±12px
            y: [-20, 20, -20], // Y drift ±20px
            scale: [1, 1.05, 1] // Breathing scale
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay
          }}
        />
      ))}

      {/* Optional subtle connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        {/* Very subtle connection hints */}
        <motion.line
          x1="20%"
          y1="30%"
          x2="80%"
          y2="40%"
          stroke="#9E005C"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.line
          x1="15%"
          y1="70%"
          x2="85%"
          y2="60%"
          stroke="#FF4D94"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </svg>
    </div>
  );
};

export default HeroAmbientField;


