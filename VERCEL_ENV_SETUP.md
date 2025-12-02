# ⚙️ Vercel Environment Variables - Action Required

## Current Status in Vercel

You have these variables set:
- ❌ `PRISMA_DATABASE_URL` (duplicate, wrong name)
- ✅ `POSTGRES_URL` (not used by our app)
- ❌ `PRISMA_DATABASE_URL` (duplicate entry)

## Required Updates

### Step 1: Rename/Add Environment Variables

Go to: https://vercel.com/rohit-siwachs-projects/influencers/settings/environment-variables

**Action: Add or Rename the following:**

#### 1. DATABASE_URL ⚠️ REQUIRED
- **Name**: `DATABASE_URL` (not `PRISMA_DATABASE_URL`)
- **Value**: 
  ```
  prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19WN1NtY0xoX25YMXhZc2dIZjZuWF8iLCJhcGlfa2V5IjoiMDFLQkc4QVk0S0RQMDJONEtTRERQMEM0SDgiLCJ0ZW5hbnRfaWQiOiI3ZjhkY2M1MjhmNTEwOWUzOTlkNzUwNjBiMmJmNDUyNjEyMjE1YmEyYThlMzk2M2IyNzkyZjgwOWEwMGRiZDUxIiwiaW50ZXJuYWxfc2VjcmV0IjoiYTk2ZDI2ZDctM2ZiNC00ODIwLTgwZjItYjEzMTA1ZDFiMmM5In0.pNeQUORqs5Q8kCW6dqf9eKYcN6FYU0pNWOBkw92VkEg
  ```
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 2. DIRECT_URL ⚠️ REQUIRED (for migrations)
- **Name**: `DIRECT_URL`
- **Value**: 
  ```
  postgres://7f8dcc528f5109e399d75060b2bf452612215ba2a8e3963b2792f809a00dbd51:sk_V7SmcLh_nX1xYsgHf6nX_@db.prisma.io:5432/postgres?sslmode=require
  ```
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 3. NEXTAUTH_URL ⚠️ REQUIRED
- **Name**: `NEXTAUTH_URL`
- **Value for Production**: 
  ```
  https://influencers.vercel.app
  ```
  (Update with your actual Vercel URL after deployment)
- **Value for Preview**: 
  ```
  https://influencers-git-main-rohitsiwach.vercel.app
  ```
  (or leave as production URL)
- **Environments**: ✅ Production, ✅ Preview

#### 4. NEXTAUTH_SECRET ⚠️ REQUIRED
- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate a new secret by running this command locally:
  ```bash
  openssl rand -base64 32
  ```
  Or use this one (generate your own for production):
  ```
  8X9vK2mN4pQ7rS1tU3wV5yZ6aB8cD0eF2gH4iJ6kL8m=
  ```
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### Step 2: Remove Duplicate/Unused Variables

**Delete these from Vercel:**
- ❌ `PRISMA_DATABASE_URL` (both entries - we use `DATABASE_URL` instead)
- ⚠️ `POSTGRES_URL` can stay (Vercel may use it) but our app doesn't need it

### Step 3: Verify Your Configuration

After adding the variables, your Vercel environment should have:

```
✅ DATABASE_URL = prisma+postgres://accelerate...
✅ DIRECT_URL = postgres://7f8dcc528f5109e399d75060b2bf452612215ba2a8e3963b2792f809a00dbd51...
✅ NEXTAUTH_URL = https://influencers.vercel.app
✅ NEXTAUTH_SECRET = <your-generated-secret>
```

### Step 4: Redeploy

After updating the environment variables:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Select **Redeploy**
4. Wait for the build to complete

## 🎯 Quick Checklist

- [ ] Add `DATABASE_URL` (not PRISMA_DATABASE_URL)
- [ ] Add `DIRECT_URL`
- [ ] Add `NEXTAUTH_URL` with your Vercel URL
- [ ] Add `NEXTAUTH_SECRET` (generate secure random string)
- [ ] Remove duplicate `PRISMA_DATABASE_URL` entries
- [ ] All variables selected for correct environments
- [ ] Redeploy the application

## 🔍 Why These Names Matter

The application code specifically looks for:
- `DATABASE_URL` in `prisma.config.ts` and `lib/prisma.ts`
- `DIRECT_URL` in `prisma.config.ts` for migrations
- `NEXTAUTH_URL` in `lib/auth.ts`
- `NEXTAUTH_SECRET` in `lib/auth.ts`

Using different names (like `PRISMA_DATABASE_URL`) will cause the app to fail because it can't find the required environment variables.

## 📝 How to Update in Vercel UI

1. Go to your project: https://vercel.com/rohit-siwachs-projects/influencers
2. Click **Settings** (top nav)
3. Click **Environment Variables** (left sidebar)
4. For each variable:
   - Click **Add New**
   - Enter **Name** (e.g., `DATABASE_URL`)
   - Enter **Value**
   - Select **Environments** (Production, Preview, Development)
   - Click **Save**
5. After all variables are added, go to **Deployments**
6. Click **Redeploy** on the latest deployment

## ✅ Expected Result

After redeploying with correct environment variables, your app should:
- Build successfully
- Connect to Prisma Accelerate database
- Allow user registration and login
- Display 20 influencers
- Support search, filters, and favorites

## 🆘 If Build Fails

Check the Vercel deployment logs for:
- `DATABASE_URL is not defined` → Variable name is wrong or not set
- `NEXTAUTH_SECRET is not defined` → Variable not set
- Prisma errors → Check `DIRECT_URL` is correct

The variable names must be **exactly** as shown above (case-sensitive).
