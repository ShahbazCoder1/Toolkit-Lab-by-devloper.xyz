## Description

Please provide a brief summary of the changes introduced in this Pull Request.

## Contribution Checklist

- [ ] Target Branch: This Pull Request targets the `dev` branch.
- [ ] Tool Scope: This PR adds a new developer tool or improves an existing tool.
- [ ] Client-Side Processing: All logic runs 100% in the browser with zero external server APIs or user tracking.
- [ ] Component File: Created component in `src/components/tools/YourToolName.tsx`.
- [ ] Metadata Registry: Added entry to `toolkits` array in `src/data/content.ts`.
- [ ] Route Mapping: Mapped component in `TOOL_COMPONENTS` inside `src/app/tools/[slug]/page.tsx`.
- [ ] Styling: Follows dark theme aesthetics and uses project CSS variables.

## Verification and Testing

- [ ] Ran `npm run lint` with zero errors.
- [ ] Ran `npm run build` with zero errors.
- [ ] Tested layout responsiveness on mobile, tablet, and desktop views.
