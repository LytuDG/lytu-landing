export type ClientStatus = "lead" | "prospect" | "client" | "inactive" | "lost";

export interface Client {
  id: string; // UUID

  // Información básica
  name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  company: string | null;
  position: string | null;

  // Detalles del negocio
  business_type: string | null;
  industry: string | null;
  employee_count: string | null;

  // Dirección
  country: string | null;
  city: string | null;
  address: string | null;

  // Estados
  status: ClientStatus;
  source: string | null;

  // Metadatos
  notes: string | null;
  tags: string[]; // TEXT[]

  // Relaciones
  assigned_to: string | null; // UUID references admin_users(id)
  converted_from_quote: string | null; // UUID references quote_requests(id)

  // Engagement
  last_contacted: string | null; // TIMESTAMPTZ
  next_follow_up: string | null; // TIMESTAMPTZ

  created_at: string;
  updated_at: string;
}
