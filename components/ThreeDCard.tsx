import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className = "", onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for rotation
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Calculate rotation based on mouse position
  // Rotate X depends on Y position (up/down), Rotate Y depends on X position (left/right)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate normalized position (-0.5 to 0.5)
    // 0 is center, -0.5 is left/top, 0.5 is right/bottom
    const width = rect.width;
    const height = rect.height;
    
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative transition-shadow duration-300 ease-out"
      >
        {children}
        
        {/* Dynamic Glare Effect */}
        <motion.div 
           style={{
             x: useTransform(mouseX, [-0.5, 0.5], ["-100%", "100%"]),
             y: useTransform(mouseY, [-0.5, 0.5], ["-100%", "100%"]),
             background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)",
             opacity: useTransform(mouseX, (latest) => Math.abs(latest) * 2), // Only show when tilted
           }}
           className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay"
        />
      </motion.div>
    </motion.div>
  );
};