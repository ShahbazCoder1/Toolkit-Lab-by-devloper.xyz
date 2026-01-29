'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ToolkitGrid from '@/components/ToolkitGrid';
import Footer from '@/components/Footer';
import { Search, X } from 'lucide-react';


import { Toolkit, toolkits, categories } from '@/data/content';

export default function ToolsClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredToolkits = toolkits.filter(toolkit => {
        const matchesSearch =
            toolkit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            toolkit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            toolkit.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || toolkit.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Header />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <motion.h1
                            className="text-4xl sm:text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            All Developer Tools
                        </motion.h1>
                        <motion.p
                            className="text-[var(--accent-muted)] max-w-2xl mx-auto text-lg mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Explore our complete collection of utilities designed to streamline your development workflow.
                        </motion.p>

                        {/* Search and Filter Controls */}
                        <motion.div
                            className="max-w-xl mx-auto mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative flex items-center bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20 transition-all duration-200">
                                <div className="absolute left-4 text-[var(--accent-muted)] pointer-events-none">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search tools..."
                                    className="w-full bg-transparent pl-12 pr-12 py-3 text-white placeholder:text-[var(--accent-muted)] focus:outline-none rounded-lg text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-4 p-1 text-[var(--accent-muted)] hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </motion.div>

                        {/* Categories */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-2 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 text-sm rounded-md transition-all capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${selectedCategory === category
                                        ? 'bg-[var(--accent)] text-black font-medium'
                                        : 'bg-transparent border border-[var(--border-color)] text-[var(--accent-muted)] hover:border-[var(--border-hover)] hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    <ToolkitGrid
                        filteredToolkits={filteredToolkits}
                        setSearchQuery={setSearchQuery}
                        setSelectedCategory={setSelectedCategory}
                        searchQuery={searchQuery}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
