export interface ClientInteraction {
  id: string; // UUID
  client_id: string; // UUID references clients(id)
  admin_user_id: string | null; // UUID references admin_users(id)

  type: "call" | "email" | "meeting" | "note" | "task" | string;
  direction: "inbound" | "outbound" | null;

  // Detalles específicos
  subject: string | null;
  content: string | null;
  duration_minutes: number | null;

  // Meeting específico
  meeting_date: string | null; // TIMESTAMPTZ
  meeting_type: string | null;
  meeting_url: string | null;

  // Tareas
  due_date: string | null; // TIMESTAMPTZ
  completed: boolean;
  completed_at: string | null; // TIMESTAMPTZ

  // Archivos
  attachments: string[]; // TEXT[]

  created_at: string;
}
