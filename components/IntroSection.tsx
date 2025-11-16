import React from 'react';
import { motion } from 'framer-motion';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-brand-brown mb-6 leading-tight"
          >
            Empowering your journey through <span className="text-brand-gold">Wisdom</span> and <span className="text-brand-gold">Nature</span>.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-base md:text-lg leading-relaxed mb-12"
          >
            Magelina Digital Store curates the finest knowledge for a life well-lived. 
            From the secrets of financial abundance to the ancient beauty rituals of Morocco, 
            we provide the keys to unlock your potential.
          </motion.p>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-gray-100 pt-10">
            {[
              { label: 'Happy Readers', value: '15k+' },
              { label: 'Customer Satisfaction', value: '98%' },
              { label: 'Digital Products', value: 'Premium' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl md:text-4xl font-bold text-brand-brown mb-2">{stat.value}</span>
                <span className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
