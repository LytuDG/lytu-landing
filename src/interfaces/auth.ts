export interface AdminUser {
  id: string; // UUID
  email: string;
  name: string;
  role: "admin" | "agent" | string;
  avatar_url: string | null;
  created_at: string; // TIMESTAMPTZ
  updated_at: string; // TIMESTAMPTZ
  last_login: string | null; // TIMESTAMPTZ
  is_active: boolean;
}
