import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";

interface DashboardStats {
  new_requests: number;
  conversion_rate: number;
  avg_lead_score: number;
  total_revenue_estimate: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.rpc("get_dashboard_stats", {
        start_date: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Start of this year
        end_date: new Date().toISOString(),
      });

      if (error) {
        console.error("Error fetching dashboard stats:", error);
        // Fallback to dummy data if RPC fails or doesn't exist yet
        setStats({
          new_requests: 0,
          conversion_rate: 0,
          avg_lead_score: 0,
          total_revenue_estimate: 0,
        });
      } else {
        setStats(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">
          {loading ? "..." : value}
        </h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back to LYTU Admin Platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="New Leads"
          value={stats?.new_requests || 0}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats?.conversion_rate || 0}%`}
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatCard
          title="Avg Lead Score"
          value={stats?.avg_lead_score || 0}
          icon={Activity}
          color="bg-purple-500"
        />
        <StatCard
          title="Est. Revenue"
          value={`$${(stats?.total_revenue_estimate || 0).toLocaleString()}`}
          icon={DollarSign}
          color="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="text-gray-500 text-center py-8">
            No recent activity to show.
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex flex-col items-center gap-2">
              <FileText size={20} />
              <span className="text-sm font-medium">Create Quote</span>
            </button>
            <button className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex flex-col items-center gap-2">
              <Users size={20} />
              <span className="text-sm font-medium">Add Client</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
