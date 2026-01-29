'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Star, ArrowUpRight, Search, Sparkles, Zap, MousePointer } from 'lucide-react';
import { Toolkit } from '@/data/content';
import Link from 'next/link';

interface ToolkitGridProps {
    filteredToolkits: Toolkit[];
    setSearchQuery: (query: string) => void;
    setSelectedCategory: (category: string) => void;
    searchQuery: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut'
        }
    }
};

export default function ToolkitGrid({
    filteredToolkits,
    setSearchQuery,
    setSelectedCategory,
    searchQuery
}: ToolkitGridProps) {

    return (
        <section
            id="toolkits"
            className="max-w-7xl mx-auto px-4 sm:px-6 pb-24"
            aria-labelledby="toolkits-heading"
        >
            {/* Section Header */}
            <AnimatePresence>
                {!searchQuery && (
                    <motion.div
                        className="mb-10 overflow-hidden"
                        initial={{ opacity: 0, y: 20, height: 'auto', marginBottom: 40 }}
                        whileInView={{ opacity: 1, y: 0, height: 'auto', marginBottom: 40 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 bg-[var(--accent)]/10 rounded-lg">
                                        <Zap className="w-4 h-4 text-[var(--accent)]" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider">
                                        Developer Tools
                                    </span>
                                </div>
                                <h2 id="toolkits-heading" className="text-2xl sm:text-3xl font-bold">
                                    Pick a tool, get started
                                </h2>
                                <p className="text-[var(--accent-muted)] text-sm mt-2 max-w-md">
                                    Click on any card below to open the tool. All tools are free and work directly in your browser.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--accent-muted)] bg-[var(--card-bg)] border border-[var(--border-color)] px-3 py-2 rounded-lg">
                                <MousePointer className="w-3.5 h-3.5" />
                                <span>{filteredToolkits.length} tools available</span>
                            </div>
                        </div>

                        {/* Visual separator */}
                        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {filteredToolkits.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    role="list"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredToolkits.map((toolkit, index) => (
                            <motion.article
                                key={toolkit.id}
                                layout
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={cardVariants}
                                className="group relative"
                                role="listitem"
                            >
                                <Link href={`/tools/${toolkit.id}`} className="block h-full">
                                    <motion.div
                                        className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-[var(--card-bg)] to-[var(--background)] border border-[var(--border-color)] transition-all duration-300 group-hover:border-[var(--accent)]/50 group-hover:shadow-lg group-hover:shadow-[var(--accent)]/5"
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Top accent bar */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/50 to-[var(--accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Content */}
                                        <div className="relative p-6">
                                            {/* Badges */}
                                            <div className="absolute top-5 right-5 flex gap-2 z-10">
                                                {toolkit.isNew && (
                                                    <motion.span
                                                        className="px-2.5 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full border border-green-500/30 flex items-center gap-1"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: index * 0.1 + 0.3 }}
                                                    >
                                                        <Sparkles className="w-3 h-3" />
                                                        New
                                                    </motion.span>
                                                )}
                                                {toolkit.isPopular && (
                                                    <motion.span
                                                        className="px-2.5 py-1 text-xs font-semibold bg-[var(--accent)]/20 text-[var(--accent)] rounded-full border border-[var(--accent)]/30 flex items-center gap-1"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: index * 0.1 + 0.3 }}
                                                    >
                                                        <Star className="w-3 h-3 fill-current" />
                                                        Popular
                                                    </motion.span>
                                                )}
                                            </div>

                                            {/* Icon with background */}
                                            <div className="mb-5">
                                                <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent)]/20 transition-all duration-300">
                                                    <toolkit.Icon className="w-7 h-7 text-[var(--accent)]" aria-hidden="true" />
                                                </div>
                                            </div>

                                            {/* Title with arrow */}
                                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors">
                                                {toolkit.name}
                                                <motion.div
                                                    initial={{ opacity: 0, x: -5 }}
                                                    whileHover={{ opacity: 1, x: 0 }}
                                                    className="opacity-0 group-hover:opacity-100 transition-all duration-200"
                                                >
                                                    <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
                                                </motion.div>
                                            </h3>

                                            {/* Description */}
                                            <p className="text-[var(--accent-muted)] text-sm leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                                                {toolkit.description}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]/50">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[var(--border-color)] rounded-lg text-[var(--accent-muted)] capitalize bg-[var(--background)]/50">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                                    {toolkit.category}
                                                </span>

                                                {/* CTA Button */}
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[var(--accent)]/20">
                                                    Open Tool
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                    className="text-center py-20 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    role="status"
                    aria-live="polite"
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                        <Search className="w-8 h-8 text-[var(--accent-muted)]" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No tools found</h3>
                    <p className="text-[var(--accent-muted)] mb-6 text-sm max-w-sm mx-auto">
                        We couldn&apos;t find any tools matching your search. Try different keywords or clear the filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-[var(--accent)] text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        <Sparkles className="w-4 h-4" />
                        Show all tools
                    </button>
                </motion.div>
            )}

            {/* Bottom hint */}
            {filteredToolkits.length > 0 && (
                <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-sm text-[var(--accent-muted)]">
                        💡 <span className="font-medium">Tip:</span> All tools work offline and your data never leaves your browser
                    </p>
                </motion.div>
            )}
        </section>
    );
}