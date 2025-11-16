import React, { useState } from 'react';
import { Product } from '../types';
import { X, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isDiagramMode?: boolean;
  diagramDescription?: string;
  isLoadingDiagram?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  isOpen, 
  onClose,
  isDiagramMode = false,
  diagramDescription,
  isLoadingDiagram = false
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  if (!product || !isOpen) return null;

  const nextImage = () => setImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

  const renderDescription = () => {
    if (isDiagramMode) {
      if (isLoadingDiagram) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <Loader2 size={32} className="animate-spin text-brand-gold mb-4" />
            <p className="font-semibold">Generating Diagram...</p>
            <p className="text-sm">Our AI is summarizing this guide for you.</p>
          </div>
        );
      }
      return <p className="whitespace-pre-wrap text-sm md:text-base font-mono">{diagramDescription}</p>;
    }
    return <p className="whitespace-pre-wrap text-sm md:text-base">{product.description}</p>;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white shadow-2xl w-full max-w-5xl overflow-hidden relative flex flex-col md:flex-row max-h-[100vh] md:max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 bg-white hover:bg-brand-brown hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-sm border border-gray-100"
        >
          <X size={24} />
        </button>

        {/* Image Gallery Section */}
        <div className="w-full md:w-3/5 bg-gray-100 relative h-64 md:h-auto group">
           <img 
             src={product.images[imageIndex]} 
             alt={product.title}
             className="w-full h-full object-cover"
           />
           
           {product.images.length > 1 && (
             <>
               <button 
                 onClick={(e) => { e.stopPropagation(); prevImage(); }}
                 className="absolute left-0 top-1/2 -translate-y-1/2 p-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
               >
                 <ChevronLeft size={24} />
               </button>
               <button 
                 onClick={(e) => { e.stopPropagation(); nextImage(); }}
                 className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
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
        <div className="w-full md:w-2/5 p-10 flex flex-col overflow-y-auto bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-brand-brown mb-3 tracking-tight">
              {product.title}
            </h2>
            <div className="text-2xl font-light text-brand-gold">
              ${product.price} USD
            </div>
          </div>

          <div className="prose prose-stone text-gray-600 mb-10 flex-grow leading-relaxed">
            {renderDescription()}
            {!isDiagramMode && (
              <div className="mt-6 p-4 bg-stone-50 border border-stone-100 text-sm italic text-gray-500">
                "This product is a digital download. You will receive access immediately via Gumroad after secure payment."
              </div>
            )}
          </div>

          <a 
            href={product.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-brand-brown hover:bg-brand-gold text-white py-5 font-bold uppercase tracking-widest text-sm text-center flex items-center justify-center gap-3 transition-all duration-200 shadow-xl hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
          >
            <span>Buy on Gumroad</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};