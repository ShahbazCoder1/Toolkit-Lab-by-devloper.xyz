import { Metadata } from 'next';
import { siteConfig, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: `${siteConfig.name} - Free Developer Tools | JWT Debugger, QR Studio, Code Snaps & More`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} - Free Developer Tools`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
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
  },
};

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <HomeClient />
    </>
  );
}