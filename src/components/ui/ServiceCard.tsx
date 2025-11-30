interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function ServiceCard({ icon, title, desc }: ServiceCardProps) {
  return (
    <div className="group bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2">
      <div className="bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-800 group-hover:border-indigo-500/30 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
