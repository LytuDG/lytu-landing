import { supabase } from "./supabase";
import type { Client, ClientStatus } from "../interfaces/clients";

/**
 * Fetch all clients with optional filters
 */
export async function fetchClients(filters?: {
  status?: ClientStatus;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabase
      .from("clients")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.search) {
      query = query.or(
        `email.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,contact_name.ilike.%${filters.search}%`
      );
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(
        filters.offset,
        filters.offset + (filters.limit || 10) - 1
      );
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      success: true,
      data: data as Client[],
      count: count || 0,
    };
  } catch (error: any) {
    console.error("Error fetching clients:", error);
    return {
      success: false,
      error: error.message,
      data: [],
      count: 0,
    };
  }
}

/**
 * Fetch a single client by ID
 */
export async function fetchClientById(id: string) {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as Client,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Update client status
 */
export async function updateClientStatus(id: string, status: ClientStatus) {
  try {
    const { data, error } = await supabase
      .from("clients")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as Client,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Update client information
 */
export async function updateClient(id: string, updates: Partial<Client>) {
  try {
    const { data, error } = await supabase
      .from("clients")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as Client,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Add tags to client
 */
export async function addClientTags(clientId: string, newTags: string[]) {
  try {
    // First get current tags
    const { data: client } = await supabase
      .from("clients")
      .select("tags")
      .eq("id", clientId)
      .single();

    const currentTags = client?.tags || [];
    const updatedTags = [...new Set([...currentTags, ...newTags])];

    const { data, error } = await supabase
      .from("clients")
      .update({
        tags: updatedTags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", clientId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as Client,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Remove tag from client
 */
export async function removeClientTag(clientId: string, tagToRemove: string) {
  try {
    const { data: client } = await supabase
      .from("clients")
      .select("tags")
      .eq("id", clientId)
      .single();

    const updatedTags = (client?.tags || []).filter(
      (tag: string) => tag !== tagToRemove
    );

    const { data, error } = await supabase
      .from("clients")
      .update({
        tags: updatedTags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", clientId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as Client,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get client statistics
 */
export async function getClientStats() {
  try {
    // Get total clients
    const { count: totalClients } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true });

    // Get clients by status
    const { data: statusData } = await supabase
      .from("clients")
      .select("status");

    const statusCounts =
      statusData?.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

    // Get clients by source
    const { data: sourceData } = await supabase
      .from("clients")
      .select("source");

    const sourceCounts =
      sourceData?.reduce((acc, item) => {
        acc[item.source] = (acc[item.source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

    return {
      success: true,
      data: {
        total: totalClients || 0,
        byStatus: statusCounts,
        bySource: sourceCounts,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Subscribe to real-time client updates
 */
export function subscribeToClients(callback: (payload: any) => void) {
  const subscription = supabase
    .channel("clients_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "clients",
      },
      callback
    )
    .subscribe();

  return subscription;
}
