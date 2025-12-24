// ============================================
// 7. ANALÍTICAS WEB

import type { Json } from "./common";

// ============================================
export interface WebAnalytics {
  id: string; // UUID
  session_id: string;
  visitor_id: string;

  // Información de la visita
  page_url: string;
  page_title: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;

  // Datos del usuario
  user_agent: string | null;
  browser: string | null;
  os: string | null;
  device_type: string | null;
  screen_resolution: string | null;

  // Geolocalización
  country: string | null;
  region: string | null;
  city: string | null;

  // Datos técnicos
  ip_address: string | null;

  // Timestamps
  entered_at: string;
  exited_at: string | null;
  session_duration: number | null;
}

// ============================================
// 8. EVENTOS DE PÁGINA
// ============================================
export interface PageEvent {
  id: string; // UUID
  session_id: string;
  visitor_id: string;

  event_type: string;
  page_url: string;

  // Datos específicos
  element_id: string | null;
  element_class: string | null;
  element_text: string | null;

  // Scroll tracking
  scroll_depth: number | null;

  // Form tracking
  form_type: string | null;
  form_step: number | null;
  form_data: Json | null; // JSONB

  // Tiempo
  timestamp: string;
  time_on_page: number | null;
}

// ============================================
// 9. ANÁLISIS DE FORMULARIO
// ============================================
export interface FormAnalytics {
  id: string; // UUID
  form_session_id: string;
  form_type: string;

  // Estado
  status: "started" | "completed" | "abandoned" | string;
  abandoned_step: number | null;
  completion_time: number | null;

  // Datos del formulario
  form_data: Json | null; // JSONB

  // Relación con quote
  quote_request_id: string | null; // UUID references quote_requests(id)

  // Timestamps
  started_at: string;
  completed_at: string | null;
}
