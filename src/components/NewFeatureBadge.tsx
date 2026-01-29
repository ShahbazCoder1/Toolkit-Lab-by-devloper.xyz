import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

// Define variants if they aren't imported from parent
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function NewFeatureBadge() {
    return (
        <Link href="/tools/jwt-debugger" className="inline-block group relative z-10 focus:outline-none">
            <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-8
                   border border-[var(--border-color)] rounded-full
                   text-sm text-[var(--accent-muted)] font-medium
                   bg-[var(--card-bg)]/50 backdrop-blur-sm
                   group-hover:text-white group-hover:border-[var(--accent)]/50
                   transition-colors cursor-pointer overflow-hidden relative"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
            >
                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    variants={{
                        hover: { x: ['100%', '-100%'] }
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ x: '100%' }}
                />

                <Sparkles className="w-4 h-4 text-[var(--accent)]" />

                <span className="relative">New: JWT Debugger now available</span>

                <motion.span
                    className="relative inline-flex"
                    variants={{
                        hover: { x: 4 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <ArrowRight className="w-4 h-4" />
                </motion.span>
            </motion.div>
        </Link>
    );
}