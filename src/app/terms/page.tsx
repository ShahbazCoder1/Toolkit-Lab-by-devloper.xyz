import { Metadata } from 'next';
import { siteConfig, generateWebPageSchema } from '@/lib/seo';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read the Toolkit Lab Terms of Service. Understand your rights and responsibilities when using our developer tools and website.',
    keywords: ['terms of service', 'terms and conditions', 'toolkit lab terms', 'user agreement'],
    alternates: {
        canonical: `${siteConfig.url}/terms`,
    },
    openGraph: {
        title: 'Terms of Service - Toolkit Lab',
        description: 'Understand your rights and responsibilities when using our developer tools.',
        url: `${siteConfig.url}/terms`,
        siteName: siteConfig.name,
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Terms of Service - Toolkit Lab',
        description: 'Understand your rights and responsibilities when using our developer tools.',
    },
};

export default function TermsPage() {
    const pageSchema = generateWebPageSchema({
        name: 'Terms of Service',
        description: 'Toolkit Lab Terms of Service - Your rights and responsibilities when using our developer tools.',
        url: `${siteConfig.url}/terms`,
        datePublished: '2026-01-01',
        dateModified: '2026-01-01',
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(pageSchema),
                }}
            />
            <TermsClient />
        </>
    );
}
