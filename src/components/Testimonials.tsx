'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/content';

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

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="py-24 border-t border-[var(--border-color)]"
            aria-labelledby="testimonials-heading"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 id="testimonials-heading" className="text-3xl font-bold mb-4">
                        Loved by developers worldwide
                    </h2>
                    <p className="text-[var(--accent-muted)]">
                        Join thousands of developers who use toolkit lab daily.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.blockquote
                            key={index}
                            className="p-6 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors bg-[var(--card-bg)]"
                            variants={itemVariants}
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                                ))}
                            </div>
                            <p className="text-sm leading-relaxed mb-6 text-[var(--accent-muted)]">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>
                            <footer className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-muted)] flex items-center justify-center text-black font-medium text-xs">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <cite className="text-sm font-medium not-italic block">{testimonial.author}</cite>
                                    <span className="text-xs text-[var(--accent-muted)]">{testimonial.role}</span>
                                </div>
                            </footer>
                        </motion.blockquote>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
