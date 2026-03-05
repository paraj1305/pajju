import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code,
  Terminal,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  X,
  Send,
  User,
  Sparkles,
  Layers,
  Phone,
  Database,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Typewriter Effect Component
const Typewriter = ({ sentences }: { sentences: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 45;
  const deletingSpeed = 30;
  const pauseAfterTyping = 1000;

  useEffect(() => {
    const currentText = sentences[index];

    if (!isDeleting && subIndex === currentText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % sentences.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, sentences]);

  return (
    <span className="relative inline-block min-h-[1.2em]">
      {/* 🔥 Gradient AI Text */}
      <span
        className="
        bg-gradient-to-r 
        from-cyan-400 
        via-emerald-400 
        to-teal-400 
        bg-[length:200%_200%] 
        bg-clip-text 
        text-transparent 
        animate-[gradientMove_4s_linear_infinite]
      "
      >
        {sentences[index].substring(0, subIndex)}
      </span>

      {/* 🤖 AI Cursor Glow */}
      <span
        className="
        ml-2 inline-block 
        w-[3px] h-6 
        bg-cyan-400 
        shadow-[0_0_8px_#22d3ee] 
        animate-pulse
        align-middle
      "
      />
    </span>
  );
};

// Skill Card Component
const SkillCard = ({
  name,
  icon: Icon,
  description,
}: {
  name: string;
  icon: any;
  description: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 bg-[#1f2528] border border-white/5 px-6 py-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all group min-w-[180px] cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="text-primary group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <span className="font-mono text-white text-sm whitespace-nowrap">
        {name}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-64 p-4 bg-[#1f2528] border border-primary/30 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[99999] pointer-events-none backdrop-blur-xl"
          >
            <div className=" absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1f2528] border-r border-b border-primary/30 rotate-45" />
            <p className="text-xs font-mono text-primary mb-1 uppercase tracking-wider relative z-10">
              {name}
            </p>
            <p className="text-sm text-white/90 leading-relaxed relative z-10">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Chatbot Component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hey 👋 I'm Paraj's AI assistant. Ask me anything about him!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Simple mock responses based on portfolio content
    setTimeout(() => {
      const query = userMessage.toLowerCase();
      let botResponse =
        "That's an interesting question! I'm Paraj's AI assistant. He's a Full Stack Developer specializing in Python, React, and AI architecture. Is there something specific about his work or skills you'd like to know?";

      if (
        query.includes("skill") ||
        query.includes("stack") ||
        query.includes("tech")
      ) {
        botResponse =
          "Paraj has a robust tech stack! On the backend, he's an expert in Python (Django, FastAPI) and Laravel. For the frontend, he builds high-performance UIs with React and Tailwind CSS. He also integrates PostgreSQL and MongoDB for scalable data solutions.";
      } else if (
        query.includes("ai") ||
        query.includes("agent") ||
        query.includes("automation")
      ) {
        botResponse =
          "AI is at the core of Paraj's recent work. He builds Agentic AI systems, custom LLM integrations, and complex automation workflows using tools like n8n and Rettel AI. He's currently focused on self-evolving intelligent systems.";
      } else if (
        query.includes("experience") ||
        query.includes("work") ||
        query.includes("history")
      ) {
        botResponse =
          "Paraj has over 5 years of experience in the industry. He has delivered 50+ successful projects, ranging from enterprise-grade backends to sophisticated AI-driven platforms. He thrives in roles that require both technical precision and creative problem-solving.";
      } else if (
        query.includes("contact") ||
        query.includes("email") ||
        query.includes("reach")
      ) {
        botResponse =
          "You can reach Paraj directly via email at paraj.code@gmail.com. You can also connect with him on LinkedIn or GitHub through the links in the footer!";
      } else if (
        query.includes("hello") ||
        query.includes("hi") ||
        query.includes("hey")
      ) {
        botResponse =
          "Hello! 👋 I'm here to help you learn more about Paraj's work and expertise. What can I tell you about him today?";
      } else if (query.includes("project") || query.includes("portfolio")) {
        botResponse =
          "Paraj has a diverse portfolio including Digital Innovation Platforms and AI-powered tools. You can see some of his featured work in the 'Work' section of this page!";
      }

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-primary text-background rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#0d1012] rounded-full animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.9,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] bg-[#1f2528]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-primary/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background font-bold">
                PB
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Paraj's AI Assistant
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] text-primary uppercase font-mono tracking-widest">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-background rounded-tr-none"
                        : "bg-white/5 text-white rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-white/5 bg-white/5"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-[#0d1012] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Marquee Row Component
const MarqueeRow = ({
  skills,
  direction = "left",
}: {
  skills: any[];
  direction?: "left" | "right";
}) => {
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative flex overflow-visible py-32 mask-fade-edges -my-24 z-20 hover:z-30 transition-all duration-300">
      <motion.div
        animate={{
          x: direction === "left" ? [0, -1035] : [-1035, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6 pr-6"
      >
        {duplicatedSkills.map((skill, idx) => (
          <div key={idx} className="relative py-8 ">
            {" "}
            {/* ✅ added padding to prevent clipping */}
            <SkillCard {...skill} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Project Image Slider Component
const ProjectImageSlider = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          alt={`${title} - image ${currentIndex + 1}`}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-primary w-4" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Blog Section Component
const BlogSection = () => {
  const blogs = [
    {
      title: "Building Scalable Backends with Python",
      description: "Explore the best practices for creating robust and high-performance backend systems.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
      link: "/blog"
    },
    {
      title: "Mastering Laravel Architecture",
      description: "Deep dive into the Repository Pattern and Service Layer for maintainable apps.",
      image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&q=80&w=800",
      link: "/blog"
    },
    {
      title: "AI Integration in Modern Apps",
      description: "How to seamlessly integrate LLMs and AI automation into your tech stack.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      link: "/blog"
    },
    {
      title: "The Future of WhatsApp Automation",
      description: "Leveraging the WhatsApp Business API for intelligent customer engagement.",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800",
      link: "/blog"
    }
  ];

  const duplicatedBlogs = [...blogs, ...blogs];

  return (
    <section id="blog" className="py-24 bg-black/20">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-grow">
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">Recent Blogs</h2>
          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
        </div>
        <Button 
          variant="outline" 
          className="ml-8 border-primary/30 text-primary hover:bg-primary/10 hidden sm:flex items-center gap-2"
          onClick={() => window.location.href = "/blog"}
        >
          View All Blogs <ExternalLink size={14} />
        </Button>
      </div>

      <div className="relative overflow-hidden w-full mask-fade-edges">
        <motion.div
          animate={{ x: [0, -1600] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 px-6"
        >
          {duplicatedBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[300px] md:w-[350px] bg-[#1f2528] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all group cursor-pointer"
              onClick={() => window.location.href = blog.link}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-12 text-center sm:hidden px-6">
        <Button 
          variant="outline" 
          className="w-full border-primary/30 text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
          onClick={() => window.location.href = "/blog"}
        >
          View All Blogs <ExternalLink size={14} />
        </Button>
      </div>
    </section>
  );
};

const Home = () => {
  const techSkills = [
    {
      name: "Python",
      icon: Code,
      description:
        "Building scalable backends and intelligent automation systems.",
    },
    {
      name: "Laravel",
      icon: Layers,
      description:
        "Developing robust web applications with clean, maintainable PHP code.",
    },
    {
      name: "REST APIs",
      icon: Terminal,
      description:
        "Designing and integrating secure, high-performance API architectures.",
    },
    {
      name: "MySQL",
      icon: Database,
      description:
        "Relational database design and query optimization for data integrity.",
    },
    {
      name: "AI Integration",
      icon: Sparkles,
      description:
        "Implementing modern AI tools and LLMs into real-world applications.",
    },
    {
      name: "Automation",
      icon: MessageCircle,
      description:
        "Creating smart WhatsApp bots and workflow automation solutions.",
    },
  ];

  const aiTools = [
    {
      name: "Chatbots",
      icon: MessageCircle,
      description:
        "Building conversational AI interfaces for enhanced user engagement.",
    },
    {
      name: "WhatsApp API",
      icon: Send,
      description:
        "Automating business communications via WhatsApp integration.",
    },
    {
      name: "Git",
      icon: Github,
      description:
        "Version control and collaborative development workflows.",
    },
    {
      name: "Authentication",
      icon: Shield,
      description:
        "Implementing secure RBAC and JWT-based authorization systems.",
    },
  ];

  const typewriterSentences = [
    "I build scalable backend systems.",
    "I develop AI-powered automation.",
    "I design robust REST APIs.",
    "I engineer intelligent digital solutions.",
  ];

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/30 selection:text-primary">
      <Chatbot />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 liquid-glass">
        <div className="flex items-center">
          <span className="text-lg md:text-xl">

            <span className="italic font-[cursive] text-muted-foreground">
              build.with
            </span>

            <span className="ml-2 font-serif font-bold tracking-widest text-primary">
              PAJJU
            </span>

          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide">
          <a href="#" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-primary transition-colors">
            Skills
          </a>
          <a
            href="#experience"
            className="hover:text-primary transition-colors"
          >
            Experience
          </a>
          <a href="#projects" className="hover:text-primary transition-colors">
            Work
          </a>
          <a href="#blog" className="hover:text-primary transition-colors">
            Blog
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
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
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-mono   text-sm md:text-base">
              Hi, my name is
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
              <span className="relative inline-block py-2">
                Paraj Bhatasana
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
                  className="absolute bottom-2 left-4 h-[2px] w-[85%] bg-primary/40 -rotate-2 z-0 origin-left shadow-[0_0_10px_#19e6bd]"
                />
              </span>
            </h1>
            <h6 className="text-lg md:text-2xl font-medium tracking-tight text-muted-foreground/80 mb-6 min-h-[1.2em]">
              <Typewriter sentences={typewriterSentences} />
            </h6>
            <p className="max-w-xl text-lg text-muted-foreground mb-10 leading-relaxed">
              I am a Backend Developer specializing in Python and Laravel. I focus on building scalable backend systems, REST APIs, AI-powered automation solutions, and integrating modern AI tools into real-world applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Decorative background glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full h-full"
              >
                <img
                  src="/final.png"
                  alt="Paraj Bhatasana 3D Avatar"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(25,230,189,0.3)]"
                />

                {/* Floating Available for Work Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3, y: 0 }}
                  transition={{
                    delay: 1.2,
                    type: "spring",
                    stiffness: 100,
                    duration: 0.8,
                  }}
                  className="liquid-mini absolute bottom-2 -right-0 md:-right-4 z-30 bg-[#1f2528]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[260px] hover:border-primary/50 transition-colors group"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors">
                      <img
                        src="/Photo_1771955679545 (1).jpg"
                        alt="Paraj Bhatasana"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement
                            ?.querySelector(".fallback-user")
                            ?.classList.remove("hidden");
                        }}
                      />
                      <User className="fallback-user hidden text-primary w-8 h-8" />
                    </div>
                    <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[#22c55e] rounded-full border-2 border-[#1f2528] animate-pulse shadow-[0_0_10px_#22c55e]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none mb-1.5">
                      Paraj Bhatasana
                    </p>
                    <p className="text-xs text-primary uppercase font-mono tracking-widest font-bold ">
                      Available for Work
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Float-in decorative elements to simulate activity */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-10 right-0 z-20"
              >
                <Terminal className="text-primary/40 w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="absolute bottom-20 left-10 z-20"
              >
                <Code className="text-primary/30 w-10 h-10" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              The Developer Behind the Code
            </h2>
            <div className="h-px bg-gradient-to-r from-primary/60 to-transparent flex-grow"></div>
          </div>

          {/* 🔥 REAL LIQUID MIRROR CARD */}
          <div className="relative liquid-mirror rounded-[40px] p-10 md:p-14 overflow-hidden">

            {/* Content */}
            <div className="relative z-10 space-y-10 text-lg md:text-xl text-muted-foreground leading-relaxed">

              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                I am{" "}
                <span className="text-white font-bold underline decoration-primary/40 underline-offset-4">
                  Paraj Bhatasana
                </span>, a{" "}
                <span className="text-white font-semibold">
                  Backend Developer
                </span>{" "}
                and{" "}
                <span className="text-primary font-medium italic">
                  AI Solutions Engineer
                </span>.
                Based in Ahmedabad, Gujarat, I focus on building high-performance, secure, and intelligent backend infrastructures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">

                <div className="flex gap-4 items-start">
                  <div className="p-4 rounded-2xl liquid-mini text-primary">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Architecture First</h4>
                    <p className="text-sm">Designing scalable systems with clean code and the Repository Pattern.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-4 rounded-2xl liquid-mini text-primary">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">AI-Powered</h4>
                    <p className="text-sm">Integrating modern AI tools and building smart automation workflows.</p>
                  </div>
                </div>

              </div>

              <p>
                Currently at <span className="text-white font-medium">Coderscotch Technologies</span>, I specialize in bridging the gap between complex requirements and scalable software solutions. With a degree from GLS University and nearly 2 years of experience, I bring technical precision to every project.
              </p>
            </div>
          </div>
        </motion.div>
      </section>      
      
      {/* Skills Section */}
      <section id="skills" className="py-24 relative overflow-visible">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white flex items-center">
              My Stack
            </h2>
            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
          </div>
        </div>

        <div className="space-y-8 overflow-visible">
          <div>
            <div className="px-6 md:px-12">
              <h3 className="text-sm font-mono text-primary/60 uppercase tracking-widest">
                Technology
              </h3>
            </div>
            <div className="relative overflow-visible z-20">
              <MarqueeRow skills={techSkills} direction="left" />
            </div>
          </div>

          <div>
            <div className="px-6 md:px-12">
              <h3 className="text-sm font-mono text-primary/60 uppercase tracking-widest">
                AI & Productivity
              </h3>
            </div>
            <div className="relative overflow-visible z-20">
              <MarqueeRow skills={aiTools} direction="right" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section
        id="experience"
        className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto -mt-12 md:-mt-20 relative z-30"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">
              02.
            </span>
            Experience
          </h2>
          <div className="h-px bg-gradient-to-r from-primary/60 to-transparent flex-grow"></div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Refined Vertical Line */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent shadow-[0_0_15px_rgba(25,230,189,0.5)] z-0"
          />

          <div className="space-y-12 relative z-10">
            {[
              {
                company: "Coderscotch Technologies",
                role: "Python Developer",
                period: "Apr 2025 - Present",
                description: "Designing backend systems, building REST APIs, and developing AI-based chatbots and WhatsApp automation solutions.",
                tech: ["Python", "OpenAI", "FastAPI", "WhatsApp API"]
              },
              {
                company: "Coderscotch Technologies",
                role: "Laravel Developer",
                period: "Aug 2024 - Mar 2025",
                description: "Developed backend systems using Laravel/PHP, designed MySQL databases, and implemented Repository Pattern for clean code.",
                tech: ["Laravel", "PHP", "MySQL", "Architecture"]
              },
              {
                company: "Freelance / Intern",
                role: "Backend Intern",
                period: "Jun 2024 - Jul 2024",
                description: "Built basic REST APIs and supported backend development efforts for various web applications.",
                tech: ["Python", "REST APIs", "Git", "Database"]
              }
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className={`relative flex items-center justify-between gap-8 md:gap-20 ${
                  idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-[45%] p-6 md:p-8 rounded-2xl bg-[#1f2528]/80 backdrop-blur-sm border border-white/5 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(25,230,189,0.1)] transition-all duration-300 group`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-primary/80 font-mono text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono text-white/50 border border-white/10 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Center Indicator */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0, rotate: 0 }}
                      whileInView={{ scale: 1, rotate: 45 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: idx * 0.2 + 0.3 }}
                      className="w-10 h-10 border border-primary/30 bg-[#0d1012] backdrop-blur-sm flex items-center justify-center rotate-45 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(25,230,189,0.3)] transition-all duration-500"
                    >
                      <div className="-rotate-45 text-primary font-mono text-[10px] font-bold">
                        0{idx + 1}
                      </div>
                    </motion.div>
                    
                    {/* Connection Line to Card */}
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "30px" }}
                      transition={{ delay: idx * 0.2 + 0.5 }}
                      className={`absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-primary/50 to-transparent ${
                        idx % 2 === 0 ? "left-10" : "right-10 rotate-180"
                      }`}
                    />
                  </div>
                </div>

                {/* Empty Space for the other side */}
                <div className="w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Work Section */}
      <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-24">
          <h2 className="text-3xl font-bold text-white flex items-center">
            Work
          </h2>

          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
        </div>

        <div className="space-y-40">
          {[
            {
              title: "AI Chatbot Systems",
              category: "AI • Backend",
              description:
                "Developing intelligent conversational agents with custom knowledge integration and seamless backend processing.",
              images: [
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
                "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=1600",
                "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1600"
              ],
              tech: ["Python", "OpenAI", "FastAPI", "Redis"],
              link: "#",
            },
            {
              title: "WhatsApp Automation Bot",
              category: "Automation • Integration",
              description:
                "Business-focused automation solution for WhatsApp, handling queries, bookings, and customer interactions autonomously.",
              images: [
                "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1600",
                "https://images.unsplash.com/photo-1520923642038-b4259ace9439?auto=format&fit=crop&q=80&w=1600",
                "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=1600"
              ],
              tech: ["Python", "WhatsApp API", "MySQL", "Webhooks"],
              link: "#",
            },
            {
              title: "Scalable Backend Systems",
              category: "Backend • Architecture",
              description:
                "Robust API-first infrastructures built with Laravel and the Repository Pattern for maximum maintainability and performance.",
              images: [
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1600",
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
                "https://images.unsplash.com/photo-1518433278981-11271f4a53ed?auto=format&fit=crop&q=80&w=1600"
              ],
              tech: ["Laravel", "PHP", "MySQL", "Git"],
              link: "#",
            },
          ].map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center group`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-3/5">
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-[#1f2528] border border-white/5 shadow-2xl group-hover:border-primary/20 transition-all duration-700">
                  <ProjectImageSlider images={project.images} title={project.title} />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Subtle Laptop Frame Mockup Overlay */}
                  <div className="absolute inset-0 border-[12px] border-white/5 rounded-3xl pointer-events-none" />
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div>
                  <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </h3>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed font-light">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6 pt-8">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-white font-bold group/link hover:text-primary transition-colors"
                  >
                    View Case Study{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover/link:translate-x-2 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <BlogSection />

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white  ">
              Let's Connect
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Open for projects, collaborations, and opportunities
            </p>

            <div className="space-y-6">
              <div className="bg-[#1f2528] p-6 rounded-2xl flex items-center gap-4 border border-white/5 liquid-mini">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-white font-medium">
                    parajbhatasanaparaj@gmail.com
                  </p>
                </div>
              </div>

              <div className="bg-[#1f2528] p-6 rounded-2xl flex items-center gap-4 border border-white/5 liquid-mini">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Location
                  </p>
                  <p className="text-white font-medium">
                    Ahmedabad, Gujarat - India
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest my-4 ">
                  Connect on Social
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/paraj1305"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all liquid-mini"
                  >
                    <Github className="w-5 h-5" />
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
                    href="https://www.linkedin.com/in/paraj1305/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all liquid-mini"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/917202920152"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all liquid-mini"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1f2528]/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
            <form 
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                window.location.href = `mailto:parajbhatasanaparaj@gmail.com?subject=New Inquiry from Portfolio: ${name}&body=From: ${name} (${email})%0D%0A%0D%0AMessage:%0D%0A${message}`;
              }}
            >
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Your Name
                </label>
                <Input
                  name="name"
                  required
                  placeholder="Paraj Bhatasana"
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-white placeholder:text-muted-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-white placeholder:text-muted-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Message
                </label>
                <Textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all min-h-[120px] resize-none text-white placeholder:text-muted-foreground/30"
                />
              </div>
              <Button type="submit" className="w-full h-16 bg-primary text-background font-bold text-lg hover:bg-primary/90 rounded-2xl transition-transform active:scale-[0.98]">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer */}
      {/* City Scene Footer Animation */}
      <div className="relative w-full h-48 overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
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

        {/* Realistic Human Silhouettes */}
        <motion.div
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 z-10"
        >
          <div className="flex gap-32 items-end">
            {/* Silhouette 1 */}
            <div className="relative w-4 h-10 bg-white/20 rounded-full blur-[0.5px]">
              <motion.div
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="absolute -bottom-1 left-0 w-1.5 h-4 bg-white/20 rounded-full origin-top"
              />
              <motion.div
                animate={{ rotate: [15, -15, 15] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="absolute -bottom-1 right-0 w-1.5 h-4 bg-white/20 rounded-full origin-top"
              />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/20 rounded-full" />
            </div>

            {/* Silhouette 2 */}
            <div className="relative w-3.5 h-9 bg-primary/30 rounded-full blur-[0.5px]">
              <motion.div
                animate={{ rotate: [-20, 20, -20] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute -bottom-1 left-0 w-1.5 h-4 bg-primary/30 rounded-full origin-top"
              />
              <motion.div
                animate={{ rotate: [20, -20, 20] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute -bottom-1 right-0 w-1.5 h-4 bg-primary/30 rounded-full origin-top"
              />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-primary/30 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Moving Car Lights */}
        <motion.div
          animate={{ x: ["110%", "-10%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-2 w-4 h-1 bg-red-500/30 blur-[3px] rounded-full shadow-[0_0_10px_red]"
        />
      </div>
      <footer className="py-20 bg-black/20 relative">
        {/* Soft gradient glow at top */}
        <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-teal-400/20 via-blue-400/10 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Logo & Description */}
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
              Backend Developer specializing in Python and Laravel. Building scalable systems and AI-powered automation solutions.
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

            {/* Navigation */}
            <div>
              <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-widest">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-mono text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="hover:text-primary transition-colors"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="hover:text-primary transition-colors"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-primary transition-colors"
                  >
                    Work
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-widest">
                Connect
              </h4>
              <ul className="space-y-4 text-sm font-mono text-muted-foreground">
                <li>
                  <a
                    href="#contact"
                    className="hover:text-primary transition-colors"
                  >
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

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Designed & Built by{" "}
              <span className="text-primary">Paraj Bhatasana</span>
            </p>
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {/* Removed Privacy Policy and Terms of Service */}
            </div>
          </div>
        </div>
      </footer>{" "}
    </div>
  );
};

export default Home;
