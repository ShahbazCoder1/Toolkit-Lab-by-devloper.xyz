# Contributing to Toolkit Lab

Thank you for your interest in contributing to Toolkit Lab. We welcome community contributions to help expand our suite of free, privacy-first developer tools.

To maintain focus and quality, external contributions are strictly limited to adding new developer tools.

---

## Branching Strategy

All development and external contributions happen on the `dev` branch.

- Main branch (`main`): Contains production-ready code.
- Development branch (`dev`): Contains active development work. All Pull Requests (PRs) must target this branch.

Pull Requests submitted against `main` will be requested to be retargeted to `dev`.

---

## Tool Creation Process

To add a new tool to Toolkit Lab, follow the four steps outlined below.

### Step 1: Create the Tool Component

Create a new React client component inside `src/components/tools/`.

File location: `src/components/tools/YourToolName.tsx`

Guidelines:
- Start the file with `'use client';` as tool components require browser interactivity.
- Ensure all processing runs 100% client-side inside the user browser. Do not call external API endpoints that store or send user data.
- Use Tailwind CSS v4 and repository CSS variables defined in `src/app/globals.css` (such as `var(--card-bg)`, `var(--border-color)`, `var(--foreground)`).
- Use `lucide-react` for icons to maintain UI consistency.

Example template:
```tsx
'use client';

import React, { useState } from 'react';
import { Wrench, Copy, Check } from 'lucide-react';

export default function YourToolName() {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[var(--accent)]" />
                    Your Tool Title
                </h2>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input here..."
                    className="w-full h-40 bg-[var(--search-bg)] border border-[var(--border-color)] rounded-lg p-4 font-mono text-sm focus:outline-none"
                />
                <button
                    onClick={handleCopy}
                    className="mt-4 btn-primary flex items-center gap-2"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy Output'}
                </button>
            </div>
        </div>
    );
}
```

### Step 2: Register Tool Metadata

Add your tool metadata entry to the `toolkits` array in `src/data/content.ts`.

File location: `src/data/content.ts`

Required fields:
- `id`: Kebab-case unique identifier matching the URL slug (e.g., `json-formatter`).
- `name`: Display name of the tool (e.g., `JSON Formatter`).
- `description`: One-sentence summary for search cards.
- `longDescription`: Detailed paragraph explaining purpose and privacy guarantee.
- `features`: Array of 3 to 6 key feature strings.
- `Icon`: Imported icon component from `lucide-react`.
- `category`: Category string (`documentation`, `git`, `seo`, `design`, `tools`, `security`).
- `isNew`: Optional boolean flag (set to `true` for new additions).

Example addition:
```typescript
{
    id: 'your-tool-id',
    name: 'Your Tool Title',
    description: 'Short description of what your tool does.',
    longDescription: 'Detailed explanation of your tool capabilities and browser-side processing guarantee.',
    features: [
        'Client-side processing',
        'One-click export',
        'Custom formatting options'
    ],
    Icon: Wrench,
    category: 'tools',
    isNew: true
}
```

### Step 3: Map Component to Dynamic Route Engine

Register your component mapping in `src/app/tools/[slug]/page.tsx`.

File location: `src/app/tools/[slug]/page.tsx`

Steps:
1. Import your component at the top of the file.
2. Add a key-value mapping to `TOOL_COMPONENTS` matching your tool `id`.

Example addition:
```typescript
import YourToolName from '@/components/tools/YourToolName';

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
    'readme-wizard': ReadmeGenerator,
    'gitignore-gen': GitignoreGenerator,
    'meta-tags': MetaTagGenerator,
    'code-snaps': CodeSnaps,
    'qr-studio': QrCodeGenerator,
    'jwt-debugger': JwtDebugger,
    'your-tool-id': YourToolName, // Add your tool here
};
```

### Step 4: Quality and Verification Checklist

Before submitting your Pull Request, verify:
- Theme: Works with dark theme aesthetic and matches design tokens.
- Responsive: Layout adapts cleanly to mobile, tablet, and desktop views.
- Performance: Zero external server API reliance. Processing remains client-side.
- Code Standards: No TypeScript compiler errors or missing imports.

---

## Submission Process

1. Fork the repository on GitHub.
2. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Toolkit-Lab-by-devloper.xyz.git
   ```
3. Checkout the `dev` branch:
   ```bash
   git checkout dev
   ```
4. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/add-your-tool-name
   ```
5. Test locally:
   ```bash
   npm run dev
   ```
6. Verify code quality and build:
   ```bash
   npm run lint
   npm run build
   ```
7. Commit your changes:
   ```bash
   git commit -m "feat: add <ToolName> tool"
   ```
8. Push to your fork and create a Pull Request targeting the `dev` branch on the main repository.

---

Thank you for contributing to Toolkit Lab.
