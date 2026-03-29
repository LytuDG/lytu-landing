import { supabase } from "../../../lib/supabase";
import type { DeliveryUserProfile } from "../types";

type AuthResult = {
  error: Error | null;
};

const USER_PROFILE_COLUMNS =
  "id,email,rol,agencia_id,repartidor_id,created_at";

function normalizeAuthError(error: unknown, fallbackMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === "string") {
    return new Error(error);
  }

  return new Error(fallbackMessage);
}

export async function getCurrentSessionUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw normalizeAuthError(error, "No se pudo obtener la sesión actual.");
  }

  return data.user;
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    error: error ? normalizeAuthError(error, "No se pudo iniciar sesión.") : null,
  };
}

export async function signOutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw normalizeAuthError(error, "No se pudo cerrar sesión.");
  }
}

export async function fetchDeliveryProfile(
  userId: string
): Promise<DeliveryUserProfile | null> {
  const { data, error } = await supabase
    .from("usuarios")
    .select(USER_PROFILE_COLUMNS)
    .eq("id", userId)
    .maybeSingle<DeliveryUserProfile>();

  if (error) {
    throw normalizeAuthError(error, "No se pudo cargar el perfil del usuario.");
  }

  return data;
}