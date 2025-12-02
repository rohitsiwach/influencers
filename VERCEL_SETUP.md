# Vercel Environment Variables Configuration

After connecting your GitHub repository to Vercel, add the following environment variables in your Vercel project settings:

## Required Environment Variables

1. **DATABASE_URL**
   ```
   prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19WN1NtY0xoX25YMXhZc2dIZjZuWF8iLCJhcGlfa2V5IjoiMDFLQkc4QVk0S0RQMDJONEtTRERQMEM0SDgiLCJ0ZW5hbnRfaWQiOiI3ZjhkY2M1MjhmNTEwOWUzOTlkNzUwNjBiMmJmNDUyNjEyMjE1YmEyYThlMzk2M2IyNzkyZjgwOWEwMGRiZDUxIiwiaW50ZXJuYWxfc2VjcmV0IjoiYTk2ZDI2ZDctM2ZiNC00ODIwLTgwZjItYjEzMTA1ZDFiMmM5In0.pNeQUORqs5Q8kCW6dqf9eKYcN6FYU0pNWOBkw92VkEg
   ```

2. **DIRECT_URL**
   ```
   postgres://7f8dcc528f5109e399d75060b2bf452612215ba2a8e3963b2792f809a00dbd51:sk_V7SmcLh_nX1xYsgHf6nX_@db.prisma.io:5432/postgres?sslmode=require
   ```

3. **NEXTAUTH_URL**
   ```
   https://influencers.vercel.app
   ```
   (Replace with your actual Vercel deployment URL)

4. **NEXTAUTH_SECRET**
   ```
   Generate a secure random string for production
   ```
   Run this command to generate: `openssl rand -base64 32`

## How to Add Environment Variables in Vercel

1. Go to https://vercel.com/rohit-siwachs-projects/influencers
2. Click on **Settings**
3. Navigate to **Environment Variables**
4. Add each variable with the values above
5. Select environments: **Production**, **Preview**, and **Development**
6. Click **Save**

After adding the environment variables, redeploy your application.
