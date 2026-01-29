import { Metadata } from 'next';
import { siteConfig, generateAboutPageSchema } from '@/lib/seo';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Toolkit Lab, our mission to empower developers with essential free tools, and our commitment to open source. Created by Shahbaz Hashmi Ansari at devloper.xyz.',
    keywords: ['about toolkit lab', 'developer tools', 'open source', 'devloper.xyz', 'Shahbaz Hashmi Ansari'],
    alternates: {
        canonical: `${siteConfig.url}/about`,
    },
    openGraph: {
        title: 'About Toolkit Lab',
        description: 'Empowering developers with essential tools to streamline their workflow.',
        url: `${siteConfig.url}/about`,
        siteName: siteConfig.name,
        type: 'website',
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: 'About Toolkit Lab',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Toolkit Lab',
        description: 'Empowering developers with essential tools to streamline their workflow.',
        images: [siteConfig.ogImage],
    },
};

export default function AboutPage() {
    const aboutSchema = generateAboutPageSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutSchema),
                }}
            />
            <AboutClient />
        </>
    );
}
