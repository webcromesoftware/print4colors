# Print4Colors Deployment & Supabase Guide

This guide explains how to connect your own **Supabase** database and deploy the **Print4Colors** application to **Vercel** or **Cloudflare Pages** directly from your GitHub repository: [`https://github.com/webcromesoftware/print4colors`](https://github.com/webcromesoftware/print4colors).

---

## 1. Set Up Your Supabase Database

1. Create a free account at [supabase.com](https://supabase.com) and click **New project**.
2. Give your project a name (e.g. `print4colors`) and choose a database password.
3. Once the project is created, navigate to the **SQL Editor** from the left navigation bar.
4. Click **New query** and paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) (or run the SQL below):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    tax NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'order_received',
    shipping_address JSONB,
    tracking_number TEXT,
    tracking_carrier TEXT,
    proof_status TEXT DEFAULT 'pending',
    proof_versions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. QUOTES TABLE
CREATE TABLE IF NOT EXISTS public.quotes (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    size TEXT,
    stock TEXT,
    coating TEXT,
    turnaround TEXT,
    custom_requirements TEXT,
    estimated_budget TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    quoted_amount NUMERIC(10, 2),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SAMPLE KITS TABLE
CREATE TABLE IF NOT EXISTS public.sample_kit_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    interest TEXT DEFAULT 'General Commercial Print',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. NEWSLETTER TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sample_kit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public update on orders" ON public.orders FOR UPDATE USING (true);

CREATE POLICY "Allow public insert on quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on quotes" ON public.quotes FOR SELECT USING (true);

CREATE POLICY "Allow public insert on sample kits" ON public.sample_kit_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
```

5. Click **Run**.
6. Navigate to **Project Settings → API** in Supabase and note down:
   - **Project URL** (e.g. `https://your-project.supabase.co`)
   - **Project API Keys → `anon` `public` key** (starts with `ey...`)

---

## 2. Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New... → Project**.
3. Import your GitHub repository: `webcromesoftware/print4colors`.
4. Configure your project:
   - **Framework Preset**: `Vite` (detected automatically)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add the two Supabase variables:
   - `VITE_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key-here`
6. Click **Deploy**.
7. Vercel will build and launch your application with automatic continuous deployment (every git push automatically deploys updates!).

---

## 3. Deploy to Cloudflare Pages (Alternative)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and select **Workers & Pages**.
2. Click **Create Application → Pages → Connect to Git**.
3. Select the repository: `webcromesoftware/print4colors`.
4. In the build setup:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Expand **Environment variables** and add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Save and Deploy**.
7. Cloudflare Pages automatically uses the included `public/_redirects` file so client-side routing works seamlessly on all URLs.

---

## 4. Local Development

To run with your Supabase credentials locally:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your keys:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
