import React from 'react';
import { Product } from '../types';
import { ThreeDCard } from './ThreeDCard';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <ThreeDCard onClick={() => onSelect(product)} className="h-full cursor-pointer group">
      <div className="h-full bg-[#1a1a1a] shadow-lg hover:shadow-2xl border border-white/5 overflow-hidden relative flex flex-col transition-all duration-500 hover:scale-[1.02] group-hover:border-brand-gold/30">
        
        {/* Image Layer */}
        <div className="relative h-96 w-full overflow-hidden transform-style-3d translate-z-10">
          <img 
            src={product.images[0]} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
          
          {/* Eye Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 bg-black/20 backdrop-blur-[1px]">
            <div className="bg-black/40 p-5 border border-white/20 backdrop-blur-md transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
               <Eye className="text-white drop-shadow-lg" size={32} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Floating Content Layer */}
        <div className="absolute bottom-0 left-0 w-full p-6 transform-style-3d translate-z-30">
          <div className="border-l-2 border-brand-gold pl-4">
            <h3 className="text-white text-xl font-bold mb-4 drop-shadow-md translate-z-20 font-sans tracking-wide">
              {product.title}
            </h3>
            <div className="flex justify-between items-end">
              <div className="bg-brand-gold text-white px-5 py-2 font-bold text-lg tracking-widest shadow-xl translate-z-20 border border-white/10">
                ${product.price} USD
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Description for Screen Readers */}
        <div className="sr-only">{product.description}</div>
      </div>
    </ThreeDCard>
  );
};