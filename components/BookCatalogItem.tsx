import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { getProductPageContent, ProductPageContent } from '../services/geminiService';
import { Loader2, ArrowRight } from 'lucide-react';

interface BookCatalogItemProps {
  item: {
    id: string;
    title: string;
    coverImage: string;
    insideImage: string;
  };
  product: Product;
  index: number;
  onBookSelect: (product: Product) => void;
}

export const BookCatalogItem: React.FC<BookCatalogItemProps> = ({ item, product, index, onBookSelect }) => {
  const [content, setContent] = useState<ProductPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const generatedContent = await getProductPageContent(product.title, product.description);
        setContent(generatedContent);
      } catch (error) {
        console.error("Failed to fetch book summary:", error);
        setContent({
          keyFeatures: [],
          summary: "An exclusive guide to unlock your potential. Click to learn more about the transformation that awaits.",
          motivationalQuote: ""
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [product.title, product.description]);

  const isReversed = index % 2 !== 0;

  const textContent = (
    <motion.div
      className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-16"
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
        {item.title}
      </h3>
      <div className="w-20 h-px bg-brand-gold mb-8"></div>
      
      <div className="text-gray-400 font-light leading-relaxed min-h-[120px]">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Loader2 size={20} className="animate-spin text-brand-gold" />
            <span>Generating insight...</span>
          </div>
        ) : (
          <p>{content?.summary}</p>
        )}
      </div>

      <button
        onClick={() => onBookSelect(product)}
        className="mt-10 bg-transparent text-white border border-white/30 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-md hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] hover:-translate-y-1 active:translate-y-0 active:shadow-sm w-fit flex items-center gap-3 group"
      >
        Open Guide
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      className="w-full md:w-1/2 h-96 md:h-[600px]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <img
        src={item.insideImage}
        alt={`Inside view of ${item.title}`}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );

  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} bg-black overflow-hidden`}>
      {textContent}
      {imageContent}
    </div>
  );
};
