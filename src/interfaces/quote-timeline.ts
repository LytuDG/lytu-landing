export interface QuoteTimeline {
  id: string; // UUID
  quote_request_id: string; // UUID references quote_requests(id)
  admin_user_id: string | null; // UUID references admin_users(id)

  action_type: string;
  status: string | null;
  title: string;
  description: string | null;
  internal_note: boolean;

  // Archivos adjuntos
  file_urls: string[]; // TEXT[]

  created_at: string;
}
