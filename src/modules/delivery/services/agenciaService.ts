import { supabase } from "../../../lib/supabase";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import type { Agencia, AgenciaFormValues } from "../types";

type AgenciaRow = {
  id: string;
  nombre: string;
  direccion: string | null;
  ubicacion_lat: number | null;
  ubicacion_lng: number | null;
  telefono: string | null;
  created_at: string | null;
};

const AGENCIA_SELECT =
  "id,nombre,direccion,ubicacion_lat,ubicacion_lng,telefono,created_at";

function parseCoordinate(value: string): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const parsedValue = Number(trimmedValue);

  if (!Number.isFinite(parsedValue)) {
    throw new Error("Las coordenadas deben ser números válidos.");
  }

  return parsedValue;
}

function mapAgencia(row: AgenciaRow): Agencia {
  return {
    id: row.id,
    nombre: row.nombre,
    direccion: row.direccion,
    ubicacion_lat: row.ubicacion_lat,
    ubicacion_lng: row.ubicacion_lng,
    telefono: row.telefono,
    created_at: row.created_at,
  };
}

function buildAgenciaPayload(values: AgenciaFormValues) {
  return {
    nombre: values.nombre.trim(),
    direccion: values.direccion.trim() || null,
    ubicacion_lat: parseCoordinate(values.ubicacion_lat),
    ubicacion_lng: parseCoordinate(values.ubicacion_lng),
    telefono: values.telefono.trim() || null,
  };
}

/**
 * Genera un email automático basado en el nombre de la agencia
 */
function generateAgencyEmail(agencyName: string): string {
  const sanitized = agencyName
    .toLowerCase()
    .replace(/[^\w.-]/g, "")
    .replace(/\s+/g, ".")
    .substring(0, 30);
  const timestamp = Date.now();
  return `agencia.${sanitized}.${timestamp}@lytuapp.com`;
}

/**
 * Genera una contraseña temporal segura
 */
function generateTemporaryPassword(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Crea un usuario admin automáticamente para la agencia
 */
async function createAgencyAdminUser(
  agenciaId: string,
  agencyName: string
): Promise<{ email: string; password: string }> {
  try {
    const email = generateAgencyEmail(agencyName);
    const password = generateTemporaryPassword();

    // Crear usuario en Supabase Auth usando Admin API con email confirmado
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ Usuario confirmado automáticamente sin necesidad de verificación
      user_metadata: {
        role: "agencia",
        agencia_id: agenciaId,
      },
    });

    if (authError || !authData.user) {
      throw new Error(
        `Error creando usuario de autenticación: ${authError?.message || "Usuario no creado"}`
      );
    }

    // Crear registro en tabla usuarios
    const { error: userError } = await supabase.from("usuarios").insert({
      id: authData.user.id,
      email,
      rol: "agencia",
      agencia_id: agenciaId,
      repartidor_id: null,
    });

    if (userError) {
      console.error("Error creating user record:", userError);
      // Intentar eliminar el usuario de auth si falla la creación del record
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
      } catch (deleteError) {
        console.error("Error cleaning up auth user:", deleteError);
      }
      throw new Error(
        `Error creando registro de usuario en base de datos: ${userError.message}`
      );
    }

    return { email, password };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Error inesperado al crear usuario";
    throw new Error(`Fallo crear usuario admin para la agencia: ${message}`);
  }
}

export async function createAgenciaWithUser(
  values: AgenciaFormValues
): Promise<{ agencia: Agencia; credentials: { email: string; password: string } }> {
  const payload = buildAgenciaPayload(values);

  const { data, error } = await supabase
    .from("agencias")
    .insert(payload)
    .select(AGENCIA_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const agencia = mapAgencia(data as AgenciaRow);

  // Crear usuario admin - el error se propaga si falla
  const credentials = await createAgencyAdminUser(agencia.id, agencia.nombre);

  return { agencia, credentials };
}

/**
 * Crea solamente la agencia sin usuario (Paso 1 del flujo de 2 pasos)
 */
export async function createAgenciaOnly(
  values: AgenciaFormValues
): Promise<Agencia> {
  const payload = buildAgenciaPayload(values);

  const { data, error } = await supabase
    .from("agencias")
    .insert(payload)
    .select(AGENCIA_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAgencia(data as AgenciaRow);
}

/**
 * Crea el usuario admin para una agencia existente (Paso 2 del flujo de 2 pasos)
 */
export async function createUserForAgencia(
  agenciaId: string,
  email: string,
  password: string
): Promise<{ email: string; password: string }> {
  // Validar que la agencia existe
  const { data: agenciaData, error: agenciaError } = await supabase
    .from("agencias")
    .select("id")
    .eq("id", agenciaId)
    .single();

  if (agenciaError || !agenciaData) {
    throw new Error("La agencia no existe");
  }

  try {
    // Crear usuario en Supabase Auth usando Admin API con email confirmado
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ Usuario confirmado automáticamente sin necesidad de verificación
      user_metadata: {
        role: "agencia",
        agencia_id: agenciaId,
      },
    });

    if (authError || !authData.user) {
      throw new Error(
        `Error creando usuario de autenticación: ${authError?.message || "Usuario no creado"}`
      );
    }

    // Crear registro en tabla usuarios
    const { error: userError } = await supabase.from("usuarios").insert({
      id: authData.user.id,
      email,
      rol: "agencia",
      agencia_id: agenciaId,
      repartidor_id: null,
    });

    if (userError) {
      console.error("Error creating user record:", userError);
      // Intentar eliminar el usuario de auth si falla la creación del record
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
      } catch (deleteError) {
        console.error("Error cleaning up auth user:", deleteError);
      }
      throw new Error(
        `Error creando registro de usuario en base de datos: ${userError.message}`
      );
    }

    return { email, password };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Error inesperado al crear usuario";
    throw new Error(`Fallo crear usuario admin para la agencia: ${message}`);
  }
}

export async function listAgencias(): Promise<Agencia[]> {
  const { data, error } = await supabase
    .from("agencias")
    .select(AGENCIA_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapAgencia(row as AgenciaRow));
}

export async function createAgencia(
  values: AgenciaFormValues
): Promise<Agencia> {
  const { agencia } = await createAgenciaWithUser(values);
  return agencia;
}

export async function updateAgencia(
  id: string,
  values: AgenciaFormValues
): Promise<Agencia> {
  const payload = buildAgenciaPayload(values);

  const { data, error } = await supabase
    .from("agencias")
    .update(payload)
    .eq("id", id)
    .select(AGENCIA_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAgencia(data as AgenciaRow);
}

export async function deleteAgencia(id: string): Promise<void> {
  const { error } = await supabase.from("agencias").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}