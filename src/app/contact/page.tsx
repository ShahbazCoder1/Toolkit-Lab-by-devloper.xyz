import { Metadata } from 'next';
import { siteConfig, generateContactPageSchema } from '@/lib/seo';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with the Toolkit Lab team. Have a question, suggestion, or just want to say hi? Reach us through GitHub Discussions or devloper.xyz.',
    keywords: ['contact toolkit lab', 'support', 'feedback', 'developer tools help'],
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    },
    openGraph: {
        title: 'Contact Us - Toolkit Lab',
        description: 'Have a question, suggestion, or just want to say hi? We\'d love to hear from you.',
        url: `${siteConfig.url}/contact`,
        siteName: siteConfig.name,
        type: 'website',
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: 'Contact Toolkit Lab',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us - Toolkit Lab',
        description: 'Have a question, suggestion, or just want to say hi? We\'d love to hear from you.',
        images: [siteConfig.ogImage],
    },
};

export default function ContactPage() {
    const contactSchema = generateContactPageSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(contactSchema),
                }}
            />
            <ContactClient />
        </>
    );
}
