import { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Trash2,
  Reply,
  Flag,
  MoreVertical,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

const comments = [
  {
    id: 1,
    author: "John Doe",
    email: "john@example.com",
    avatar: "JD",
    content:
      "This is an excellent article! Really helped me understand the concepts better. Looking forward to more content like this.",
    post: "The Future of Web Development in 2024",
    status: "approved",
    date: "2 hours ago",
    likes: 12,
    replies: 3,
  },
  {
    id: 2,
    author: "Jane Smith",
    email: "jane@example.com",
    avatar: "JS",
    content:
      "Great insights! However, I think you could expand more on the performance optimization section.",
    post: "10 Tips for Better React Performance",
    status: "pending",
    date: "5 hours ago",
    likes: 5,
    replies: 0,
  },
  {
    id: 3,
    author: "Mike Johnson",
    email: "mike@example.com",
    avatar: "MJ",
    content:
      "I disagree with some of the points made here. TypeScript generics can be much simpler than described.",
    post: "Understanding TypeScript Generics",
    status: "approved",
    date: "1 day ago",
    likes: 8,
    replies: 2,
  },
  {
    id: 4,
    author: "Sarah Williams",
    email: "sarah@example.com",
    avatar: "SW",
    content:
      "This is spam content trying to promote my website. Please visit example.com for more info!",
    post: "CSS Grid vs Flexbox",
    status: "spam",
    date: "2 days ago",
    likes: 0,
    replies: 0,
  },
  {
    id: 5,
    author: "Tom Brown",
    email: "tom@example.com",
    avatar: "TB",
    content:
      "Thanks for sharing this! The examples were very clear and easy to follow. Keep up the great work!",
    post: "Building Accessible Web Applications",
    status: "approved",
    date: "3 days ago",
    likes: 15,
    replies: 1,
  },
];

export default function BlogComments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.post.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || comment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/50";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/50";
      case "spam":
        return "bg-red-500/10 text-red-400 border-red-500/50";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/50";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Comments</h1>
          <p className="text-slate-400">
            Moderate and manage comments on your posts
          </p>
        </div>
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
              placeholder="Search comments..."
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
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="spam">Spam</option>
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
          <p className="text-slate-400 text-sm">Total Comments</p>
          <p className="text-2xl font-bold text-white mt-1">1,245</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Approved</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">1,089</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">142</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Spam</p>
          <p className="text-2xl font-bold text-red-400 mt-1">14</p>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {comment.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-white font-semibold">
                      {comment.author}
                    </h3>
                    <p className="text-sm text-slate-500">{comment.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        comment.status
                      )}`}
                    >
                      {comment.status.charAt(0).toUpperCase() +
                        comment.status.slice(1)}
                    </span>
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-slate-300 mb-3">{comment.content}</p>

                {/* Post Reference */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <MessageSquare size={14} />
                  <span>On:</span>
                  <span className="text-indigo-400">{comment.post}</span>
                  <span>•</span>
                  <span>{comment.date}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={16} />
                    <span>{comment.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Reply size={16} />
                    <span>{comment.replies} replies</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {comment.status === "pending" && (
                    <>
                      <button className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                        <XCircle size={16} />
                        Reject
                      </button>
                    </>
                  )}
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                    <Reply size={16} />
                    Reply
                  </button>
                  {comment.status !== "spam" && (
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                      <Flag size={16} />
                      Mark as Spam
                    </button>
                  )}
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {filteredComments.length} of {comments.length} comments
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
