import { useState } from "react";
import { Plus, MoreHorizontal, DollarSign, Calendar, X } from "lucide-react";

interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: string;
  owner: string;
  date: string;
}

interface Stage {
  id: string;
  name: string;
  color: string;
}

const initialStages: Stage[] = [
  { id: "lead", name: "Lead", color: "blue" },
  { id: "qualified", name: "Qualified", color: "indigo" },
  { id: "proposal", name: "Proposal", color: "purple" },
  { id: "negotiation", name: "Negotiation", color: "orange" },
  { id: "closed", name: "Closed Won", color: "emerald" },
];

const initialDeals: Deal[] = [
  {
    id: 1,
    title: "Enterprise License",
    company: "TechCorp Inc.",
    value: 24000,
    stage: "negotiation",
    owner: "AD",
    date: "Oct 24",
  },
  {
    id: 2,
    title: "Consulting Package",
    company: "Global Solutions",
    value: 12500,
    stage: "proposal",
    owner: "SJ",
    date: "Oct 25",
  },
  {
    id: 3,
    title: "Basic Plan",
    company: "StartUp Labs",
    value: 3000,
    stage: "qualified",
    owner: "MC",
    date: "Oct 26",
  },
  {
    id: 4,
    title: "Custom Development",
    company: "Media Group",
    value: 45000,
    stage: "lead",
    owner: "AD",
    date: "Oct 22",
  },
  {
    id: 5,
    title: "Maintenance Contract",
    company: "Future Systems",
    value: 8000,
    stage: "lead",
    owner: "EW",
    date: "Oct 28",
  },
  {
    id: 6,
    title: "Cloud Migration",
    company: "Cloud Nine",
    value: 15000,
    stage: "qualified",
    owner: "AD",
    date: "Oct 29",
  },
  {
    id: 7,
    title: "Security Audit",
    company: "SecureNet",
    value: 6000,
    stage: "lead",
    owner: "JR",
    date: "Oct 30",
  },
  {
    id: 8,
    title: "API Integration",
    company: "Connect API",
    value: 11500,
    stage: "proposal",
    owner: "MC",
    date: "Oct 27",
  },
  {
    id: 9,
    title: "Training Workshop",
    company: "EduTech",
    value: 5500,
    stage: "negotiation",
    owner: "LP",
    date: "Oct 23",
  },
  {
    id: 10,
    title: "Annual Subscription",
    company: "Loyal Co",
    value: 12000,
    stage: "closed",
    owner: "AD",
    date: "Oct 20",
  },
  {
    id: 11,
    title: "Mobile App Design",
    company: "App Works",
    value: 9000,
    stage: "lead",
    owner: "SJ",
    date: "Oct 31",
  },
  {
    id: 12,
    title: "SEO Optimization",
    company: "Web Boost",
    value: 4500,
    stage: "qualified",
    owner: "EW",
    date: "Nov 01",
  },
];

export default function CRMDeals() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [draggedDealId, setDraggedDealId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeal, setNewDeal] = useState<Partial<Deal>>({
    title: "",
    company: "",
    value: 0,
    stage: "lead",
    owner: "AD",
    date: "Today",
  });

  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage === stageId);
  };

  const getStageTotal = (stageId: string) => {
    const total = deals
      .filter((deal) => deal.stage === stageId)
      .reduce((sum, deal) => sum + deal.value, 0);
    return formatCurrency(total);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDragStart = (e: React.DragEvent, dealId: number) => {
    setDraggedDealId(dealId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (draggedDealId !== null) {
      setDeals(
        deals.map((deal) =>
          deal.id === draggedDealId ? { ...deal, stage: stageId } : deal
        )
      );
      setDraggedDealId(null);
    }
  };

  const handleAddDeal = () => {
    if (!newDeal.title || !newDeal.company) return;

    const deal: Deal = {
      id: Date.now(),
      title: newDeal.title || "",
      company: newDeal.company || "",
      value: Number(newDeal.value) || 0,
      stage: newDeal.stage || "lead",
      owner: newDeal.owner || "AD",
      date: newDeal.date || "Today",
    };

    setDeals([...deals, deal]);
    setIsModalOpen(false);
    setNewDeal({
      title: "",
      company: "",
      value: 0,
      stage: "lead",
      owner: "AD",
      date: "Today",
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Deals Pipeline</h1>
          <p className="text-slate-400">
            Track and manage your sales opportunities.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus size={18} />
          New Deal
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 min-w-max h-full">
          {initialStages.map((stage) => (
            <div
              key={stage.id}
              className="w-80 flex flex-col bg-slate-900/50 rounded-xl border border-slate-800/50 h-full transition-colors hover:border-slate-700/50"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Stage Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900 rounded-t-xl sticky top-0 z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full bg-${stage.color}-500 shadow-[0_0_8px] shadow-${stage.color}-500/50`}
                    ></span>
                    {stage.name}
                  </h3>
                  <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                    {getDealsByStage(stage.id).length}
                  </span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${stage.color}-500 w-3/4 opacity-80`}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-slate-400 font-medium flex justify-between">
                  <span>Total Value:</span>
                  <span className="text-white">{getStageTotal(stage.id)}</span>
                </div>
              </div>

              {/* Deals List */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar bg-slate-900/20">
                {getDealsByStage(stage.id).map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-slate-800 border border-slate-700 p-4 rounded-lg shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all cursor-grab active:cursor-grabbing group relative hover:-translate-y-1"
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {deal.title}
                      </h4>
                      <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-400 mb-3 font-medium">
                      {deal.company}
                    </p>

                    <div className="flex items-center justify-between mb-3 bg-slate-900/50 p-2 rounded-lg">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                        <DollarSign size={14} />
                        {formatCurrency(deal.value)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar size={12} />
                        {deal.date}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-800 shadow-lg">
                        {deal.owner}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setNewDeal({ ...newDeal, stage: stage.id });
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3 border border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all text-sm font-medium flex items-center justify-center gap-2 group"
                >
                  <Plus
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  Add Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add New Deal</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Deal Title
                </label>
                <input
                  type="text"
                  value={newDeal.title}
                  onChange={(e) =>
                    setNewDeal({ ...newDeal, title: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Enterprise License"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={newDeal.company}
                  onChange={(e) =>
                    setNewDeal({ ...newDeal, company: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. TechCorp Inc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Value ($)
                  </label>
                  <input
                    type="number"
                    value={newDeal.value}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, value: Number(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Stage
                  </label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, stage: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {initialStages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddDeal}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors mt-4"
              >
                Create Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
