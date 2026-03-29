// Detectar si estamos en Node.js (SSR) o en el navegador
const isNode = typeof window === "undefined";

// En Node.js, usar process.env; en navegador, usar import.meta.env
const getEnvVar = (key: string): string | undefined => {
  if (isNode) {
    // SSR en Node.js: Vite inyecta import.meta.env en el servidor también
    // pero también podemos usar process.env como fallback
    return (import.meta.env as any)?.[key] || process.env[key];
  }
  // Navegador: usar import.meta.env
  return (import.meta.env as any)[key];
};

export const ENV = {
  SUPABASE_URL: getEnvVar("VITE_SUPABASE_URL"),
  SUPABASE_ANON_KEY: getEnvVar("VITE_SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_ROLE_KEY: getEnvVar("VITE_SUPABASE_SERVICE_ROLE_KEY"),
  AIML_API_KEY: getEnvVar("VITE_AIML_API_KEY"),
  GOOGLE_AI_API_KEY: getEnvVar("VITE_GOOGLE_AI_API_KEY"),
  GROQ_API_KEY: getEnvVar("VITE_GROQ_API_KEY"),
  MAPTILER_API_KEY: getEnvVar("VITE_MAPTILER_API_KEY"),
};
