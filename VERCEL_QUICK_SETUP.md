# 🎯 COPY-PASTE READY: Vercel Environment Variables

## Quick Action Guide

Go to: https://vercel.com/rohit-siwachs-projects/influencers/settings/environment-variables

Click **"Add New"** for each variable below and copy-paste the exact values:

---

### 1️⃣ DATABASE_URL
**Name:**
```
DATABASE_URL
```

**Value:**
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19WN1NtY0xoX25YMXhZc2dIZjZuWF8iLCJhcGlfa2V5IjoiMDFLQkc4QVk0S0RQMDJONEtTRERQMEM0SDgiLCJ0ZW5hbnRfaWQiOiI3ZjhkY2M1MjhmNTEwOWUzOTlkNzUwNjBiMmJmNDUyNjEyMjE1YmEyYThlMzk2M2IyNzkyZjgwOWEwMGRiZDUxIiwiaW50ZXJuYWxfc2VjcmV0IjoiYTk2ZDI2ZDctM2ZiNC00ODIwLTgwZjItYjEzMTA1ZDFiMmM5In0.pNeQUORqs5Q8kCW6dqf9eKYcN6FYU0pNWOBkw92VkEg
```

**Environments:** ✅ Production  ✅ Preview  ✅ Development

---

### 2️⃣ DIRECT_URL
**Name:**
```
DIRECT_URL
```

**Value:**
```
postgres://7f8dcc528f5109e399d75060b2bf452612215ba2a8e3963b2792f809a00dbd51:sk_V7SmcLh_nX1xYsgHf6nX_@db.prisma.io:5432/postgres?sslmode=require
```

**Environments:** ✅ Production  ✅ Preview  ✅ Development

---

### 3️⃣ NEXTAUTH_URL
**Name:**
```
NEXTAUTH_URL
```

**Value for Production:**
```
https://influencers.vercel.app
```
*Note: Update with your actual Vercel URL after first deployment*

**Environments:** ✅ Production  ✅ Preview

---

### 4️⃣ NEXTAUTH_SECRET
**Name:**
```
NEXTAUTH_SECRET
```

**Value (generated for you):**
```
mgcstNsyUkCYK8Qu838sSnX+zDn+tu14j4zhCbkBvzM=
```

**Environments:** ✅ Production  ✅ Preview  ✅ Development

---

## ⚠️ Important: Remove These Variables

Your Vercel currently has incorrect variable names. **Delete these:**

- ❌ `PRISMA_DATABASE_URL` (first entry)
- ❌ `PRISMA_DATABASE_URL` (second entry/duplicate)

Keep `POSTGRES_URL` if it exists (Vercel auto-generated, won't interfere).

---

## 📋 Step-by-Step Process

1. **Open Vercel Settings**
   - Go to: https://vercel.com/rohit-siwachs-projects/influencers/settings/environment-variables

2. **Remove Old Variables**
   - Find `PRISMA_DATABASE_URL` → Click **⋯** → **Delete**
   - Repeat for any duplicates

3. **Add Each Variable Above**
   - Click **Add New**
   - Copy variable **Name** from above
   - Copy variable **Value** from above
   - Select **Environments** (Production/Preview/Development as shown)
   - Click **Save**
   - Repeat for all 4 variables

4. **Update NEXTAUTH_URL After First Deploy**
   - After deployment, copy your actual Vercel URL
   - Edit the `NEXTAUTH_URL` variable
   - Replace with your real URL
   - Save and redeploy

5. **Redeploy**
   - Go to **Deployments** tab
   - Click **⋯** on latest deployment
   - Select **Redeploy**

---

## ✅ Final Verification

After adding all variables, you should see in Vercel:

| Variable Name | Environment | Status |
|--------------|-------------|---------|
| DATABASE_URL | Production, Preview, Development | ✅ |
| DIRECT_URL | Production, Preview, Development | ✅ |
| NEXTAUTH_URL | Production, Preview | ✅ |
| NEXTAUTH_SECRET | Production, Preview, Development | ✅ |

---

## 🚀 Ready to Deploy!

Once all 4 variables are added correctly, your application will:
- ✅ Build successfully
- ✅ Connect to database
- ✅ Allow registration/login
- ✅ Display all 20 influencers
- ✅ Support favorites, search, and filters

**Estimated setup time: 3 minutes** ⏱️
