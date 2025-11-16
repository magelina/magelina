import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BookOpen } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';

export const WhyChooseUs: React.FC = () => {
  const features = [
    { icon: Zap, title: 'Instant Delivery', desc: 'Access your digital library immediately after purchase.' },
    { icon: ShieldCheck, title: '100% Secure', desc: 'Transactions are fully protected and encrypted.' },
    { icon: BookOpen, title: 'Lifetime Access', desc: 'Your collection is yours to keep, forever.' },
  ];

  const handleScrollToTestimonials = () => {
    document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          
          {/* Left Column: Text */}
          <div className="w-full md:w-1/3 md:sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em] mb-6">The Magelina Standard</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-brown mb-8 leading-tight">Why Choose Magelina?</h3>
              <p className="text-gray-600 leading-relaxed mb-10 font-light text-base md:text-lg">
                Our digital library combines high-performance insights with pure innovation. The result? A sleek, powerful, and eco-friendly reading experience designed for speed, style, and everyday reliability.
              </p>
              <button 
                onClick={handleScrollToTestimonials}
                className="bg-transparent text-brand-brown font-bold text-sm uppercase tracking-widest border border-brand-brown px-8 py-3 hover:bg-brand-brown hover:text-white transition-all duration-300 shadow-md hover:shadow-[0_10px_20px_rgba(75,46,46,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-sm">
                About The Brand
              </button>
            </motion.div>
          </div>

          {/* Right Column: Feature Cards */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <ThreeDCard key={idx} className="h-full">
                <div className="bg-white p-10 shadow-lg border border-gray-100 h-full flex flex-col items-start gap-6 transform-style-3d hover:border-brand-gold/20 transition-colors">
                  <div className="w-14 h-14 bg-stone-100 flex items-center justify-center text-brand-brown translate-z-20 border border-gray-200 shadow-sm">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold text-brand-brown translate-z-10 tracking-wide">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed translate-z-10 font-light">
                    {feature.desc}
                  </p>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
