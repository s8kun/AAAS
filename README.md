# AAAS Accessories Store

Modern RTL Arabic accessories e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS. Includes product listing, wishlist, cart, bundles/offers, and product detail modal.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide icons

## Key Features

- Responsive RTL UI (mobile + desktop)
- Search, category, and price filters
- Cart, wishlist, and order via WhatsApp
- Product quick view + detailed modal
- Context-based state management with localStorage

## Getting Started

### Prerequisites

- Node.js 18+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the URL printed by Vite.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment

This app loads products from an API:

```
VITE_BACKEND_URL
```

Example `.env`:
```
VITE_BACKEND_URL=https://your-backend.example.com
```

## Navigation Notes

The app is a SPA without React Router. Navigation is controlled via `AppContext`.

The Offers page exists but is currently commented out in navigation and routing. To enable it, uncomment `offers` in:
- `src/App.tsx`
- `src/components/common/Header.tsx`
- `src/components/common/Footer.tsx`

## Project Structure (High Level)

- `src/data/config.ts`: Brand, contact, shipping, currency, messages
- `src/data/products.ts`: Product loading + discount logic
- `src/data/bundles.ts`: Offers/bundles pricing logic
- `src/context/AppContext.tsx`: Global app state + localStorage
- `src/pages/*`: All pages
- `src/components/*`: UI and common components

## Full Documentation

See [DOCS.md](/home/abdullahelferjani/AAAS/DOCS.md) for comprehensive documentation and customization notes.

## Deployment

Build with `npm run build` and deploy `dist/` to any static hosting (Netlify, Vercel, GitHub Pages). Remember to set `VITE_BACKEND_URL` in your hosting environment.

## License

Proprietary — for AAAS internal use.
