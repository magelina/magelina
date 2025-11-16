import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection'; // Info Content (Section 3)
import { IconSection } from './components/IconSection'; // Icon of Ovulan/Magelina (Section 4)
import { BookCatalog } from './components/BookCatalog';
import { Testimonials } from './components/Testimonials'; // Testimonials (Section 5)
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';
import { Product } from './types';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductModal } from './components/ProductModal';
import { ExploreMore } from './components/ExploreMore';

const App: React.FC = () => {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [detailedProduct, setDetailedProduct] = useState<Product | null>(null);

  const handleProductSelect = (product: Product) => {
    setModalProduct(product);
  };
  
  const handleBookSelect = (product: Product) => {
    setDetailedProduct(product);
  };

  const handleCloseModal = () => {
    setModalProduct(null);
  };

  const handleCloseDetailPage = () => {
    setDetailedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow relative">
        <>
          <Hero />
          <InfoSection onProductSelect={handleProductSelect} />
          <div id="book-catalog">
            <BookCatalog onBookSelect={handleBookSelect} />
          </div>
          <ExploreMore onProductSelect={handleProductSelect} />
          <div id="icon">
            <IconSection onProductSelect={handleProductSelect} />
          </div>
          <div id="testimonials">
            <Testimonials />
          </div>
        </>
      </main>

      <Footer />
      
      <ChatAssistant />
      
      <ProductModal 
        product={modalProduct}
        onClose={handleCloseModal}
      />
      
      <ProductDetailPage 
        product={detailedProduct}
        onClose={handleCloseDetailPage}
      />
    </div>
  );
};

export default App;