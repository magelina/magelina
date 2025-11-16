import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setImageIndex(0);
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          ></motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white text-black shadow-2xl w-full max-w-5xl overflow-hidden relative flex flex-col md:flex-row max-h-[95vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-3 bg-white hover:bg-brand-brown hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-sm border border-gray-100"
            >
              <X size={24} />
            </button>

            {/* Image Gallery Section */}
            <div className="w-full md:w-3/5 bg-gray-100 relative h-64 md:h-auto group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={product.images[imageIndex]}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 m-2 p-3 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setImageIndex((prev) => (prev + 1) % product.images.length); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 m-2 p-3 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {product.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 transition-all ${idx === imageIndex ? 'bg-brand-gold w-8' : 'bg-white/50 w-4'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Details Section */}
            <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col overflow-y-auto bg-white">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-3 tracking-tight">
                  {product.title}
                </h2>
                <div className="text-xl md:text-2xl font-light text-brand-gold">
                  ${product.price} USD
                </div>
              </div>

              <div className="prose prose-stone text-gray-600 mb-10 flex-grow leading-relaxed">
                <p className="whitespace-pre-wrap text-sm md:text-base">{product.description}</p>
                <div className="mt-6 p-4 bg-stone-50 border border-stone-100 text-sm italic text-gray-500">
                  "This product is a digital download. You will receive access immediately via Gumroad after secure payment."
                </div>
              </div>

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-brown hover:bg-brand-gold text-white py-4 md:py-5 font-bold uppercase tracking-widest text-sm text-center flex items-center justify-center gap-3 transition-all duration-200 shadow-xl hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
              >
                <span>Buy on Gumroad</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
