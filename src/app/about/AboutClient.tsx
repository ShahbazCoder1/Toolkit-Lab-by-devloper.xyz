'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutClient() {
    return (
        <div className="min-h-screen bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-16 px-4 cursor-default">
                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Hero Section */}
                    <div className="space-y-6 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
                        >
                            About Toolkit Lab
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-[var(--accent-muted)] max-w-2xl mx-auto"
                        >
                            Empowering developers with essential tools to streamline their workflow.
                        </motion.p>
                    </div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-invert max-w-none space-y-8 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-8 md:p-12 shadow-2xl"
                    >
                        {/* Ownership */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                <span className="w-1 h-6 bg-[var(--accent)] rounded-full"></span>
                                Who We Are
                            </h2>
                            <p className="text-[var(--accent-muted)] leading-relaxed">
                                Toolkit Lab is proudly owned and operated by <strong className="text-white">devloper.xyz</strong>.
                                This project is the solo creation of <strong className="text-white">Shahbaz Hashmi Ansari</strong>,
                                dedicated to building useful resources for the developer community.
                            </p>
                        </section>

                        {/* Mission */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                <span className="w-1 h-6 bg-[var(--accent)] rounded-full"></span>
                                Our Mission
                            </h2>
                            <p className="text-[var(--accent-muted)] leading-relaxed">
                                Our goal is to provide a comprehensive collection of developer tools that are particularly helpful for beginners
                                and seasoned pros alike. We believe in simplifying complex tasks and making development more efficient accessible to everyone.
                            </p>
                        </section>

                        {/* Open Source */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-[var(--accent)] rounded-full"></span>
                                    Open Source
                                </h2>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                                    MIT License
                                </span>
                            </div>
                            <p className="text-[var(--accent-muted)] leading-relaxed">
                                Transparency and collaboration are at the heart of Toolkit Lab. The entire codebase for this website is
                                <strong className="text-white"> open source</strong>. We encourage developers to explore, learn from, and contribute to the project.
                            </p>

                            <div className="bg-black/40 rounded-xl p-6 border border-[var(--border-color)]">
                                <p className="text-sm text-[var(--accent-muted)] mb-4">
                                    Have an idea for a new tool? Found a bug? Want to fix a typo?
                                    Contributions are always welcome!
                                </p>
                                <a
                                    href="https://github.com/toolkitlab"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--surface-highlight)] hover:bg-[var(--accent)] text-white hover:text-black transition-all font-medium group"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>Contribute on GitHub</span>
                                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                </a>
                            </div>
                        </section>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
