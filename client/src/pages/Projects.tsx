import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";

// Project Image Slider Component (Consistent with Home)
const ProjectImageSlider = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
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

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: "AI Chatbot Systems",
      category: "AI • Backend",
      description: "Developing intelligent conversational agents with custom knowledge integration and seamless backend processing.",
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
      description: "Business-focused automation solution for WhatsApp, handling queries, bookings, and customer interactions autonomously.",
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
      description: "Robust API-first infrastructures built with Laravel and the Repository Pattern for maximum maintainability and performance.",
      images: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1518433278981-11271f4a53ed?auto=format&fit=crop&q=80&w=1600"
      ],
      tech: ["Laravel", "PHP", "MySQL", "Git"],
      link: "#",
    },
    {
        title: "E-commerce Engine",
        category: "Full Stack • Fintech",
        description: "A high-performance e-commerce backend with complex inventory management and payment gateway integrations.",
        images: ["https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1600"],
        tech: ["Laravel", "Stripe", "PostgreSQL", "Vue.js"],
        link: "#",
    },
    {
        title: "Data Analytics Dashboard",
        category: "Data Visualization",
        description: "Real-time analytics platform for monitoring server performance and user engagement metrics.",
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"],
        tech: ["React", "Python", "D3.js", "FastAPI"],
        link: "#",
    }
  ];

  return (
    <div className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-20">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                All <span className="text-primary italic">Projects</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                A collection of my work in backend engineering, AI systems, and automation solutions.
            </p>
        </motion.div>
      </div>

      {/* Projects List */}
      <section className="py-20">
        <div className="space-y-40">
          {projects.map((project, idx) => (
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
                  <div className="absolute inset-0 border-[12px] border-white/5 rounded-3xl pointer-events-none" />
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div>
                  <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-3 text-bold">
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
                    View Details{" "}
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
    </div>
  );
};

export default Projects;
