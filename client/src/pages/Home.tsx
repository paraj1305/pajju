import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Terminal, Github, Twitter, Linkedin, ExternalLink, Mail, MapPin, Send, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
          <a href="#skills" className="hover:text-primary transition-colors">01. Skills</a>
          <a href="#experience" className="hover:text-primary transition-colors">02. Experience</a>
          <a href="#projects" className="hover:text-primary transition-colors">03. Work</a>
          <a href="#contact" className="hover:text-primary transition-colors">04. Contact</a>
        </div>
        
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-mono text-xs">
          Resume
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-mono mb-4 text-sm md:text-base">Hi, my name is</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-2">
            Rahul Patel.
          </h1>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-muted-foreground mb-6">
            I build things for the web.
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
            I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-background hover:bg-primary/90 font-medium px-8 h-14 rounded-sm">
              Check out my work <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">01.</span>
            My Skills
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'PostgreSQL', 'Docker', 'AWS'].map((skill) => (
            <div key={skill} className="bg-card/50 border border-white/5 p-6 rounded-lg hover:border-primary/50 transition-all group">
              <Code className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-mono text-white">{skill}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">02.</span>
            Experience
          </h2>
          <div className="h-px bg-white/10 flex-grow"></div>
        </div>
        <div className="space-y-12">
          {[
            { company: 'Tech Corp', role: 'Senior Engineer', date: '2022 - Present' },
            { company: 'Dev Agency', role: 'Full Stack Developer', date: '2020 - 2022' }
          ].map((exp, i) => (
            <div key={i} className="relative pl-8 border-l border-primary/30">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_#19e6bd]" />
              <span className="text-primary font-mono text-sm">{exp.date}</span>
              <h3 className="text-xl font-bold text-white mt-1">{exp.role} @ {exp.company}</h3>
              <p className="text-muted-foreground mt-2">Leading development of modern web applications using React and Node.js.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">03.</span>
            Selected Works
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-card border border-white/5 rounded-xl p-6 group hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start mb-6">
                <Terminal className="text-primary w-10 h-10" />
                <div className="flex gap-4 text-muted-foreground">
                  <Github className="w-5 h-5 hover:text-primary cursor-pointer" />
                  <ExternalLink className="w-5 h-5 hover:text-primary cursor-pointer" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Project Name {item}</h3>
              <p className="text-muted-foreground text-sm mb-4">A high-performance web application built with the latest technologies.</p>
              <div className="flex gap-3 text-xs font-mono text-primary/80">
                <span>React</span>
                <span>Tailwind</span>
                <span>Node</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Replicating Reference Image Style */}
      <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Let's Connect</h2>
            <p className="text-muted-foreground text-lg mb-12">Open for projects, collaborations, and opportunities</p>
            
            <div className="space-y-6">
              <div className="bg-[#1f2528] p-6 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Email</p>
                  <p className="text-white font-medium">rahulpatel.code@gmail.com</p>
                </div>
              </div>
              
              <div className="bg-[#1f2528] p-6 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Location</p>
                  <p className="text-white font-medium">Ahmedabad, Gujarat - India</p>
                </div>
              </div>
              
              <div className="pt-8">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Connect on Social</p>
                <div className="flex gap-4">
                  {[Linkedin, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-pointer">
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#1f2528]/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Your Name</label>
                <Input placeholder="Rahul Patel" className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-white placeholder:text-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Email Address</label>
                <Input placeholder="your@email.com" className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-white placeholder:text-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Message</label>
                <Textarea placeholder="Tell me about your project..." className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all min-h-[120px] resize-none text-white placeholder:text-muted-foreground/30" />
                <p className="text-[10px] text-right text-muted-foreground/50 mt-1">0/600 characters</p>
              </div>
              <Button className="w-full h-16 bg-primary text-background font-bold text-lg hover:bg-primary/90 rounded-2xl transition-transform active:scale-[0.98]">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-muted-foreground font-mono text-sm">© 2026 Designed & Built by Rahul Patel</p>
      </footer>
    </div>
  );
};

export default Home;