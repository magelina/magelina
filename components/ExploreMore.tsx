import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { ThreeDCard } from './ThreeDCard';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExploreMoreProps {
  onProductSelect: (product: Product) => void;
}

export const ExploreMore: React.FC<ExploreMoreProps> = ({ onProductSelect }) => {
  const displayProducts = PRODUCTS.slice(0, 3);

  return (
    <section className="bg-black py-24 md:py-32 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase mb-4">
            Continue Your Journey
          </h2>
          <p className="text-gray-500 max-w-md md:max-w-2xl mx-auto">
            Discover other guides that resonate with your path to wisdom and mastery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {displayProducts.map((product) => (
            <ThreeDCard 
              key={product.id} 
              onClick={() => onProductSelect(product)}
              className="cursor-pointer group"
            >
              <div className="bg-[#161616] h-full flex flex-col p-8 border border-white/5 hover:border-brand-gold/40 transition-colors duration-500 relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(191,161,74,0.15)]">
                 
                 <div className="relative w-full aspect-[4/5] mb-8 bg-[#111] flex items-center justify-center overflow-hidden border border-white/5">
                    <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                 </div>

                 <div className="mt-auto relative z-20">
                    <h3 className="text-white text-xl font-medium tracking-wide mb-3 group-hover:text-brand-gold transition-colors">
                        {product.title}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <span className="text-brand-gold font-bold tracking-widest text-sm">${product.price} USD</span>
                        <span className="text-white/30 group-hover:text-white transition-colors group-hover:translate-x-2 duration-300">
                            <ArrowRight size={18} strokeWidth={1} />
                        </span>
                    </div>
                 </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};