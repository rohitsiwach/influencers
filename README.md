# Influencer Management Platform

A Next.js application for brands to browse influencer profiles and manage their favorites.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: PostgreSQL via Prisma Accelerate
- **Authentication**: NextAuth.js (Credentials Provider)
- **ORM**: Prisma 7
- **Deployment**: Vercel

## Features

- ✅ User authentication (register/login)
- ✅ Browse influencers with search and filters
- ✅ View detailed influencer profiles
- ✅ Add/remove influencers to favorites
- ✅ Protected routes (login required)
- ✅ Responsive design with Tailwind CSS

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohitsiwach/influencers.git
   cd influencers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
   DIRECT_URL="postgres://YOUR_CONNECTION_STRING"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Seed the database**
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Vercel Deployment

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import the `rohitsiwach/influencers` repository
4. Click **Import**

### Step 2: Configure Environment Variables

Before deploying, add these environment variables in Vercel:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `DATABASE_URL` | `prisma+postgres://accelerate.prisma-data.net/?api_key=...` | Production, Preview, Development |
| `DIRECT_URL` | `postgres://...@db.prisma.io:5432/postgres?sslmode=require` | Production, Preview, Development |
| `NEXTAUTH_URL` | Your Vercel URL (e.g., `https://influencers.vercel.app`) | Production, Preview |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` | Production, Preview, Development |

### Step 3: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Visit your deployed application!

### Step 4: Seed Production Database (if needed)

If you haven't seeded the production database yet:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Functions**
3. Or run locally with production DATABASE_URL:
   ```bash
   npm run db:seed
   ```

## Project Structure

```
influencers/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth handlers
│   │   ├── register/            # User registration
│   │   ├── influencers/         # Influencer API
│   │   └── favorites/           # Favorites API
│   ├── influencers/[id]/        # Influencer detail page
│   ├── favorites/               # Favorites page
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── layout.tsx               # Root layout with navigation
│   └── page.tsx                 # Home page (influencer list)
├── components/
│   ├── FavoriteButton.tsx       # Client component for favoriting
│   ├── InfluencerFilters.tsx    # Search/filter controls
│   └── InfluencerList.tsx       # Influencer grid display
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   └── prisma.ts                # Prisma client singleton
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Seed script
├── middleware.ts                # Auth middleware
└── vercel.json                  # Vercel configuration
```

## Database Schema

### User
- `id`, `email`, `password`, `name`
- One-to-many relationship with Favorites

### Influencer
- `id`, `externalId`, `name`, `gender`, `age`
- `platform[]`, `followers`, `engagementRate`
- `avgLikes`, `avgComments`, `topics[]`, `location`
- `imageUrl`, timestamps
- One-to-many relationship with Favorites

### Favorite
- `id`, `userId`, `influencerId`, `createdAt`
- Unique constraint on `(userId, influencerId)`

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/auth/signin` | Login |
| GET | `/api/influencers/[id]` | Get influencer by ID |
| GET | `/api/favorites` | Get user's favorites |
| POST | `/api/favorites` | Add to favorites |
| DELETE | `/api/favorites` | Remove from favorites |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with influencer data

## Environment Variables Reference

See `VERCEL_SETUP.md` for detailed environment variable configuration.

## License

MIT
