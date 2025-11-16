import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_IMAGES } from '../constants';
import { ThreeDCard } from './ThreeDCard';
import { ArrowRight, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const prevIndex = (currentIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;

  const handleScrollToCollection = () => {
    document.querySelector('#book-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <div className="w-full h-full flex flex-col md:flex-row">
        
        {/* Left Content */}
        <div className="w-full md:w-[45%] h-full flex flex-col justify-center md:justify-start px-8 md:px-24 relative z-20 bg-gradient-to-r from-black via-black/90 to-transparent pt-32 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-start h-full"
          >
            {/* Main Title */}
            <h1 className="text-6xl md:text-[8rem] font-bold leading-none text-white tracking-tighter select-none drop-shadow-2xl">
                Magelina
            </h1>
            
            {/* Bottom-anchored content */}
            <div className="mt-auto flex flex-col items-start w-full">
              {/* Tagline */}
              <div className="mb-6 w-full">
                <p className="text-brand-gold text-sm font-medium uppercase tracking-[0.3em] flex items-center gap-4">
                  Wealth &bull; Nature &bull; Harmony
                </p>
                <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-brand-gold/50 to-transparent"></div>
              </div>
              
              {/* Description */}
              <p className="text-gray-400 font-light mt-2 max-w-md leading-relaxed mb-10">
                Curated wisdom for those who seek to transform their mindset, connect with nature, and master the art of living.
              </p>
              
              {/* Statistics */}
              <div className="flex gap-8 md:gap-12 mb-10">
                <div>
                  <span className="block text-xl md:text-2xl font-semibold text-white">Lifetime</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Access</span>
                </div>
                <div>
                  <span className="block text-xl md:text-2xl font-semibold text-white flex items-center">4.9 <Star size={16} className="ml-1 text-brand-gold" fill="currentColor" /></span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Rating</span>
                </div>
                <div>
                  <span className="block text-xl md:text-2xl font-semibold text-white">15k+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Readers</span>
                </div>
              </div>

              {/* Button */}
              <button 
                onClick={handleScrollToCollection}
                className="bg-brand-brown text-white px-8 py-3 uppercase tracking-widest text-[10px] font-bold hover:bg-brand-gold transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_rgba(191,161,74,0.3)] hover:-translate-y-1 active:translate-y-0 active:shadow-sm w-fit flex items-center gap-2 group">
                Enter The Store
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Image - Full Bleed */}
        <div className="w-full md:w-[55%] h-full absolute md:relative inset-0 md:opacity-100 opacity-30 z-10 perspective-1000 overflow-hidden">
          <ThreeDCard className="w-full h-full relative flex items-center justify-center">
            <div className="absolute inset-0 shadow-2xl bg-black transform-style-3d">
              {/* Background/Previous Image (Past) */}
              <AnimatePresence>
                <motion.img
                  key={`bg-${prevIndex}`}
                  src={HERO_IMAGES[prevIndex]}
                  alt="Past Magelina Scene"
                  initial={{ opacity: 0.5, scale: 1.05, x: -50 }}
                  animate={{ opacity: 0.5, scale: 1.05, x: -50 }}
                  exit={{ opacity: 0, scale: 1.1, x: 0 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="w-full h-full object-cover absolute inset-0 filter blur-sm"
                />
              </AnimatePresence>
              
              {/* Foreground/Current Image (Present) */}
              <AnimatePresence>
                <motion.img
                  key={currentIndex}
                  src={HERO_IMAGES[currentIndex]}
                  alt="Current Magelina Scene"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              
              {/* Gradients */}
              <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black to-transparent z-20" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent opacity-80 z-20" />
            </div>
          </ThreeDCard>
        </div>
      </div>
    </section>
  );
};