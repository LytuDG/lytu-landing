import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  Edit,
  Trash2,
  PenTool,
  Calendar,
  Tag,
} from "lucide-react";
import { useBlog } from "../../../contexts/BlogContext";

export default function BlogPosts() {
  const navigate = useNavigate();
  const { posts, deletePost } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || post.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
    }
  };

  const publishedCount = posts.filter((p) => p.status === "Published").length;
  const draftCount = posts.filter((p) => p.status === "Draft").length;
  const scheduledCount = posts.filter((p) => p.status === "Scheduled").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">All Posts</h1>
          <p className="text-slate-400">
            Manage and organize your blog content
          </p>
        </div>
        <button
          onClick={() => navigate("/demos/blog/editor")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2 w-fit"
        >
          <PenTool size={18} />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2">
            <Filter size={18} />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Total Posts</p>
          <p className="text-2xl font-bold text-white mt-1">{posts.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Published</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{publishedCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Drafts</p>
          <p className="text-2xl font-bold text-slate-400 mt-1">{draftCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Scheduled</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{scheduledCount}</p>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
          <PenTool className="mx-auto text-slate-600 mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
          <p className="text-slate-400 mb-6">
            {searchQuery || selectedStatus !== "all"
              ? "Try adjusting your filters"
              : "Start creating your first blog post"}
          </p>
          <button
            onClick={() => navigate("/demos/blog/editor")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 inline-flex items-center gap-2"
          >
            <PenTool size={18} />
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-800 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === "Published"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                        : post.status === "Draft"
                        ? "bg-slate-500/20 text-slate-400 border border-slate-500/50"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="text-indigo-400">{post.category}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-md flex items-center gap-1"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-md">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate("/demos/blog/editor")}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
                      title="Edit post"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
              Previous
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
              2
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
              3
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
