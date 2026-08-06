<div align="center">
  <img src="https://raw.githubusercontent.com/ShahbazCoder1/Toolkit-Lab-by-devloper.xyz/refs/heads/main/src/app/apple-icon.png" alt="Toolkit Lab Logo" width="150" />

  # Toolkit Lab

  <p>Free, privacy-first developer utilities running 100% in your browser. No signup, no server processing, no data storage.</p>

  ![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)
  ![Next.js](https://img.shields.io/badge/Next.js-16.1.5-black.svg)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

  <p>
    <a href="https://toolkit.devloper.xyz/" target="_blank">Visit Toolkit Lab (toolkit.devloper.xyz)</a>
  </p>
  <p>
    <i>If you find Toolkit Lab useful, please give it a star on GitHub. Thank you for your support!</i>
  </p>
</div>

---

## Overview

**Toolkit Lab** (https://toolkit.devloper.xyz/) is an open-source suite of privacy-focused developer tools. All tools execute 100% client-side inside your web browser. Your tokens, code snippets, metadata, and configurations never touch an external server or remote database.

---

## Key Features

### Developer Tools Suite

- **README Wizard**: Create professional documentation with customizable templates, live Markdown split preview, badge builders, and automatic Table of Contents generation.
- **gitignore Gen**: Generate `.gitignore` files from over 300 language, framework, IDE, and OS templates with multi-stack combination support.
- **Meta Tags Generator**: Preview and validate Open Graph, Twitter Cards, and SEO meta tags for Google, Facebook, Twitter, and LinkedIn with real-time character limit warnings.
- **Code Snaps**: Transform code snippets into high-resolution, shareable screenshots with customizable themes, background gradients, and window frames.
- **QR Studio**: Create custom QR codes with adjustable foreground/background colors, error correction levels, embedded logos, and vector PNG/SVG export options.
- **JWT Debugger**: Decode and inspect JSON Web Tokens (HS256, RS256) with color-coded headers, payloads, signature validation, and human-readable timestamps.

### Privacy and Security Guarantees

- **100% Client-Side Execution**: All processing runs locally in your browser.
- **Zero Server Storage**: No accounts, no registration, no backend storage, and no tracking.
- **Offline Capable**: Works without transmitting your input data across the network.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, SSG static generation) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Smooth Scrolling | [Lenis](https://lenis.darkroom.engineering/) |
| Icons | [Lucide React](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/) |
| Image Generation | [html-to-image](https://github.com/bubkoo/html-to-image) |
| QR Engine | [qrcode](https://github.com/soldair/node-qrcode) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/) package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShahbazCoder1/Toolkit-Lab-by-devloper.xyz.git
   cd Toolkit-Lab-by-devloper.xyz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your web browser.

---

## Repository Structure

```
├── public/                          # Static icons, favicons, and manifest assets
├── src/
│   ├── app/                         # Next.js App Router pages and dynamic routes
│   │   ├── layout.tsx               # Root layout (fonts, Lenis scroll, SEO metadata)
│   │   ├── page.tsx                 # Landing page (Server Component)
│   │   ├── HomeClient.tsx            # Interactive landing page UI
│   │   ├── globals.css              # Design tokens and custom CSS keyframes
│   │   ├── sitemap.ts               # Dynamic sitemap generator
│   │   ├── robots.ts                # Search engine crawler instructions
│   │   ├── tools/
│   │   │   ├── page.tsx             # Tools directory page
│   │   │   ├── ToolsClient.tsx      # Tool filter and search interface
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # SSG dynamic tool route handler
│   │   ├── about/                   # About page
│   │   ├── contact/                 # Contact page
│   │   ├── privacy/                 # Privacy Policy
│   │   └── terms/                   # Terms of Service
│   ├── components/
│   │   ├── Header.tsx               # Site header and navigation search modal
│   │   ├── Footer.tsx               # Footer with links and branding
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── ToolkitGrid.tsx          # Tool grid selector
│   │   ├── SmoothScrolling.tsx      # Lenis smooth scroll provider
│   │   └── tools/                   # Client-side tool components
│   │       ├── ReadmeGenerator.tsx
│   │       ├── GitignoreGenerator.tsx
│   │       ├── MetaTagGenerator.tsx
│   │       ├── CodeSnaps.tsx
│   │       ├── QrCodeGenerator.tsx
│   │       └── JwtDebugger.tsx
│   ├── data/
│   │   └── content.ts              # Tool registry metadata and content data
│   └── lib/
│       └── seo.ts                   # JSON-LD Schema generators and metadata constants
├── .github/                         # Workflows, issue templates, and PR template
├── CONTRIBUTING.md                  # Contributor guide for adding new tools
├── CODE_OF_CONDUCT.md               # Community Code of Conduct
├── LICENSE                          # Apache License 2.0
├── package.json
└── tsconfig.json
```

---

## Contributing

We welcome community contributions specifically focused on adding new developer tools.

- **Target Branch**: All Pull Requests MUST target the `dev` branch.
- **Contribution Guide**: Read our [Contributing Guide](CONTRIBUTING.md) for detailed step-by-step instructions on component creation, metadata registration, and dynamic route mapping.
- **Code of Conduct**: All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).
- **Automated CI Checks**: All Pull Requests undergo automated GitHub Actions verification for `npm run lint` and `npm run build`.

---

## License

This project is open source software licensed under the [Apache License 2.0](LICENSE).
