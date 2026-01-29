import { toolkits, Toolkit } from '@/data/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig, generateSoftwareApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo';

// Tool Components
import ReadmeGenerator from '@/components/tools/ReadmeGenerator';
import GitignoreGenerator from '@/components/tools/GitignoreGenerator';
import MetaTagGenerator from '@/components/tools/MetaTagGenerator';
import CodeSnaps from '@/components/tools/CodeSnaps';
import QrCodeGenerator from '@/components/tools/QrCodeGenerator';
import JwtDebugger from '@/components/tools/JwtDebugger';

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
    'readme-wizard': ReadmeGenerator,
    'gitignore-gen': GitignoreGenerator,
    'meta-tags': MetaTagGenerator,
    'code-snaps': CodeSnaps,
    'qr-studio': QrCodeGenerator,
    'jwt-debugger': JwtDebugger,
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all toolkits
export async function generateStaticParams() {
    return toolkits.map((toolkit) => ({
        slug: toolkit.id,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = toolkits.find((t) => t.id === slug);

    if (!tool) {
        return {
            title: 'Tool Not Found',
            description: 'The requested tool could not be found.',
            robots: { index: false, follow: false },
        };
    }

    const toolUrl = `${siteConfig.url}/tools/${tool.id}`;
    const categoryKeywords: Record<string, string[]> = {
        documentation: ['documentation', 'README', 'markdown', 'docs generator'],
        git: ['git', 'gitignore', 'version control', 'repository'],
        seo: ['SEO', 'meta tags', 'Open Graph', 'Twitter Cards', 'social media'],
        design: ['code screenshots', 'code images', 'syntax highlighting', 'code beautifier'],
        tools: ['QR code', 'QR generator', 'barcode', 'utilities'],
        security: ['JWT', 'JSON Web Token', 'authentication', 'token debugger'],
    };

    return {
        title: tool.name,
        description: tool.longDescription,
        keywords: [
            tool.name,
            'free tool',
            'developer tool',
            'online tool',
            ...(categoryKeywords[tool.category] || []),
            ...tool.features.slice(0, 3),
        ],
        alternates: {
            canonical: toolUrl,
        },
        openGraph: {
            title: `${tool.name} - Free Online Developer Tool`,
            description: tool.longDescription,
            url: toolUrl,
            siteName: siteConfig.name,
            type: 'website',
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${tool.name} - ${siteConfig.name}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${tool.name} - Free Online Developer Tool`,
            description: tool.description,
            images: [siteConfig.ogImage],
        },
    };
}

export default async function ToolkitPage({ params }: PageProps) {
    const { slug } = await params;
    const tool = toolkits.find((t) => t.id === slug);
    const ToolComponent = TOOL_COMPONENTS[slug];

    if (!tool) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Tool not found</h1>
                        <Link href="/" className="text-[var(--accent)] hover:underline">
                            Return Home
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const softwareSchema = generateSoftwareApplicationSchema(tool);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: siteConfig.url },
        { name: 'Tools', url: `${siteConfig.url}/tools` },
        { name: tool.name, url: `${siteConfig.url}/tools/${tool.id}` },
    ]);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(softwareSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <Header />

            <main>
                {/* Tool Interaction Section - The Main Event */}
                <section className="py-12 bg-[var(--background)] border-y border-[var(--border-color)]" id="tool-workspace">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        {ToolComponent ? (
                            <ToolComponent />
                        ) : (
                            <div className="text-center py-20 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] border-dashed">
                                <p className="text-[var(--accent-muted)]">Tool implementation coming soon...</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Detailed Content Section */}
                <section className="py-16 md:py-24 bg-[var(--background)]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="grid md:grid-cols-3 gap-12">
                            {/* Main Description */}
                            <div className="md:col-span-2">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    About {tool.name}
                                </h2>
                                <div className="prose prose-invert max-w-none text-[var(--accent-muted)] leading-loose">
                                    <p>{tool.longDescription}</p>
                                    <p className="mt-4">
                                        This tool is designed to run entirely in your browser. We prioritize your privacy and speed, ensuring a seamless local development experience without any server-side latency or data persistence risks.
                                    </p>
                                </div>
                            </div>

                            {/* Features List */}
                            <div>
                                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                    Key Features
                                </h3>
                                <ul className="space-y-4">
                                    {tool.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-[var(--accent-muted)]">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-[var(--accent)]" />
                                            </div>
                                            <span className="leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
