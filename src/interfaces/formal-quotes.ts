export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export type FormalQuoteStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "accepted"
  | "rejected"
  | "expired";

export interface FormalQuote {
  id: string; // UUID
  quote_request_id: string; // UUID references quote_requests(id)
  quote_number: string;

  // Detalles
  title: string;
  description: string | null;
  items: QuoteItem[]; // JSONB

  // Totales
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  currency: string;

  // Términos
  validity_days: number;
  payment_terms: string | null;
  notes: string | null;

  // Estados
  status: FormalQuoteStatus | string;

  // Tracking
  sent_at: string | null;
  viewed_at: string | null;
  responded_at: string | null;
  expires_at: string | null;

  // Archivos
  pdf_url: string | null;

  created_at: string;
  created_by: string | null; // UUID references admin_users(id)
  updated_at: string;
}
