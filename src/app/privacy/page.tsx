import { Metadata } from 'next';
import { siteConfig, generateWebPageSchema } from '@/lib/seo';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Read the Toolkit Lab Privacy Policy. Learn how we collect, use, and protect your personal data when you visit our website.',
    keywords: ['privacy policy', 'data protection', 'toolkit lab privacy', 'personal data'],
    alternates: {
        canonical: `${siteConfig.url}/privacy`,
    },
    openGraph: {
        title: 'Privacy Policy - Toolkit Lab',
        description: 'Learn how we collect, use, and protect your personal data.',
        url: `${siteConfig.url}/privacy`,
        siteName: siteConfig.name,
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy - Toolkit Lab',
        description: 'Learn how we collect, use, and protect your personal data.',
    },
};

export default function PrivacyPage() {
    const pageSchema = generateWebPageSchema({
        name: 'Privacy Policy',
        description: 'Toolkit Lab Privacy Policy - How we collect, use, and protect your personal data.',
        url: `${siteConfig.url}/privacy`,
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
            <PrivacyClient />
        </>
    );
}
