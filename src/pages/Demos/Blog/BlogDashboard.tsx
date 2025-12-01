import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  MessageSquare,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  PenTool,
  Activity,
  Download,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useBlog } from "../../../contexts/BlogContext";

const viewsData = [
  { name: "Mon", value: 1200 },
  { name: "Tue", value: 1500 },
  { name: "Wed", value: 1800 },
  { name: "Thu", value: 1400 },
  { name: "Fri", value: 2200 },
  { name: "Sat", value: 2800 },
  { name: "Sun", value: 3100 },
];

export default function BlogDashboard() {
  const navigate = useNavigate();
  const { posts } = useBlog();
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "downloading" | "success"
  >("idle");

  const handleDownloadReport = () => {
    setDownloadStatus("downloading");
    setTimeout(() => {
      setDownloadStatus("success");
      setTimeout(() => setDownloadStatus("idle"), 3000);
    }, 2000);
  };

  // Calculate stats from actual posts
  const publishedPosts = posts.filter((p) => p.status === "Published");
  const totalViews = publishedPosts.reduce((sum, post) => {
    const views = typeof post.views === "string" && post.views !== "-" 
      ? parseFloat(post.views.replace("k", "")) * 1000 
      : 0;
    return sum + views;
  }, 0);
  
  const totalComments = publishedPosts.reduce((sum, post) => {
    return sum + (typeof post.comments === "number" ? post.comments : 0);
  }, 0);

  // Get recent posts (last 4)
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Overview</h1>
          <p className="text-slate-400">
            Manage your content, track performance, and engage with your audience.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadReport}
            disabled={downloadStatus !== "idle"}
            className={`px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center gap-2 ${
              downloadStatus === "success"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            {downloadStatus === "downloading" ? (
              <>Downloading...</>
            ) : downloadStatus === "success" ? (
              <>
                <CheckCircle2 size={16} />
                Report Saved
              </>
            ) : (
              <>
                <Download size={16} />
                Export Report
              </>
            )}
          </button>
          <button
            onClick={() => navigate("/demos/blog/editor")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <PenTool size={18} />
            Write New Post
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <Eye className="text-indigo-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +24.5%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Total Views</h3>
          <p className="text-2xl font-bold text-white mt-1">
            {totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <FileText className="text-purple-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +{posts.length - publishedPosts.length}
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Published Posts</h3>
          <p className="text-2xl font-bold text-white mt-1">{publishedPosts.length}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-pink-500/10 rounded-lg">
              <MessageSquare className="text-pink-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +8.2%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Comments</h3>
          <p className="text-2xl font-bold text-white mt-1">{totalComments.toLocaleString()}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Activity className="text-orange-400" size={24} />
            </div>
            <span className="flex items-center text-red-400 text-sm font-medium bg-red-500/10 px-2 py-1 rounded">
              <ArrowDownRight size={14} className="mr-1" />
              -2.1%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Avg. Read Time</h3>
          <p className="text-2xl font-bold text-white mt-1">4m 12s</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Traffic Overview</h3>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#f8fafc",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">
            Top Categories
          </h3>
          <div className="space-y-4">
            {[
              { name: "Development", count: 45, color: "bg-blue-500" },
              { name: "Design", count: 32, color: "bg-purple-500" },
              { name: "Marketing", count: 28, color: "bg-pink-500" },
              { name: "Tutorials", count: 24, color: "bg-orange-500" },
              { name: "News", count: 15, color: "bg-emerald-500" },
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{category.name}</span>
                  <span className="text-slate-400">{category.count} posts</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color}`}
                    style={{ width: `${(category.count / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Posts</h3>
          <button 
            onClick={() => navigate("/demos/blog/posts")}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Views</th>
                <th className="px-6 py-4 font-medium">Comments</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white block truncate max-w-xs">
                      {post.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {post.author}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {post.comments}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {post.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
