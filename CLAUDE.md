# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 project using the App Router with TypeScript and Tailwind CSS v4.

### Project Structure

- `src/app/` - App Router pages and layouts (file-based routing)
- `src/app/layout.tsx` - Root layout with font configuration (Geist Sans/Mono)
- `src/app/page.tsx` - Homepage component
- `src/app/globals.css` - Global styles and Tailwind theme configuration
- `public/` - Static assets (images, fonts)

### Key Patterns

- **Routing**: Create new pages by adding `page.tsx` files in `src/app/[route]/`
- **Layouts**: Shared layouts via `layout.tsx` files that wrap child routes
- **Styling**: Tailwind CSS with CSS variables for theming (supports dark mode via `prefers-color-scheme`)
- **Fonts**: Geist font family loaded via `next/font/google`, available as CSS variables `--font-geist-sans` and `--font-geist-mono`
