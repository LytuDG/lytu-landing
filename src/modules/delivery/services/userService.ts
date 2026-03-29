import { supabase } from "../../../lib/supabase";
import type { DeliveryUserProfile } from "../types";

type UserRow = {
  id: string;
  email: string;
  rol: "admin" | "agencia" | "repartidor";
  agencia_id: string | null;
  repartidor_id: string | null;
  created_at: string;
  agencias?: {
    id?: string;
    nombre?: string | null;
  } | null;
  repartidores?: {
    id?: string;
    nombre?: string | null;
  } | null;
};

const USER_SELECT =
  "id,email,rol,agencia_id,repartidor_id,created_at,agencias(id,nombre),repartidores(id,nombre)";

function mapUser(row: UserRow): DeliveryUserProfile & { agenciaName?: string; repartidorName?: string } {
  let agenciaName: string | undefined;
  let repartidorName: string | undefined;

  if (row.agencias && typeof row.agencias === "object" && !Array.isArray(row.agencias)) {
    agenciaName = row.agencias.nombre ?? undefined;
  }

  if (row.repartidores && typeof row.repartidores === "object" && !Array.isArray(row.repartidores)) {
    repartidorName = row.repartidores.nombre ?? undefined;
  }

  return {
    id: row.id,
    email: row.email,
    rol: row.rol,
    agencia_id: row.agencia_id,
    repartidor_id: row.repartidor_id,
    created_at: row.created_at,
    agenciaName,
    repartidorName,
  };
}

export async function listUsers(params?: {
  rol?: "admin" | "agencia" | "repartidor" | null;
  agencia_id?: string | null;
}): Promise<
  (DeliveryUserProfile & { agenciaName?: string; repartidorName?: string })[]
> {
  let query = supabase
    .from("usuarios")
    .select(USER_SELECT)
    .order("created_at", { ascending: false });

  if (params?.rol) {
    query = query.eq("rol", params.rol);
  }

  if (params?.agencia_id) {
    query = query.eq("agencia_id", params.agencia_id);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapUser(row as UserRow));
}

export async function updateUserRole(
  userId: string,
  newRole: "admin" | "agencia" | "repartidor"
): Promise<DeliveryUserProfile> {
  const { data, error } = await supabase
    .from("usuarios")
    .update({ rol: newRole })
    .eq("id", userId)
    .select(USER_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapUser(data as UserRow);
}

export async function deleteUser(userId: string): Promise<void> {
  // Primero intentar eliminar de la tabla usuarios
  const { error: userError } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", userId);

  if (userError) {
    throw new Error(`Error eliminando usuario: ${userError.message}`);
  }

  // Luego eliminar de auth (usando admin API)
  try {
    await supabase.auth.admin.deleteUser(userId);
  } catch (authError) {
    console.error("Error eliminando usuario de auth:", authError);
    // No lanzar error aquí porque el usuario ya fue eliminado de la tabla
  }
}

export async function resendVerificationEmail(email: string): Promise<void> {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  if (error) {
    throw new Error(`Error reenviando email: ${error.message}`);
  }
}
