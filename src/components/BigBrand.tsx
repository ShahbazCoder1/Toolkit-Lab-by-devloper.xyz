'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

export default function BigBrand() {
    return (
        <section
            className="relative py-32 lg:py-40 overflow-hidden"
            aria-labelledby="brand-heading"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[var(--background)]">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* Static Orbs (no animation) */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Big Brand Name */}
                    <div className="relative inline-block mb-6">
                        <motion.h2
                            id="brand-heading"
                            className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter"
                            initial={{ opacity: 0, scale: 0.95, letterSpacing: "-0.05em" }}
                            whileInView={{ opacity: 1, scale: 1, letterSpacing: "-0.02em" }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        >
                            <span className="text-white drop-shadow-2xl">toolkit</span>
                            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-muted)] bg-clip-text text-transparent opacity-90">
                                Lab
                            </span>
                        </motion.h2>

                        {/* Decorative line */}
                        <motion.div
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[var(--accent)] rounded-full"
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: 96, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        />
                    </div>

                    {/* Tagline */}
                    <motion.p
                        className="text-lg md:text-2xl text-[var(--accent-muted)] mb-12 max-w-2xl mx-auto leading-relaxed font-light mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Essential tools for modern developers.
                        <br />
                        <span className="text-white font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Build faster. Ship smarter.
                        </span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        {/* Primary Button */}
                        <a
                            href="#toolkits"
                            className="group relative h-14 px-8 rounded-md bg-white text-black font-bold text-lg inline-flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] transition-all"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
                                Explore Tools
                            </span>

                            <ArrowRight className="w-5 h-5 relative z-10 text-black group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
                        </a>

                        {/* Secondary Button */}
                        <a
                            href="https://github.com/toolkitlab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-14 px-8 rounded-md border border-[var(--border-color)] bg-white/5 backdrop-blur-sm text-[var(--accent-muted)] font-medium text-lg inline-flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300"
                        >
                            <Github className="w-5 h-5" />
                            Star on GitHub
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
