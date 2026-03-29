import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDeliveryAuth } from "../context/DeliveryAuthContext";

export default function OpsProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, profile } = useDeliveryAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/ops/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}