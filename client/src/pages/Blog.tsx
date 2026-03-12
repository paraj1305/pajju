import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  User,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogs = [
    {
      title: "Building Scalable Backends with Python",
      description:
        "Explore the best practices for creating robust and high-performance backend systems using modern Python frameworks.",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
      date: "Oct 12, 2023",
      author: "Paraj Bhatasana",
      readTime: "5 min read",
      tags: ["Python", "Backend", "Scalability"],
    },
    {
      title: "Mastering Laravel: Clean Code Architecture",
      description:
        "Deep dive into the Repository Pattern and Service Layer for maintainable PHP applications.",
      image:
        "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&q=80&w=800",
      date: "Sep 28, 2023",
      author: "Paraj Bhatasana",
      readTime: "8 min read",
      tags: ["Laravel", "PHP", "Architecture"],
    },
    {
      title: "AI Integration in Modern Web Apps",
      description:
        "How to seamlessly integrate LLMs and AI automation into your existing tech stack.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      date: "Sep 15, 2023",
      author: "Paraj Bhatasana",
      readTime: "6 min read",
      tags: ["AI", "LLM", "Automation"],
    },
    {
      title: "The Future of WhatsApp Automation",
      description:
        "Leveraging the WhatsApp Business API for intelligent customer engagement and growth.",
      image:
        "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800",
      date: "Aug 30, 2023",
      author: "Paraj Bhatasana",
      readTime: "4 min read",
      tags: ["WhatsApp", "API", "Automation"],
    },
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-[80vh] py-40 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Our <span className="text-primary italic">Blog</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12">
            Sharing insights on backend engineering, AI automation, and modern web development.
          </p>

          <div className="relative max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1f2528]/50 border-white/10 pl-12 h-14 rounded-2xl focus:border-primary/50 transition-all text-white"
            />
          </div>
        </motion.div>
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1f2528] rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-mono text-primary mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {blog.readTime}
                  </span>
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/50 font-mono transition-colors group-hover:border-primary/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                      <User size={16} />
                    </div>
                    <span className="text-xs font-medium text-white/70">
                      {blog.author}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10 gap-2"
                  >
                    Read <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No blogs found matching "{searchQuery}"
          </p>
          <Button
            variant="link"
            className="text-primary mt-4"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blog;
