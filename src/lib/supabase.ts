import { createClient } from '@supabase/supabase-js';

// Read Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-supabase-anon-key'
);

// Create Supabase client if configured, otherwise provide null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Database helper operations with fallback to local storage
export const supabaseDb = {
  // --- ORDERS ---
  async fetchOrders() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.warn('Supabase fetchOrders warning:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Supabase fetchOrders error:', err);
      return null;
    }
  },

  async insertOrder(order: any) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          id: order.id,
          order_number: order.orderNumber,
          customer_id: order.customerId,
          customer_name: order.customerName,
          customer_email: order.customerEmail,
          items: order.items,
          subtotal: order.subtotal,
          shipping_fee: order.shippingFee,
          tax: order.tax,
          total: order.total,
          status: order.status,
          shipping_address: order.shippingAddress,
          tracking_number: order.trackingNumber || null,
          tracking_carrier: order.trackingCarrier || null,
          proof_status: order.proofStatus || 'pending',
          proof_versions: order.proofVersions || [],
          created_at: order.createdAt || new Date().toISOString()
        }])
        .select()
        .single();
      if (error) {
        console.warn('Supabase insertOrder warning:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Supabase insertOrder error:', err);
      return null;
    }
  },

  async updateOrderStatus(orderId: string, status: string, trackingInfo?: { carrier?: string; trackingNumber?: string }) {
    if (!supabase) return null;
    try {
      const updatePayload: any = { status };
      if (trackingInfo?.carrier) updatePayload.tracking_carrier = trackingInfo.carrier;
      if (trackingInfo?.trackingNumber) updatePayload.tracking_number = trackingInfo.trackingNumber;

      const { data, error } = await supabase
        .from('orders')
        .update(updatePayload)
        .eq('id', orderId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase updateOrderStatus error:', err);
      return null;
    }
  },

  // --- QUOTES ---
  async fetchQuotes() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.warn('Supabase fetchQuotes warning:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Supabase fetchQuotes error:', err);
      return null;
    }
  },

  async insertQuote(quote: any) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert([{
          id: quote.id || `quote-${Date.now()}`,
          customer_name: quote.customerName,
          company: quote.company || null,
          email: quote.email,
          phone: quote.phone || null,
          product_name: quote.productName,
          quantity: quote.quantity,
          size: quote.size || null,
          stock: quote.stock || null,
          coating: quote.coating || null,
          turnaround: quote.turnaround || null,
          custom_requirements: quote.customRequirements || null,
          estimated_budget: quote.estimatedBudget || null,
          status: quote.status || 'pending',
          quoted_amount: quote.quotedAmount || null,
          admin_notes: quote.adminNotes || null,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      if (error) {
        console.warn('Supabase insertQuote warning:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Supabase insertQuote error:', err);
      return null;
    }
  },

  // --- SAMPLE KITS ---
  async insertSampleKit(sampleKit: any) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('sample_kit_requests')
        .insert([{
          name: sampleKit.name,
          company: sampleKit.company || null,
          email: sampleKit.email,
          phone: sampleKit.phone || null,
          street: sampleKit.street,
          city: sampleKit.city,
          state: sampleKit.state,
          zip: sampleKit.zip,
          interest: sampleKit.interest || 'General Commercial Print',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      if (error) {
        console.warn('Supabase insertSampleKit warning:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Supabase insertSampleKit error:', err);
      return null;
    }
  },

  // --- NEWSLETTER ---
  async insertNewsletterSubscriber(email: string) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, created_at: new Date().toISOString() }])
        .select()
        .single();
      if (error) {
        console.warn('Supabase insertNewsletterSubscriber warning:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Supabase insertNewsletterSubscriber error:', err);
      return null;
    }
  }
};
