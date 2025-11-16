import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ThreeDCard } from './ThreeDCard';
import { Product } from '../types';

interface InfoSectionProps {
  onProductSelect: (product: Product) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ onProductSelect }) => {
  const displayProducts = PRODUCTS.slice(0, 4);
  
  const motivationalPhrases = [
    "Master your financial mindset.",
    "Connect with your feline friend.",
    "Unlock timeless beauty secrets.",
    "Build harmony through understanding.",
  ];

  const handleScrollToBookCatalog = () => {
    document.querySelector('#book-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-black py-24 md:py-32 border-y border-white/5">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-[0.2em] uppercase mb-16">
                Where Knowledge Becomes Art
            </h2>
            
            {/* Image Snippets - Now clickable */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 mb-16">
                {displayProducts.map((product, idx) => (
                    <div key={product.id} className="flex flex-col items-center">
                        <ThreeDCard 
                            className="h-64 md:h-80 w-full group cursor-pointer"
                            onClick={() => onProductSelect(product)}
                        >
                            <div className="relative w-full h-full bg-gray-900 overflow-hidden border border-white/5 shadow-2xl">
                                <img 
                                    src={product.images[0]} 
                                    className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-700" 
                                    alt={`Cover for ${product.title}`} 
                                />
                            </div>
                        </ThreeDCard>
                        <p className="mt-6 text-center text-gray-500 text-xs uppercase tracking-widest font-light h-10 flex items-center">
                            {motivationalPhrases[idx]}
                        </p>
                    </div>
                ))}
            </div>

            <button 
                onClick={handleScrollToBookCatalog}
                className="bg-transparent text-white border border-white/30 px-12 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-md hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] hover:-translate-y-1 active:translate-y-0 active:shadow-sm">
                Read More
            </button>
        </motion.div>
      </div>
    </section>
  );
};