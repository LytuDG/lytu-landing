import { Json } from "./common";

export interface SystemConfig {
  id: string; // UUID
  config_key: string;
  config_value: Json; // JSONB
  category: string | null;
  description: string | null;
  updated_at: string;
  updated_by: string | null; // UUID references admin_users(id)
}
