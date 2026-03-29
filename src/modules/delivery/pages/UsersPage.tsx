import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Loader2,
  Mail,
  RefreshCw,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import {
  deleteUser,
  listUsers,
  updateUserRole,
} from "../services/userService";
import type { DeliveryUserProfile, DeliveryUserRole } from "../types";

type DeliveryAuthHook = () => {
  role: DeliveryUserRole | null;
};

let useDeliveryAuthSafe: DeliveryAuthHook = () => ({ role: null });

try {
  const contextModule = await import("../context/DeliveryAuthContext");
  if (typeof contextModule.useDeliveryAuth === "function") {
    useDeliveryAuthSafe = contextModule.useDeliveryAuth as DeliveryAuthHook;
  }
} catch {
  useDeliveryAuthSafe = () => ({ role: null });
}

function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRoleBadge(rol: DeliveryUserRole) {
  const styles = {
    admin: "bg-red-500/20 text-red-200 border-red-500/50",
    agencia: "bg-cyan-500/20 text-cyan-200 border-cyan-500/50",
    repartidor: "bg-emerald-500/20 text-emerald-200 border-emerald-500/50",
  };

  const labels = {
    admin: "Administrador",
    agencia: "Agencia",
    repartidor: "Repartidor",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${styles[rol]}`}>
      {labels[rol]}
    </span>
  );
}

export default function UsersPage() {
  const { role } = useDeliveryAuthSafe();
  const isAdmin = role === "admin";

  const [users, setUsers] = useState<
    (DeliveryUserProfile & { agenciaName?: string; repartidorName?: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<DeliveryUserRole | "all">("all");
  const [selectedUser, setSelectedUser] = useState<(DeliveryUserProfile & { agenciaName?: string; repartidorName?: string }) | null>(null);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [newRole, setNewRole] = useState<DeliveryUserRole>("agencia");

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    user: (DeliveryUserProfile & { agenciaName?: string; repartidorName?: string }) | null;
    isOpen: boolean;
    isDeleting: boolean;
  }>({
    user: null,
    isOpen: false,
    isDeleting: false,
  });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listUsers({
        rol: filterRole === "all" ? null : filterRole,
      });
      setUsers(data);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "No fue posible cargar los usuarios.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [filterRole]);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    void loadUsers();
  }, [isAdmin, loadUsers]);

  const summary = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.rol === "admin").length,
      agencias: users.filter((u) => u.rol === "agencia").length,
      repartidores: users.filter((u) => u.rol === "repartidor").length,
    };
  }, [users]);

  const handleChangeRole = async () => {
    if (!selectedUser) return;

    setIsChangingRole(true);
    setError(null);

    try {
      await updateUserRole(selectedUser.id, newRole);
      setSelectedUser(null);
      await loadUsers();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cambiar el rol";
      setError(message);
    } finally {
      setIsChangingRole(false);
    }
  };

  const handleDelete = async (user: (DeliveryUserProfile & { agenciaName?: string; repartidorName?: string })) => {
    setDeleteConfirmation({
      user,
      isOpen: true,
      isDeleting: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation.user) return;

    setDeleteConfirmation((prev) => ({ ...prev, isDeleting: true }));
    setError(null);

    try {
      await deleteUser(deleteConfirmation.user.id);
      setDeleteConfirmation({ user: null, isOpen: false, isDeleting: false });
      await loadUsers();
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "No fue posible eliminar el usuario.";
      setError(message);
      setDeleteConfirmation((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ user: null, isOpen: false, isDeleting: false });
  };

  if (!isAdmin) {
    return (
      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8 text-amber-100 shadow-2xl shadow-black/20">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-amber-500/20 p-3">
            <ShieldAlert className="h-6 w-6 text-amber-300" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Acceso restringido</h1>
            <p className="mt-2 max-w-2xl text-sm text-amber-100/80">
              Solo los usuarios con rol administrador pueden gestionar usuarios.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-100">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Gestión
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Usuarios
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Administra los usuarios, roles y permisos del sistema.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => void loadUsers()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              <RefreshCw size={16} />
              Actualizar
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total de usuarios</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {summary.total}
              </p>
            </div>
            <div className="rounded-2xl bg-blue-500/15 p-3 text-blue-300">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Administradores</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {summary.admins}
              </p>
            </div>
            <div className="rounded-2xl bg-red-500/15 p-3 text-red-300">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Agencias</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {summary.agencias}
              </p>
            </div>
            <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Repartidores</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {summary.repartidores}
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
              <Users size={22} />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-black/20">
        <div className="border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Listado de usuarios</h2>
              <p className="mt-1 text-sm text-slate-400">
                Consulta, edita roles o elimina usuarios.
              </p>
            </div>
            <div className="flex gap-2">
              {(["all", "admin", "agencia", "repartidor"] as const).map((rol) => (
                <button
                  key={rol}
                  onClick={() => setFilterRole(rol)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    filterRole === rol
                      ? "bg-cyan-600 text-white"
                      : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {rol === "all"
                    ? "Todos"
                    : rol === "admin"
                      ? "Admin"
                      : rol === "agencia"
                        ? "Agencias"
                        : "Repartidores"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 px-6 py-16 text-slate-300">
            <Loader2 className="animate-spin text-cyan-400" size={22} />
            <span>Cargando usuarios...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
              <AlertTriangle size={24} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              No hay usuarios
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              No se encontraron usuarios con los filtros aplicados.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-950/40">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Agencia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Repartidor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Creación
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-800/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.email}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            ID: {user.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.rol)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {user.agenciaName || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {user.repartidorName || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setNewRole(user.rol);
                          }}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
                        >
                          Editar rol
                        </button>
                        <button
                          onClick={() => void handleDelete(user)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={15} />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-linear-to-b from-slate-900 to-slate-950 shadow-2xl shadow-slate-950/60">
            <div className="border-b border-slate-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Cambiar rol</h2>
              <p className="mt-1 text-sm text-slate-400">{selectedUser.email}</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Nuevo rol
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as DeliveryUserRole)}
                  disabled={isChangingRole}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-sm text-white transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                >
                  <option value="admin">Administrador</option>
                  <option value="agencia">Agencia</option>
                  <option value="repartidor">Repartidor</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedUser(null)}
                  disabled={isChangingRole}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleChangeRole}
                  disabled={isChangingRole}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:opacity-50"
                >
                  {isChangingRole && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isChangingRole ? "Actualizando..." : "Actualizar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmation.user && (
        <DeleteConfirmationModal
          isOpen={deleteConfirmation.isOpen}
          title="Eliminar usuario"
          message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
          itemName={deleteConfirmation.user.email}
          isDeleting={deleteConfirmation.isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
