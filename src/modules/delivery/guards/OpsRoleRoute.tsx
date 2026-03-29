import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useDeliveryAuth } from "../context/DeliveryAuthContext";
import type { DeliveryUserRole } from "../types";

export default function OpsRoleRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: DeliveryUserRole[];
  children: React.ReactNode;
}) {
  const { loading, profile, role } = useDeliveryAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!profile) {
    return <Navigate to="/ops/login" state={{ from: location }} replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md rounded-2xl border border-amber-500/20 bg-slate-900/80 p-8 text-center shadow-2xl shadow-black/20">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-xl font-semibold text-white">Acceso restringido</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            No tienes permisos para acceder a esta sección de operaciones.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}