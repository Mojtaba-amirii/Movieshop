# 🎬 Movie Shop - Next.js 16 App Router

A modern movie e-commerce platform built with the T3 Stack and Next.js 16 App Router.

## 🚀 Migration Complete!

This project has been **successfully migrated** from Next.js Pages Router to **Next.js 16 App Router** following the latest T3 Stack conventions.

### 📚 Migration Documentation

- **[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)** ⭐ Start here! Quick overview of changes
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Detailed migration documentation
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Code patterns and examples

### ✨ Key Features

- ✅ **Next.js 16** with App Router
- ✅ **React 19** features built-in
- ✅ **Turbopack** as default bundler
- ✅ **TypeScript** for type safety
- ✅ **tRPC** for end-to-end type-safe APIs
- ✅ **Prisma** with MongoDB
- ✅ **NextAuth.js** for authentication
- ✅ **Tailwind CSS v4** for styling
- ✅ **Redux Toolkit** for state management
- ✅ **Stripe** for payments

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Push database schema
npm run db:push

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Type checking
npm run db:studio    # Open Prisma Studio
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router (NEW!)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx
│   ├── my-movies/page.tsx
│   ├── movie-details/[movie]/page.tsx
│   └── api/                     # API Route Handlers
│       ├── auth/[...nextauth]/route.ts
│       └── trpc/[trpc]/route.ts
├── components/
│   ├── layout/                  # Layout components
│   └── providers/               # Client providers (NEW!)
├── trpc/                        # tRPC config (NEW!)
│   ├── react.tsx               # Client hooks
│   └── server.ts               # Server calls
└── server/                      # Server-side code
```

## 🔧 Technologies

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [tRPC](https://trpc.io/) - Type-safe APIs
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

## 🎯 Key Changes from Pages Router

| Before                         | After                              |
| ------------------------------ | ---------------------------------- |
| `pages/about.tsx`              | `app/about/page.tsx`               |
| `pages/api/hello.ts`           | `app/api/hello/route.ts`           |
| `getServerSideProps`           | Server Components                  |
| `useRouter` from `next/router` | `useRouter` from `next/navigation` |
| `<Head>`                       | `export const metadata`            |

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for details.

## 📦 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Docker

```bash
docker build -t movie-shop .
docker run -p 3000:3000 movie-shop
```

See [deployment guides](https://create.t3.gg/en/deployment/vercel) for more info.

## 📚 Learn More

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [App Router Migration](https://nextjs.org/docs/app/guides/migrating/app-router-migration)
- [tRPC Documentation](https://trpc.io/docs)

## 🤝 Contributing

Built with [create-t3-app](https://create.t3.gg/) and migrated to Next.js 16 App Router.

---

**Version:** 2.0.0 (App Router)  
**Status:** ✅ Migration Complete
