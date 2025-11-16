import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { ThreeDCard } from './ThreeDCard';
import { ArrowRight } from 'lucide-react';

interface MiniCatalogProps {
  onProductSelect: (product: Product) => void;
}

export const MiniCatalog: React.FC<MiniCatalogProps> = ({ onProductSelect }) => {
  // Ensure we only show 3 products for the "Horizontal row of three" layout
  const displayProducts = PRODUCTS.slice(0, 3);

  return (
    <section className="bg-black py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {displayProducts.map((product) => (
            <ThreeDCard 
              key={product.id} 
              onClick={() => onProductSelect(product)}
              className="cursor-pointer group"
            >
              {/* Card background is #161616 to pop against the #000000 section background */}
              <div className="bg-[#161616] h-full flex flex-col p-8 border border-white/5 hover:border-brand-gold/40 transition-colors duration-500 relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(191,161,74,0.15)]">
                 
                 {/* Minimalist Image Container */}
                 <div className="relative w-full aspect-[4/5] mb-8 bg-[#111] flex items-center justify-center overflow-hidden border border-white/5">
                    <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                 </div>

                 {/* Content */}
                 <div className="mt-auto relative z-20">
                    <h3 className="text-white text-xl font-medium tracking-wide mb-3 group-hover:text-brand-gold transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-gray-500 text-xs font-light line-clamp-2 mb-6 uppercase tracking-wider">
                        {product.description.substring(0, 80)}...
                    </p>
                    
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
