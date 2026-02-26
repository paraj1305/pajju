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
  Youtube,
  Sparkles,
  Layers,
  MessageCircle,
  X,
  Send,
  User,
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
            className="absolute bottom-[calc(100%+15px)] left-1/2 -translate-x-1/2 w-64 p-4 bg-[#1f2528] border border-primary/30 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] pointer-events-none backdrop-blur-xl"
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1f2528] border-r border-b border-primary/30 rotate-45" />
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
      let botResponse = "That's an interesting question! I'm Paraj's AI assistant. He's a Full Stack Developer specializing in Python, React, and AI architecture. Is there something specific about his work or skills you'd like to know?";

      if (query.includes("skill") || query.includes("stack") || query.includes("tech")) {
        botResponse = "Paraj has a robust tech stack! On the backend, he's an expert in Python (Django, FastAPI) and Laravel. For the frontend, he builds high-performance UIs with React and Tailwind CSS. He also integrates PostgreSQL and MongoDB for scalable data solutions.";
      } else if (query.includes("ai") || query.includes("agent") || query.includes("automation")) {
        botResponse = "AI is at the core of Paraj's recent work. He builds Agentic AI systems, custom LLM integrations, and complex automation workflows using tools like n8n and Rettel AI. He's currently focused on self-evolving intelligent systems.";
      } else if (query.includes("experience") || query.includes("work") || query.includes("history")) {
        botResponse = "Paraj has over 5 years of experience in the industry. He has delivered 50+ successful projects, ranging from enterprise-grade backends to sophisticated AI-driven platforms. He thrives in roles that require both technical precision and creative problem-solving.";
      } else if (query.includes("contact") || query.includes("email") || query.includes("reach")) {
        botResponse = "You can reach Paraj directly via email at paraj.code@gmail.com. You can also connect with him on LinkedIn or GitHub through the links in the footer!";
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
        botResponse = "Hello! 👋 I'm here to help you learn more about Paraj's work and expertise. What can I tell you about him today?";
      } else if (query.includes("project") || query.includes("portfolio")) {
        botResponse = "Paraj has a diverse portfolio including Digital Innovation Platforms and AI-powered tools. You can see some of his featured work in the 'Work' section of this page!";
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
    <div className="relative flex overflow-visible py-24 mask-fade-edges -my-16 z-20 hover:z-30 transition-all duration-300">
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
          <div key={idx} className="relative">  {/* ✅ added wrapper */}
            <SkillCard {...skill} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const techSkills = [
    {
      name: "Python",
      icon: Code,
      description:
        "Advanced scripting and automation with focus on clean, scalable code.",
    },
    {
      name: "Django",
      icon: Layers,
      description:
        "Building robust enterprise-grade backends with security and scalability.",
    },
    {
      name: "FastAPI",
      icon: Sparkles,
      description:
        "Creating high-performance modern APIs with asynchronous support.",
    },
    {
      name: "Laravel",
      icon: Code,
      description:
        "Elegant PHP development for complex web application architectures.",
    },
    {
      name: "PostgreSQL",
      icon: Code,
      description: "Relational database design and complex query optimization.",
    },
    {
      name: "MongoDB",
      icon: Code,
      description:
        "NoSQL data modeling for flexible and rapid application development.",
    },
  ];

  const aiTools = [
    {
      name: "Rettel AI",
      icon: Sparkles,
      description:
        "Leveraging generative AI for enhanced development workflows.",
    },
    {
      name: "n8n",
      icon: Layers,
      description:
        "Workflow automation and integration across diverse platforms.",
    },
    {
      name: "Replit",
      icon: Terminal,
      description:
        "Cloud-based collaborative development and rapid prototyping.",
    },
    {
      name: "Lovable",
      icon: Sparkles,
      description:
        "Building interactive UI components with AI-assisted design.",
    },
  ];

  const typewriterSentences = [
    "I craft premium digital experiences.",
    "I build scalable AI-driven solutions.",
    "I design modern architectural systems.",
    "I turn complex problems into elegant code.",
  ];

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/30 selection:text-primary">
      <Chatbot />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-background/50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-background font-bold font-mono text-xl">
            C
          </div>
          <span className="font-mono font-semibold tracking-wider hidden sm:inline-block">
            CODER<span className="text-primary">SCOTCH</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide">
          <a href="#skills" className="hover:text-primary transition-colors">
            01. Skills
          </a>
          <a
            href="#experience"
            className="hover:text-primary transition-colors"
          >
            02. Experience
          </a>
          <a href="#projects" className="hover:text-primary transition-colors">
            03. Work
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            04. Contact
          </a>
        </div>

        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 font-mono text-xs"
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
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-2">
              <span className="relative inline-block py-2">
                <span className="relative z-10 text-white px-2 font-serif italic tracking-tighter drop-shadow-[0_0_15px_rgba(25,230,189,0.4)]">Paraj Bhatassana</span>
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                  className="absolute bottom-4 left-0 h-[30%] w-full bg-primary/20 -rotate-1 z-0 origin-left rounded-sm"
                />
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
                  className="absolute bottom-2 left-4 h-1 w-[80%] bg-primary/40 -rotate-2 z-0 origin-left rounded-full"
                />
              </span>
            </h1>
            <h6 className="text-lg md:text-2xl font-medium tracking-tight text-muted-foreground/80 mb-6 min-h-[1.2em]">
              <Typewriter sentences={typewriterSentences} />
            </h6>
            <p className="max-w-xl text-lg text-muted-foreground mb-10 leading-relaxed">
              I am a Design Engineer dedicated to crafting sophisticated digital
              ecosystems that bridge the gap between human intuition and machine
              intelligence. My work focuses on building high-performance,
              accessible, and human-centric products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary text-background hover:bg-primary/90 font-medium px-8 h-14 rounded-sm"
              >
                Check out my work <ArrowRight className="ml-2 w-4 h-4" />
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
                  alt="Paraj Bhatassana 3D Avatar"
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
                  className="absolute bottom-2 -right-0 md:-right-4 z-30 bg-[#1f2528]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[260px] hover:border-primary/50 transition-colors group"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors">
                      <img
                        src="/Photo_1771955679545 (1).jpg"
                        alt="Paraj Bhatassana"
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
                      Paraj Bhatassana
                    </p>
                    <p className="text-xs text-primary uppercase font-mono tracking-widest font-bold">
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
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center">
              <span className="text-primary font-mono text-2xl mr-4 font-normal">
                00.
              </span>
              The Architect Behind the Code
            </h2>
            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
          </div>

          <div className="relative z-10 bg-[#1f2528]/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32 group-hover:bg-primary/10 transition-colors duration-700"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-8 text-xl text-muted-foreground leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  I am <span className="text-white font-bold decoration-primary/30 decoration-4 underline-offset-4 underline">Paraj Bhatassana</span>, a Forward-Thinking <span className="text-white font-semibold">Full Stack Developer</span> and <span className="text-primary font-medium italic">AI Solutions Architect</span>. I don't just write code; I engineer digital ecosystems that are intuitive, scalable, and high-performing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1">
                      <Terminal size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Technical Precision</h4>
                      <p className="text-base">Deep mastery of Python & React, bridging backend complexity with pixel-perfect frontend experiences.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">AI Innovation</h4>
                      <p className="text-base">Pushing boundaries of Agentic AI and automated workflows for intelligent, self-evolving systems.</p>
                    </div>
                  </div>
                </div>
                <p>
                  My approach combines technical precision with a designer's eye, ensuring every product I build feels as good as it functions. I thrive at the intersection of innovation and execution, turning complex challenges into elegant, human-centric solutions.
                </p>
              </div>
              
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
                  <div className="text-primary font-mono text-4xl font-bold mb-2">5+</div>
                  <div className="text-sm uppercase tracking-widest font-bold text-white/70">Years of Code</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
                  <div className="text-primary font-mono text-4xl font-bold mb-2">50+</div>
                  <div className="text-sm uppercase tracking-widest font-bold text-white/70">Projects Delivered</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
                  <div className="text-primary font-mono text-4xl font-bold mb-2">12+</div>
                  <div className="text-sm uppercase tracking-widest font-bold text-white/70">AI Agents Built</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="text-primary font-mono text-xl mr-3 font-normal">
                01.
              </span>
              My Stack
            </h2>
            <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="px-6 md:px-12 max-w-7xl mx-auto  ">
              <h3 className="text-sm font-mono text-primary/60 uppercase tracking-widest">
                Technology
              </h3>
            </div>
            <MarqueeRow skills={techSkills} direction="left" />
          </div>

          <div>
            <div className="px-6 md:px-12 max-w-7xl mx-auto  ">
              <h3 className="text-sm font-mono text-primary/60 uppercase tracking-widest">
                AI & Productivity
              </h3>
            </div>
            <MarqueeRow skills={aiTools} direction="right" />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-24 px-6 md:px-12 max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">
              02.
            </span>
            Experience
          </h2>
          <div className="h-px bg-white/10 flex-grow"></div>
        </div>
        <div className="space-y-12">
          {[
            {
              company: "Tech Corp",
              role: "Senior Engineer",
              date: "2022 - Present",
            },
            {
              company: "Dev Agency",
              role: "Full Stack Developer",
              date: "2020 - 2022",
            },
          ].map((exp, i) => (
            <div key={i} className="relative pl-8 border-l border-primary/30">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_#19e6bd]" />
              <span className="text-primary font-mono text-sm">{exp.date}</span>
              <h3 className="text-xl font-bold text-white mt-1">
                {exp.role} @ {exp.company}
              </h3>
              <p className="text-muted-foreground mt-2">
                Leading development of modern web applications using React and
                Node.js.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">
              03.
            </span>
            Selected Work
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>

        <div className="space-y-32">
          {[1, 2].map((item) => (
            <div
              key={item}
              className={`flex flex-col ${item % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center group`}
            >
              <div className="w-full lg:w-3/5 aspect-video bg-[#1f2528] rounded-xl overflow-hidden border border-white/5 relative group-hover:border-primary/20 transition-all shadow-2xl">
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers className="w-20 h-20 text-primary/10 group-hover:text-primary/20 transition-colors" />
                </div>
              </div>

              <div
                className={`w-full lg:w-2/5 ${item % 2 === 0 ? "text-left" : "lg:text-right"}`}
              >
                <p className="text-primary font-mono text-sm mb-2">
                  Featured Project
                </p>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors">
                  Digital Innovation Platform {item}
                </h3>

                <div
                  className={`bg-[#1f2528] p-6 rounded-lg border border-white/5 shadow-xl mb-6 relative z-10 ${item % 2 === 0 ? "lg:-mr-20" : "lg:-ml-20"} backdrop-blur-sm`}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    A comprehensive full-stack solution built with Python and
                    React, enabling seamless data visualization and real-time
                    processing for enterprise clients.
                  </p>
                </div>

                <ul
                  className={`flex flex-wrap gap-4 font-mono text-xs text-muted-foreground mb-8 ${item % 2 === 0 ? "" : "lg:justify-end"}`}
                >
                  <li>React</li>
                  <li>FastAPI</li>
                  <li>PostgreSQL</li>
                  <li>Docker</li>
                </ul>

                <div
                  className={`flex gap-6 text-white ${item % 2 === 0 ? "" : "lg:justify-end"}`}
                >
                  <Github className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                  <ExternalLink className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
              <div className="bg-[#1f2528] p-6 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-white font-medium">
                    rahulpatel.code@gmail.com
                  </p>
                </div>
              </div>

              <div className="bg-[#1f2528] p-6 rounded-2xl flex items-center gap-4 border border-white/5">
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
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest  ">
                  Connect on Social
                </p>
                <div className="flex gap-4">
                  {[Linkedin, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1f2528]/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Your Name
                </label>
                <Input
                  placeholder="Paraj Bhatassana"
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-white placeholder:text-muted-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Email Address
                </label>
                <Input
                  placeholder="your@email.com"
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-white placeholder:text-muted-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your project..."
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all min-h-[120px] resize-none text-white placeholder:text-muted-foreground/30"
                />
                <p className="text-[10px] text-right text-muted-foreground/50 mt-1">
                  0/600 characters
                </p>
              </div>
              <Button className="w-full h-16 bg-primary text-background font-bold text-lg hover:bg-primary/90 rounded-2xl transition-transform active:scale-[0.98]">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-background font-bold font-mono text-xl">
                  C
                </div>
                <span className="font-mono font-semibold tracking-wider">
                  CODER<span className="text-primary">SCOTCH</span>
                </span>
              </div>
              <p className="text-muted-foreground max-w-sm mb-8">
                Crafting digital experiences that merge human creativity with
                artificial intelligence. Specialized in high-performance web
                solutions.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Instagram, Twitter, Github].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-widest">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-mono text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    01. Home
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="hover:text-primary transition-colors"
                  >
                    02. Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="hover:text-primary transition-colors"
                  >
                    03. Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-primary transition-colors"
                  >
                    04. Work
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
                  <a
                    href="#contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact Me
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:rahulpatel.code@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">
              © 2026 Designed & Built by <span className="text-primary shadow-[0_0_10px_rgba(25,230,189,0.5)]">Paraj Bhatassana</span>
            </p>
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
