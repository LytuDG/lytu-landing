import { supabase } from "./supabase";
import type { QuoteRequest, QuoteStatus } from "../interfaces/quotes";

/**
 * Fetch all quote requests with optional filters
 */
export async function fetchQuoteRequests(filters?: {
  status?: QuoteStatus;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabase
      .from("quote_requests")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.search) {
      query = query.or(
        `email.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,tracking_code.ilike.%${filters.search}%`
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
      data: data as QuoteRequest[],
      count: count || 0,
    };
  } catch (error: any) {
    console.error("Error fetching quotes:", error);
    return {
      success: false,
      error: error.message,
      data: [],
      count: 0,
    };
  }
}

/**
 * Fetch a single quote request by ID
 */
export async function fetchQuoteById(id: string) {
  try {
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as QuoteRequest,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Update quote status
 */
export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  try {
    const { data, error } = await supabase
      .from("quote_requests")
      .update({
        status,
        updated_at: new Date().toISOString(),
        ...(status === "viewed" && {
          first_viewed_at: new Date().toISOString(),
        }),
        ...(status === "contacted" && {
          contacted_at: new Date().toISOString(),
        }),
        ...(status === "quoted" && { quoted_at: new Date().toISOString() }),
        ...(["won", "lost"].includes(status) && {
          closed_at: new Date().toISOString(),
        }),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as QuoteRequest,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Assign quote to admin user
 */
export async function assignQuote(quoteId: string, adminUserId: string) {
  try {
    const { data, error } = await supabase
      .from("quote_requests")
      .update({
        assigned_to: adminUserId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", quoteId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data as QuoteRequest,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  try {
    // Get total quotes
    const { count: totalQuotes } = await supabase
      .from("quote_requests")
      .select("*", { count: "exact", head: true });

    // Get new quotes (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: newQuotes } = await supabase
      .from("quote_requests")
      .select("*", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo.toISOString());

    // Get quotes by status
    const { data: statusData } = await supabase
      .from("quote_requests")
      .select("status");

    const statusCounts =
      statusData?.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

    return {
      success: true,
      data: {
        total: totalQuotes || 0,
        new: newQuotes || 0,
        byStatus: statusCounts,
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
 * Subscribe to real-time quote updates
 */
export function subscribeToQuotes(callback: (payload: any) => void) {
  const subscription = supabase
    .channel("quote_requests_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "quote_requests",
      },
      callback
    )
    .subscribe();

  return subscription;
}
