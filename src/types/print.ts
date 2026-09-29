export type OrderStatus =
  | 'Pending Payment'
  | 'Paid'
  | 'Artwork Pending'
  | 'Artwork Review'
  | 'Proof Required'
  | 'Proof Sent'
  | 'Customer Approval Required'
  | 'Approved'
  | 'In Production'
  | 'Shipped'
  | 'Completed';

export interface ProductOption {
  id: string;
  name: string;
  priceDelta: number; // additional cost per unit or flat
  multiplier?: number;
  description?: string;
}

export interface ProductStock {
  id: string;
  name: string;
  description: string;
  multiplier: number; // pricing scale factor
  popular?: boolean;
}

export interface ProductSize {
  id: string;
  name: string;
  dimensions: string; // e.g. "2\" x 3.5\""
  widthInches: number;
  heightInches: number;
  basePrice: number;
}

export interface ProductQuantityTier {
  qty: number;
  unitPriceDiscount: number; // e.g., 0.85 for 15% off
}

export interface TurnaroundOption {
  id: string;
  name: string;
  days: string;
  rushFeePercentage: number;
  badge?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'business-cards' | 'marketing' | 'signs-banners';
  categoryName: string;
  tagline: string;
  description: string;
  pdpCode?: string;
  startingPrice: number;
  imageUrl: string;
  images?: string[];
  uses?: string[];
  popular?: boolean;
  featured?: boolean;
  sizes: ProductSize[];
  stocks: ProductStock[];
  coatings: ProductOption[];
  laminationOptions?: ProductOption[];
  foilColors?: ProductOption[];
  secondRaisedColors?: ProductOption[];
  raisedFoilSides?: { id: string; name: string }[];
  raisedSpotUvSides?: { id: string; name: string }[];
  raisedSpotUvHeights?: { id: string; name: string }[];
  sides: { id: string; name: string; multiplier: number }[];
  corners?: { id: string; name: string; price: number }[];
  folding?: { id: string; name: string; price: number }[];
  quantities: number[];
  standardTurnaround: string;
}

export interface ConfiguredItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  imageUrl: string;
  projectName?: string;
  size: ProductSize;
  stock: ProductStock;
  coating: ProductOption;
  lamination?: ProductOption;
  foilColor?: ProductOption;
  secondRaisedColor?: ProductOption;
  raisedFoilSide?: string;
  raisedSpotUvSide?: string;
  raisedSpotUvHeight?: string;
  includeJobSamples?: boolean;
  includeDigitalProofs?: boolean;
  sides: { id: string; name: string; multiplier: number };
  corner?: { id: string; name: string; price: number };
  folding?: { id: string; name: string; price: number };
  quantity: number;
  turnaround: TurnaroundOption;
  unitPrice: number;
  totalPrice: number;
  artworkType: 'upload' | 'template' | 'design_service';
  artworkFile?: {
    name: string;
    size: string;
    url: string;
    previewUrl?: string;
    uploadDate: string;
  };
  templateData?: TemplateCustomization;
  customerNotes?: string;
}

export interface TemplateCustomization {
  templateId: string;
  templateName: string;
  category: 'business-cards' | 'flyers' | 'brochures';
  businessName: string;
  personName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  tagline: string;
  headline: string;
  descriptionText: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl?: string;
  badgeText?: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'business-cards' | 'flyers' | 'brochures';
  categoryLabel: string;
  thumbnail: string;
  description: string;
  defaultData: TemplateCustomization;
}

export interface ProofVersion {
  version: number;
  proofImageUrl: string;
  createdAt: string;
  designerName: string;
  designerComments: string;
  status: 'Pending Customer Approval' | 'Approved' | 'Changes Requested';
  customerFeedback?: string;
  feedbackDate?: string;
}

export interface Order {
  id: string; // e.g. P4C-10492
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  shippingAddress: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: ConfiguredItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  shippingFee: number;
  shippingMethod: string;
  tax: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending Payment';
  paymentMethod: string;
  paymentTransactionId: string;
  orderStatus: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  proofs: ProofVersion[];
  trackingNumber?: string;
  carrier?: string;
  estimatedDeliveryDate?: string;
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  dimensions: string;
  requirements: string;
  notes?: string;
  hasArtwork: boolean;
  artworkFileName?: string;
  status: 'New' | 'Reviewing' | 'Quote Sent' | 'Closed';
  adminNotes?: string;
  quotedAmount?: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  addresses: {
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }[];
}
