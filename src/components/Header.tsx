'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, Github, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { toolkits, navigation, socialLinks } from '@/data/content';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

    // Close menu on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
                setToolsDropdownOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    // Close mobile menu on route change or resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMobileMenu = () => setMobileMenuOpen(false);



    return (
        <>
            {/* Main Header */}
            <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--background)]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative w-10 h-9 sm:w-12 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
                                {/* Left brace */}
                                <div className="absolute left-0 w-4 sm:w-5 h-9 sm:h-11 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-muted)] rounded-l-xl flex items-center justify-center">
                                    <span className="text-black font-mono font-black text-lg sm:text-xl">{`{`}</span>
                                </div>
                                {/* Terminal icon center */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black rounded-lg flex items-center justify-center shadow-lg">
                                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent)]" strokeWidth={2.5} />
                                    </div>
                                </div>
                                {/* Right brace */}
                                <div className="absolute right-0 w-4 sm:w-5 h-9 sm:h-11 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-muted)] rounded-r-xl flex items-center justify-center">
                                    <span className="text-black font-mono font-black text-lg sm:text-xl">{`}`}</span>
                                </div>
                            </div>
                            <span className="text-xl font-semibold">
                                toolkit<span className="text-[var(--accent-muted)]">Lab</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href={navigation.home.href}
                                className="px-3 py-2 text-sm text-[var(--accent-muted)] hover:text-white rounded-lg hover:bg-white/5 transition-all"
                            >
                                {navigation.home.label}
                            </Link>
                            {/* Tools Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setToolsDropdownOpen(true)}
                                onMouseLeave={() => setToolsDropdownOpen(false)}
                            >
                                <button className="flex items-center gap-1 px-3 py-2 text-sm text-[var(--accent-muted)] hover:text-white rounded-lg hover:bg-white/5 transition-all">
                                    Tools
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {toolsDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-0 mt-1 w-[480px] p-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl shadow-2xl"
                                        >
                                            <div className="grid grid-cols-2 gap-2">
                                                {toolkits.map((tool) => (
                                                    <Link
                                                        key={tool.id}
                                                        href={`/tools/${tool.id}`}
                                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                                    >
                                                        <div className="p-2 rounded-lg bg-[var(--accent)]/10 group-hover:bg-[var(--accent)]/20 transition-colors">
                                                            <tool.Icon className="w-4 h-4 text-[var(--accent)]" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-white group-hover:text-[var(--accent)] transition-colors">
                                                                {tool.name}
                                                            </div>
                                                            <div className="text-xs text-[var(--accent-muted)] line-clamp-1 mt-0.5">
                                                                {tool.description}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
                                                <Link
                                                    href={navigation.tools.href}
                                                    className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[var(--accent-muted)] hover:text-[var(--accent)] transition-colors"
                                                >
                                                    View all tools
                                                    <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Nav Links */}
                            {navigation.items.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 text-sm text-[var(--accent-muted)] hover:text-white rounded-lg hover:bg-white/5 transition-all"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* GitHub */}
                            <a
                                href={socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 text-sm text-[var(--accent-muted)] hover:text-white rounded-lg hover:bg-white/5 transition-all"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>

                            {/* CTA */}
                            <Link
                                href="#toolkits"
                                className="ml-2 px-4 py-2 text-sm font-medium text-black btn-primary bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Get Started
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-[var(--accent-muted)] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Separate from header, full screen overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] md:hidden"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black" />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="relative h-full flex flex-col bg-[#0a0a0a]"
                        >
                            {/* Mobile Header */}
                            <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-color)]">
                                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
                                    <div className="relative w-9 h-8 flex items-center justify-center">
                                        <div className="absolute left-0 w-3.5 h-8 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-muted)] rounded-l-lg flex items-center justify-center">
                                            <span className="text-black font-mono font-black text-sm">{`{`}</span>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="w-5 h-5 bg-[#0a0a0a] rounded-md flex items-center justify-center border border-[var(--border-color)]">
                                                <Zap className="w-3 h-3 text-[var(--accent)]" strokeWidth={2.5} />
                                            </div>
                                        </div>
                                        <div className="absolute right-0 w-3.5 h-8 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-muted)] rounded-r-lg flex items-center justify-center">
                                            <span className="text-black font-mono font-black text-sm">{`}`}</span>
                                        </div>
                                    </div>
                                    <span className="text-lg font-semibold tracking-tight">
                                        toolkit<span className="text-[var(--accent-muted)]">Lab</span>
                                    </span>
                                </Link>
                                <button
                                    onClick={closeMobileMenu}
                                    className="p-2 text-[var(--accent-muted)] hover:text-white rounded-lg transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Navigation */}
                            <div className="flex-1 p-4 space-y-1">
                                {/* Home - Active style */}
                                <Link
                                    href={navigation.home.href}
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white font-medium"
                                >
                                    <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                                    {navigation.home.label}
                                </Link>

                                {navigation.items.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--accent-muted)] hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Tools Section */}
                                <div className="pt-4">
                                    <div className="px-4 pb-2 text-xs font-medium text-[var(--accent-muted)] uppercase tracking-wider">
                                        Tools
                                    </div>
                                    <div className="grid grid-cols-2 gap-1">
                                        {toolkits.map((tool) => (
                                            <Link
                                                key={tool.id}
                                                href={`/tools/${tool.id}`}
                                                onClick={closeMobileMenu}
                                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[var(--accent-muted)] hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                <tool.Icon className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                                                <span className="text-sm truncate">{tool.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* More Links */}
                                <div className="pt-4 space-y-1">

                                    <a
                                        href={socialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--accent-muted)] hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                    </a>
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="p-4 border-t border-[var(--border-color)]">
                                <Link
                                    href="#toolkits"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center w-full btn-primary text-center mt-4 py-3 bg-[var(--accent)] text-black rounded-lg font-medium"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}