-- =========================================================================
-- PRINT4COLORS COMMERCIAL PRINTING PLATFORM
-- SUPABASE POSTGRESQL DATABASE SCHEMA & MIGRATION SCRIPT
-- =========================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. ORDERS TABLE
-- -------------------------------------------------------------------------
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for searching orders by customer email and order number
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders (customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders (order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (status);

-- -------------------------------------------------------------------------
-- 2. QUOTES TABLE
-- -------------------------------------------------------------------------
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotes_email ON public.quotes (email);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes (status);

-- -------------------------------------------------------------------------
-- 3. SAMPLE KIT REQUESTS TABLE
-- -------------------------------------------------------------------------
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

-- -------------------------------------------------------------------------
-- 4. NEWSLETTER SUBSCRIBERS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------------------
-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sample_kit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anonymous public policy: Allow public checkout inserts & quotes
CREATE POLICY "Allow public insert on orders" ON public.orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on orders" ON public.orders
    FOR SELECT USING (true);

CREATE POLICY "Allow public update on orders" ON public.orders
    FOR UPDATE USING (true);

CREATE POLICY "Allow public insert on quotes" ON public.quotes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on quotes" ON public.quotes
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on sample kits" ON public.sample_kit_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- -------------------------------------------------------------------------
-- 6. SAMPLE SEED DATA
-- -------------------------------------------------------------------------
INSERT INTO public.orders (id, order_number, customer_id, customer_name, customer_email, subtotal, shipping_fee, tax, total, status, items)
VALUES
('ord-sample-1', 'P4C-2026-9041', 'cust-apex', 'Marcus Vance', 'marcus@apexadvisory.com', 124.95, 0.00, 10.31, 135.26, 'in_production', '[{"productName":"Dual Raised Business Cards","quantity":500,"totalPrice":124.95}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.quotes (id, customer_name, company, email, product_name, quantity, status)
VALUES
('quote-sample-1', 'Sophia Martinez', 'Vanguard Media Group', 'sophia@vanguardmg.com', 'Saddle-Stitched Annual Reports (64 pages)', 2500, 'in_review')
ON CONFLICT (id) DO NOTHING;
