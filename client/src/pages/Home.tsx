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
      className="relative flex-shrink-0 bg-white/5 border border-white/10 px-6 py-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all group min-w-[180px] cursor-default backdrop-blur-md"
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
            className="absolute bottom-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-64 p-4 bg-white/10 border border-primary/30 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[99999] pointer-events-none backdrop-blur-xl"
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 border-r border-b border-primary/30 rotate-45" />
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

    setTimeout(() => {
      const query = userMessage.toLowerCase();
      let botResponse = "That's an interesting question! I'm Paraj's AI assistant. He's a Full Stack Developer specializing in Python, React, and AI architecture.";

      if (query.includes("skill") || query.includes("stack") || query.includes("tech")) {
        botResponse = "Paraj has a robust tech stack! On the backend, he's an expert in Python (Django, FastAPI) and Laravel. For the frontend, he builds high-performance UIs with React and Tailwind CSS.";
      } else if (query.includes("ai") || query.includes("agent") || query.includes("automation")) {
        botResponse = "AI is at the core of Paraj's recent work. He builds Agentic AI systems, custom LLM integrations, and complex automation workflows using tools like n8n and Rettel AI.";
      } else if (query.includes("experience") || query.includes("work") || query.includes("history")) {
        botResponse = "Paraj has over 5 years of experience in the industry. He has delivered 50+ successful projects, ranging from enterprise-grade backends to sophisticated AI-driven platforms.";
      } else if (query.includes("contact") || query.includes("email") || query.includes("reach")) {
        botResponse = "You can reach Paraj directly via email at paraj.code@gmail.com.";
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
        botResponse = "Hello! 👋 I'm here to help you learn more about Paraj's work and expertise.";
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
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 bg-primary/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background font-bold">
                PB
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Paraj's AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] text-primary uppercase font-mono tracking-widest">Online</span>
                </div>
              </div>
            </div>

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

            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors pr-12"
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
          <div key={idx} className="relative">
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
      description: "Advanced scripting and automation with focus on clean, scalable code.",
    },
    {
      name: "Django",
      icon: Layers,
      description: "Building robust enterprise-grade backends with security and scalability.",
    },
    {
      name: "FastAPI",
      icon: Sparkles,
      description: "Creating high-performance modern APIs with asynchronous support.",
    },
    {
      name: "Laravel",
      icon: Code,
      description: "Elegant PHP development for complex web application architectures.",
    },
    {
      name: "PostgreSQL",
      icon: Code,
      description: "Relational database design and complex query optimization.",
    },
    {
      name: "MongoDB",
      icon: Code,
      description: "NoSQL data modeling for flexible and rapid application development.",
    },
  ];

  const aiTools = [
    {
      name: "Rettel AI",
      icon: Sparkles,
      description: "Leveraging generative AI for enhanced development workflows.",
    },
    {
      name: "n8n",
      icon: Layers,
      description: "Workflow automation and integration across diverse platforms.",
    },
    {
      name: "Replit",
      icon: Terminal,
      description: "Cloud-based collaborative development and rapid prototyping.",
    },
    {
      name: "Lovable",
      icon: Sparkles,
      description: "Building interactive UI components with AI-assisted design.",
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
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-background font-bold font-mono text-xl">
            P
          </div>
          <span className="font-mono font-semibold tracking-wider hidden sm:inline-block">
            DEVBY<span className="text-primary">PAJJU</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide">
          <a href="#skills" className="hover:text-primary transition-colors">01. Skills</a>
          <a href="#experience" className="hover:text-primary transition-colors">02. Experience</a>
          <a href="#projects" className="hover:text-primary transition-colors">03. Work</a>
          <a href="#contact" className="hover:text-primary transition-colors">04. Contact</a>
        </div>

        <Button
          variant="outline"
          className="liquid-button"
          onClick={() => window.open('/dummy-resume.pdf', '_blank')}
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
            <p className="text-primary font-mono text-sm md:text-base">Hi, my name is</p>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-2">
              <span className="relative inline-block py-2">
                Paraj Bhatassana
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
              I am a Design Engineer dedicated to crafting sophisticated digital
              ecosystems that bridge the gap between human intuition and machine
              intelligence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full"
              >
                <img src="/final.png" alt="3D Avatar" className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(25,230,189,0.3)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold text-white flex items-center">The Architect Behind the Code</h2>
            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
          </div>

          <div className="relative z-10 liquid-glass rounded-3xl p-8 md:p-12 overflow-hidden group">
            <div className="grid grid-cols-1 gap-12 items-start">
              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  I am <span className="text-white font-bold underline decoration-primary/30 decoration-4 underline-offset-4">Paraj Bhatassana</span>, a Forward-Thinking <span className="text-white font-semibold">Full Stack Developer</span> and <span className="text-primary font-medium italic">AI Solutions Architect</span>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1"><Terminal size={24} /></div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Technical Precision</h4>
                      <p className="text-base text-muted-foreground/80">Deep mastery of Python & React, bridging backend complexity with pixel-perfect frontend experiences.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1"><Sparkles size={24} /></div>
                    <div>
                      <h4 className="text-white font-bold mb-1">AI Innovation</h4>
                      <p className="text-base text-muted-foreground/80">Pushing boundaries of Agentic AI and automated workflows for intelligent systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-24">
          <h2 className="text-3xl font-bold text-white flex items-center">Work</h2>
          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
        </div>

        <div className="space-y-40">
          {[
            {
              title: "Digital Innovation Platform",
              role: "Design & Engineering",
              description: "A sophisticated enterprise-grade platform built with Python/Django and React.",
              tags: ["Python", "React", "PostgreSQL", "Docker"],
              image: "/final.png",
              link: "#",
            },
            {
              title: "AI Automation Ecosystem",
              role: "Lead Architect",
              description: "Custom-built Agentic AI architecture designed for seamless workflow automation.",
              tags: ["FastAPI", "n8n", "OpenAI", "Vector DB"],
              image: "/final.png",
              link: "#",
            },
          ].map((project, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={i}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group"
            >
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl liquid-glass transition-all duration-700">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <p className="font-mono text-primary text-sm tracking-widest uppercase">{project.role}</p>
                <h3 className="text-4xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="liquid-glass p-6 rounded-2xl relative z-10 -ml-0 lg:-ml-20 lg:group-even:-mr-20 lg:group-even:ml-0 shadow-xl">
                  <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-4 font-mono text-xs text-primary/70">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full border border-white/10">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white/5 backdrop-blur-md border-t border-white/10 relative z-10 shadow-[0_-8px_32px_0_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's build something <span className="text-primary italic">extraordinary</span>.</h2>
              <a href="mailto:paraj.code@gmail.com" className="text-xl md:text-2xl font-mono hover:text-primary transition-colors border-b border-primary/30 pb-2">paraj.code@gmail.com</a>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Connect</p>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-sm hover:text-primary transition-colors">LinkedIn</a>
                  <a href="#" className="text-sm hover:text-primary transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">
            <p>© 2026 PARAJ BHATASSANA. ALL RIGHTS RESERVED.</p>
            <p>BUILT WITH PRECISION & AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
