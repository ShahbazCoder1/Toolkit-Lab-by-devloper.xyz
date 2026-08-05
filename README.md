<div align="center">
  <img src="https://raw.githubusercontent.com/ShahbazCoder1/Toolkit-Lab-by-devloper.xyz/refs/heads/main/src/app/apple-icon.png" alt="Toolkit Lab Logo" width="150" />

  #  Toolkit Lab

  <p>Free, privacy-first developer utilities that run entirely in your browser. No signup, no server processing, no data stored.</p>


   ![License](https://img.shields.io/badge/License-MIT-blue.svg)

  <p>
    <a href="https://toolkit-lab-by-devloper-xyz.vercel.app/" target="_blank">🚀 Visit Toolkit Lab</a>
  </p>
    <p>
              <i>If you found Toolkit Lab useful, please give it a star ⭐ on GitHub. Thank you for your support!</i>
    </p>
</div>

## Features

### 🔧 Tools for Developers

- **README Wizard**: Generate professional READMEs with smart templates, live Markdown preview, and auto-generated Table of Contents
- **gitignore Gen**: Create `.gitignore` files from 300+ language and framework templates, combinable (e.g., Node + VSCode + macOS)
- **Meta Tags**: Preview and validate Open Graph, Twitter Cards, and SEO meta tags for Google, Facebook, Twitter, and LinkedIn
- **Code Snaps**: Turn code snippets into beautiful, shareable images with syntax highlighting for 100+ languages and customizable themes
- **QR Studio**: Generate branded QR codes with custom colors, embedded logos, adjustable error correction, and high-res export
- **JWT Debugger**: Inspect and validate JSON Web Tokens (HS256, RS256, etc.) with color-coded headers, payloads, and signature verification

### 🛡️ Privacy & Security

- All tools run **entirely client-side**. No data ever leaves your browser
- No accounts, no signups, no analytics tracking
- No server-side processing or data storage

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, static generation) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Smooth Scrolling | [Lenis](https://lenis.darkroom.engineering/) |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) (Tabs) |
| Icons | [Lucide React](https://lucide.dev/) · [React Icons](https://react-icons.github.io/react-icons/) |
| QR Generation | [qrcode](https://github.com/soldair/node-qrcode) |
| Code Screenshots | [html-to-image](https://github.com/bubkoo/html-to-image) |
| Fonts | [Geist](https://vercel.com/font) · [Inter](https://rsms.me/inter/) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) |
| Linting | [ESLint](https://eslint.org/) (next config) |
## Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/) package manager

## Installation
### Clone the repository
```bash
git clone https://github.com/ShahbazCoder1/Toolkit-Lab-by-devloper.xyz.git
cd Toolkit-Lab-by-devloper.xyz
```

### Install the project dependencies
```bash
npm install
```

### Start the development server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.
## Usage Examples

### Generate a README in seconds

Navigate to the **README Wizard**, pick a template, fill in your project details, and export polished Markdown — ready to paste into your repo.

### Create a `.gitignore` for a new project

Open **gitignore Gen**, search for your stack (e.g., `Node`, `Python`, `Flutter`), combine multiple templates, and copy the result. No more accidentally committing `node_modules`.

### Preview social media cards before publishing

Paste your URL into **Meta Tags**, and see exactly how your link will render on Google, Facebook, Twitter, and LinkedIn. Adjust titles, descriptions, and images until everything looks right.

### Turn code into a shareable image

Drop a snippet into **Code Snaps**, pick a theme and background, and export a high-quality PNG. Perfect for blog posts, slides, or social media.

### Generate a branded QR code

Use **QR Studio** to customize colors, shapes, and embed your logo into a QR code. Export as high-res PNG for print or digital use.

### Debug a JWT token

Paste a token into **JWT Debugger** to decode and inspect the header, payload, and signature — all without sending anything to a server.
## Project Structure

```
├── public/                          # Static assets (favicon, OG images)
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout (fonts, metadata, smooth scroll)
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles & CSS custom properties
│   │   ├── sitemap.ts               # Auto-generated sitemap
│   │   ├── robots.ts                # Robots.txt
│   │   ├── manifest.json            # PWA manifest
│   │   ├── tools/
│   │   │   ├── page.tsx             # Tool listing page
│   │   │   ├── ToolsClient.tsx      # Client-side tool grid & filtering
│   │   │   └── slug/
│   │   │       └── page.tsx         # Dynamic route — individual tool page
│   │   ├── about/                   # About page
│   │   ├── contact/                 # Contact page
│   │   ├── privacy/                 # Privacy policy
│   │   └── terms/                   # Terms of service
│   ├── components/
│   │   ├── Header.tsx               # Site header & navigation
│   │   ├── Footer.tsx               # Site footer
│   │   ├── Hero.tsx                 # Landing page hero section
│   │   ├── Features.tsx             # Feature highlights grid
│   │   ├── ToolkitGrid.tsx          # Tool cards grid
│   │   ├── Testimonials.tsx         # Testimonials section
│   │   ├── SmoothScrolling.tsx      # Lenis smooth scroll wrapper
│   │   └── tools/                   # Individual tool implementations
│   │       ├── ReadmeGenerator.tsx
│   │       ├── GitignoreGenerator.tsx
│   │       ├── MetaTagGenerator.tsx
│   │       ├── CodeSnaps.tsx
│   │       ├── QrCodeGenerator.tsx
│   │       └── JwtDebugger.tsx
│   ├── data/
│   │   └── content.ts              # Tool metadata, categories, nav links, testimonials
│   └── lib/
│       └── seo.ts                   # Site config, metadata, JSON-LD schema generators
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```
## Contributing

Contributions are welcome! Here's how to add a new tool or improve an existing one.

### Adding a New Tool

1. Create a component in `src/components/tools/YourTool.tsx`
2. Add an entry to the `toolkits` array in `src/data/content.ts`
3. Register the component in `TOOL_COMPONENTS` in `src/app/tools/[slug]/page.tsx`

```ts
// src/data/content.ts — add to toolkits[]
{
    id: 'your-tool',
    name: 'Your Tool',
    description: 'Short description.',
    longDescription: 'Detailed description.',
    features: ['Feature 1', 'Feature 2'],
    Icon: YourIcon,
    category: 'tools', // documentation | git | seo | design | tools | security
}
// src/app/tools/[slug]/page.tsx — add to TOOL_COMPONENTS
const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
    // ...existing tools
    'your-tool': YourTool,
};
```
## Contributing

We welcome community contributions specifically focused on adding new developer tools. All Pull Requests must target the `dev` branch.

Please read our [Contributing Guide](CONTRIBUTING.md) for detailed step-by-step instructions on creating tools and submitting changes.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

