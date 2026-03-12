import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    const [location] = useLocation();
    
    const isHome = location === "/";

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 md:px-12 liquid-glass rounded-[2rem] shadow-xl border border-white/10 mx-auto max-w-7xl">
            <Link href="/">
                <div className="flex items-center group cursor-pointer">
                    <span className="text-xl md:text-2xl flex items-center">
                        <span className="font-mono font-bold tracking-tighter text-white group-hover:text-primary transition-colors">
                            build.
                        </span>
                        <span className="font-mono font-black tracking-tighter text-primary group-hover:text-white transition-colors bg-white/5 px-2 py-0.5 rounded-lg border border-primary/20">
                            withPAJJU
                        </span>
                    </span>
                </div>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide">
                <Link href="/" className={`${location === "/" ? "text-primary" : "text-white hover:text-primary"} transition-colors`}>
                    Home
                </Link>
                <a href={isHome ? "#about" : "/#about"} className="text-white hover:text-primary transition-colors">
                    About
                </a>
                <a href={isHome ? "#skills" : "/#skills"} className="text-white hover:text-primary transition-colors">
                    Skills
                </a>
                <a href={isHome ? "#experience" : "/#experience"} className="text-white hover:text-primary transition-colors">
                    Experience
                </a>
                <Link href="/projects" className={`${location === "/projects" ? "text-primary" : "text-white hover:text-primary"} transition-colors`}>
                    Work
                </Link>
                <Link href="/blog" className={`${location === "/blog" ? "text-primary" : "text-white hover:text-primary"} transition-colors`}>
                    Blog
                </Link>
                <a href={isHome ? "#contact" : "/#contact"} className="text-white hover:text-primary transition-colors">
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
    );
};
