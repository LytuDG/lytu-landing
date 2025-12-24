import { supabase } from "./supabase";
import type {
  BudgetRange,
  ContactPreference,
  Timeline,
} from "../interfaces/quotes";

export interface QuoteFormSubmission {
  // Datos básicos
  email: string;
  company_name: string;
  business_type?: string;
  custom_business_type?: string;

  // Necesidades del proyecto
  main_problem: string;
  selected_systems: string[];

  // Presupuesto y tiempo
  budget_range: BudgetRange;
  timeline: Timeline;

  // Detalles adicionales
  design_status?: string;
  contact_preference: ContactPreference;
  whatsapp_number?: string;
  extra_details?: string;

  // Tracking (opcional, se captura automáticamente)
  page_url?: string;
  referral_source?: string;
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
}

export interface QuoteSubmissionResponse {
  success: boolean;
  tracking_code?: string;
  public_tracking_id?: string;
  error?: string;
}

/**
 * Envía una solicitud de cotización a Supabase
 */
export async function submitQuoteRequest(
  formData: QuoteFormSubmission
): Promise<QuoteSubmissionResponse> {
  try {
    // Capturar información de tracking automáticamente
    const trackingData = {
      page_url: window.location.href,
      referral_source: document.referrer || null,
      // Capturar UTM parameters si existen
      utm_campaign: new URLSearchParams(window.location.search).get(
        "utm_campaign"
      ),
      utm_source: new URLSearchParams(window.location.search).get("utm_source"),
      utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
    };

    // Preparar datos para inserción
    const quoteData = {
      ...formData,
      ...trackingData,
      // El tracking_code, public_tracking_id y lead_score se generan automáticamente por triggers
      status: "new" as const,
    };

    // Insertar en Supabase
    const { data, error } = await supabase
      .from("quote_requests")
      .insert([quoteData])
      .select("tracking_code, public_tracking_id")
      .single();

    if (error) {
      console.error("Error submitting quote:", error);
      return {
        success: false,
        error: error.message || "Error al enviar la solicitud",
      };
    }

    return {
      success: true,
      tracking_code: data.tracking_code,
      public_tracking_id: data.public_tracking_id,
    };
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: error.message || "Error inesperado al enviar la solicitud",
    };
  }
}

/**
 * Sube un logo a Supabase Storage
 */
export async function uploadLogo(
  file: File,
  quoteId: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${quoteId}/logo.${fileExt}`;
    const filePath = `quotes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("lytu-documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      return {
        success: false,
        error: uploadError.message,
      };
    }

    // Obtener URL pública
    const { data } = supabase.storage
      .from("lytu-documents")
      .getPublicUrl(filePath);

    return {
      success: true,
      url: data.publicUrl,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al subir el logo",
    };
  }
}

/**
 * Obtiene la información pública de una cotización por su ID de seguimiento público
 */
export async function getQuoteByTrackingId(trackingId: string) {
  try {
    const { data, error } = await supabase
      .from("quote_requests")
      .select(
        `
        id,
        company_name,
        status,
        created_at,
        updated_at,
        selected_systems,
        budget_range,
        timeline,
        tracking_code
      `
      )
      .eq("public_tracking_id", trackingId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
