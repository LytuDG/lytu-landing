import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: "Published" | "Draft" | "Scheduled";
  views: string;
  comments: number | string;
  date: string;
  tags: string[];
  image: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, "id">) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development in 2024",
    excerpt: "Exploring the latest trends and technologies shaping the web development landscape...",
    content: "Full content here...",
    author: "Alex Thompson",
    category: "Development",
    status: "Published",
    views: "1.2k",
    comments: 45,
    date: "Dec 1, 2024",
    tags: ["React", "Web Dev", "Trends"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "10 Tips for Better React Performance",
    excerpt: "Learn how to optimize your React applications for maximum performance and user experience...",
    content: "Full content here...",
    author: "Sarah Miller",
    category: "Development",
    status: "Draft",
    views: "-",
    comments: "-",
    date: "Nov 30, 2024",
    tags: ["React", "Performance", "Optimization"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Understanding TypeScript Generics",
    excerpt: "A comprehensive guide to mastering TypeScript generics and type safety...",
    content: "Full content here...",
    author: "James Wilson",
    category: "Tutorials",
    status: "Published",
    views: "856",
    comments: 23,
    date: "Nov 28, 2024",
    tags: ["TypeScript", "Tutorial", "Advanced"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which?",
    excerpt: "Understanding the differences and use cases for CSS Grid and Flexbox layouts...",
    content: "Full content here...",
    author: "Emily Davis",
    category: "Design",
    status: "Published",
    views: "2.1k",
    comments: 89,
    date: "Nov 25, 2024",
    tags: ["CSS", "Layout", "Design"],
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    excerpt: "Best practices for creating inclusive and accessible web experiences for all users...",
    content: "Full content here...",
    author: "Michael Brown",
    category: "Development",
    status: "Published",
    views: "1.5k",
    comments: 67,
    date: "Nov 22, 2024",
    tags: ["Accessibility", "A11y", "Best Practices"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Introduction to Next.js 14",
    excerpt: "Discover the new features and improvements in the latest version of Next.js...",
    content: "Full content here...",
    author: "Alex Thompson",
    category: "Development",
    status: "Scheduled",
    views: "-",
    comments: "-",
    date: "Dec 5, 2024",
    tags: ["Next.js", "React", "Framework"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
  },
];

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  const addPost = (post: Omit<BlogPost, "id">) => {
    const newPost: BlogPost = {
      ...post,
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
    };
    setPosts([newPost, ...posts]);
  };

  const updatePost = (id: number, updatedPost: Partial<BlogPost>) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
