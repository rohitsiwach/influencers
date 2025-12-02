# Addfame Influencers

A web application to browse influencer profiles and manage favorites.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env` file with:
    ```env
    DATABASE_URL="your_prisma_accelerate_url"
    NEXTAUTH_SECRET="your_secret"
    NEXTAUTH_URL="http://localhost:3000"
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Seed the database (optional):**
    ```bash
    npm run db:seed
    ```
