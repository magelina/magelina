import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center">
        <div 
          className="cursor-pointer group"
          onClick={handleScrollToTop}
        >
          <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white uppercase group-hover:text-brand-gold transition-colors duration-300">
            MAGLI
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          <a 
            href="#" 
            onClick={handleScrollToTop}
            className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            Home
          </a>
          <a 
            href="#book-catalog" 
            onClick={(e) => handleNavClick(e, '#book-catalog')}
            className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            Showcase
          </a>
          <a 
            href="#book-catalog" 
            onClick={(e) => handleNavClick(e, '#book-catalog')}
            className="flex items-center gap-2 text-white hover:text-brand-gold transition-all duration-300 hover:-translate-y-1"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white transition-transform duration-200 active:scale-90 hover:text-brand-gold"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 shadow-2xl md:hidden flex flex-col items-center py-12 space-y-8">
           <a 
             href="#" 
             onClick={handleScrollToTop}
             className="text-white hover:text-brand-gold text-lg uppercase tracking-widest font-light"
            >
              Home
            </a>
           <a 
             href="#book-catalog" 
             onClick={(e) => handleNavClick(e, '#book-catalog')}
             className="text-white hover:text-brand-gold text-lg uppercase tracking-widest font-light"
            >
              Showcase
            </a>
        </div>
      )}
    </header>
  );
};