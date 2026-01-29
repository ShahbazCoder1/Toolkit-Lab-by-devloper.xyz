'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactClient() {
    return (
        <div className="min-h-screen bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Hero Section */}
                    <div className="space-y-6 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
                        >
                            Get in Touch
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-[var(--accent-muted)] max-w-2xl mx-auto"
                        >
                            Have a question, suggestion, or just want to say hi? We'd love to hear from you.
                        </motion.p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-8 hover:border-[var(--accent)]/50 transition-colors group">
                                <div className="p-3 bg-[var(--accent)]/10 rounded-lg w-fit mb-4 group-hover:bg-[var(--accent)]/20 transition-colors">
                                    <MessageSquare className="w-6 h-6 text-[var(--accent)]" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Community & Support</h3>
                                <p className="text-[var(--accent-muted)] mb-4">
                                    Join the discussion or reach us through our main website.
                                </p>
                                <div className="space-y-3">
                                    <a href="https://github.com/ShahbazCoder1/Toolkit-Lab-by-devloper.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[var(--accent)] transition-colors group/link p-2 -mx-2 rounded-lg hover:bg-[var(--accent)]/5">
                                        <span>GitHub Discussions</span>
                                        <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity ml-1" />
                                    </a>
                                    <a href="https://www.devloper.xyz/contact" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[var(--accent)] transition-colors group/link p-2 -mx-2 rounded-lg hover:bg-[var(--accent)]/5">
                                        <span>Devloper.xyz Contact</span>
                                        <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity ml-1" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
