import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  User,
  Search,
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="min-h-screen text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 liquid-glass">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => (window.location.href = "/")}>
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-background font-bold font-mono text-xl">
            P
          </div>
          <span className="font-mono font-semibold tracking-wider hidden sm:inline-block">
            DEVBY<span className="text-primary">PAJJU</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="/#about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="/#skills" className="hover:text-primary transition-colors">
            Skills
          </a>
          <a href="/#experience" className="hover:text-primary transition-colors">
            Experience
          </a>
          <a href="/#projects" className="hover:text-primary transition-colors">
            Work
          </a>
          <a href="/blog" className="text-primary transition-colors">
            Blog
          </a>
          <a href="/#contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 font-mono text-xs"
          onClick={() => window.open("/dummy-resume.pdf", "_blank")}
        >
          Resume
        </Button>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12">
              Sharing insights on backend engineering, AI automation, and modern web
              development.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search blogs by title, keywords or tags..."
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
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] text-white/50 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User size={14} />
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
                      Read More <ArrowRight size={14} />
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

      {/* Footer */}
      <div className="relative w-full h-48 overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent to-black/40 mt-20">
        <div className="absolute bottom-0 w-full flex items-end justify-center gap-1 px-10">
          {[40, 60, 45, 80, 55, 90, 70, 100, 65, 85, 50, 75].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: h }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 1 }}
              className="w-12 bg-white/5 border-t border-x border-white/10 rounded-t-sm relative group overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-1 p-2">
                {Array.from({ length: Math.floor(h / 10) }).map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                    }}
                    className="w-full aspect-square bg-primary/20 rounded-[1px]"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="py-20 bg-black/20 relative">
        <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-teal-400/20 via-blue-400/10 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-background font-bold font-mono text-xl">
                  P
                </div>
                <span className="font-mono font-semibold tracking-wider">
                  DEVBY<span className="text-primary">PAJJU</span>
                </span>
              </div>
              <p className="text-muted-foreground max-w-sm mb-8">
                Backend Developer specializing in Python and Laravel. Building scalable
                systems and AI-powered automation solutions.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/paraj1305/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1f2528] flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/paraj1305"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all liquid-mini"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/paraj1305"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all liquid-mini"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-widest">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-mono text-muted-foreground">
                <li>
                  <a href="/" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#skills" className="hover:text-primary transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="/#experience" className="hover:text-primary transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-primary transition-colors">
                    Work
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-widest">
                Connect
              </h4>
              <ul className="space-y-4 text-sm font-mono text-muted-foreground">
                <li>
                  <a href="/#contact" className="hover:text-primary transition-colors">
                    Contact Me
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:parajbhatasanaparaj@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/paraj1305/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => window.open("/dummy-resume.pdf", "_blank")}
                    className="hover:text-primary transition-colors"
                  >
                    Resume
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Designed & Built by{" "}
              <span className="text-primary">Paraj Bhatasana</span>
            </p>
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-muted-foreground"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
