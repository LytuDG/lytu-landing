import React from "react";
import type { Session } from "@supabase/supabase-js";
import type {
  DeliveryAuthContextType,
  DeliveryUserProfile,
} from "../types";
import { supabase } from "../../../lib/supabase";
import {
  fetchDeliveryProfile,
  getCurrentSessionUser,
  signInWithPassword as signInWithPasswordService,
  signOutUser,
} from "../services/authService";

const DeliveryAuthContext = React.createContext<
  DeliveryAuthContextType | undefined
>(undefined);

function getProfileErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "No se pudo cargar el acceso de operaciones.";
}

export function DeliveryAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState(true);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [profile, setProfile] = React.useState<DeliveryUserProfile | null>(null);

  const clearAuthState = React.useCallback(() => {
    setUserId(null);
    setEmail(null);
    setProfile(null);
  }, []);

  const loadProfile = React.useCallback(
    async (nextUserId: string | null, nextEmail?: string | null) => {
      if (!nextUserId) {
        clearAuthState();
        return;
      }

      setUserId(nextUserId);
      setEmail(nextEmail ?? null);

      const nextProfile = await fetchDeliveryProfile(nextUserId);

      if (!nextProfile) {
        clearAuthState();
        throw new Error("Tu usuario no tiene acceso al módulo de operaciones.");
      }

      setProfile(nextProfile);
      setEmail(nextProfile.email || nextEmail || null);
    },
    [clearAuthState]
  );

  const initializeAuth = React.useCallback(async () => {
    setLoading(true);

    try {
      const user = await getCurrentSessionUser();

      if (!user) {
        clearAuthState();
        return;
      }

      await loadProfile(user.id, user.email ?? null);
    } finally {
      setLoading(false);
    }
  }, [clearAuthState, loadProfile]);

  React.useEffect(() => {
    let isMounted = true;

    const runInitialization = async () => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error(getProfileErrorMessage(error));
        if (isMounted) {
          clearAuthState();
        }
      }
    };

    runInitialization();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      void (async () => {
        if (!isMounted) {
          return;
        }

        setLoading(true);

        try {
          const sessionUser = session?.user ?? null;

          if (!sessionUser) {
            clearAuthState();
            return;
          }

          await loadProfile(sessionUser.id, sessionUser.email ?? null);
        } catch (error) {
          console.error(getProfileErrorMessage(error));
          clearAuthState();
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      })();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [clearAuthState, initializeAuth, loadProfile]);

  const handleSignInWithPassword = React.useCallback<
    DeliveryAuthContextType["signInWithPassword"]
  >(async (nextEmail, password) => {
    return signInWithPasswordService(nextEmail, password);
  }, []);

  const handleSignOut = React.useCallback(async () => {
    await signOutUser();
    clearAuthState();
  }, [clearAuthState]);

  const refreshProfile = React.useCallback(async () => {
    const user = await getCurrentSessionUser();

    if (!user) {
      clearAuthState();
      return;
    }

    setLoading(true);

    try {
      await loadProfile(user.id, user.email ?? null);
    } finally {
      setLoading(false);
    }
  }, [clearAuthState, loadProfile]);

  const value = React.useMemo<DeliveryAuthContextType>(
    () => ({
      loading,
      userId,
      email,
      profile,
      role: profile?.rol ?? null,
      agencyId: profile?.agencia_id ?? null,
      courierId: profile?.repartidor_id ?? null,
      signInWithPassword: handleSignInWithPassword,
      signOut: handleSignOut,
      refreshProfile,
    }),
    [
      email,
      handleSignInWithPassword,
      handleSignOut,
      loading,
      profile,
      refreshProfile,
      userId,
    ]
  );

  return (
    <DeliveryAuthContext.Provider value={value}>
      {children}
    </DeliveryAuthContext.Provider>
  );
}

export function useDeliveryAuth() {
  const context = React.useContext(DeliveryAuthContext);

  if (!context) {
    throw new Error(
      "useDeliveryAuth debe utilizarse dentro de un DeliveryAuthProvider."
    );
  }

  return context;
}