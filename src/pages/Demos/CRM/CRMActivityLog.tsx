import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "call",
    title: "Call with Sarah Johnson",
    description: "Discussed the new enterprise requirements and timeline.",
    time: "2 hours ago",
    user: "AD",
    icon: Phone,
    color: "emerald",
  },
  {
    id: 2,
    type: "email",
    title: "Email sent to TechCorp",
    description: "Sent the updated proposal v2.pdf with new pricing.",
    time: "4 hours ago",
    user: "SJ",
    icon: Mail,
    color: "blue",
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting with Global Solutions",
    description: "Quarterly review meeting with the engineering team.",
    time: "Yesterday",
    user: "MC",
    icon: Calendar,
    color: "purple",
  },
  {
    id: 4,
    type: "note",
    title: "Note added to Deal #1234",
    description: "Client mentioned they are evaluating competitors.",
    time: "Yesterday",
    user: "AD",
    icon: FileText,
    color: "orange",
  },
  {
    id: 5,
    type: "message",
    title: "Chat with Support",
    description: "Resolved login issue for the admin account.",
    time: "2 days ago",
    user: "Support",
    icon: MessageSquare,
    color: "pink",
  },
  {
    id: 6,
    type: "lead",
    title: "New Lead Created",
    description: "James Rodriguez from Media Group added manually.",
    time: "3 days ago",
    user: "AD",
    icon: User,
    color: "indigo",
  },
];

export default function CRMActivityLog() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Activity Log</h1>
          <p className="text-slate-400">
            Timeline of all system activities and interactions.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="relative border-l border-slate-800 ml-3 space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-8 group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-${activity.color}-500 border-4 border-slate-900 shadow-[0_0_0_1px_rgba(30,41,59,1)]`}
              ></div>

              <div className="flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/50">
                <div
                  className={`w-10 h-10 rounded-lg bg-${activity.color}-500/10 flex items-center justify-center text-${activity.color}-400 shrink-0`}
                >
                  <activity.icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-lg">
                      {activity.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-3">{activity.description}</p>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                      {activity.user}
                    </div>
                    <span className="text-xs text-slate-500">
                      performed by {activity.user}
                    </span>
                  </div>
                </div>

                <button className="self-center md:self-start p-2 text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium">
            Load More Activities
          </button>
        </div>
      </div>
    </div>
  );
}
