import React from "react";
import { Link } from "wouter";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="py-20 bg-black/20 relative mt-20">
            <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-teal-400/20 via-blue-400/10 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-6 group">
                            <div className="bg-[#1f2528] text-primary rounded-lg w-8 h-8 flex items-center justify-center border border-white/10">
                                <Send size={16} />
                            </div>
                            <span className="text-xl flex items-center">
                                <span className="font-mono font-bold tracking-tighter text-white">
                                    BUILD
                                </span>
                                <span className="font-mono font-black tracking-tighter text-white bg-[#1f2528] px-1.5 py-0.5 rounded ms-1 border border-white/10">
                                    WITH<span className="text-primary">.</span><span className="text-primary">PAJJU</span>
                                </span>
                            </span>
                        </div>
                        <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
                            Backend Developer specializing in Python and Laravel. Building scalable systems and AI-powered automation solutions.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/paraj1305/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all liquid-mini"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:bhatasanaparaj@gmail.com"
                                className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all liquid-mini"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com/paraj1305"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-[#1f2528] border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all liquid-mini"
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
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><a href="/#skills" className="hover:text-primary transition-colors">Skills</a></li>
                            <li><a href="/#experience" className="hover:text-primary transition-colors">Experience</a></li>
                            <li><Link href="/projects" className="hover:text-primary transition-colors">Work</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-widest">
                            Connect
                        </h4>
                        <ul className="space-y-4 text-sm font-mono text-muted-foreground">
                            <li><a href="/#contact" className="hover:text-primary transition-colors">Contact Me</a></li>
                            <li><a href="mailto:parajbhatasanaparaj@gmail.com" className="hover:text-primary transition-colors">Email</a></li>
                            <li><a href="https://www.linkedin.com/in/paraj1305/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><button onClick={() => window.open("/resume.pdf", "_blank")} className="hover:text-primary transition-colors">Resume</button></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
                    <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">
                        © {new Date().getFullYear()} Designed & Built by{" "}
                        <span className="text-primary italic">Paraj Bhatasana</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
