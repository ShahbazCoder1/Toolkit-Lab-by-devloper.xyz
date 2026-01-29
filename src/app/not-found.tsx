import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6">
                <div className="max-w-3xl w-full text-center space-y-12">

                    <div className="space-y-6">
                        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-[var(--foreground)] opacity-10">
                            404
                        </h1>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                            Page not found
                        </h2>
                        <p className="text-xl text-[var(--accent-muted)] max-w-lg mx-auto">
                            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            href="/"
                            style={{ color: 'var(--background)' }}
                            className="inline-flex justify-center items-center px-8 py-4 rounded-lg bg-[var(--foreground)] font-bold hover:opacity-90 transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Back to Home
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}