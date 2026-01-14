export type BudgetRange =
  | "<650"
  | "650-1500"
  | "1500-4000"
  | "4000+"
  | "need_advice";
export type Timeline = "urgent" | "next_month" | "2_3_months" | "just_looking";
export type ContactPreference = "email" | "whatsapp";
export type QuoteStatus =
  | "new"
  | "viewed"
  | "analyzing"
  | "contacted"
  | "quoted"
  | "won"
  | "lost";

export interface QuoteRequest {
  id: string; // UUID
  tracking_code: string;
  public_tracking_id: string; // UUID

  // Sección 1: Datos básicos
  email: string;
  company_name: string;
  business_type: string;
  custom_business_type: string | null;
  needs_logo?: boolean;

  // Sección 2: Necesidades
  main_problem: string;
  selected_systems: string[]; // TEXT[]

  // Sección 3: Presupuesto y tiempo
  budget_range: BudgetRange;
  timeline: Timeline;

  // Sección 4: Detalles finales
  design_status: string | null;
  contact_preference: ContactPreference;
  whatsapp_number: string | null;
  extra_details: string | null;

  // Metadatos y tracking
  page_url: string | null;
  referral_source: string | null;
  utm_campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;

  // Estados y asignación
  status: QuoteStatus;
  assigned_to: string | null; // UUID references admin_users(id)
  priority: number;

  // Timestamps
  created_at: string;
  updated_at: string;
  first_viewed_at: string | null;
  last_viewed_at: string | null;
  contacted_at: string | null;
  quoted_at: string | null;
  closed_at: string | null;

  // Score automático
  lead_score: number;
}
