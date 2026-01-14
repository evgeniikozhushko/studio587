# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` holds the Next.js App Router pages, layouts, route segments, and app-level assets like `globals.css`.
- `src/components/` contains reusable UI and section components, organized by area (`home/`, `layout/`, `projects/`, `seo/`, `ui/`).
- `src/data/` stores structured content and page data modules (e.g., `projectsData.ts`).
- `src/hooks/`, `src/lib/`, and `src/types/` provide shared hooks, utilities (`src/lib/utils.ts`), and TypeScript types.
- `public/` contains static assets served at the site root.

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: build the production bundle with Turbopack.
- `npm run start`: run the production server after a build.
- `npm run lint`: run ESLint checks.
- `npm run lint:fix`: auto-fix lintable issues.

## Coding Style & Naming Conventions
- Language: TypeScript with React (Next.js App Router).
- Indentation: 2 spaces (match existing TS/TSX and CSS formatting).
- Components: PascalCase filenames and exports (e.g., `ProjectCard.tsx`).
- Hooks: `useX` prefix (e.g., `useScroll.ts`).
- Styling: prefer Tailwind utility classes; keep global styles in `src/app/globals.css`.

## Testing Guidelines
- No test runner or test files are currently configured.
- If adding tests, colocate with feature folders (e.g., `src/components/ui/Button.test.tsx`) and document the new test command in this file.

## Commit & Pull Request Guidelines
- Commit messages follow short, sentence-style summaries (e.g., “Studio Page updated”).
- PRs should include a concise description, the scope of UI changes, and screenshots or screen recordings for visual updates.
- Link related issues or tickets when applicable.

## Configuration & Assets
- App configuration lives in `next.config.ts` and `tsconfig.json`.
- Static site assets (favicons, icons) are in `src/app/` and `public/`.
