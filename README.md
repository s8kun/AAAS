# AAAS Accessories Store

A modern, RTL, Arabic accessories e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS. It showcases products like necklaces, bracelets, rings, sunglasses, and more, with wishlist, cart, offers, and product details modal.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI components
- Lucide React icons

## Features

- Responsive design (mobile + desktop)
- Product listing, details modal, and manual image slider
- Cart, wishlist, and offers pages
- Context-based state management
- Arabic RTL UI and animations

## Getting Started

### Prerequisites

- Node.js 18+

### Install

```
npm install
```

### Development

```
npm run dev
```

Open the local URL printed by Vite.

### Build

```
npm run build
```

### Preview Production Build

```
npm run preview
```

## Project Structure

- `index.html`: SEO and social meta (accessories-focused)
- `src/`: App source code
  - `pages/`: Home, Products, Offers, Cart, Wishlist, Contact, About
  - `components/`: Common + UI library primitives
  - `data/`: `products.ts`, `bundles.ts`, `config.ts`
  - `context/`: `AppContext.tsx` for global state

## Configuration

- `src/data/config.ts`: Site name, tagline, shipping, social links. Adjust to your brand.
- `src/data/products.ts`: Products dataset; IDs ordered sequentially; discounts computed.

## Branding

This project is branded "AAAS". Update logos and names in `src/assets` and `src/data/config.ts`.

## Deployment

Any static hosting (Netlify, Vercel, GitHub Pages). Build with `npm run build` and deploy `dist/`.

## License

Proprietary – for AAAS internal use.
