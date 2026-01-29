'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsClient() {
    return (
        <div className="min-h-screen bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-[var(--accent-muted)]">
                            Effective Date: <span className="text-white font-medium">January 1, 2026</span>
                        </p>
                    </div>

                    {/* Content Container */}
                    <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-8 md:p-12 shadow-2xl">
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-[var(--accent-muted)] prose-strong:text-white prose-a:text-[var(--accent)] prose-li:text-[var(--accent-muted)]">

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">1</span>
                                    Agreement to Terms
                                </h2>
                                <p className="leading-relaxed">
                                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and
                                    <strong className="text-white"> Toolkit Lab</strong> ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                                </p>
                                <div className="mt-4 p-4 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-lg">
                                    <p className="text-sm m-0">
                                        This service is owned and operated by <strong className="text-[var(--accent)]">devloper.xyz</strong>.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">2</span>
                                    Intellectual Property Rights
                                </h2>
                                <p className="leading-relaxed mb-4">
                                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                                </p>
                                <p className="leading-relaxed p-4 bg-black/20 rounded-lg border border-[var(--border-color)]">
                                    However, consistent with our mission to help developers, specific parts of the codebase are open-sourced and available under the <strong className="text-white">MIT License</strong> as specified in our GitHub repository.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">3</span>
                                    User Representations
                                </h2>
                                <p className="mb-4">By using the Site, you represent and warrant that:</p>
                                <ul className="space-y-3 bg-black/20 p-6 rounded-xl border border-[var(--border-color)]">
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2.5"></span>
                                        <span>All registration information you submit will be true, accurate, current, and complete.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2.5"></span>
                                        <span>You will maintain the accuracy of such information and promptly update such registration information as necessary.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2.5"></span>
                                        <span>You have the legal capacity and you agree to comply with these Terms of Service.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2.5"></span>
                                        <span>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</span>
                                    </li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">4</span>
                                    Prohibited Activities
                                </h2>
                                <p className="leading-relaxed">
                                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">5</span>
                                    Disclaimer
                                </h2>
                                <div className="bg-[var(--accent)]/5 border-l-4 border-[var(--accent)] p-6 rounded-r-lg">
                                    <p className="italic text-[var(--accent-muted)] m-0">
                                        "The Site is provided on an as-is and as-available basis. You agree that your use of the Site and our services will be at your sole risk."
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">6</span>
                                    Contact Us
                                </h2>
                                <p className="leading-relaxed mb-6">
                                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                                </p>
                                <a
                                    href="mailto:contact@devloper.xyz"
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition-opacity no-underline"
                                >
                                    contact@devloper.xyz
                                </a>
                            </section>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
