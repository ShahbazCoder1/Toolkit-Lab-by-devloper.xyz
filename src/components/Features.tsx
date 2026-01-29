'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Target, Check } from 'lucide-react';

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

export default function Features() {
    return (
        <section
            id="features"
            className="border-t border-[var(--border-color)] py-24 bg-[var(--background)]"
            aria-labelledby="features-heading"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 id="features-heading" className="text-3xl font-bold mb-4">
                        Why developers love{' '}
                        <span className="text-[var(--accent)]">toolkit lab</span>
                    </h2>
                    <p className="text-[var(--accent-muted)] max-w-xl mx-auto">
                        Built with developers in mind, focusing on speed, privacy, and simplicity.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="text-center p-8 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors bg-[var(--card-bg)]"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="w-12 h-12 mx-auto mb-6 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Zap className="w-6 h-6 text-[var(--accent)]" aria-hidden="true" />
                        </motion.div>
                        <h3 className="text-lg font-semibold mb-3">Lightning Fast</h3>
                        <p className="text-sm text-[var(--accent-muted)] leading-relaxed">
                            Instant results with no loading spinners. All tools are optimized for speed and efficiency.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center p-8 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors bg-[var(--card-bg)]"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="w-12 h-12 mx-auto mb-6 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Shield className="w-6 h-6 text-[var(--accent)]" aria-hidden="true" />
                        </motion.div>
                        <h3 className="text-lg font-semibold mb-3">Privacy Focused</h3>
                        <p className="text-sm text-[var(--accent-muted)] leading-relaxed">
                            All tools run 100% client-side. Your data never leaves your browser. No tracking, no analytics.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center p-8 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors bg-[var(--card-bg)]"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="w-12 h-12 mx-auto mb-6 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Target className="w-6 h-6 text-[var(--accent)]" aria-hidden="true" />
                        </motion.div>
                        <h3 className="text-lg font-semibold mb-3">Developer First</h3>
                        <p className="text-sm text-[var(--accent-muted)] leading-relaxed">
                            Built by developers, for developers. Keyboard shortcuts, dark mode, and no unnecessary features.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Additional Features List */}
                <motion.div
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {[
                        'No signup required',
                        'Open source',
                        'Regular updates',
                        'Mobile friendly',
                        'Keyboard shortcuts',
                        'Export options',
                        'Dark mode',
                        'API access'
                    ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-sm text-[var(--accent-muted)] justify-center md:justify-start">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
