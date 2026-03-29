import { createClient } from "@supabase/supabase-js";
import { ENV } from "../env/env";

/**
 * Cliente Supabase con service role key para operaciones administrativas
 * IMPORTANTE: Esto solo debe usarse en el servidor (backend)
 * Nunca expongas la service role key en el cliente
 */
export const supabaseAdmin = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY
);
