# Replit.md

## Overview

This is a **Petshop e-commerce web application** called "Orelha" — a modern, responsive pet shop system built with a full-stack TypeScript architecture. The app provides product browsing with category filters, service booking (grooming, vet visits, etc.), shopping cart functionality, user authentication, and an admin panel for managing products, appointments, and orders. The UI is in Brazilian Portuguese.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state; local state with React hooks
- **Cart**: Client-side cart stored in localStorage via a custom `useCart` hook
- **UI Components**: shadcn/ui component library (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Fonts**: Inter (body) and Outfit (display/headings)
- **Color scheme**: Purple/lilac primary (#7c3aed), neutral backgrounds
- **Forms**: react-hook-form with Zod validation via @hookform/resolvers
- **Build tool**: Vite
- **Path aliases**: `@/` → `client/src/`, `@shared/` → `shared/`

### Backend
- **Framework**: Express 5 (TypeScript, running via tsx)
- **HTTP Server**: Node.js `http.createServer` wrapping Express
- **Authentication**: Passport.js with local strategy, express-session with PostgreSQL session store (connect-pg-simple)
- **Password hashing**: Node.js crypto scrypt (not bcrypt)
- **API Design**: REST endpoints defined in `shared/routes.ts` as a typed API contract with Zod schemas for input validation and response parsing — shared between client and server
- **Development**: Vite dev server middleware integrated into Express for HMR

### Shared Layer (`shared/`)
- **Schema** (`shared/schema.ts`): Drizzle ORM table definitions (users, products, services, appointments, orders) with Zod insert schemas generated via `drizzle-zod`
- **Routes** (`shared/routes.ts`): Typed API route definitions with paths, methods, input schemas, and response schemas — used by both frontend hooks and backend route handlers

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (required — `DATABASE_URL` environment variable)
- **Schema push**: `npm run db:push` uses drizzle-kit to push schema changes
- **Session store**: PostgreSQL via connect-pg-simple (auto-creates table)
- **Storage pattern**: `IStorage` interface in `server/storage.ts` with `DatabaseStorage` implementation — all DB access goes through this layer

### Key Data Models
- **Users**: id, username (email), password (hashed), name, role (admin/user)
- **Products**: id, name, description, price (cents), category (racao/brinquedos/higiene/acessorios), imageUrl
- **Services**: id, name, description, price (cents), duration (minutes), imageUrl
- **Appointments**: id, customerName, contactPhone, petName, serviceName, date, status
- **Orders**: id, customerName, userId (optional), total, status, items (JSONB)

### Pages
- **Home** (`/`): Hero section with CTA buttons, feature highlights
- **Products** (`/products`): Product grid with category filters
- **Services** (`/services`): Service cards with appointment booking dialog
- **Cart** (`/cart`): Shopping cart with checkout (requires login)
- **Login/Register** (`/login`, `/register`): Auth forms with tabs
- **Contact** (`/contact`): Contact form and info
- **Admin** (`/admin`): Admin panel with tabs for products, appointments, orders (requires admin role)

### Build Process
- **Development**: `npm run dev` — tsx runs the server with Vite middleware for HMR
- **Production build**: `npm run build` — Vite builds the client to `dist/public`, esbuild bundles the server to `dist/index.cjs`
- **Production start**: `npm start` — runs the bundled server which serves static files

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable
- **Unsplash**: Product and hero images loaded from `images.unsplash.com`
- **Google Fonts**: Inter and Outfit fonts loaded via Google Fonts CDN
- **No payment processor**: Cart/checkout is simulated (no Stripe integration active despite being in build allowlist)
- **No email service**: Order confirmation messages are toast notifications only