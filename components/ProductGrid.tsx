import React from 'react';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onProductSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
      {PRODUCTS.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {/* Wrap with context that might be needed or just render card */}
          <div className="bg-brand-charcoal p-4 border border-white/5">
             <ProductCard product={product} onSelect={onProductSelect} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
