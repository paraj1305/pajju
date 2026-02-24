import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Terminal, Zap, Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen text-foreground selection:bg-primary/30 selection:text-primary">
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
          <a href="#about" className="hover:text-primary transition-colors">01. About</a>
          <a href="#projects" className="hover:text-primary transition-colors">02. Work</a>
          <a href="#experience" className="hover:text-primary transition-colors">03. Experience</a>
          <a href="#contact" className="hover:text-primary transition-colors">04. Contact</a>
        </div>
        
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-mono text-xs">
          Resume
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-primary font-mono mb-4 text-sm md:text-base">Hi, my name is</p>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-2"
        >
          John Doe.
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-muted-foreground mb-6"
        >
          I build things for the web.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap gap-4"
        >
          <Button size="lg" className="bg-primary text-background hover:bg-primary/90 font-medium px-8 h-14 text-base rounded-sm">
            Check out my work <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/10 hover:border-primary/50 hover:bg-primary/5 font-medium px-8 h-14 text-base rounded-sm">
            Contact me
          </Button>
        </motion.div>
      </main>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">02.</span>
            Some Things I've Built
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs ml-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -5 }}
              className="bg-card border border-white/5 rounded-lg p-6 flex flex-col h-full group"
            >
              <div className="flex justify-between items-center mb-6">
                <Terminal className="text-primary w-10 h-10" />
                <div className="flex gap-3 text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-primary transition-colors"><ExternalLink className="w-5 h-5" /></a>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                Project Name {item}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                A minimal, dark-themed portfolio template built with React, Vite, and Tailwind CSS. Features a dynamic canvas particle background and smooth animations.
              </p>
              <ul className="flex flex-wrap gap-3 font-mono text-xs text-muted-foreground mt-auto">
                <li>React</li>
                <li>Tailwind</li>
                <li>Framer Motion</li>
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm font-mono text-muted-foreground flex flex-col items-center justify-center">
        <div className="flex gap-6 mb-6">
          <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
        <p className="hover:text-primary transition-colors cursor-pointer">
          Built with <span className="text-primary">React</span> & <span className="text-primary">Tailwind</span>
        </p>
      </footer>
    </div>
  );
};

export default Home;