# Deployment Guide - Supabase Cloud + Vercel

## Prerequisites

- Supabase account (https://supabase.com)
- Vercel account (https://vercel.com)
- GitHub repository

## Step 1: Deploy Database & Functions to Supabase Cloud

### 1.1 Create Supabase Project

```bash
# Login to Supabase
supabase login

# Link to existing project or create new
supabase link --project-ref your-project-ref
# OR
supabase projects create invoice-service
```

### 1.2 Push Database Schema

```bash
# Push migrations
supabase db push

# Verify in Supabase Dashboard → Database → Tables
```

### 1.3 Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy

# OR deploy individually
supabase functions deploy health
supabase functions deploy invoices

# Set secrets (if needed)
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set ADMIN_EMAIL=admin@yourcompany.com
```

### 1.4 Get Production Keys

```bash
# Get your production URL and keys
supabase projects list
```

Or from Dashboard:

- Project Settings → API
- Copy `URL` and `anon/public` key

## Step 2: Deploy Frontend to Vercel

### 2.1 Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2.2 Import to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 2.3 Set Environment Variables in Vercel

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (from Supabase Dashboard)
```

### 2.4 Deploy

Click "Deploy" - Done! ✅

## Step 3: Test Production

```bash
# Test health
curl https://your-project.supabase.co/functions/v1/health

# Test frontend
open https://your-app.vercel.app
```

## Costs

- **Supabase Free Tier**: 500MB database, 2GB bandwidth
- **Vercel Free Tier**: Unlimited deployments, 100GB bandwidth
- **Total**: $0/month for small projects

---
