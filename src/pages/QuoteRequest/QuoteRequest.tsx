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
  DollarSign,
  Send,
  Sparkles,
  X,
  Trash2,
  Loader2,
  Clock,
  Phone,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  submitQuoteRequest,
  uploadLogo,
  type QuoteFormSubmission,
} from "../../lib/quoteService";
import type {
  BudgetRange,
  ContactPreference,
  Timeline,
} from "../../interfaces/quotes";

type QuoteFormData = {
  email: string;
  company_name: string;
  business_type: string;
  custom_business_type?: string;
  main_problem: string;
  selected_systems: string[];
  budget_range: BudgetRange;
  timeline: Timeline;
  design_status?: string;
  contact_preference: ContactPreference;
  whatsapp_number?: string;
  extra_details?: string;
  logoFile?: FileList;
};

export default function QuoteRequest() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      selected_systems: [],
      contact_preference: "email",
      timeline: "just_looking",
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Watch values for conditional rendering
  const selectedSystems = watch("selected_systems");
  const businessType = watch("business_type");
  const contactPreference = watch("contact_preference");

  const availableSystems = [
    { id: "booking", label: "Booking System", icon: "📅" },
    { id: "quotes", label: "Quote System", icon: "💼" },
    { id: "ecommerce", label: "E-commerce", icon: "🛒" },
    { id: "crm", label: "CRM", icon: "👥" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "blog", label: "Blog & Content", icon: "📝" },
  ];

  // Scroll to top on mount and check for URL params
  useEffect(() => {
    window.scrollTo(0, 0);
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const isValidSystem = availableSystems.some((s) => s.id === serviceParam);
      if (isValidSystem) {
        setValue("selected_systems", [serviceParam]);
      }
    }
  }, [searchParams, setValue]);

  const businessTypes = [
    "retail",
    "services",
    "restaurant",
    "healthcare",
    "education",
    "real_estate",
    "other",
  ];

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);

    try {
      // Preparar datos para envío
      const submissionData: QuoteFormSubmission = {
        email: data.email,
        company_name: data.company_name,
        business_type: data.business_type,
        custom_business_type:
          data.business_type === "other"
            ? data.custom_business_type
            : undefined,
        main_problem: data.main_problem,
        selected_systems: data.selected_systems,
        budget_range: data.budget_range,
        timeline: data.timeline,
        design_status: data.design_status,
        contact_preference: data.contact_preference,
        whatsapp_number:
          data.contact_preference === "whatsapp"
            ? data.whatsapp_number
            : undefined,
        extra_details: data.extra_details,
      };

      // Enviar solicitud
      const result = await submitQuoteRequest(submissionData);

      if (!result.success) {
        throw new Error(result.error || "Error al enviar la solicitud");
      }

      // Si hay logo, subirlo
      if (data.logoFile && data.logoFile[0] && result.public_tracking_id) {
        await uploadLogo(data.logoFile[0], result.public_tracking_id);
      }

      setTrackingCode(result.tracking_code || null);
      setSubmitStatus("success");
      reset();
      setLogoPreview(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.error("Error al enviar:", error);
      setErrorMessage(error.message || "Error al enviar la solicitud");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSystem = (id: string) => {
    const current = selectedSystems || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setValue("selected_systems", updated);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("logoFile", undefined);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-12 max-w-lg w-full text-center shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("common.success")}
          </h2>
          <p className="text-slate-400 mb-6 text-lg">
            We have received your request successfully. Our team will review the
            details and contact you shortly.
          </p>
          {trackingCode && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6 mb-8 relative group/code">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-bold">
                {t("tracking.details.code")}
              </p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-mono font-bold text-cyan-400 tracking-wider">
                  {trackingCode}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(trackingCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all active:scale-90"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>

              {copied && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-green-400 font-bold uppercase animate-in fade-in slide-in-from-top-1">
                  Copied!
                </span>
              )}
            </div>
          )}

          <div className="space-y-4">
            {trackingCode && (
              <Link
                to={`/track-quote?code=${trackingCode}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all w-full shadow-lg"
              >
                <ExternalLink size={18} />
                {t("tracking.title")}
              </Link>
            )}

            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all w-full"
            >
              {t("quoteRequest.backToHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-violet-500/10 rounded-full blur-[80px]" />
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
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

            {/* Error message */}
            {submitStatus === "error" && errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3">
                <X size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

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
                    {t("quoteRequest.fields.email")}{" "}
                    <span className="text-red-400">*</span>
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
                  {errors.email && (
                    <p className="text-red-400 text-sm ml-1">
                      This field is required
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {t("quoteRequest.fields.companyName")}{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      {...register("company_name", { required: true })}
                      type="text"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                  {errors.company_name && (
                    <p className="text-red-400 text-sm ml-1">
                      This field is required
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Business Type <span className="text-red-400">*</span>
                </label>
                <select
                  {...register("business_type", { required: true })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    Select an option
                  </option>
                  {businessTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-slate-900 text-white"
                    >
                      {t(`quoteRequest.businessTypes.${type}`, type)}
                    </option>
                  ))}
                </select>
                {errors.business_type && (
                  <p className="text-red-400 text-sm ml-1">
                    This field is required
                  </p>
                )}
              </div>

              {businessType === "other" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    Specify your business type
                  </label>
                  <input
                    {...register("custom_business_type")}
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g., Legal consulting"
                  />
                </div>
              )}

              {/* Logo Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-300 ml-1 block">
                  Company Logo (optional)
                </label>

                <div
                  onClick={handleUploadClick}
                  className={`w-full border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group relative overflow-hidden ${
                    logoPreview
                      ? "border-indigo-500/50 bg-indigo-500/5"
                      : "border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5"
                  }`}
                >
                  <input
                    {...register("logoFile", {
                      onChange: handleLogoChange,
                    })}
                    ref={(e) => {
                      register("logoFile").ref(e);
                      fileInputRef.current = e;
                    }}
                    type="file"
                    className="hidden"
                    accept="image/*"
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
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mx-auto mb-3 transition-colors" />
                      <p className="text-sm text-slate-400 mb-2 group-hover:text-slate-200 transition-colors">
                        Drag your logo here or click to select
                      </p>
                      <p className="text-xs text-slate-600">
                        PNG, JPG, SVG (Max 5MB)
                      </p>
                    </>
                  )}
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
                  What is the main problem you want to solve?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register("main_problem", { required: true })}
                  rows={6}
                  className="w-full p-6 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all resize-none leading-relaxed"
                  placeholder="Describe the problem or need your business currently faces..."
                />
                {errors.main_problem && (
                  <p className="text-red-400 text-sm ml-1">
                    This field is required
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-300 ml-1 block">
                  What systems do you need?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableSystems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSystem(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                        selectedSystems.includes(item.id)
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/10 hover:border-white/20 bg-slate-950/30 hover:bg-slate-950/50"
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span
                            className={`font-medium transition-colors ${
                              selectedSystems.includes(item.id)
                                ? "text-white"
                                : "text-slate-400 group-hover:text-slate-200"
                            }`}
                          >
                            {t(`readySolutions.${item.id}.title`, item.label)}
                          </span>
                        </div>
                        {selectedSystems.includes(item.id) && (
                          <div className="bg-violet-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.selected_systems && (
                  <p className="text-red-400 text-sm ml-1">
                    Select at least one system
                  </p>
                )}
              </div>
            </section>

            {/* Budget & Timeline */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                  <DollarSign className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Budget & Timeline
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    Estimated Budget <span className="text-red-400">*</span>
                  </label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10" />
                    <select
                      {...register("budget_range", { required: true })}
                      className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer relative"
                    >
                      <option value="" className="bg-slate-900 text-slate-400">
                        {t("common.select")}
                      </option>
                      <option value="<1500" className="bg-slate-900 text-white">
                        {t("quoteRequest.options.budget.<1500")}
                      </option>
                      <option
                        value="1500-4000"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.budget.1500-4000")}
                      </option>
                      <option
                        value="4000-8000"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.budget.4000-8000")}
                      </option>
                      <option value="8000+" className="bg-slate-900 text-white">
                        {t("quoteRequest.options.budget.8000+")}
                      </option>
                      <option
                        value="need_advice"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.budget.need_advice")}
                      </option>
                    </select>
                  </div>
                  {errors.budget_range && (
                    <p className="text-red-400 text-sm ml-1">
                      This field is required
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    When do you need the project?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10" />
                    <select
                      {...register("timeline", { required: true })}
                      className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer relative"
                    >
                      <option
                        value="urgent"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.timeline.urgent")}
                      </option>
                      <option
                        value="next_month"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.timeline.next_month")}
                      </option>
                      <option
                        value="2_3_months"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.timeline.2_3_months")}
                      </option>
                      <option
                        value="just_looking"
                        className="bg-slate-900 text-white"
                      >
                        {t("quoteRequest.options.timeline.just_looking")}
                      </option>
                    </select>
                  </div>
                  {errors.timeline && (
                    <p className="text-red-400 text-sm ml-1">
                      This field is required
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Contact Preferences */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Contact Preference
                </h2>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-300 ml-1 block">
                  How do you prefer to be contacted?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: "email", label: "Email", icon: Mail },
                    { value: "whatsapp", label: "WhatsApp", icon: Phone },
                    { value: "call", label: "Phone Call", icon: Phone },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer border rounded-2xl p-4 flex items-center gap-3 transition-all ${
                        contactPreference === option.value
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/10 hover:border-white/20 bg-slate-950/30"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register("contact_preference", { required: true })}
                        className="hidden"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          contactPreference === option.value
                            ? "border-green-500 bg-green-500"
                            : "border-slate-600"
                        }`}
                      >
                        {contactPreference === option.value && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <option.icon className="w-5 h-5 text-slate-400" />
                      <span className="font-medium text-white">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {contactPreference === "whatsapp" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-green-400 transition-colors" />
                    <input
                      {...register("whatsapp_number", {
                        required: contactPreference === "whatsapp",
                      })}
                      type="tel"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  {errors.whatsapp_number && (
                    <p className="text-red-400 text-sm ml-1">
                      This field is required
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Additional Information (optional)
                </label>
                <textarea
                  {...register("extra_details")}
                  rows={4}
                  className="w-full p-6 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none leading-relaxed"
                  placeholder="Any additional details you consider important..."
                />
              </div>
            </section>

            <div className="pt-8 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-10 py-5 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="relative z-10">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">
                      {t("quoteRequest.submit")}
                    </span>
                    <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
