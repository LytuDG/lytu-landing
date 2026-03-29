import { useEffect, useMemo, useState } from "react";
import { Loader2, MapPin, Save, ShieldCheck, Truck, X } from "lucide-react";
import type { Agencia, Repartidor, RepartidorFormValues } from "../types";
import { EMPTY_REPARTIDOR_FORM } from "../types";

interface CourierFormProps {
  initialValues?: Repartidor | null;
  agencyOptions: Agencia[];
  lockedAgencyId?: string | null;
  onSubmit: (values: RepartidorFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

function buildInitialState(
  initialValues?: Repartidor | null,
  lockedAgencyId?: string | null
): RepartidorFormValues {
  return {
    ...EMPTY_REPARTIDOR_FORM,
    agencia_id: lockedAgencyId ?? initialValues?.agencia_id ?? "",
    nombre: initialValues?.nombre ?? "",
    vehiculo_descripcion: initialValues?.vehiculo_descripcion ?? "",
    telefono: initialValues?.telefono ?? "",
    activo: initialValues?.activo ?? true,
    ubicacion_actual_lat:
      initialValues?.ubicacion_actual_lat != null
        ? String(initialValues.ubicacion_actual_lat)
        : "",
    ubicacion_actual_lng:
      initialValues?.ubicacion_actual_lng != null
        ? String(initialValues.ubicacion_actual_lng)
        : "",
  } as RepartidorFormValues & {
    ubicacion_actual_lat?: string;
    ubicacion_actual_lng?: string;
  };
}

export default function CourierForm({
  initialValues = null,
  agencyOptions,
  lockedAgencyId = null,
  onSubmit,
  onCancel,
  isSubmitting,
}: CourierFormProps) {
  const [values, setValues] = useState(
    buildInitialState(initialValues, lockedAgencyId)
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValues(buildInitialState(initialValues, lockedAgencyId));
    setError(null);
  }, [initialValues, lockedAgencyId]);

  const selectedAgencyName = useMemo(() => {
    const agencyId = lockedAgencyId ?? values.agencia_id;

    return agencyOptions.find((agency) => agency.id === agencyId)?.nombre ?? "";
  }, [agencyOptions, lockedAgencyId, values.agencia_id]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const nextValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : value;

    setValues((current) => ({
      ...current,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(lockedAgencyId ?? values.agencia_id)) {
      setError("Selecciona una agencia para continuar.");
      return;
    }

    if (!values.nombre.trim()) {
      setError("El nombre del repartidor es obligatorio.");
      return;
    }

    setError(null);

    await onSubmit({
      ...values,
      agencia_id: lockedAgencyId ?? values.agencia_id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-200">Agencia</span>
          {lockedAgencyId ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>{selectedAgencyName || "Agencia asignada"}</span>
            </div>
          ) : (
            <select
              name="agencia_id"
              value={values.agencia_id}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="">Selecciona una agencia</option>
              {agencyOptions.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.nombre}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Nombre</span>
          <input
            type="text"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            placeholder="Ej. Carlos Martínez"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Teléfono</span>
          <input
            type="text"
            name="telefono"
            value={values.telefono}
            onChange={handleChange}
            placeholder="Ej. +52 555 123 4567"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-200">
            Vehículo / descripción
          </span>
          <div className="relative">
            <Truck
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              name="vehiculo_descripcion"
              value={values.vehiculo_descripcion}
              onChange={handleChange}
              placeholder="Ej. Motocicleta 150cc - casco negro"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">
            Latitud actual
          </span>
          <div className="relative">
            <MapPin
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              name="ubicacion_actual_lat"
              value={(values as RepartidorFormValues & { ubicacion_actual_lat?: string }).ubicacion_actual_lat ?? ""}
              onChange={handleChange}
              placeholder="Ej. 19.4326"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">
            Longitud actual
          </span>
          <div className="relative">
            <MapPin
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              name="ubicacion_actual_lng"
              value={(values as RepartidorFormValues & { ubicacion_actual_lng?: string }).ubicacion_actual_lng ?? ""}
              onChange={handleChange}
              placeholder="Ej. -99.1332"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 md:col-span-2">
          <input
            type="checkbox"
            name="activo"
            checked={values.activo}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
          />
          <div>
            <p className="text-sm font-medium text-slate-100">Activo</p>
            <p className="text-xs text-slate-400">
              Desactiva esta opción para ocultar temporalmente al repartidor.
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <X size={16} />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {initialValues ? "Guardar cambios" : "Crear repartidor"}
        </button>
      </div>
    </form>
  );
}