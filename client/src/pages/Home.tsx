import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Terminal, Github, Twitter, Linkedin, ExternalLink, Mail, MapPin, Send, Instagram, Youtube, Sparkles, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Home = () => {
  const techSkills = ['Python', 'Django', 'FastAPI', 'Laravel', 'PostgreSQL', 'MongoDB'];
  const aiTools = ['Rettel AI', 'n8n', 'Replit', 'Lovable'];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technology Skills */}
          <div>
            <h3 className="text-xl font-mono text-primary mb-8 flex items-center gap-2">
              <Code className="w-5 h-5" /> Technology
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {techSkills.map((skill) => (
                <div key={skill} className="bg-card/30 border border-white/5 p-4 rounded-lg hover:border-primary/50 transition-all flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <span className="font-mono text-sm text-white/80">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-xl font-mono text-primary mb-8 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> AI & Productivity Tools
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {aiTools.map((tool) => (
                <div key={tool} className="bg-card/30 border border-white/5 p-4 rounded-lg hover:border-primary/50 transition-all flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <span className="font-mono text-sm text-white/80">{tool}</span>
                </div>
              ))}
            </div>
          </div>
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

      {/* Work Section - Improved Design */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="text-primary font-mono text-xl mr-3 font-normal">03.</span>
            Selected Work
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>
        
        <div className="space-y-32">
          {[1, 2].map((item) => (
            <div key={item} className={`flex flex-col ${item % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center group`}>
              {/* Project Image Placeholder / Visual */}
              <div className="w-full lg:w-3/5 aspect-video bg-[#1f2528] rounded-xl overflow-hidden border border-white/5 relative group-hover:border-primary/20 transition-all shadow-2xl">
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Layers className="w-20 h-20 text-primary/10 group-hover:text-primary/20 transition-colors" />
                </div>
              </div>

              {/* Project Info */}
              <div className={`w-full lg:w-2/5 ${item % 2 === 0 ? 'text-left' : 'lg:text-right'}`}>
                <p className="text-primary font-mono text-sm mb-2">Featured Project</p>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors">Digital Innovation Platform {item}</h3>
                
                <div className={`bg-[#1f2528] p-6 rounded-lg border border-white/5 shadow-xl mb-6 relative z-10 ${item % 2 === 0 ? 'lg:-mr-20' : 'lg:-ml-20'} backdrop-blur-sm`}>
                  <p className="text-muted-foreground leading-relaxed">
                    A comprehensive full-stack solution built with Python and React, enabling seamless data visualization and real-time processing for enterprise clients.
                  </p>
                </div>
                
                <ul className={`flex flex-wrap gap-4 font-mono text-xs text-muted-foreground mb-8 ${item % 2 === 0 ? '' : 'lg:justify-end'}`}>
                  <li>React</li>
                  <li>FastAPI</li>
                  <li>PostgreSQL</li>
                  <li>Docker</li>
                </ul>
                
                <div className={`flex gap-6 text-white ${item % 2 === 0 ? '' : 'lg:justify-end'}`}>
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