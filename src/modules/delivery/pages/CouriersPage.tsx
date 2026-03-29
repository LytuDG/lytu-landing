import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  ShieldAlert,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import CourierForm from "../components/CourierForm";
import CredentialsModal from "../components/CredentialsModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import CreateUserModal from "../components/CreateUserModal";
import { useDeliveryAuth } from "../context/DeliveryAuthContext";
import {
  createRepartidorOnly,
  createUserForRepartidor,
  deleteRepartidor,
  listAgencyOptions,
  listRepartidores,
  toggleRepartidorActivo,
  updateRepartidor,
} from "../services/repartidorService";
import type { Agencia, Repartidor, RepartidorFormValues } from "../types";

type ModalMode = "create" | "edit";

function formatDate(value: string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return new Date(value).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCoords(lat: number | null, lng: number | null) {
  if (lat == null || lng == null) {
    return "Sin ubicación";
  }

  return `${lat}, ${lng}`;
}

export default function CouriersPage() {
  const auth = useDeliveryAuth();
  const profile = auth.profile;
  const role = auth.role ?? profile?.rol ?? null;
  const lockedAgencyId = auth.agencyId ?? profile?.agencia_id ?? null;
  const isAdmin = role === "admin";
  const isAgency = role === "agencia";
  const isCourier = role === "repartidor";

  const [couriers, setCouriers] = useState<Repartidor[]>([]);
  const [agencies, setAgencies] = useState<Agencia[]>([]);
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAgencies, setIsLoadingAgencies] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [selectedCourier, setSelectedCourier] = useState<Repartidor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [newRepartidorName, setNewRepartidorName] = useState<string>("");
  
  // States para flujo de 2 pasos
  const [newCourier, setNewCourier] = useState<Repartidor | null>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  
  // States para delete modal
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    courier: Repartidor | null;
    isOpen: boolean;
    isDeleting: boolean;
  }>({
    courier: null,
    isOpen: false,
    isDeleting: false,
  });

  const effectiveAgencyFilter = useMemo(() => {
    if (isAgency) {
      return lockedAgencyId;
    }

    if (isAdmin && selectedAgencyId !== "all") {
      return selectedAgencyId;
    }

    return null;
  }, [isAdmin, isAgency, lockedAgencyId, selectedAgencyId]);

  const loadCouriers = useCallback(async () => {
    if (isCourier) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setPageError(null);

    try {
      const data = await listRepartidores({
        agencyId: effectiveAgencyFilter,
      });
      setCouriers(data);
    } catch (error) {
      setPageError(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los repartidores."
      );
    } finally {
      setIsLoading(false);
    }
  }, [effectiveAgencyFilter, isCourier]);

  const loadAgencies = useCallback(async () => {
    if (!isAdmin && !isAgency) {
      setIsLoadingAgencies(false);
      return;
    }

    setIsLoadingAgencies(true);

    try {
      const data = await listAgencyOptions();
      setAgencies(data);
    } catch (error) {
      setPageError(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar las agencias."
      );
    } finally {
      setIsLoadingAgencies(false);
    }
  }, [isAdmin, isAgency]);

  useEffect(() => {
    loadAgencies();
  }, [loadAgencies]);

  useEffect(() => {
    loadCouriers();
  }, [loadCouriers]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedCourier(null);
    setIsModalOpen(true);
  };

  const openEditModal = (courier: Repartidor) => {
    setModalMode("edit");
    setSelectedCourier(courier);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setSelectedCourier(null);
  };

  const handleSubmit = async (values: RepartidorFormValues) => {
    setIsSubmitting(true);
    setPageError(null);

    try {
      const payload = {
        ...values,
        agencia_id: isAgency ? lockedAgencyId ?? "" : values.agencia_id,
      };

      if (modalMode === "edit" && selectedCourier) {
        await updateRepartidor(selectedCourier.id, payload);
        setIsModalOpen(false);
        setSelectedCourier(null);
      } else {
        // Crear repartidor nuevo (Paso 1)
        try {
          const newRepartidor = await createRepartidorOnly(payload);
          setNewCourier(newRepartidor);
          setShowCreateUserModal(true);
          setIsModalOpen(false);
          setSelectedCourier(null);
        } catch (courierError) {
          const message =
            courierError instanceof Error
              ? courierError.message
              : "Error al crear el repartidor";
          setPageError(message);
          throw courierError;
        }
      }

      await loadCouriers();
    } catch (error) {
      setPageError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el repartidor."
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateUser = async (email: string, password: string) => {
    if (!newCourier) return;

    setIsCreatingUser(true);

    try {
      const newCredentials = await createUserForRepartidor(
        newCourier.id,
        newCourier.agencia_id,
        newCourier.nombre,
        email,
        password
      );

      setCredentials(newCredentials);
      setNewRepartidorName(newCourier.nombre);
      setShowCreateUserModal(false);
      setShowCredentials(true);
      setNewCourier(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear el usuario";
      setPageError(message);
      throw err;
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleDelete = async (courier: Repartidor) => {
    setDeleteConfirmation({
      courier,
      isOpen: true,
      isDeleting: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation.courier) return;

    setDeleteConfirmation((prev) => ({ ...prev, isDeleting: true }));
    setPageError(null);

    try {
      await deleteRepartidor(deleteConfirmation.courier.id);
      setDeleteConfirmation({ courier: null, isOpen: false, isDeleting: false });
      await loadCouriers();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el repartidor.";
      setPageError(message);
      setDeleteConfirmation((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ courier: null, isOpen: false, isDeleting: false });
  };

  const handleToggleActivo = async (courier: Repartidor) => {
    setActionId(courier.id);
    setPageError(null);

    try {
      await toggleRepartidorActivo(courier.id, !(courier.activo ?? false));
      await loadCouriers();
    } catch (error) {
      setPageError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el estado del repartidor."
      );
    } finally {
      setActionId(null);
    }
  };

  if (isCourier) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-2xl shadow-slate-950/40">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
          <ShieldAlert size={26} />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-white">
          Acceso restringido
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Tu perfil de repartidor no tiene permisos para administrar este módulo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-950/40 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">
            <Truck size={14} />
            Operaciones de reparto
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Repartidores
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Administra la flota de mensajeros, su disponibilidad y la agencia a
            la que pertenecen.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={loadCouriers}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Actualizar
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            disabled={isLoadingAgencies || (isAgency && !lockedAgencyId)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={16} />
            Nuevo repartidor
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Total visibles</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {couriers.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Activos</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">
            {couriers.filter((courier) => courier.activo).length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            {isAgency ? "Tu agencia" : "Agencias cargadas"}
          </p>
          <p className="mt-2 text-3xl font-semibold text-cyan-300">
            {isAgency ? 1 : agencies.length}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Listado</h2>
            <p className="text-sm text-slate-400">
              Consulta y actualiza el estado operativo de cada repartidor.
            </p>
          </div>

          {isAdmin && (
            <label className="w-full max-w-xs space-y-2">
              <span className="text-sm font-medium text-slate-300">
                Filtrar por agencia
              </span>
              <select
                value={selectedAgencyId}
                onChange={(event) => setSelectedAgencyId(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="all">Todas las agencias</option>
                {agencies.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.nombre}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {pageError && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{pageError}</span>
          </div>
        )}

        {isLoading || isLoadingAgencies ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-cyan-300" />
          </div>
        ) : couriers.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
              <UserRound size={24} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              No hay repartidores registrados
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Crea tu primer repartidor para comenzar a operar el módulo.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-950/80">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Repartidor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Agencia
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Contacto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Ubicación
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Alta
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {couriers.map((courier) => (
                    <tr key={courier.id} className="hover:bg-slate-800/40">
                      <td className="px-4 py-4 align-top">
                        <div>
                          <div className="font-medium text-white">
                            {courier.nombre}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                            <Truck size={14} />
                            <span>
                              {courier.vehiculo_descripcion || "Sin vehículo"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-slate-500" />
                          <span>{courier.agencia?.nombre || "Sin agencia"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-slate-300">
                        {courier.telefono || "Sin teléfono"}
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-slate-500" />
                          <span>
                            {formatCoords(
                              courier.ubicacion_actual_lat,
                              courier.ubicacion_actual_lng
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <button
                          type="button"
                          onClick={() => handleToggleActivo(courier)}
                          disabled={actionId === courier.id}
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition ${
                            courier.activo
                              ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                              : "bg-slate-700/70 text-slate-300 hover:bg-slate-700"
                          } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {actionId === courier.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : courier.activo ? (
                            "Activo"
                          ) : (
                            "Inactivo"
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-slate-400">
                        {formatDate(courier.created_at)}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(courier)}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                          >
                            <Pencil size={15} />
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(courier)}
                            disabled={actionId === courier.id}
                            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
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
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-linear-to-b from-slate-900 to-slate-950 shadow-2xl shadow-slate-950/60">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {modalMode === "edit"
                    ? "Editar repartidor"
                    : "Nuevo repartidor"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {modalMode === "edit"
                    ? "Actualiza los datos operativos del repartidor."
                    : "Completa la información para registrar un nuevo repartidor."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cerrar
              </button>
            </div>

            <div className="px-6 py-6">
              <CourierForm
                initialValues={selectedCourier}
                agencyOptions={agencies}
                lockedAgencyId={isAgency ? lockedAgencyId : null}
                onSubmit={handleSubmit}
                onCancel={closeModal}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}

      {credentials && modalMode === "create" && (
        <CredentialsModal
          isOpen={showCredentials}
          email={credentials.email}
          password={credentials.password}
          userName={newRepartidorName}
          userType="repartidor"
          onClose={() => {
            setShowCredentials(false);
            setCredentials(null);
            setNewRepartidorName("");
          }}
        />
      )}

      {newCourier && (
        <CreateUserModal
          isOpen={showCreateUserModal}
          agenciaName={newCourier.nombre}
          isCreating={isCreatingUser}
          onSubmit={handleCreateUser}
          onCancel={() => {
            setShowCreateUserModal(false);
            setNewCourier(null);
          }}
        />
      )}

      {deleteConfirmation.courier && (
        <DeleteConfirmationModal
          isOpen={deleteConfirmation.isOpen}
          title="Eliminar repartidor"
          message="¿Estás seguro de que deseas eliminar este repartidor? Esta acción no se puede deshacer y eliminará todos los datos asociados."
          itemName={deleteConfirmation.courier.nombre}
          isDeleting={deleteConfirmation.isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}