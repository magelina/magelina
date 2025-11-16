import React from 'react';
import { motion } from 'framer-motion';
import { BOOK_CATALOG_ITEMS, PRODUCTS } from '../constants';
import { Product } from '../types';
import { ThreeDCard } from './ThreeDCard';
import { Eye } from 'lucide-react';

interface BookCatalogProps {
  onBookSelect: (product: Product) => void;
}

// FIX: Define props for MarqueeItem separately for clarity and to help TypeScript.
interface MarqueeItemProps {
  item: typeof BOOK_CATALOG_ITEMS[0];
  onBookSelect: (product: Product) => void;
}

// FIX: Move MarqueeItem outside of BookCatalog. Defining components inside other components can lead to bugs, performance issues, and confusing TypeScript errors.
// This refactoring resolves the TypeScript error regarding the 'key' prop.
const MarqueeItem: React.FC<MarqueeItemProps> = ({ item, onBookSelect }) => {
  const product = PRODUCTS.find(p => p.id === item.id);
  if (!product) return null;

  return (
    <div className="flex-shrink-0 w-[70vw] md:w-[24vw] min-w-[300px] px-4">
      <ThreeDCard onClick={() => onBookSelect(product)} className="h-full cursor-pointer group">
        <div className="h-full bg-[#1a1a1a] shadow-lg hover:shadow-2xl border border-white/5 overflow-hidden relative flex flex-col transition-all duration-500 hover:scale-[1.02] group-hover:border-brand-gold/30">
          <div className="relative h-96 w-full overflow-hidden">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 bg-black/20 backdrop-blur-[1px]">
              <div className="bg-black/40 p-5 border border-white/20 backdrop-blur-md transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                <Eye className="text-white drop-shadow-lg" size={32} strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <div className="p-4 mt-auto">
            <h3 className="text-white text-sm font-medium truncate group-hover:text-brand-gold transition-colors">
              {item.title}
            </h3>
          </div>
        </div>
      </ThreeDCard>
    </div>
  );
};

export const BookCatalog: React.FC<BookCatalogProps> = ({ onBookSelect }) => {
  return (
    <section className="bg-brand-charcoal text-white py-24 md:py-32 border-y border-white/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase mb-4">
            A Glimpse Inside
          </h2>
          <p className="text-gray-500 max-w-md md:max-w-2xl mx-auto">
            Our collection offers a deeper look into the transformative knowledge within. Select a guide to learn more.
          </p>
        </motion.div>
      </div>
      
      <div className="w-full overflow-hidden relative">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            ease: 'linear',
            duration: 40,
            repeat: Infinity,
          }}
        >
          <div className="flex flex-nowrap">
            {BOOK_CATALOG_ITEMS.map((item) => <MarqueeItem key={item.id} item={item} onBookSelect={onBookSelect} />)}
          </div>
          <div className="flex flex-nowrap">
            {BOOK_CATALOG_ITEMS.map((item) => <MarqueeItem key={`${item.id}-dup`} item={item} onBookSelect={onBookSelect} />)}
          </div>
        </motion.div>

        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-charcoal to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-charcoal to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
