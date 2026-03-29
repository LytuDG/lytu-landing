import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  Edit3,
  Loader2,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import AgencyForm from "../components/AgencyForm";
import CredentialsModal from "../components/CredentialsModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import CreateUserModal from "../components/CreateUserModal";
import {
  createAgenciaOnly,
  createUserForAgencia,
  deleteAgencia,
  listAgencias,
  updateAgencia,
} from "../services/agenciaService";
import type { Agencia, AgenciaFormValues, DeliveryUserRole } from "../types";

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

function formatCoordinate(value: number | null): string {
  if (value === null || value === undefined) {
    return "—";
  }

  return value.toFixed(6);
}

function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AgenciesPage() {
  const { role } = useDeliveryAuthSafe();
  const isAdmin = role === "admin";

  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAgencia, setSelectedAgencia] = useState<Agencia | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);
  
  // States para flujo de 2 pasos
  const [newAgencia, setNewAgencia] = useState<Agencia | null>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  
  // States para delete modal
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    agencia: Agencia | null;
    isOpen: boolean;
    isDeleting: boolean;
  }>({
    agencia: null,
    isOpen: false,
    isDeleting: false,
  });

  const loadAgencias = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listAgencias();
      setAgencias(data);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "No fue posible cargar las agencias.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    void loadAgencias();
  }, [isAdmin, loadAgencias]);

  const handleCreateClick = () => {
    setSelectedAgencia(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (agencia: Agencia) => {
    setSelectedAgencia(agencia);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (isSubmitting) {
      return;
    }

    setSelectedAgencia(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (values: AgenciaFormValues) => {
    setIsSubmitting(true);

    try {
      if (selectedAgencia) {
        // Editando agencia existente
        await updateAgencia(selectedAgencia.id, values);
        handleCloseForm();
      } else {
        // Crear agencia nueva (Paso 1)
        try {
          const created = await createAgenciaOnly(values);
          setNewAgencia(created);
          setShowCreateUserModal(true);
          handleCloseForm();
        } catch (agenciaError) {
          const message =
            agenciaError instanceof Error
              ? agenciaError.message
              : "Error al crear la agencia";
          setError(message);
          throw agenciaError;
        }
      }

      await loadAgencias();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateUser = async (email: string, password: string) => {
    if (!newAgencia) return;

    setIsCreatingUser(true);

    try {
      const newCredentials = await createUserForAgencia(
        newAgencia.id,
        email,
        password
      );

      setCredentials(newCredentials);
      setShowCreateUserModal(false);
      setShowCredentials(true);
      setNewAgencia(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear el usuario";
      setError(message);
      throw err;
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleDelete = async (agencia: Agencia) => {
    setDeleteConfirmation({
      agencia,
      isOpen: true,
      isDeleting: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation.agencia) return;

    setDeleteConfirmation((prev) => ({ ...prev, isDeleting: true }));
    setError(null);

    try {
      await deleteAgencia(deleteConfirmation.agencia.id);
      setDeleteConfirmation({ agencia: null, isOpen: false, isDeleting: false });
      await loadAgencias();
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "No fue posible eliminar la agencia.";
      setError(message);
      setDeleteConfirmation((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ agencia: null, isOpen: false, isDeleting: false });
  };

  const summary = useMemo(() => {
    const withPhone = agencias.filter((agencia) => Boolean(agencia.telefono)).length;
    const withCoordinates = agencias.filter(
      (agencia) =>
        agencia.ubicacion_lat !== null && agencia.ubicacion_lng !== null
    ).length;

    return {
      total: agencias.length,
      withPhone,
      withCoordinates,
    };
  }, [agencias]);

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
              Solo los usuarios con rol administrador pueden gestionar agencias.
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
              Operaciones
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Agencias
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Administra las agencias disponibles para la operación de entregas.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => void loadAgencias()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              <RefreshCw size={16} />
              Actualizar
            </button>
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <Plus size={16} />
              Nueva agencia
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total de agencias</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {summary.total}
              </p>
            </div>
            <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
              <Building2 size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Con teléfono</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {summary.withPhone}
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
              <Phone size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Con coordenadas</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {summary.withCoordinates}
              </p>
            </div>
            <div className="rounded-2xl bg-violet-500/15 p-3 text-violet-300">
              <MapPin size={22} />
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-black/20">
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Listado de agencias</h2>
          <p className="mt-1 text-sm text-slate-400">
            Consulta, crea, edita o elimina agencias registradas.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 px-6 py-16 text-slate-300">
            <Loader2 className="animate-spin text-cyan-400" size={22} />
            <span>Cargando agencias...</span>
          </div>
        ) : agencias.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
              <AlertTriangle size={24} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              No hay agencias registradas
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Crea tu primera agencia para comenzar a organizar la operación.
            </p>
            <button
              onClick={handleCreateClick}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <Plus size={16} />
              Crear agencia
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-950/40">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Agencia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Dirección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Coordenadas
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
                {agencias.map((agencia) => (
                  <tr
                    key={agencia.id}
                    className="transition hover:bg-slate-800/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-cyan-500/10 p-2.5 text-cyan-300">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{agencia.nombre}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            ID: {agencia.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {agencia.direccion || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {agencia.telefono || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      <div className="space-y-1">
                        <p>Lat: {formatCoordinate(agencia.ubicacion_lat)}</p>
                        <p>Lng: {formatCoordinate(agencia.ubicacion_lng)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {formatDate(agencia.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(agencia)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
                        >
                          <Edit3 size={15} />
                          Editar
                        </button>
                        <button
                          onClick={() => void handleDelete(agencia)}
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

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-cyan-400">
                  {selectedAgencia ? "Edición" : "Registro"}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  {selectedAgencia
                    ? `Actualizar ${selectedAgencia.nombre}`
                    : "Crear nueva agencia"}
                </h2>
              </div>
              <button
                onClick={handleCloseForm}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
                disabled={isSubmitting}
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[90vh] overflow-y-auto px-6 py-5">
              <AgencyForm
                initialValues={selectedAgencia}
                onSubmit={handleSubmit}
                onCancel={handleCloseForm}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      ) : null}

      {credentials && selectedAgencia === null && (
        <CredentialsModal
          isOpen={showCredentials}
          email={credentials.email}
          password={credentials.password}
          userName={newAgencia?.nombre || "Nueva agencia"}
          userType="agencia"
          onClose={() => {
            setShowCredentials(false);
            setCredentials(null);
          }}
        />
      )}

      {newAgencia && (
        <CreateUserModal
          isOpen={showCreateUserModal}
          agenciaName={newAgencia.nombre}
          isCreating={isCreatingUser}
          onSubmit={handleCreateUser}
          onCancel={() => {
            setShowCreateUserModal(false);
            setNewAgencia(null);
          }}
        />
      )}

      {deleteConfirmation.agencia && (
        <DeleteConfirmationModal
          isOpen={deleteConfirmation.isOpen}
          title="Eliminar agencia"
          message="¿Estás seguro de que deseas eliminar esta agencia? Esta acción no se puede deshacer y eliminará todos los datos asociados."
          itemName={deleteConfirmation.agencia.nombre}
          isDeleting={deleteConfirmation.isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}