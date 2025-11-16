import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';

interface IconSectionProps {
  onProductSelect: (product: Product) => void;
}

const lifestyleImages = [
  'https://up6.cc/2025/10/176323124714041.jpg',
  'https://up6.cc/2025/10/176323124720882.jpg',
  'https://up6.cc/2025/10/176323124723233.jpg',
];

export const IconSection: React.FC<IconSectionProps> = ({ onProductSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % lifestyleImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  // Use "The Art of Handling Horses" as the Icon product
  const iconProduct = PRODUCTS.find(p => p.id === 'horses'); 

  if (!iconProduct) return null; // Guard clause in case the product isn't found

  return (
    <section className="flex flex-col md:flex-row h-auto md:h-screen border-b border-white/5">
      {/* Left: Lifestyle Image Slideshow - NOW 3D */}
      <ThreeDCard className="w-full md:w-1/2 h-96 md:h-full">
        <div className="w-full h-full relative overflow-hidden">
            {/* Decorative solid black line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#080808] z-30" />

            <AnimatePresence>
            <motion.img 
                key={currentIndex}
                src={lifestyleImages[currentIndex]} 
                alt="Lifestyle Scene" 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="w-full h-full object-cover absolute inset-0"
            />
            </AnimatePresence>
            
            {/* Seamless Blending Gradient */}
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#080808] via-[#080808]/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
        </div>
      </ThreeDCard>

      {/* Right: Product Detail */}
      <div className="w-full md:w-1/2 bg-[#080808] flex flex-col justify-center p-8 md:p-24 relative">
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-sm text-brand-gold font-bold uppercase tracking-[0.3em] mb-6">
                The Icon of Magelina
            </h2>
            <h3 className="text-3xl md:text-5xl text-white font-medium mb-8 leading-tight">
                {iconProduct.title}
            </h3>
            
            <div className="w-20 h-[1px] bg-white/20 mb-8"></div>

            <p className="text-gray-400 font-light leading-relaxed mb-10 text-base md:text-lg max-w-md">
                Blending modern equine science with mindful horsemanship, this guide reveals 
                how trust and communication create a bond that lasts a lifetime.
            </p>

            <div className="flex items-center gap-8">
                <ThreeDCard
                  onClick={() => onProductSelect(iconProduct)}
                  className="w-32 h-44 cursor-pointer"
                >
                  <img 
                      src={iconProduct.images[0]} 
                      alt={iconProduct.title} 
                      className="w-full h-full object-cover shadow-2xl border border-white/10"
                  />
                </ThreeDCard>
                <button 
                    onClick={() => onProductSelect(iconProduct)}
                    className="bg-white text-black px-8 py-4 flex items-center gap-3 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_rgba(191,161,74,0.3)] hover:-translate-y-1 active:translate-y-0 active:shadow-sm group"
                >
                    View Details <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </motion.div>
      </div>
    </section>
  );
};
