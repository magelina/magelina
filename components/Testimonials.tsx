import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-white text-black py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
            <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={24} fill="black" className="text-black" />
                ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">
                What Our People Have To Say...
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 md:p-12 shadow-lg border border-gray-100 relative"
            >
                <Quote size={48} className="text-gray-200 absolute top-8 left-8" />
                <p className="text-base md:text-lg text-gray-800 italic leading-relaxed relative z-10 mt-6 mb-6">
                    "The level of detail in 'Rising Towards Wealth' is astounding. It's not just information; it's a complete paradigm shift. Truly a luxury experience for the mind."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-none"></div>
                    <div>
                        <p className="font-bold uppercase tracking-widest text-xs">Sarah M.</p>
                        <p className="text-xs text-gray-500">Entrepreneur</p>
                    </div>
                </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 md:p-12 shadow-lg border border-gray-100 relative"
            >
                <Quote size={48} className="text-gray-200 absolute top-8 left-8" />
                <p className="text-base md:text-lg text-gray-800 italic leading-relaxed relative z-10 mt-6 mb-6">
                    "I've never read a guide on feline care that felt so sophisticated and respectful. Magelina understands that knowledge is the ultimate form of elegance."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-none"></div>
                    <div>
                        <p className="font-bold uppercase tracking-widest text-xs">James R.</p>
                        <p className="text-xs text-gray-500">Cat Enthusiast</p>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-16 md:gap-32 border-t border-gray-200 pt-16">
            <div className="text-center">
                <span className="block text-4xl md:text-6xl font-bold text-black mb-2">1200+</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Verified Reviews</span>
            </div>
            <div className="text-center">
                <span className="block text-4xl md:text-6xl font-bold text-black mb-2">10,000+</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Downloads</span>
            </div>
        </div>
      </div>
    </section>
  );
};
