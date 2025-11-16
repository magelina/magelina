import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductPageContent, ProductPageContent } from '../services/geminiService';

// --- Themed Background Components ---

const WealthAnimation = () => {
  const particles = Array.from({ length: 80 }); // Increased particle count
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand-gold/50"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }}
          initial={{ y: '10vh', opacity: 0 }}
          animate={{
            y: '-110vh',
            x: ['0vw', `${Math.random() * 6 - 3}vw`, '0vw'], // More pronounced wavy motion
            opacity: [0, 1, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const CatsAnimation = () => {
  const eyes = [
    { top: '20%', left: '15%' }, { top: '30%', left: '80%' },
    { top: '60%', left: '5%' }, { top: '75%', left: '60%' },
    { top: '50%', left: '45%' }, { top: '85%', left: '90%' },
    { top: '10%', left: '50%' }, { top: '90%', left: '30%' }, // Added more eyes
  ];
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {eyes.map((style, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={style}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 1, 0] }}
          transition={{
            duration: Math.random() * 2 + 2, // Faster blinks
            repeat: Infinity,
            repeatDelay: Math.random() * 4 + 4, // More varied delays
            ease: 'easeInOut',
          }}
        >
          <div className="flex gap-2">
            <div className="w-4 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]" />
            <div className="w-4 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]" />
          </div>
        </motion.div>
      ))}
      {/* Walking Cat Silhouette */}
      <motion.div
        className="absolute bottom-0 text-black/80"
        style={{ scale: 0.25, transformOrigin: 'bottom left', willChange: 'transform' }}
        initial={{ x: '110vw' }}
        animate={{ x: '-20vw' }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 3 }}
      >
        <svg width="400" height="150" viewBox="0 0 250 80" fill="currentColor">
          <path d="M22.2,64.4c0.5,0,0.8-0.4,0.8-0.8c0-0.5-0.4-0.8-0.8-0.8s-0.8,0.4-0.8,0.8C21.4,64,21.7,64.4,22.2,64.4z M48.3,64.4c0.5,0,0.8-0.4,0.8-0.8c0-0.5-0.4-0.8-0.8-0.8c-0.5,0-0.8,0.4-0.8,0.8C47.5,64,47.8,64.4,48.3,64.4z M61.3,27.3c-1.6-1.6-3.2-3.2-4.8-4.8c-0.8-0.8-2.1-1.6-3.2-1.6c-1.6,0-3.2,0.8-4.3,1.9l-0.3,0.3c-1.3,1.3-3.2,1.9-5.1,1.9c-1.9,0-3.7-0.6-5.1-1.9l-0.3-0.3c-1.1-1.1-2.7-1.9-4.3-1.9c-1.1,0-2.4,0.8-3.2,1.6c-1.6,1.6-3.2,3.2-4.8,4.8c-1.1,1.1-1.6,2.4-1.6,4c0,1.6,0.5,2.9,1.6,4c1.6,1.6,3.2,3.2,4.8,4.8c0.8,0.8,2.1,1.6,3.2,1.6c1.6,0,3.2-0.8,4.3-1.9l0.3-0.3c1.3-1.3,3.2,1.9-5.1,1.9c1.9,0,3.7,0.6,5.1,1.9l0.3,0.3c1.1,1.1,2.7,1.9,4.3,1.9c1.1,0,2.4-0.8,3.2-1.6c1.6-1.6,3.2-3.2,4.8-4.8c1.1-1.1,1.6-2.4,1.6-4C62.9,29.7,62.4,28.4,61.3,27.3z"/>
          <path d="M228.8,51.8c-2.4-3.4-6.1-5.5-10.2-5.5H80.5c-0.2,0-0.3-0.1-0.5-0.2l-1.6-3.1c-1.1-2.1-2.8-3.9-4.9-5.1c-2.3-1.3-5-2-7.8-2c-2.9,0-5.6,0.7-8.1,2.1c-2.3,1.3-4.1,3.2-5.4,5.5c-1.2,2.3-1.8,4.9-1.8,7.5c0,2.6,0.6,5.2,1.8,7.5c1.2,2.3,3.1,4.2,5.4,5.5c2.5,1.4,5.2,2.1,8.1,2.1c2.8,0,5.5-0.7,7.8-2c2.1-1.2,3.8-2.9,4.9-5.1l1.6-3.1c0.1-0.2,0.3-0.2,0.5-0.2h138.1c4.1,0,7.8-2.1,10.2-5.5c2.4-3.4,3.1-7.6,1.8-11.6C231.9,59.3,231.2,55.2,228.8,51.8z"/>
        </svg>
      </motion.div>
    </div>
  );
};

const HorsesAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#020a18] via-[#10141c] to-[#2d2a26]">
            {/* Moon */}
            <div className="absolute top-[15%] right-[20%] w-20 h-20 bg-gray-200/20 rounded-full shadow-[0_0_50px_10px_rgba(255,255,255,0.05)]"></div>
            
            {/* Stars */}
            {Array.from({ length: 150 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/70 rounded-full"
                    style={{
                        top: `${Math.random() * 60}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 1.5}px`,
                        height: `${Math.random() * 1.5}px`,
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: Math.random() * 2 + 2,
                        repeat: Infinity,
                        repeatType: 'mirror'
                    }}
                />
            ))}
            
            {/* Shooting Star */}
            <motion.div
                className="absolute w-12 h-0.5 bg-gradient-to-l from-white/50 to-transparent"
                style={{
                    rotate: -45,
                }}
                initial={{ x: '120vw', y: '-20vh', opacity: 0 }}
                animate={{
                    x: '-20vw',
                    y: '120vh',
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 5,
                    ease: "power2.in"
                }}
            />

            {/* Running Horse Silhouette */}
            <motion.div
              className="absolute bottom-[28%] text-black/60"
              style={{ scale: 0.8, transformOrigin: 'bottom left', willChange: 'transform' }}
              initial={{ x: '-20vw' }}
              animate={{ x: '110vw' }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 1 }}
            >
                <svg width="200" height="150" viewBox="0 0 200 150" fill="currentColor">
                    <path d="M126.6,75.5c-2.8-1.8-6.1-2.1-9.2-0.8c-3.1,1.3-5.2,4.1-5.8,7.4L109,98.6c-0.6,3.3-3,5.9-6,6.9c-3,1-6.3,0.3-8.8-1.9l-14-14.8c-2.5-2.2-5.7-3.1-8.8-2.5c-3.1,0.6-5.7,2.8-7,5.5l-6.1,12.9c-1.3,2.7-3.9,4.4-6.8,4.4H30.4c-3.1,0-5.9-1.9-7-4.8l-4.7-12.2c-1.1-2.9-3.7-4.8-6.8-4.8H1c-0.6,0-1-0.4-1-1V85c0-0.6,0.4-1,1-1h11.9c2.1,0,4-1.2,5-3.1l6.1-11.4c1-1.9,2.8-3.1,4.9-3.1h20.1c2.1,0,4-1.2,5-3.1l9.5-17.7c1-1.9,2.8-3.1,4.9-3.1h29.5c2.1,0,4-1.2,5-3.1l9.5-17.7c1-1.9,2.8-3.1,4.9-3.1h10.3c2.1,0,4,1.2,5,3.1l5.4,10c1,1.9,2.8,3.1,4.9,3.1h10.9c0.6,0,1,0.4,1,1V25c0,0.6-0.4,1-1,1h-9.9c-3.3,0-6.2,2.1-7.3,5.2l-5.4,14.9c-1.1,3.1-3.9,5.2-7.3,5.2h-28c-3.3,0-6.2,2.1-7.3,5.2l-9.5,21c-1.1,2.4,0.1,5.2,2.5,6.3c2.4,1.1,5.2-0.1,6.3-2.5l7.3-16.1c1.1-2.4,3.5-4,6.1-4h28.8c2.6,0,5-1.6,6.1-4l2.2-4.9c1.1-2.4,3.5-4,6.1-4h11.4c2.6,0,5,1.6,6.1,4l2.2,4.9c1.1,2.4,3.5,4,6.1,4H180c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1h-12.7c-3.4,0-6.5,2.2-7.6,5.5l-2.2,6.5c-1.1,3.3-4.1,5.5-7.6,5.5h-10c-3.4,0-6.5,2.2-7.6,5.5l-3.3,9.8c-1.1,3.3-4.1,5.5-7.6,5.5h-1.9c-0.2,0-0.5,0-0.7-0.1c-0.1,0-0.2-0.1-0.2-0.1c-0.9-0.4-1.6-1-2-1.8c-0.5-0.8-0.7-1.8-0.5-2.7c0.2-0.9,0.7-1.8,1.5-2.4l0,0C101.4,75.7,102.3,75.5,103.2,75.5z"/>
                </svg>
            </motion.div>
            
            {/* Ground */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#1c1a18] to-transparent" />
            
            {/* Dust/Mist */}
            <motion.div
                className="absolute bottom-0 left-0 w-[200%] h-1/4 bg-gradient-to-r from-white/5 via-transparent to-white/5"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'linear'
                }}
            />
        </div>
    );
};

const MoroccoAnimation = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-800/80 via-red-900/80 to-black overflow-hidden">
      {/* Golden Shimmer */}
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0) 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
            top: ['10%', '60%', '20%', '70%', '10%'],
            left: ['15%', '80%', '70%', '20%', '15%'],
            scale: [1, 1.5, 1, 1.8, 1],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
        }}
      />
      
      {/* Shimmer Particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-300"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            boxShadow: `0 0 ${Math.random() * 8 + 4}px rgba(253, 224, 71, 0.7)`,
          }}
          initial={{ y: '-10vh', opacity: 0, scale: 0.5 }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};


const ThemedBackground: React.FC<{ productId: string }> = ({ productId }) => {
  switch (productId) {
    case 'wealth':
      return <WealthAnimation />;
    case 'cats':
      return <CatsAnimation />;
    case 'horses':
      return <HorsesAnimation />;
    case 'morocco':
      return <MoroccoAnimation />;
    default:
      return <div className="absolute inset-0 bg-black" />;
  }
};

interface ProductDetailPageProps {
    product: Product | null;
    onClose: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onClose }) => {
    const [generatedContent, setGeneratedContent] = useState<ProductPageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (product) {
            setIsLoading(true);
            setGeneratedContent(null);
            setCurrentImageIndex(0); // Reset for new product
            
            getProductPageContent(product.title, product.description).then(content => {
                setGeneratedContent(content);
                setIsLoading(false);
            }).catch(() => {
                setGeneratedContent({ 
                    keyFeatures: [], 
                    summary: "An exclusive guide to unlock your potential.",
                    motivationalQuote: ""
                });
                setIsLoading(false);
            });
        }
    }, [product]);

    useEffect(() => {
        const images = product?.detailImages || product?.images || [];
        if (images.length > 1) {
            const timer = setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 6000); // 6s per image
            return () => clearInterval(timer);
        }
    }, [product]);

    const images = product?.detailImages || product?.images || [];

    return (
        <AnimatePresence>
            {product && (
                <motion.div
                    key="product-detail-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 text-white overflow-y-auto"
                >
                    {/* Background Layer */}
                    <div className="absolute inset-0">
                        <ThemedBackground productId={product.id} />
                    </div>
                     {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-black/50" style={{ boxShadow: 'inset 0 0 10vw 5vw black' }} />
                    
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 bg-white/10 text-white hover:bg-white/20 transition-all duration-200 rounded-full backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>

                    {/* Content Layer */}
                    <div className="relative z-10 w-full max-w-6xl my-auto">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex justify-center items-center h-full"
                                >
                                    <Loader2 size={48} className="animate-spin text-brand-gold mx-auto" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
                                    className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12"
                                >
                                    {/* Left Side: Image Slideshow */}
                                    <motion.div 
                                        className="w-full aspect-[4/5] perspective-1000"
                                        variants={{
                                            hidden: { opacity: 0, x: -50, rotateY: 10 },
                                            visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                        }}
                                    >
                                        <div className="relative w-full h-full">
                                            <AnimatePresence>
                                                <motion.div
                                                    key={currentImageIndex}
                                                    className="absolute inset-0 w-full h-full shadow-2xl border-2 border-white/10 overflow-hidden"
                                                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                                    exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                                                >
                                                    <motion.img
                                                        src={images[currentImageIndex]}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover"
                                                        initial={{ scale: 1.2 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 8, ease: 'easeOut' }}
                                                    />
                                                     {/* Gradient Overlay for seamless transition to background */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black pointer-events-none"></div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>

                                    {/* Right Side: Text Content */}
                                    <motion.div
                                        className="text-center md:text-left"
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                        }}
                                    >
                                        <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg leading-tight">
                                            {product.title}
                                        </h2>
                                        <div className="w-24 h-px bg-brand-gold mx-auto md:mx-0 mb-8"></div>
                                        <p className="text-lg md:text-xl text-white/80 leading-relaxed drop-shadow-md">
                                            {generatedContent?.summary}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
