import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  Eye,
  Send,
  Image,
  Link,
  Code,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  X,
  CheckCircle2,
} from "lucide-react";
import { useBlog } from "../../../contexts/BlogContext";

export default function BlogEditor() {
  const navigate = useNavigate();
  const { addPost } = useBlog();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Development");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft" | "Scheduled">("Draft");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      alert("Please enter a title for your post");
      return;
    }

    setSaveStatus("saving");
    
    const newPost = {
      title: title.trim(),
      excerpt: excerpt.trim() || content.substring(0, 150) + "...",
      content: content.trim(),
      author: "Admin Demo",
      category,
      status: "Draft" as const,
      views: "-",
      comments: "-" as const,
      date: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      tags: tags.length > 0 ? tags : ["Uncategorized"],
      image: featuredImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop",
    };

    setTimeout(() => {
      addPost(newPost);
      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }, 1000);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert("Please enter a title for your post");
      return;
    }

    if (!content.trim()) {
      alert("Please write some content for your post");
      return;
    }

    setSaveStatus("saving");
    
    const newPost = {
      title: title.trim(),
      excerpt: excerpt.trim() || content.substring(0, 150) + "...",
      content: content.trim(),
      author: "Admin Demo",
      category,
      status: status,
      views: "0",
      comments: 0,
      date: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      tags: tags.length > 0 ? tags : ["Uncategorized"],
      image: featuredImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop",
    };

    setTimeout(() => {
      addPost(newPost);
      setSaveStatus("success");
      setTimeout(() => {
        navigate("/demos/blog/posts");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Post</h1>
          <p className="text-slate-400">Write and publish your content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/demos/blog/posts")}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={saveStatus === "saving"}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {saveStatus === "saving" ? "Saving..." : "Save Draft"}
          </button>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
            <Eye size={18} />
            Preview
          </button>
          <button
            onClick={handlePublish}
            disabled={saveStatus === "saving"}
            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50 ${
              saveStatus === "success"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
            }`}
          >
            {saveStatus === "success" ? (
              <>
                <CheckCircle2 size={18} />
                Published!
              </>
            ) : (
              <>
                <Send size={18} />
                Publish
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <input
              type="text"
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold bg-transparent border-none text-white placeholder-slate-600 focus:outline-none"
            />
          </div>

          {/* Toolbar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex flex-wrap gap-2">
              {/* Text Formatting */}
              <div className="flex gap-1 border-r border-slate-700 pr-2">
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Undo size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Redo size={18} />
                </button>
              </div>

              <div className="flex gap-1 border-r border-slate-700 pr-2">
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Heading1 size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Heading2 size={18} />
                </button>
              </div>

              <div className="flex gap-1 border-r border-slate-700 pr-2">
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Bold size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Italic size={18} />
                </button>
              </div>

              <div className="flex gap-1 border-r border-slate-700 pr-2">
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <List size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <ListOrdered size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Quote size={18} />
                </button>
              </div>

              <div className="flex gap-1 border-r border-slate-700 pr-2">
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <AlignLeft size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <AlignCenter size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <AlignRight size={18} />
                </button>
              </div>

              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Link size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Image size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Code size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <textarea
              placeholder="Start writing your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 bg-transparent border-none text-white placeholder-slate-600 focus:outline-none resize-none font-mono text-sm leading-relaxed"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Excerpt
            </label>
            <textarea
              placeholder="Brief summary of your post (optional)..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full h-24 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Publish Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Status
                </label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Published" | "Draft" | "Scheduled")}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Visibility
                </label>
                <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Password Protected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Category</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Tutorials">Tutorials</option>
              <option value="News">News</option>
            </select>
          </div>

          {/* Tags */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Featured Image
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Image URL..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <button className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                <Image size={18} />
                Upload Image
              </button>
              {featuredImage && (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">SEO</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  placeholder="SEO title..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Meta Description
                </label>
                <textarea
                  placeholder="SEO description..."
                  className="w-full h-20 px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
