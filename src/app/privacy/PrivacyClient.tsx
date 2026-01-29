'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyClient() {
    return (
        <div className="min-h-screen bg-[var(--background)] selection:bg-[var(--accent)] selection:text-black flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
                            Privacy Policy
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
                                    Introduction
                                </h2>
                                <p className="leading-relaxed">
                                    Welcome to Toolkit Lab. We respect your privacy and are committed to protecting your personal data.
                                    This privacy policy will inform you as to how we look after your personal data when you visit our website
                                    (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">2</span>
                                    Data We Collect
                                </h2>
                                <p className="mb-4">
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                                </p>
                                <ul className="space-y-2 bg-black/20 p-6 rounded-xl border border-[var(--border-color)]">
                                    <li><strong className="text-[var(--accent)]">Identity Data</strong>: includes first name, last name, username or similar identifier.</li>
                                    <li><strong className="text-[var(--accent)]">Contact Data</strong>: includes email address.</li>
                                    <li><strong className="text-[var(--accent)]">Technical Data</strong>: includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                                    <li><strong className="text-[var(--accent)]">Usage Data</strong>: includes information about how you use our website, products and services.</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">3</span>
                                    How We Use Your Data
                                </h2>
                                <p className="mb-4">
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border-color)]">
                                        <h3 className="text-lg font-medium text-white mb-2">Contract</h3>
                                        <p className="text-sm">Where we need to perform the contract we are about to enter into or have entered into with you.</p>
                                    </div>
                                    <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border-color)]">
                                        <h3 className="text-lg font-medium text-white mb-2">Legitimate Interest</h3>
                                        <p className="text-sm">Where it is necessary for our legitimate interests and your interests do not override those.</p>
                                    </div>
                                    <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border-color)]">
                                        <h3 className="text-lg font-medium text-white mb-2">Legal Obligation</h3>
                                        <p className="text-sm">Where we need to comply with a legal or regulatory obligation.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">4</span>
                                    Data Security
                                </h2>
                                <p className="leading-relaxed">
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">5</span>
                                    Third-Party Links
                                </h2>
                                <p className="leading-relaxed">
                                    This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                                </p>
                            </section>

                            <section>
                                <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 pb-2 border-b border-[var(--border-color)]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold">6</span>
                                    Contact Us
                                </h2>
                                <p className="leading-relaxed mb-6">
                                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
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
