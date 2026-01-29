import {
    FileText,
    GitBranch,
    Tag,
    Camera,
    QrCode,
    Lock,
    Users,
    Zap,
    Star,
    Check
} from 'lucide-react';

export interface Toolkit {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    features: string[];
    Icon: React.ComponentType<{ className?: string }>;
    category: string;
    isNew?: boolean;
    isPopular?: boolean;
}

export const toolkits: Toolkit[] = [
    {
        id: 'readme-wizard',
        name: 'README Wizard',
        description: 'Create professional READMEs instantly with smart templates and live preview.',
        longDescription: 'Crafting a compelling README is crucial for your project\'s success. The README Wizard creates professional, comprehensive documentation in seconds. Choose from battle-tested templates, customize sections with a simple UI, and see changes in real-time. Export perfectly formatted Markdown ready for GitHub, GitLab, or Bitbucket.',
        features: [
            'Real-time Markdown preview',
            'One-click template definitions',
            'Automatic Table of Contents generation',
            'Badge and shield integration',
            'Project structure visualization',
            'Contributor acknowledgement section'
        ],
        Icon: FileText,
        category: 'documentation',
        isPopular: true
    },
    {
        id: 'gitignore-gen',
        name: 'gitignore Gen',
        description: 'Standard .gitignore files for any project. 300+ templates available.',
        longDescription: 'Never commit unnecessary files again. gitignore Gen helps you create the perfect .gitignore file for your specific technology stack. Mix and match operating systems, IDEs, and languages to generate a clean, standard-compliant ignore file that keeps your repository healthy.',
        features: [
            'Support for 300+ languages and frameworks',
            'Combine multiple templates (e.g., Node + VSCode + Mac)',
            'Smart search with autocomplete',
            'One-click copy to clipboard',
            'Always up-to-date with GitHub\'s standard templates',
            'Preview generated content before downloading'
        ],
        Icon: GitBranch,
        category: 'git'
    },
    {
        id: 'meta-tags',
        name: 'Meta Tags',
        description: 'SEO & Social media card previewer with real-time validation.',
        longDescription: 'Visualize exactly how your content will appear when shared on social media. The Meta Tags tool lets you preview and edit Open Graph, Twitter Cards, and standard SEO meta tags. Ensure your links look perfect on Google, Facebook, Twitter, LinkedIn, and Slack before you publish.',
        features: [
            'Live preview for Google, Facebook, Twitter, and LinkedIn',
            'One-click meta tag generation',
            'Image validation and preview',
            'Character count warnings for SEO best practices',
            'Support for all major meta tag standards',
            'Export detailed HTML snippets'
        ],
        Icon: Tag,
        category: 'seo',
        isNew: true
    },
    {
        id: 'code-snaps',
        name: 'Code Snaps',
        description: 'Beautiful code screenshots with syntax highlighting and themes.',
        longDescription: 'Turn your code snippets into shareable works of art. Code Snaps allows you to generate beautiful, high-quality images of your code. Customize background gradients, window borders, fonts, and syntax highlighting themes to match your personal brand. Perfect for social media, slideshows, and documentation.',
        features: [
            'Syntax highlighting for 100+ languages',
            'Customizable background gradients and colors',
            'Window controls and shadow effects',
            'Export as PNG or SVG',
            'Line numbers and highlighting support',
            'Preserves indentation and formatting'
        ],
        Icon: Camera,
        category: 'design',
        isPopular: true
    },
    {
        id: 'qr-studio',
        name: 'QR Studio',
        description: 'Customizable QR codes with logos, colors, and export options.',
        longDescription: 'Create distinct, branded QR codes that stand out. QR Studio goes beyond basic black-and-white squares, allowing you to customize colors, shapes, and embed your logo directly into the code. perfect for marketing materials, business cards, and digital sharing.',
        features: [
            'Custom foreground and background colors',
            'Embed custom logos and icons',
            'Adjustable error correction levels',
            'Various dot styles and corner shapes',
            'High-resolution vector export',
            'Scan validity checker'
        ],
        Icon: QrCode,
        category: 'tools'
    },
    {
        id: 'jwt-debugger',
        name: 'JWT Debugger',
        description: 'Securely inspect and validate JSON Web Tokens client-side.',
        longDescription: 'Debug and validate JSON Web Tokens (JWT) directly in your browser without compromising security. Your keys and tokens never leave your device. Inspect headers, payload data, and verify signatures with an intuitive, color-coded interface.',
        features: [
            'Client-side only processing for maximum security',
            'Color-coded token parts (Header, Payload, Signature)',
            'Timestamp conversion to human-readable dates',
            'Signature verification support',
            'One-click format and copy',
            'Support for common algorithms (HS256, RS256, etc.)'
        ],
        Icon: Lock,
        category: 'security',
        isNew: true
    }
];

export const categories = ['all', 'documentation', 'git', 'seo', 'design', 'tools', 'security'];

export const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Tools Available', value: '6+', icon: Zap },
    { label: 'GitHub Stars', value: '2.5K', icon: Star }
];

export const testimonials = [
    {
        quote: "toolkit lab has become an essential part of my daily workflow. The README wizard alone saves me hours.",
        author: "Sarah Chen",
        role: "Senior Developer @ Vercel",
        avatar: "SC"
    },
    {
        quote: "Finally, developer tools that just work. No signup, no bloat, just pure productivity.",
        author: "Marcus Johnson",
        role: "Lead Engineer @ Stripe",
        avatar: "MJ"
    },
    {
        quote: "The privacy-first approach is exactly what I was looking for. Everything runs in my browser.",
        author: "Emily Rodriguez",
        role: "Security Engineer @ GitHub",
        avatar: "ER"
    }
];

export const navigation = {
    home: { href: '/', label: 'Home' },
    tools: { href: '/tools', label: 'Tools' },
    items: [
        { href: '/#features', label: 'Features' },
        { href: '/#testimonials', label: 'Testimonials' },
    ]
};

export const socialLinks = {
    github: "https://github.com/toolkitlab",
};

export const footerLinks = {
    resources: [
        { label: 'devloper.xyz', href: 'https://www.devloper.xyz/' },
    ],
    company: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
    ]
};
