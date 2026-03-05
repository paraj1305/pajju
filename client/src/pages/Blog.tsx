import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogs = [
    {
      title: "Building Scalable Backends with Python",
      description: "Explore the best practices for creating robust and high-performance backend systems using modern Python frameworks.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
      date: "Oct 12, 2023",
      author: "Paraj Bhatasana",
      readTime: "5 min read"
    },
    {
      title: "Mastering Laravel: Clean Code Architecture",
      description: "Deep dive into the Repository Pattern and Service Layer for maintainable PHP applications.",
      image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&q=80&w=800",
      date: "Sep 28, 2023",
      author: "Paraj Bhatasana",
      readTime: "8 min read"
    },
    {
      title: "AI Integration in Modern Web Apps",
      description: "How to seamlessly integrate LLMs and AI automation into your existing tech stack.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      date: "Sep 15, 2023",
      author: "Paraj Bhatasana",
      readTime: "6 min read"
    },
    {
      title: "The Future of WhatsApp Automation",
      description: "Leveraging the WhatsApp Business API for intelligent customer engagement and growth.",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800",
      date: "Aug 30, 2023",
      author: "Paraj Bhatasana",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1012] text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Sharing insights on backend engineering, AI automation, and modern web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1f2528] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs font-mono text-primary mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {blog.readTime}
                  </span>
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-medium text-white/70">{blog.author}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 gap-2">
                    Read More <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
