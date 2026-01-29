'use client';

import { Zap } from 'lucide-react';
import { toolkits, footerLinks } from '@/data/content';

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-color)] py-12" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <a href="/" className="flex items-center gap-2 mb-4" aria-label="toolkit lab home">
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
                        </a>
                        <p className="text-sm text-[var(--accent-muted)] mb-4">
                            Essential developer tools, all in one place.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Tools</h3>
                        <ul className="space-y-3 text-sm text-[var(--accent-muted)]">
                            {toolkits.slice(0, 4).map((toolkit) => (
                                <li key={toolkit.id}>
                                    <a href={`/tools/${toolkit.id}`} className="hover:text-white transition-colors">
                                        {toolkit.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm text-[var(--accent-muted)]">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-[var(--accent-muted)]">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[var(--accent-muted)]">
                        © {new Date().getFullYear()} toolkitLab. All rights reserved.
                    </p>
                    <p className="text-sm text-[var(--accent-muted)]">
                        Made with ❤️ for developers everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
}
