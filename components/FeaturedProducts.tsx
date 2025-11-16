import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';

interface FeaturedProductsProps {
  onProductSelect: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductSelect }) => {
  // Just take the first featured item for the main spotlight, or map through all featured
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex items-end justify-between border-b border-gray-200 pb-6">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-2 tracking-tight">Featured Collections</h2>
                <p className="text-gray-500 font-light">Curated specifically for your growth.</p>
            </div>
        </div>

        <div className="space-y-24 md:space-y-32">
          {featuredProducts.map((product, index) => (
            <div 
                key={product.id} 
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
            >
              {/* Visual Side */}
              <div className="w-full md:w-1/2">
                <ThreeDCard onClick={() => onProductSelect(product)} className="cursor-pointer group">
                    <div className="relative shadow-2xl aspect-[4/3] transform-style-3d border border-gray-100 bg-gray-100">
                        <img 
                            src={product.images[0]} 
                            alt={product.title}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 translate-z-0"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        
                        {/* Floating Badge */}
                        <div className="absolute top-0 left-0 bg-brand-gold text-white font-bold px-6 py-3 shadow-lg translate-z-30 flex items-center gap-2 tracking-widest text-sm">
                            <Sparkles size={14} />
                            FEATURED
                        </div>
                    </div>
                </ThreeDCard>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2">
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h3 className="text-3xl md:text-5xl font-bold text-brand-brown mb-8 leading-tight">
                        {product.title}
                    </h3>
                    <div className="w-24 h-1 bg-brand-gold mb-8"></div>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 font-light line-clamp-4">
                        {product.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                        <span className="text-3xl font-light text-brand-brown">${product.price}</span>
                        <button 
                            onClick={() => onProductSelect(product)}
                            className="flex items-center gap-4 bg-brand-brown text-white px-10 py-4 hover:bg-brand-gold transition-all duration-200 shadow-xl hover:shadow-[0_15px_30px_-5px_rgba(191,161,74,0.4)] transform hover:-translate-y-1 active:translate-y-0 active:shadow-md uppercase tracking-widest text-sm font-bold group"
                        >
                            Explore Product <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
