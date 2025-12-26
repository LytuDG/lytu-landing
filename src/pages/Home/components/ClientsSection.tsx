import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import tuviajelogo from "../../../assets/tuviaje.png";
import ahorabailalogo from "../../../assets/bailaconmigo.png";
import novacorplogo from "../../../assets/novacorp.png";
import imagocreationslogo from "../../../assets/imagocreations.png";

export default function ClientsSection() {
  const { t } = useTranslation();

  const clients: ClientCardProps[] = [
    {
      clientKey: "tuviaje",
      logo: tuviajelogo,
      url: "https://tuviaje.app",
      status: "launched" as const,
      color: "cyan",
    },
    {
      clientKey: "ahorabaila",
      logo: ahorabailalogo,
      url: "https://ahorabaila.com/",
      status: "launched" as const,
      color: "rose",
    },
    {
      clientKey: "novacorp",
      logo: novacorplogo,
      url: "https://novacorpfinancial.netlify.app/",
      status: "upcomingLaunch" as const,
      color: "emerald",
    },
    {
      clientKey: "imagocreations",
      logo: imagocreationslogo,
      url: "https://imagocreations.netlify.app/",
      status: "inDevelopment" as const,
      color: "orange",
    },
  ];

  return (
    <section id="clientes" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("clients.title")}
          </h2>
          <p className="text-slate-400 max-w-2xl">{t("clients.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clients.map((client) => (
            <ClientCard key={client.clientKey} {...client} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ClientCardProps {
  clientKey: string;
  logo: string;
  url: string;
  status: "launched" | "upcomingLaunch" | "inDevelopment";
  color: string;
}

function ClientCard({ clientKey, logo, url, status, color }: ClientCardProps) {
  const { t } = useTranslation();

  const colorMap: Record<
    string,
    {
      border: string;
      badge: string;
      badgeText: string;
      glow: string;
      hover: string;
    }
  > = {
    cyan: {
      border: "border-cyan-500/20",
      badge: "bg-cyan-500",
      badgeText: "text-slate-900",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]",
      hover: "hover:border-cyan-500/50",
    },
    emerald: {
      border: "border-emerald-500/20",
      badge: "bg-emerald-500",
      badgeText: "text-white",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
      hover: "hover:border-emerald-500/50",
    },
    orange: {
      border: "border-orange-500/20",
      badge: "bg-orange-500",
      badgeText: "text-white",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]",
      hover: "hover:border-orange-500/50",
    },
    rose: {
      border: "border-rose-500/20",
      badge: "bg-rose-500",
      badgeText: "text-white",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]",
      hover: "hover:border-rose-500/50",
    },
  };

  const theme = colorMap[color] || colorMap.cyan;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-2xl overflow-hidden bg-slate-900 border ${theme.border} ${theme.hover} transition-all duration-500 block ${theme.glow}`}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`${theme.badge} ${theme.badgeText} text-xs font-bold px-3 py-1 rounded-full`}
        >
          {t(`clients.status.${status}`)}
        </div>
      </div>

      {/* Logo Container */}
      <div className="h-48 bg-slate-800/50 relative overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-linear-to-br from-slate-800/50 to-slate-900/50" />
        <img
          src={logo}
          alt={t(`clients.companies.${clientKey}.name`)}
          className={`relative z-10 max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ${
            clientKey === "ahorabaila"
              ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              : ""
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
          {t(`clients.companies.${clientKey}.name`)}
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          {t(`clients.companies.${clientKey}.description`)}
        </p>
        <div className="inline-flex items-center text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
          {t("clients.visitWebsite")}
          <ExternalLink size={14} className="ml-2" />
        </div>
      </div>
    </a>
  );
}
