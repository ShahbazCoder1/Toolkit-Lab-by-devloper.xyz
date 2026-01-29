import { Metadata } from 'next';
import { toolkits } from '@/data/content';
import { siteConfig, generateCollectionPageSchema } from '@/lib/seo';
import ToolsClient from './ToolsClient';

export const metadata: Metadata = {
    title: 'All Developer Tools',
    description: 'Explore our complete collection of free developer tools including JWT Debugger, QR Studio, Code Snaps, Meta Tags Generator, README Wizard, and gitignore Generator. All tools run client-side for privacy.',
    keywords: [
        'developer tools',
        'free tools',
        'JWT debugger',
        'QR code generator',
        'code screenshots',
        'README generator',
        'gitignore generator',
        'meta tags generator',
    ],
    alternates: {
        canonical: `${siteConfig.url}/tools`,
    },
    openGraph: {
        title: 'All Developer Tools - Toolkit Lab',
        description: 'Complete collection of free developer tools. JWT Debugger, QR Studio, Code Snaps, Meta Tags, README Wizard, and more.',
        url: `${siteConfig.url}/tools`,
        siteName: siteConfig.name,
        type: 'website',
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: 'Toolkit Lab Developer Tools',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'All Developer Tools - Toolkit Lab',
        description: 'Complete collection of free developer tools.',
        images: [siteConfig.ogImage],
    },
};

export default function ToolsPage() {
    const collectionSchema = generateCollectionPageSchema(toolkits);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(collectionSchema),
                }}
            />
            <ToolsClient />
        </>
    );
}
