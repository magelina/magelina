import React from 'react';
import { Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white py-12 md:py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white tracking-[0.2em] uppercase mb-4">Magelina</h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest">© 2025 Magelina Digital Store. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8">
            <a 
              href="https://www.instagram.com/elinav_1?igsh=ejh2cGI4eTFhcWJy" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit our Instagram page"
              className="text-gray-500 hover:text-brand-gold transition-colors hover:-translate-y-1 duration-300"
            >
              <Instagram size={24} strokeWidth={1} />
            </a>
            <a 
              href="mailto:magelina1v@gmail.com" 
              aria-label="Send us an email"
              className="text-gray-500 hover:text-brand-gold transition-colors hover:-translate-y-1 duration-300"
            >
              <Mail size={24} strokeWidth={1} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
