import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: "Greetings! I am the Magelina AI assistant. I'm here to help you discover our exclusive digital products. How can I assist you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getChatResponse(input);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ y: -5 }}
        whileTap={{ y: 0, scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 w-16 h-16 shadow-2xl flex items-center justify-center transition-all duration-300 border border-transparent ${isOpen ? 'bg-gray-200 text-gray-500 rotate-90 opacity-0 pointer-events-none' : 'bg-brand-brown text-brand-gold hover:bg-brand-gold hover:text-white hover:shadow-[0_10px_25px_-5px_rgba(191,161,74,0.5)]'}`}
      >
        <Sparkles size={28} />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-white shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-brown p-5 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-gold flex items-center justify-center text-white shadow-sm">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wider uppercase">Magelina AI</h3>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-all duration-200 hover:rotate-90 active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-5 bg-stone-50 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-brown text-white shadow-md' 
                        : 'bg-white text-gray-700 border border-gray-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 border border-gray-100 shadow-sm">
                    <Loader2 className="animate-spin text-brand-gold" size={16} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-gray-100">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about our collection..."
                  className="w-full bg-gray-100 text-sm pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-shadow shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-brand-gold text-white hover:bg-yellow-600 disabled:opacity-50 disabled:hover:bg-brand-gold transition-all duration-200 shadow-md hover:shadow-[0_5px_10px_rgba(191,161,74,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};