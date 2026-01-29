'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { toolkits } from '@/data/content';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ToolkitGrid from '@/components/ToolkitGrid';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import BigBrand from '@/components/BigBrand';
import Footer from '@/components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredToolkits = toolkits.filter(toolkit => {
    const matchesSearch =
      toolkit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      toolkit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      toolkit.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || toolkit.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-black focus:rounded-md"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content">
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
            filteredToolkits={filteredToolkits}
          />

          <ToolkitGrid
            filteredToolkits={filteredToolkits}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
          />

          <Features />

          <Testimonials />

          <BigBrand />
        </main>

        <Footer />

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 p-3 bg-[var(--accent)] text-black rounded-full shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}