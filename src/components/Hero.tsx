'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Search, X } from 'lucide-react';
import { stats, categories, Toolkit } from '@/data/content';
import NewFeatureBadge from './NewFeatureBadge';

interface HeroProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    isSearchFocused: boolean;
    setIsSearchFocused: (focused: boolean) => void;
    filteredToolkits: Toolkit[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0
    }
};

export default function Hero({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isSearchFocused,
    setIsSearchFocused,
    filteredToolkits
}: HeroProps) {
    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <section className={`max-w-7xl mx-auto px-4 sm:px-6 text-center transition-all duration-500 ease-in-out ${searchQuery ? 'py-8' : 'py-20 lg:py-24'}`} aria-labelledby="hero-heading">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <AnimatePresence>
                    {!searchQuery && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                visible: {
                                    opacity: 1,
                                    height: 'auto',
                                    marginBottom: 48,
                                    transition: {
                                        duration: 0.3,
                                        staggerChildren: 0.1
                                    }
                                },
                                hidden: {
                                    opacity: 0,
                                    height: 0,
                                    marginBottom: 0,
                                    transition: {
                                        duration: 0.3
                                    }
                                }
                            }}
                            className="overflow-hidden"
                        >
                            {/* Badge */}
                            <NewFeatureBadge />

                            <motion.h1
                                id="hero-heading"
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
                                variants={itemVariants}
                            >
                                Developer toolkit,
                                <br />
                                <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-muted)] bg-clip-text text-transparent">
                                    simplified.
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-base sm:text-lg text-[var(--accent-muted)] mb-10 max-w-2xl mx-auto leading-relaxed"
                                variants={itemVariants}
                            >
                                Essential tools for modern developers. Streamline your workflow with our curated collection of utilities, generators, and debuggers.{' '}
                                <span className="text-white font-medium">100% free, no signup required.</span>
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                id="toolkits"
                                className="flex flex-wrap justify-center gap-8 md:gap-12"
                                variants={itemVariants}
                            >
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex items-center gap-3">
                                        <stat.icon className="w-5 h-5 text-[var(--accent)]" />
                                        <div className="text-left">
                                            <div className="text-xl font-bold">{stat.value}</div>
                                            <div className="text-xs text-[var(--accent-muted)] uppercase tracking-wide">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Search Bar - Fixed */}
                <motion.div
                    className="max-w-xl mx-auto"
                    layout
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className={`relative flex items-center bg-[var(--background)] border rounded-lg transition-all duration-200 ${isSearchFocused
                            ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
                            : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
                            }`}
                    >
                        <label htmlFor="search-input" className="sr-only">
                            Search tools by name, description, or category
                        </label>
                        <div className="absolute left-4 text-[var(--accent-muted)] pointer-events-none">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            id="search-input"
                            type="text"
                            placeholder="Search tools... (e.g., README, QR code, JWT)"
                            className="w-full bg-transparent pl-12 pr-12 py-3 text-white placeholder:text-[var(--accent-muted)] focus:outline-none rounded-lg text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            aria-describedby="search-results"
                        />
                        <AnimatePresence>
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-4 p-1 text-[var(--accent-muted)] hover:text-white transition-colors rounded-md hover:bg-white/10"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                    type="button"
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 mt-8"
                    variants={itemVariants}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm rounded-md transition-all capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${selectedCategory === category
                                ? 'bg-[var(--accent)] text-black font-medium'
                                : 'bg-transparent border border-[var(--border-color)] text-[var(--accent-muted)] hover:border-[var(--border-hover)] hover:text-white'
                                }`}
                            aria-pressed={selectedCategory === category}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
