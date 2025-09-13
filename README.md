<div align="center">

# YC Directory

Discover, share, and explore YC-style startups. Built with Next.js App Router, Prisma, PostgreSQL, and NextAuth.

</div>

## ✨ Features

- Browse featured startups with beautiful, responsive UI
- Full startup details page with markdown pitch rendering
	- Supported pitch markdown: **bold**, bullet lists (`- item`), and line breaks
- Authentication via NextAuth (credentials out of the box; OAuth optional)
- Prisma ORM with PostgreSQL and production-ready migrations
- Seed script with demo users and startups
- Optimized builds with Turbopack

## 🧱 Tech Stack

- Frontend: Next.js 15 (App Router), React 19, TypeScript
- Styling: Tailwind CSS 4
- Auth: NextAuth.js (JWT sessions; bcrypt password hashing)
- Data: Prisma 6 + PostgreSQL
- Tooling: Turbopack, ESLint, TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A PostgreSQL database (local or hosted)

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create a `.env` file in the project root with at least:

```env
DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DB_NAME"

# NextAuth
NEXTAUTH_SECRET="a-strong-random-secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth providers (uncomment when configuring)
# GITHUB_CLIENT_ID="..."
# GITHUB_CLIENT_SECRET="..."
```

### 3) Set up the database

```bash
npx prisma db push
```

### 4) (Optional) Seed demo data

Adds demo users and startups for local testing.

```bash
node lib/seedData.js
```

### 5) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🧭 Project Structure

```
my-app/
├─ app/
│  ├─ layout.tsx           # Root layout
│  ├─ page.tsx             # Home page
│  └─ api/...              # API routes (App Router)
├─ components/
│  ├─ StartupDetail.tsx    # Startup details view (renders pitch markdown)
│  └─ ...                  # UI components
├─ lib/
│  ├─ prisma.ts            # Prisma client helper
│  ├─ seedData.js          # Database seeding script
│  └─ ...
├─ prisma/
│  ├─ schema.prisma        # Data models (PostgreSQL)
│  └─ migrations/          # Prisma migrations
├─ public/                 # Static assets
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

## 🔐 Authentication

- NextAuth.js with credentials provider
- Passwords hashed with `bcryptjs`
- Add OAuth (e.g., GitHub) by configuring provider env vars and NextAuth options

## 🗃️ Database & Prisma

- PostgreSQL via Prisma Client
- Generate client automatically on install and build
- Useful commands:

```bash
npx prisma generate     # Generate Prisma Client
npx prisma studio       # Open Prisma Studio
npx prisma db push      # Push schema to the database
```

## 🧪 Markdown Pitch Support

Pitch content supports a safe subset of markdown rendered on the details page:

- `**bold**`
- `- bullet list items`
- New lines are converted to `<br/>`

Tip: Prefer short sections and bullet points for clarity.

## 📦 NPM Scripts

```json
{
	"dev": "next dev --turbopack",
	"build": "prisma generate && next build --turbopack",
	"start": "next start",
	"lint": "eslint",
	"postinstall": "prisma generate"
}
```

## ☁️ Deployment (Vercel)

- Set the same environment variables in your Vercel project
- Build runs `prisma generate` before `next build` automatically
- Ensure your `DATABASE_URL` points to a production Postgres instance

## 🧰 Troubleshooting

- Prisma client not found? Run `npx prisma generate`.
- Seed script fails? Verify `DATABASE_URL` and DB connectivity.
- Auth errors? Set `NEXTAUTH_SECRET` and `NEXTAUTH_URL` correctly.

---

Made with ❤️ using Next.js, Prisma, and PostgreSQL.
