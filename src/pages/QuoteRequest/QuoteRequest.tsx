import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Upload,
  Check,
  Building2,
  Mail,
  MessageSquare,
  LifeBuoy,
  DollarSign,
  Send,
  Sparkles,
  Plus,
  X,
  Trash2,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

type QuoteFormData = {
  email: string;
  companyName: string;
  needLogo: boolean;
  description: string;
  support: string;
  budget: string;
  extraInfo: string;
  integrations: string[];
  extraIntegrations: string[];
  logoFile?: FileList;
};

export default function QuoteRequest() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      integrations: [],
      extraIntegrations: [],
      needLogo: false,
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [extraInput, setExtraInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Watch values for conditional rendering
  const needLogo = watch("needLogo");
  const selectedIntegrations = watch("integrations");
  const extraIntegrations = watch("extraIntegrations");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const integrations = [
    { id: "booking", label: "Booking System" },
    { id: "quotes", label: "Quote System" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "crm", label: "CRM" },
    { id: "inventory", label: "Inventory System" },
    { id: "blog", label: "Blog & Content" },
  ];

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simular envío al backend
      console.log("Enviando datos:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular delay de red

      setSubmitStatus("success");
      reset(); // Limpiar formulario
      setLogoPreview(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error al enviar:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleIntegration = (id: string) => {
    const current = selectedIntegrations || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setValue("integrations", updated);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      setValue("needLogo", false); // Si sube logo, no necesita diseño
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("logoFile", undefined);
  };

  const handleExtraKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && extraInput.trim()) {
      e.preventDefault();
      if (!extraIntegrations.includes(extraInput.trim())) {
        setValue("extraIntegrations", [
          ...extraIntegrations,
          extraInput.trim(),
        ]);
      }
      setExtraInput("");
    }
  };

  const removeExtra = (tag: string) => {
    setValue(
      "extraIntegrations",
      extraIntegrations.filter((t) => t !== tag)
    );
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (!needLogo && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-12 max-w-lg w-full text-center shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("common.success")}
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Hemos recibido tu solicitud correctamente. Nuestro equipo revisará
            los detalles y te contactará a la brevedad.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors w-full"
          >
            {t("quoteRequest.backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-all hover:-translate-x-1 group"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">{t("quoteRequest.backToHome")}</span>
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
                {t("contact.quoteOption.title")}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              {t("quoteRequest.title")}
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("quoteRequest.subtitle")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 space-y-16 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative gradient border effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

            {/* Contact & Company Info */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <Building2 className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t("quoteRequest.sections.company")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {t("quoteRequest.fields.email")}
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {t("quoteRequest.fields.companyName")}
                  </label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      {...register("companyName", { required: true })}
                      type="text"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-300 ml-1 block">
                  {t("quoteRequest.fields.logo")}
                </label>

                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  {/* Logo Upload Area */}
                  <div
                    onClick={handleUploadClick}
                    className={`flex-1 w-full border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group relative overflow-hidden ${
                      needLogo
                        ? "opacity-30 pointer-events-none border-white/5 bg-transparent"
                        : logoPreview
                        ? "border-indigo-500/50 bg-indigo-500/5"
                        : "border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        // Register manually if needed or just handle preview
                        handleLogoChange(e);
                      }}
                    />

                    {logoPreview ? (
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 rounded-xl overflow-hidden border-2 border-white/10 bg-black/20">
                          <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeLogo();
                          }}
                          className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t("common.delete")}
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mx-auto mb-3 transition-colors" />
                        <p className="text-sm text-slate-400 mb-2 group-hover:text-slate-200 transition-colors">
                          {t("quoteRequest.fields.dropLogo")}
                        </p>
                        <p className="text-xs text-slate-600">
                          PNG, JPG, SVG (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-center md:py-4">
                    <span className="text-slate-600 text-sm font-medium px-4">
                      {t("common.or")}
                    </span>
                  </div>

                  {/* Need Logo Checkbox */}
                  <label
                    className={`flex-1 w-full cursor-pointer border rounded-2xl p-6 flex items-center gap-4 transition-all relative overflow-hidden ${
                      needLogo
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-white/10 hover:border-white/20 bg-slate-950/30"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        needLogo
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-slate-600"
                      }`}
                    >
                      {needLogo && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      {...register("needLogo")}
                      onChange={(e) => {
                        setValue("needLogo", e.target.checked);
                        if (e.target.checked) removeLogo();
                      }}
                    />
                    <div className="relative z-10">
                      <p
                        className={`font-semibold transition-colors ${
                          needLogo ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {t("quoteRequest.fields.needLogo")}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {t("quoteRequest.fields.needLogoDesc")}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Project Details */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20">
                  <MessageSquare className="w-6 h-6 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t("quoteRequest.sections.project")}
                </h2>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  {t("quoteRequest.fields.description")}
                </label>
                <textarea
                  {...register("description", { required: true })}
                  rows={6}
                  className="w-full p-6 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all resize-none leading-relaxed"
                  placeholder={t("quoteRequest.fields.descriptionPlaceholder")}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-300 ml-1 block">
                  {t("quoteRequest.fields.integrations")}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {integrations.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleIntegration(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                        selectedIntegrations.includes(item.id)
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/10 hover:border-white/20 bg-slate-950/30 hover:bg-slate-950/50"
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span
                          className={`font-medium transition-colors ${
                            selectedIntegrations.includes(item.id)
                              ? "text-white"
                              : "text-slate-400 group-hover:text-slate-200"
                          }`}
                        >
                          {t(`readySolutions.${item.id}.title`, item.label)}
                        </span>
                        {selectedIntegrations.includes(item.id) && (
                          <div className="bg-violet-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Extra Integrations Chips Input */}
                <div className="mt-6">
                  <label className="text-sm text-slate-400 mb-3 block ml-1">
                    {t("quoteRequest.fields.otherIntegrations")}
                  </label>

                  <div className="relative group bg-slate-950/50 border border-white/10 rounded-2xl p-2 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                    <div className="flex flex-wrap gap-2 p-2">
                      {extraIntegrations.map((tag, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-violet-500/20 text-violet-200 px-3 py-1.5 rounded-xl text-sm border border-violet-500/30 animate-in fade-in zoom-in duration-200"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeExtra(tag)}
                            className="hover:text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={extraInput}
                        onChange={(e) => setExtraInput(e.target.value)}
                        onKeyDown={handleExtraKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 min-w-[200px] py-1.5 px-2"
                        placeholder={t(
                          "quoteRequest.fields.otherIntegrationsPlaceholder"
                        )}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 ml-1">
                    Press{" "}
                    <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-sans">
                      Enter
                    </kbd>{" "}
                    to add tags
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Info */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                  <LifeBuoy className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t("quoteRequest.sections.details")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {t("quoteRequest.fields.support")}
                  </label>
                  <div className="relative">
                    <select
                      {...register("support", { required: true })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-900 text-slate-400">
                        {t("common.select")}
                      </option>
                      <option
                        value="standard"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.supportStandard")}
                      </option>
                      <option
                        value="extended"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.supportExtended")}
                      </option>
                      <option
                        value="priority"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.supportPriority")}
                      </option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {t("quoteRequest.fields.budget")}
                  </label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10" />
                    <select
                      {...register("budget", { required: true })}
                      className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer relative"
                    >
                      <option value="" className="bg-slate-900 text-slate-400">
                        {t("common.select")}
                      </option>
                      <option value="micro" className="bg-slate-900 text-white">
                        &lt; $1,500
                      </option>
                      <option value="small" className="bg-slate-900 text-white">
                        $1,500 - $4,000
                      </option>
                      <option
                        value="medium"
                        className="bg-slate-900 text-white"
                      >
                        $4,000 - $8,000
                      </option>
                      <option value="large" className="bg-slate-900 text-white">
                        $8,000+
                      </option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  {t("quoteRequest.fields.extraInfo")}
                </label>
                <textarea
                  {...register("extraInfo")}
                  rows={4}
                  className="w-full p-6 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none leading-relaxed"
                  placeholder={t("quoteRequest.fields.extraInfoPlaceholder")}
                />
              </div>
            </section>

            <div className="pt-8 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3"
              >
                <span className="relative z-10">
                  {t("quoteRequest.submit")}
                </span>
                <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
