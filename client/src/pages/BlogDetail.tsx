import React, { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogData";

const BlogDetail = () => {
  const [match, params] = useRoute("/blog/:id");
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blog = blogPosts.find((p) => p.id === params?.id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Blog post not found</h2>
          <Button onClick={() => setLocation("/blog")}>Back to Blogs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          className="mb-8 text-primary hover:text-primary hover:bg-primary/10 gap-2 p-0 h-auto"
          onClick={() => setLocation("/blog")}
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Button>

        <div className="mb-12">
          <div className="flex flex-wrap gap-4 items-center text-sm font-mono text-primary/60 mb-6">
             <div className="flex items-center gap-2">
                <Calendar size={14} /> {blog.date}
             </div>
             <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <Clock size={14} /> {blog.readTime}
             </div>
             <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <User size={14} /> {blog.author}
             </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-12">
            {blog.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/50 font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden mb-16 border border-white/5 shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-invert prose-primary max-w-none">
          <div 
             className="text-muted-foreground text-lg leading-relaxed space-y-6"
             dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>

        <div className="mt-20 pt-12 border-t border-white/5">
           <div className="bg-[#1f2528] p-8 md:p-12 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                 <h3 className="text-2xl font-bold text-white mb-2">Enjoyed this post?</h3>
                 <p className="text-muted-foreground">Stay updated with my latest thoughts on engineering and AI.</p>
              </div>
              <Button 
                 className="bg-primary text-background font-bold px-8 h-14 rounded-xl hover:scale-105 transition-transform"
                 onClick={() => setLocation("/blog")}
              >
                 Explore More Blogs
              </Button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
