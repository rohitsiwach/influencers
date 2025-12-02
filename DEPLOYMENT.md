# Quick Vercel Deployment Guide

## 🚀 Deploy to Vercel in 5 Minutes

Your GitHub repository is already connected and code is pushed. Follow these steps to deploy:

### Step 1: Go to Vercel Project
Visit: https://vercel.com/rohit-siwachs-projects/influencers

### Step 2: Configure Environment Variables

Click on **Settings** → **Environment Variables** and add these **4 required variables**:

#### 1. DATABASE_URL
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19WN1NtY0xoX25YMXhZc2dIZjZuWF8iLCJhcGlfa2V5IjoiMDFLQkc4QVk0S0RQMDJONEtTRERQMEM0SDgiLCJ0ZW5hbnRfaWQiOiI3ZjhkY2M1MjhmNTEwOWUzOTlkNzUwNjBiMmJmNDUyNjEyMjE1YmEyYThlMzk2M2IyNzkyZjgwOWEwMGRiZDUxIiwiaW50ZXJuYWxfc2VjcmV0IjoiYTk2ZDI2ZDctM2ZiNC00ODIwLTgwZjItYjEzMTA1ZDFiMmM5In0.pNeQUORqs5Q8kCW6dqf9eKYcN6FYU0pNWOBkw92VkEg
```
✅ Select: Production, Preview, Development

#### 2. DIRECT_URL
```
postgres://7f8dcc528f5109e399d75060b2bf452612215ba2a8e3963b2792f809a00dbd51:sk_V7SmcLh_nX1xYsgHf6nX_@db.prisma.io:5432/postgres?sslmode=require
```
✅ Select: Production, Preview, Development

#### 3. NEXTAUTH_URL
```
https://influencers-rohitsiwach.vercel.app
```
(Replace with your actual Vercel deployment URL after first deployment)
✅ Select: Production, Preview

#### 4. NEXTAUTH_SECRET
Generate a secure secret by running this command locally:
```bash
openssl rand -base64 32
```
Copy the output and paste it as the value.
✅ Select: Production, Preview, Development

### Step 3: Deploy

1. After adding all environment variables, go to **Deployments**
2. Click on the **3 dots** next to the latest deployment
3. Click **Redeploy**
4. Or trigger a new deployment by pushing a commit to GitHub

### Step 4: Update NEXTAUTH_URL (After First Deploy)

1. After your first deployment completes, copy your Vercel URL (e.g., `https://influencers-abc123.vercel.app`)
2. Go back to **Settings** → **Environment Variables**
3. Edit the `NEXTAUTH_URL` variable
4. Update it with your actual Vercel URL
5. Redeploy the application

### Step 5: Test Your Application

1. Visit your Vercel URL
2. Click **Register** to create an account
3. Login with your credentials
4. Browse influencers, search, filter
5. Add influencers to favorites
6. Check the favorites page

## 📋 Checklist

- [ ] All 4 environment variables added to Vercel
- [ ] Environment variables selected for all environments (Production, Preview, Development)
- [ ] Application deployed successfully
- [ ] NEXTAUTH_URL updated with actual Vercel domain
- [ ] Application redeployed after URL update
- [ ] Database already seeded with 20 influencers ✅
- [ ] Test registration and login
- [ ] Test browsing and filtering influencers
- [ ] Test adding/removing favorites

## 🎯 Expected Result

After deployment, you should be able to:
- ✅ Register new users
- ✅ Login/logout
- ✅ View 20 influencers from Germany
- ✅ Search by name
- ✅ Filter by location, platform, and followers
- ✅ View detailed influencer profiles
- ✅ Add/remove favorites with real-time updates
- ✅ View favorites page

## 🔧 Troubleshooting

### Build fails with "Prisma Client not generated"
- Vercel should automatically run `prisma generate` during build
- Check `vercel.json` has: `"buildCommand": "prisma generate && next build"`

### Authentication not working
- Verify `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your deployment URL exactly
- Check browser console for errors

### Database connection errors
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Check Prisma Accelerate is active
- Verify database has been seeded

### "Please login to view" on homepage
- This is expected behavior for logged-out users
- Click **Register** or **Login** in navigation

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Ensure database is accessible from Vercel

## 🎉 You're Done!

Your influencer management platform is now live on Vercel!
