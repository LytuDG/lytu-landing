import { useEffect, useState } from "react";
import { Loader2, MapPin, Phone, Save, X } from "lucide-react";
import type { Agencia, AgenciaFormValues } from "../types";
import { EMPTY_AGENCIA_FORM } from "../types";
import MapLocationPicker from "./MapLocationPicker";

interface AgencyFormProps {
  initialValues?: Agencia | null;
  onSubmit(values: AgenciaFormValues): Promise<void>;
  onCancel(): void;
  isSubmitting: boolean;
}

function getInitialFormValues(initialValues?: Agencia | null): AgenciaFormValues {
  if (!initialValues) {
    return EMPTY_AGENCIA_FORM;
  }

  return {
    nombre: initialValues.nombre ?? "",
    direccion: initialValues.direccion ?? "",
    ubicacion_lat:
      initialValues.ubicacion_lat !== null &&
      initialValues.ubicacion_lat !== undefined
        ? String(initialValues.ubicacion_lat)
        : "",
    ubicacion_lng:
      initialValues.ubicacion_lng !== null &&
      initialValues.ubicacion_lng !== undefined
        ? String(initialValues.ubicacion_lng)
        : "",
    telefono: initialValues.telefono ?? "",
  };
}

export default function AgencyForm({
  initialValues = null,
  onSubmit,
  onCancel,
  isSubmitting,
}: AgencyFormProps) {
  const [values, setValues] = useState<AgenciaFormValues>(
    getInitialFormValues(initialValues)
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValues(getInitialFormValues(initialValues));
    setError(null);
  }, [initialValues]);

  const isEditing = Boolean(initialValues);

  const handleChange =
    (field: keyof AgenciaFormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!values.nombre.trim()) {
      setError("El nombre de la agencia es obligatorio.");
      return;
    }

    try {
      await onSubmit({
        nombre: values.nombre,
        direccion: values.direccion,
        ubicacion_lat: values.ubicacion_lat,
        ubicacion_lng: values.ubicacion_lng,
        telefono: values.telefono,
      });
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No fue posible guardar la agencia.";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">
            {isEditing ? "Editar agencia" : "Nueva agencia"}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Completa la información principal de la agencia.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
          aria-label="Cerrar formulario"
        >
          <X size={18} />
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label
            htmlFor="agency-nombre"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Nombre de la agencia
          </label>
          <input
            id="agency-nombre"
            type="text"
            value={values.nombre}
            onChange={handleChange("nombre")}
            placeholder="Ej. Agencia Centro"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="agency-direccion"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Dirección
          </label>
          <textarea
            id="agency-direccion"
            value={values.direccion}
            onChange={handleChange("direccion")}
            placeholder="Calle, número, colonia, ciudad..."
            className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            disabled={isSubmitting}
          />
        </div>

        {/* Componente de mapa interactivo */}
        <div className="md:col-span-2">
          <MapLocationPicker
            initialLat={
              values.ubicacion_lat && values.ubicacion_lat.trim()
                ? parseFloat(values.ubicacion_lat)
                : null
            }
            initialLng={
              values.ubicacion_lng && values.ubicacion_lng.trim()
                ? parseFloat(values.ubicacion_lng)
                : null
            }
            onChange={(lat, lng) => {
              setValues((currentValues) => ({
                ...currentValues,
                ubicacion_lat: lat.toString(),
                ubicacion_lng: lng.toString(),
              }));
            }}
            height="h-80"
          />
        </div>

        {/* Mostrar coordenadas seleccionadas */}
        {values.ubicacion_lat && values.ubicacion_lng && (
          <div className="md:col-span-2 rounded-xl border border-slate-700 bg-slate-950/50 p-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-cyan-400" />
              <span className="text-slate-300">
                <strong className="text-slate-100">Coordenadas seleccionadas:</strong>{" "}
                {values.ubicacion_lat}, {values.ubicacion_lng}
              </span>
            </div>
          </div>
        )}

        <div className="md:col-span-2">
          <label
            htmlFor="agency-telefono"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
          >
            <Phone size={16} className="text-cyan-400" />
            Teléfono
          </label>
          <input
            id="agency-telefono"
            type="text"
            value={values.telefono}
            onChange={handleChange("telefono")}
            placeholder="Ej. +52 33 1234 5678"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          <X size={16} />
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {isEditing ? "Guardar cambios" : "Crear agencia"}
        </button>
      </div>
    </form>
  );
}