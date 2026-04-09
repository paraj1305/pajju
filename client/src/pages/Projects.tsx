import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";

// Project Image Slider Component
const ProjectImageSlider = ({ 
  images, 
  title, 
  onIndexChange,
  currentIndex 
}: { 
  images: string[]; 
  title: string;
  onIndexChange: (index: number) => void;
  currentIndex: number;
}) => {
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      onIndexChange((currentIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex, onIndexChange]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange((currentIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/slider">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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
                  onIndexChange(i);
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

const ProjectCard = ({ project, idx }: { project: any, idx: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center group`}
    >
      {/* Image Column */}
      <div className="w-full lg:w-3/5">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-[#1f2528] border border-white/5 shadow-2xl group-hover:border-primary/20 transition-all duration-700">
          <ProjectImageSlider 
            images={project.slides.map((s: any) => s.image)} 
            title={project.title} 
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
          />
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 border-[12px] border-white/5 rounded-3xl pointer-events-none" />
        </div>
      </div>

      {/* Content Column */}
      <div className="w-full lg:w-2/5 space-y-6">
        <div>
          <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-3 font-bold">
            {project.category}
          </p>
          <h3 className="text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">
            {project.title}
          </h3>
        </div>

        <div className="min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-xl text-muted-foreground leading-relaxed font-light"
            >
              {project.slides[currentIndex].description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.tech.map((t: string, i: number) => (
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
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white font-bold group/link hover:text-primary transition-colors"
          >
            View Live Project{" "}
            <ArrowRight
              size={18}
              className="group-hover/link:translate-x-2 transition-transform"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: "ModRemit Remittance System",
      category: "FinTech • Global Payments",
      tech: ["Laravel", "PHP", "MySQL", "Stripe", "Sumsub KYC"],
      link: "https://modremit.coderscotch.com/",
      slides: [
        {
          image: "modremit/m1.png",
          description: "ModRemit platform for transferring money worldwide with real-time exchange rates."
        },
        {
          image: "modremit/m2.png",
          description: "Admin dashboard to track platform volume, earnings, customers, agents, and commissions."
        },
        {
          image: "modremit/m3.png",
          description: "Admin dashboard charts for easy data visualization and insights."
        },
        {
          image: "modremit/m4.png",
          description: "Agent dashboard showing total transfers, commissions earned, wallet balance, and summary."
        },
        {
          image: "modremit/m5.png",
          description: "Agent-side money transfer flow with live quotes, beneficiary addition, and secure payment."
        },
        {
          image: "modremit/m6.png",
          description: "Wallet module to view transaction history and manage wallet top-ups."
        },
        {
          image: "modremit/m10.png",
          description: "Live money tracking interface for monitoring transfer status."
        },
        {
          image: "modremit/m11.png",
          description: "Detailed transaction receipt with complete payment information."
        }
      ]
    },
    {
      title: "Travixa Smart Travel Solution",
      category: "Business Automation • Travel",
      tech: ["FastAPI", "Python", "PostgreSQL", "WhatsApp API", "VectorDB"],
      link: "http://tourbookingaiagent.coderscotch.com/",
      slides: [
        {
          image: "travixa/t11.png",
          description: "Company dashboard to track tour bookings and overall earnings."
        },
        {
          image: "travixa/t1.png",
          description: "Overview dashboard displaying key business insights and performance metrics."
        },
        {
          image: "travixa/t2.png",
          description: "Tour packages list where the company can create, edit, delete, and manage packages."
        },
        {
          image: "travixa/t3.png",
          description: "Each tour includes a dedicated calendar to check availability and manage bookings."
        },
        {
          image: "travixa/t4.png",
          description: "Driver management module to handle driver details and assignments."
        },
        {
          image: "travixa/t5.png",
          description: "Revenue overview with detailed reports and analytics."
        },
        {
          image: "travixa/t6.png",
          description: "Booking list with guest details, booking dates, and easy driver and vehicle assignment."
        },
        {
          image: "travixa/t7.png",
          description: "Vehicle management module to manage fleet and availability."
        }
      ]
    },
    {
      title: "CoderScotch CRM",
      category: "CRM • Enterprise",
      tech: ["Python", "Django", "MySQL", "Tailwind CSS"],
      link: "https://pycrm.coderscotch.com/superadmin/login/",
      slides: [
        {
          image: "pycrm/c2.png",
          description: "Admin dashboard displaying revenue, profit, and expense data with key insights."
        },
        {
          image: "pycrm/c3.png",
          description: "Project details view with status, priority, and deadlines."
        },
        {
          image: "pycrm/c4.png",
          description: "Task board with multiple boards for organizing and managing task groups."
        },
        {
          image: "pycrm/c5.png",
          description: "Google Calendar integration for syncing tasks and project schedules."
        }
      ]
    },
    {
      title: "Pooten Order Management",
      category: "Logistics • Supply Chain",
      tech: ["Laravel", "MySQL", "php"],
      link: "https://oms.pooten.co.uk/",
      slides: [
        {
          image: "pooten/p1.png",
          description: "Admin dashboard to track total orders and monitor overall operations."
        },
        { 
          image: "pooten/p2.png",
          description: "Pickup sheet for office staff to assign orders to drivers."  
        },
        { 
          image: "pooten/p3.png",
          description: "Order details view including collection address and customer information."  
        },
        { 
          image: "pooten/p4.png",
          description: "Order box details where each box has its own tracking system."  
        },
        { 
          image: "pooten/p5.png",
          description: "Driver pickup sheet for collecting and delivering orders."  
        },
        { 
          image: "pooten/p6.png",
          description: "Order tracking page to monitor real-time order status."  
        },
        { 
          image: "pooten/p7.png",
          description: "Driver panel for viewing and managing assigned orders."  
        }        
      ]
    },
    // {
    //   title: "OCR Document Scanner",
    //   category: "AI • Document Processing",
    //   tech: ["Python", "Tesseract", "OpenCV", "FastAPI"],
    //   link: "#",
    //   slides: [
    //     {
    //       image: "https://images.unsplash.com/photo-1568027762272-e4da88384feb?auto=format&fit=crop&q=80&w=1600",
    //       description: "High-precision text extraction system for digitizing physical documents and automating complex data entry workflows."
    //     }
    //   ]
    // }
  ];

  return (
    <div className="pt-32 md:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-20">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
                All <span className="text-primary italic">Projects</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                A collection of my work in backend engineering, AI systems, and automation solutions.
            </p>
        </motion.div>
      </div>

      {/* Projects List */}
      <section className="py-20">
        <div className="space-y-24 md:space-y-40">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
