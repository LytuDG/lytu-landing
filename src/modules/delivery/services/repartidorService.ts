import { supabase } from "../../../lib/supabase";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import type { Agencia, Repartidor, RepartidorFormValues } from "../types";

type RepartidorRow = {
  id: string;
  agencia_id: string | null;
  nombre: string;
  vehiculo_descripcion: string | null;
  telefono: string | null;
  activo: boolean | null;
  ubicacion_actual_lat?: number | null;
  ubicacion_actual_lng?: number | null;
  created_at: string | null;
  agencias?:
    | {
        id?: string;
        nombre?: string | null;
      }
    | {
        id?: string;
        nombre?: string | null;
      }[]
    | null;
};

function parseNumber(value: string | undefined) {
  if (!value || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

/**
 * Genera un email automático basado en el nombre del repartidor
 */
function generateRepartidorEmail(repartidorName: string): string {
  const sanitized = repartidorName
    .toLowerCase()
    .replace(/[^\w.-]/g, "")
    .replace(/\s+/g, ".")
    .substring(0, 30);
  const timestamp = Date.now();
  return `repartidor.${sanitized}.${timestamp}@lytuapp.com`;
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
 * Crea un usuario para el repartidor
 */
async function createRepartidorUser(
  repartidorId: string,
  agenciaId: string | null,
  repartidorName: string
): Promise<{ email: string; password: string }> {
  try {
    if (!agenciaId) {
      throw new Error("El repartidor debe estar asociado a una agencia");
    }

    const email = generateRepartidorEmail(repartidorName);
    const password = generateTemporaryPassword();

    // Crear usuario en Supabase Auth usando Admin API con email confirmado
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ Usuario confirmado automáticamente sin necesidad de verificación
      user_metadata: {
        role: "repartidor",
        repartidor_id: repartidorId,
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
      rol: "repartidor",
      agencia_id: agenciaId,
      repartidor_id: repartidorId,
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
    throw new Error(`Fallo crear usuario para el repartidor: ${message}`);
  }
}

function mapAgencyRelation(
  agencias: RepartidorRow["agencias"],
  fallbackAgencyId: string | null
): Agencia | null {
  if (!agencias) {
    return fallbackAgencyId
      ? {
          id: fallbackAgencyId,
          nombre: "",
          direccion: null,
          ubicacion_lat: null,
          ubicacion_lng: null,
          telefono: null,
          created_at: null,
        }
      : null;
  }

  const agency = Array.isArray(agencias) ? agencias[0] : agencias;

  if (!agency) {
    return null;
  }

  return {
    id: agency.id ?? fallbackAgencyId ?? "",
    nombre: agency.nombre ?? "",
    direccion: null,
    ubicacion_lat: null,
    ubicacion_lng: null,
    telefono: null,
    created_at: null,
  };
}

function mapRepartidor(row: RepartidorRow): Repartidor {
  return {
    id: row.id,
    agencia_id: row.agencia_id,
    nombre: row.nombre,
    vehiculo_descripcion: row.vehiculo_descripcion ?? null,
    telefono: row.telefono ?? null,
    activo: row.activo ?? false,
    ubicacion_actual_lat: row.ubicacion_actual_lat ?? null,
    ubicacion_actual_lng: row.ubicacion_actual_lng ?? null,
    created_at: row.created_at ?? null,
    agencia: mapAgencyRelation(row.agencias, row.agencia_id),
  };
}

function buildPayload(values: RepartidorFormValues) {
  return {
    agencia_id: values.agencia_id || null,
    nombre: values.nombre.trim(),
    vehiculo_descripcion: values.vehiculo_descripcion.trim() || null,
    telefono: values.telefono.trim() || null,
    activo: values.activo,
    ubicacion_actual_lat: parseNumber(
      (values as RepartidorFormValues & { ubicacion_actual_lat?: string })
        .ubicacion_actual_lat
    ),
    ubicacion_actual_lng: parseNumber(
      (values as RepartidorFormValues & { ubicacion_actual_lng?: string })
        .ubicacion_actual_lng
    ),
  };
}

export async function listRepartidores(params?: {
  agencyId?: string | null;
}): Promise<Repartidor[]> {
  let query = supabase
    .from("repartidores")
    .select(
      "id, agencia_id, nombre, vehiculo_descripcion, telefono, activo, ubicacion_actual_lat, ubicacion_actual_lng, created_at, agencias(id, nombre)"
    )
    .order("created_at", { ascending: false });

  if (params?.agencyId) {
    query = query.eq("agencia_id", params.agencyId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapRepartidor(row as RepartidorRow));
}

export async function createRepartidor(
  values: RepartidorFormValues
): Promise<Repartidor> {
  const { repartidor } = await createRepartidorWithUser(values);
  return repartidor;
}

/**
 * Crea solamente el repartidor sin usuario (Paso 1 del flujo de 2 pasos)
 */
export async function createRepartidorOnly(
  values: RepartidorFormValues
): Promise<Repartidor> {
  const payload = buildPayload(values);

  const { data, error } = await supabase
    .from("repartidores")
    .insert(payload)
    .select(
      "id, agencia_id, nombre, vehiculo_descripcion, telefono, activo, ubicacion_actual_lat, ubicacion_actual_lng, created_at, agencias(id, nombre)"
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapRepartidor(data as RepartidorRow);
}

/**
 * Crea el usuario para un repartidor existente (Paso 2 del flujo de 2 pasos)
 */
export async function createUserForRepartidor(
  repartidorId: string,
  agenciaId: string | null,
  repartidorName: string,
  email: string,
  password: string
): Promise<{ email: string; password: string }> {
  // Validar que el repartidor existe
  const { data: repartidorData, error: repartidorError } = await supabase
    .from("repartidores")
    .select("id")
    .eq("id", repartidorId)
    .single();

  if (repartidorError || !repartidorData) {
    throw new Error("El repartidor no existe");
  }

  try {
    if (!agenciaId) {
      throw new Error("El repartidor debe estar asociado a una agencia");
    }

    // Crear usuario en Supabase Auth usando Admin API con email confirmado
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ Usuario confirmado automáticamente sin necesidad de verificación
      user_metadata: {
        role: "repartidor",
        repartidor_id: repartidorId,
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
      rol: "repartidor",
      agencia_id: agenciaId,
      repartidor_id: repartidorId,
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
    throw new Error(`Fallo crear usuario para el repartidor: ${message}`);
  }
}

export async function createRepartidorWithUser(
  values: RepartidorFormValues
): Promise<{ repartidor: Repartidor; credentials: { email: string; password: string } }> {
  const payload = buildPayload(values);

  const { data, error } = await supabase
    .from("repartidores")
    .insert(payload)
    .select(
      "id, agencia_id, nombre, vehiculo_descripcion, telefono, activo, ubicacion_actual_lat, ubicacion_actual_lng, created_at, agencias(id, nombre)"
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const repartidor = mapRepartidor(data as RepartidorRow);

  // Crear usuario - el error se propaga si falla
  const credentials = await createRepartidorUser(
    repartidor.id,
    repartidor.agencia_id,
    repartidor.nombre
  );

  return { repartidor, credentials };
}

export async function updateRepartidor(
  id: string,
  values: RepartidorFormValues
): Promise<Repartidor> {
  const payload = buildPayload(values);

  const { data, error } = await supabase
    .from("repartidores")
    .update(payload)
    .eq("id", id)
    .select(
      "id, agencia_id, nombre, vehiculo_descripcion, telefono, activo, ubicacion_actual_lat, ubicacion_actual_lng, created_at, agencias(id, nombre)"
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapRepartidor(data as RepartidorRow);
}

export async function deleteRepartidor(id: string): Promise<void> {
  const { error } = await supabase.from("repartidores").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function toggleRepartidorActivo(
  id: string,
  activo: boolean
): Promise<Repartidor> {
  const { data, error } = await supabase
    .from("repartidores")
    .update({ activo })
    .eq("id", id)
    .select(
      "id, agencia_id, nombre, vehiculo_descripcion, telefono, activo, ubicacion_actual_lat, ubicacion_actual_lng, created_at, agencias(id, nombre)"
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapRepartidor(data as RepartidorRow);
}

export async function listAgencyOptions(): Promise<Agencia[]> {
  const { data, error } = await supabase
    .from("agencias")
    .select(
      "id, nombre, direccion, ubicacion_lat, ubicacion_lng, telefono, created_at"
    )
    .order("nombre", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Agencia[];
}