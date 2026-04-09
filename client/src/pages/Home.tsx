import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
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
  Bot,
  Cpu,
  FileSearch,
  PhoneCall,
  Workflow,
  Code2,
  Rocket,
  Brain,
} from "lucide-react";
import { blogPosts } from "@/data/blogData";
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
export { Typewriter, SkillCard, MarqueeRow, ProjectImageSlider, BlogSection, VerticalProjectMarquee };

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
    <div className="relative flex overflow-hidden py-16 md:py-32 mask-fade-edges -my-12 md:-my-24 z-20 hover:z-30 transition-all duration-300">
      <motion.div
        animate={{
          x: direction === "left" ? [0, -1035] : [-1035, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-4 md:gap-6 pr-6"
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
    }, 4000); // Slower automatic transition
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/slider">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
          alt={`${title} - image ${currentIndex + 1}`}
        />
      </AnimatePresence>

      {/* Manual Controls */}
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/slider:opacity-100 transition-opacity z-30">
            <button
              onClick={prevImage}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-black transition-all"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={nextImage}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-black transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-primary w-4" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Blog Section Component
const BlogSection = () => {
  const [, setLocation] = useLocation();
  const duplicatedBlogs = [...blogPosts, ...blogPosts];

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
          onClick={() => setLocation("/blog")}
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
              onClick={() => setLocation(`/blog/${blog.id}`)}
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

// Vertical Project Marquee Component
const VerticalProjectMarquee = () => {
const projects = [
  {
    title: "MODREMIT Remittance System",
    category: "FinTech | Global Money Transfer | Fast, Secure & Reliable",
    description: "ModRemit is a remote financial system featuring an Admin Panel to manage agents who facilitate international transfers. It supports both direct customer transfers and agent-assisted transactions across any country. The platform is secured by Sumsub KYC integration, automating identity verification for all users to ensure global regulatory compliance.",
    image: "modremit/m1.png",
    tech: ["Laravel", "PHP", "MySQL", "Stripe"],
    link: "https://modremit.coderscotch.com/",
  },
  {
    title: "Travixa Smart Travel Solution",
    category: "Business Automation",
    description: "Travixa is a specialized tour booking software designed to centralize and automate travel operations. It features a robust Admin Panel for managing tour catalogs and processing manual bookings, alongside an integrated WhatsApp Chatbot that allows customers to book tours instantly through chat. Beyond booking, the system streamlines logistics by allowing administrators to assign drivers to specific tours, ensuring seamless coordination between company management and field operations.",
    image: "travixa/t11.png",
    tech: ["FastAPI", "Python", "PostgreSQL","whatsapp chat","VectorDB"],
    link: "http://tourbookingaiagent.coderscotch.com/",
  }, 
  {
    title: "CoderScotch CRM",
    category: "CRM System",
    description: "This CRM platform features admin and employee portals to streamline project management, task tracking, and leave requests within a single system.",
    image: "pycrm/p1.png",
    tech: ["python", "Django", "MySQL"],
    link: "https://pycrm.coderscotch.com/superadmin/login/",
  },
  {
    title: "Pooten Order Management System",
    category: "E-commerce | Order Management | Inventory Tracking | Invoicing",
    description: "An Order Management System designed to streamline and automate the complete order lifecycle, from order creation to delivery. The system enables efficient tracking of orders, manages customer details, handles payments, and provides real-time status updates. It improves operational efficiency, reduces manual errors, and ensures a smooth and organized workflow for businesses. ",
    image: "pooten/p1.png",
    tech: ["laravel", "php", "mysql"],
    link: "https://oms.pooten.co.uk/",
  }
];

  const duplicatedProjects = [...projects, ...projects];

  return (
    <div className="relative h-[700px] md:h-[850px] overflow-hidden mask-fade-edges-vertical rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-[#1f2528]/50 pause-on-hover">
      <div className="flex flex-col gap-6 p-6 animate-vertical-marquee">
        {duplicatedProjects.map((project, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row gap-6 md:gap-8 bg-[#0d1012] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 group hover:border-primary/30 hover:bg-[#151a1d] transition-all duration-500"
          >
            <div className="w-full md:w-2/5 aspect-video md:aspect-square lg:aspect-video rounded-2xl overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="p-3 bg-primary text-black rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                 >
                   <ExternalLink size={20} />
                 </a>
              </div>
            </div>
            <div className="w-full md:w-3/5 flex flex-col justify-center gap-4">
              <div>
                <p className="text-primary font-mono text-[10px] tracking-widest uppercase mb-1">
                  {project.category}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
const techSkills = [
  {
    name: "Python",
    icon: Code,
    description:
      "Building scalable backend systems, automation tools, and AI-powered applications.",
  },
  {
    name: "Django",
    icon: Layers,
    description:
      "Developing secure and maintainable web applications using Django framework.",
  },
  {
    name: "FastAPI",
    icon: Terminal,
    description:
      "Creating high-performance REST APIs with modern Python async architecture.",
  },
  {
    name: "PHP",
    icon: Code,
    description:
      "Building dynamic web applications and backend services using PHP.",
  },
  {
    name: "Laravel",
    icon: Layers,
    description:
      "Developing robust web applications and admin panels with Laravel framework.",
  },
  {
    name: "REST API Development",
    icon: Terminal,
    description:
      "Designing secure and scalable APIs for web, mobile, and third-party integrations.",
  },
  {
    name: "Database Design",
    icon: Database,
    description:
      "Designing optimized database schemas for performance, scalability, and data integrity.",
  },
  {
    name: "MySQL",
    icon: Database,
    description:
      "Managing relational databases with optimized queries and indexing strategies.",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    description:
      "Advanced relational database management with powerful querying capabilities.",
  },
  {
    name: "MongoDB",
    icon: Database,
    description:
      "Handling NoSQL databases for flexible and scalable data storage.",
  },
  {
    name: "Automation Systems",
    icon: MessageCircle,
    description:
      "Building workflow automation, bots, and business process automation tools.",
  },
  {
    name: "AI Integration",
    icon: Sparkles,
    description:
      "Integrating LLMs, AI tools, and intelligent automation into modern applications.",
  },
  {
    name: "Third-Party Integrations",
    icon: Send,
    description:
      "Integrating external APIs like payment gateways, WhatsApp APIs, and other services.",
  },
];

const aiTools = [
  {
    name: "AI Chatbots",
    icon: MessageCircle,
    description:
      "Building intelligent conversational chatbots for customer support and automation.",
  },
  {
    name: "WhatsApp Cloud API",
    icon: Send,
    description:
      "Integrating WhatsApp messaging automation for business communication and notifications.",
  },
  {
    name: "LangChain",
    icon: Sparkles,
    description:
      "Developing AI-powered applications using LangChain for LLM workflows and agents.",
  },
  {
    name: "Vector Databases",
    icon: Database,
    description:
      "Using vector databases like pgvector or Pinecone for semantic search and AI memory.",
  },
  {
    name: "AI Agents",
    icon: Bot,
    description:
      "Building autonomous AI agents capable of performing tasks and automating workflows.",
  },
  {
    name: "LLM Integration",
    icon: Cpu,
    description:
      "Integrating large language models into real-world applications and services.",
  },
  {
    name: "RAG",
    icon: FileSearch,
    description:
      "Implementing Retrieval Augmented Generation systems using vector search and LLMs.",
  },
  {
    name: "Retell AI",
    icon: PhoneCall,
    description:
      "Building AI voice agents and conversational voice automation using Retell AI.",
  },
  {
    name: "n8n Automation",
    icon: Workflow,
    description:
      "Creating powerful workflow automation and integrations using n8n.",
  },
  {
    name: "Replit",
    icon: Code2,
    description:
      "Rapid prototyping and development of AI applications using Replit.",
  },
  {
    name: "Antigravity",
    icon: Rocket,
    description:
      "Using Antigravity for AI-powered development workflows and automation.",
  },
  {
    name: "OpenAI API",
    icon: Brain,
    description:
      "Building AI applications using OpenAI models for chatbots, automation, and AI assistants.",
  },
];

  const typewriterSentences = [
    "I build scalable backend systems.",
    "I develop AI-powered automation.",
    "I design robust REST APIs.",
    "I engineer intelligent digital solutions.",
  ];

  return (
    <div className="text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden w-full">
      {/* Hero Section */}

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
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-2">
              <span className="relative inline-block py-2">
                Paraj Bhatasana
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
                  className="absolute bottom-2 left-4 h-[1.5px] md:h-[2px] w-[85%] bg-primary/40 -rotate-2 z-0 origin-left shadow-[0_0_10px_#19e6bd]"
                />
              </span>
            </h1>
            <h6 className="text-base md:text-2xl font-medium tracking-tight text-muted-foreground/80 mb-6 min-h-[1.2em]">
              <Typewriter sentences={typewriterSentences} />
            </h6>
            <p className="max-w-xl text-lg text-muted-foreground mb-10 leading-relaxed">
              I am a Backend Developer specializing in Python and Laravel. I focus on building scalable backend systems, REST APIs, AI-powered automation solutions, and integrating modern AI tools into real-world applications.
            </p>
            <div className="flex gap-4">
              <Button 
                className="bg-primary text-background font-bold px-6 md:px-8 h-12 md:h-14 rounded-xl hover:scale-105 transition-transform text-sm md:text-base flex-1 sm:flex-none"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                Download Resume
              </Button>
              <Button 
                variant="outline"
                className="border-white/10 text-white px-6 md:px-8 h-12 md:h-14 rounded-xl hover:bg-white/5 transition-all text-sm md:text-base flex-1 sm:flex-none"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Talk
              </Button>
            </div>
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
                   className="liquid-mini absolute -bottom-4 -right-2 md:-right-4 z-30 bg-[#1f2528]/80 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 min-w-[220px] md:min-w-[260px] hover:border-primary/50 transition-colors group"
                 >
                   <div className="relative">
                     <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors">
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
                       <User className="fallback-user hidden text-primary w-6 h-6 md:w-8 md:h-8" />
                     </div>
                     <div className="absolute bottom-0.5 right-0.5 w-3 h-3 md:w-4 md:h-4 bg-[#22c55e] rounded-full border-2 border-[#1f2528] animate-pulse shadow-[0_0_10px_#22c55e]" />
                   </div>
                   <div>
                     <p className="text-white font-bold text-base md:text-lg leading-none mb-1 md:mb-1.5">
                       Paraj Bhatasana
                     </p>
                     <p className="text-[10px] md:text-xs text-primary uppercase font-mono tracking-widest font-bold ">
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
           <div className="relative liquid-mirror rounded-[2rem] md:rounded-[40px] p-8 md:p-14 overflow-hidden">

            {/* Content */}
            <div className="relative z-10 space-y-10 text-lg md:text-xl text-muted-foreground leading-relaxed">

              <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
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
                Based in Ahmedabad, Gujarat, I build secure, scalable, and high-performance backend systems designed for real-world impact.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 py-6">

                <div className="flex gap-4 items-start">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl liquid-mini text-primary">
                    <Terminal className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-base md:text-lg">Architecture First</h4>
                    <p className="text-xs md:text-sm">Designing scalable systems with clean code and the Repository Pattern.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl liquid-mini text-primary">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-base md:text-lg">AI-Powered</h4>
                    <p className="text-xs md:text-sm">Integrating modern AI tools and building smart automation workflows.</p>
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
          <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 md:-translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent shadow-[0_0_15px_rgba(25,230,189,0.5)] z-0"
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
                company: "Intern",
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
                className={`relative flex items-center justify-between gap-8 md:gap-20 flex-col md:flex-row ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-[calc(100%-3rem)] md:w-[45%] ml-10 md:ml-0 p-6 md:p-8 rounded-2xl bg-[#1f2528]/80 backdrop-blur-sm border border-white/5 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(25,230,189,0.1)] transition-all duration-300 group`}
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
                <div className="absolute left-4 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0, rotate: 0 }}
                      whileInView={{ scale: 1, rotate: 45 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: idx * 0.2 + 0.3 }}
                      className="w-8 h-8 border border-primary/30 bg-[#0d1012] backdrop-blur-sm flex items-center justify-center rotate-45 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(25,230,189,0.5)] group-hover:bg-primary/10 transition-all duration-500"
                    >
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#19e6bd]"
                      />
                    </motion.div>
                    
                    {/* Connection Line to Card */}
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "20px" }}
                      transition={{ delay: idx * 0.2 + 0.5 }}
                      className={`absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-primary/50 to-transparent ${
                        idx % 2 === 0 ? "left-10" : "right-10 md:right-10 rotate-180"
                      } ${idx % 2 !== 0 ? "md:rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Empty Space for the other side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Work Section */}
      <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-4 flex-grow">
            <h2 className="text-3xl font-bold text-white">Work</h2>
            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
          </div>
          
          <Button 
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 hidden sm:flex items-center gap-2 group"
            onClick={() => window.location.href = "/projects"}
          >
            See All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <VerticalProjectMarquee />

        <div className="mt-12 text-center sm:hidden">
          <Button 
            variant="outline"
            className="w-full border-primary/30 text-primary hover:bg-primary/10 flex items-center justify-center gap-2 group"
            onClick={() => window.location.href = "/projects"}
          >
            See All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <BlogSection />

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
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
                    bhatasanaparaj@gmail.com
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

          <div className="bg-[#1f2528]/50 p-6 md:p-12 rounded-2xl md:rounded-3xl border border-white/5 backdrop-blur-sm">
            <form 
              className="space-y-8"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  message: formData.get('message'),
                };
                
                try {
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  
                  if (response.ok) {
                    alert("Message sent successfully!");
                    form.reset();
                  } else {
                    throw new Error("Failed to send");
                  }
                } catch (error) {
                  alert("Failed to send message. Please try again later.");
                }
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
{" "}
    </div>
  );
};

export default Home;
