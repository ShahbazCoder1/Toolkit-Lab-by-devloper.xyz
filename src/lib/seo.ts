import { Metadata } from 'next';
import { Toolkit } from '@/data/content';

// ============================================================================
// Site Constants
// ============================================================================

export const siteConfig = {
    name: 'Toolkit Lab',
    description: 'Free developer tools to streamline your workflow. JWT Debugger, QR Studio, Code Snaps, Meta Tags Generator, README Wizard, and more. All tools run client-side for maximum privacy.',
    shortDescription: 'Essential tools for modern developers. Streamline your workflow with our curated collection of utilities, generators, and debuggers.',
    url: 'https://toolkit.devloper.xyz',
    ogImage: 'https://toolkit.devloper.xyz/opengraph-image.png',
    author: {
        name: 'Shahbaz Hashmi Ansari',
        url: 'https://www.devloper.xyz',
    },
    creator: 'devloper.xyz',
    keywords: [
        'developer tools',
        'JWT debugger',
        'QR code generator',
        'code screenshots',
        'README generator',
        'gitignore generator',
        'meta tags generator',
        'free developer utilities',
        'web development tools',
        'client-side tools',
        'privacy-first tools',
    ],
    links: {
        github: 'https://github.com/ShahbazCoder1/Toolkit-Lab-by-devloper.xyz',
    },
};

// ============================================================================
// Default Metadata
// ============================================================================

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} | Developer Tools Simplified`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.shortDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: `${siteConfig.name} - Free Developer Tools`,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} - Free Developer Tools`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.name} - Free Developer Tools`,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@devloperxyz',
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/icon1.png', type: 'image/png' },
        ],
        apple: [{ url: '/apple-icon.png' }],
    },
    manifest: '/manifest.json',
    alternates: {
        canonical: siteConfig.url,
    },
};

// ============================================================================
// JSON-LD Schema Generators
// ============================================================================

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon1.png`,
        description: siteConfig.description,
        founder: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.author.url,
        },
        sameAs: [
            siteConfig.links.github,
            siteConfig.author.url,
        ],
    };
}

export function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

export function generateSoftwareApplicationSchema(tool: Toolkit) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.longDescription,
        url: `${siteConfig.url}/tools/${tool.id}`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: tool.features,
        author: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };
}

export function generateCollectionPageSchema(tools: Toolkit[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'All Developer Tools',
        description: 'Complete collection of free developer tools including JWT Debugger, QR Studio, Code Snaps, Meta Tags Generator, README Wizard, and gitignore Generator.',
        url: `${siteConfig.url}/tools`,
        isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: tools.length,
            itemListElement: tools.map((tool, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'SoftwareApplication',
                    name: tool.name,
                    description: tool.description,
                    url: `${siteConfig.url}/tools/${tool.id}`,
                },
            })),
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateWebPageSchema(options: {
    name: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: options.name,
        description: options.description,
        url: options.url,
        isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        ...(options.datePublished && { datePublished: options.datePublished }),
        ...(options.dateModified && { dateModified: options.dateModified }),
    };
}

export function generateContactPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Us',
        description: 'Get in touch with the Toolkit Lab team for questions, suggestions, or support.',
        url: `${siteConfig.url}/contact`,
        mainEntity: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                url: 'https://www.devloper.xyz/contact',
            },
        },
    };
}

export function generateAboutPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Toolkit Lab',
        description: 'Learn about Toolkit Lab, our mission to empower developers with essential free tools, and our commitment to open source.',
        url: `${siteConfig.url}/about`,
        mainEntity: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            founder: {
                '@type': 'Person',
                name: siteConfig.author.name,
            },
        },
    };
}
