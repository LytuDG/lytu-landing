import { createClient } from "@supabase/supabase-js";
import { ENV } from "../env/env";

// Validar que las variables de entorno existan
const SUPABASE_URL = ENV.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = ENV.SUPABASE_ANON_KEY || "";

// En SSR, es posible que no queramos errores si Supabase no está disponible
// Crear cliente con valores seguros
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: typeof window !== "undefined", // Solo en el cliente
    persistSession: typeof window !== "undefined", // Solo en el cliente
  },
});
