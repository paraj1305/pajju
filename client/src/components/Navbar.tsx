import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Send } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
    const [location] = useLocation();
    
    const isHome = location === "/";

    const navLinks = [
        { name: "Home", href: "/", type: "link" },
        { name: "About", href: isHome ? "#about" : "/#about", type: "anchor" },
        { name: "Skills", href: isHome ? "#skills" : "/#skills", type: "anchor" },
        { name: "Experience", href: isHome ? "#experience" : "/#experience", type: "anchor" },
        { name: "Work", href: "/projects", type: "link" },
        { name: "Blog", href: "/blog", type: "link" },
        { name: "Contact", href: isHome ? "#contact" : "/#contact", type: "anchor" },
    ];

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 md:px-12 liquid-glass rounded-[2rem] shadow-xl border border-white/10 mx-auto max-w-7xl">
            <Link href="/">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-[#1f2528] text-primary rounded-lg w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-all">
                        <Send size={16} />
                    </div>
                    <span className="text-xl md:text-2xl flex items-center">
                        <span className="font-mono font-bold tracking-tighter text-white group-hover:text-primary transition-colors">
                            BUILD
                        </span>
                        <span className="font-mono font-black tracking-tighter text-white bg-[#1f2528] px-2 py-0.5 rounded ms-1 border border-white/10 transition-colors group-hover:text-primary group-hover:border-primary/50">
                            WITH<span className="text-primary">.</span><span className="text-primary">PAJJU</span>
                        </span>
                    </span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-mono tracking-wide">
                {navLinks.map((link) => (
                    link.type === "link" ? (
                        <Link 
                            key={link.name}
                            href={link.href} 
                            className={`${location === link.href ? "text-primary" : "text-white hover:text-primary"} transition-colors`}
                        >
                            {link.name}
                        </Link>
                    ) : (
                        <a 
                            key={link.name}
                            href={link.href} 
                            className="text-white hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    )
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    className="hidden sm:flex border-primary text-primary hover:bg-primary/10 font-mono text-xs"
                    onClick={() => window.open("/resume.pdf", "_blank")}
                >
                    Resume
                </Button>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-[#0d1012]/95 border-l border-white/10 backdrop-blur-xl">
                            <SheetHeader className="mb-8">
                                <SheetTitle className="text-left">
                                    <span className="font-mono font-bold tracking-tighter text-white">
                                        build.
                                    </span>
                                    <span className="font-mono font-black tracking-tighter text-primary px-1.5 py-0.5 bg-white/5 border border-primary/20 rounded ml-1">
                                        withPAJJU
                                    </span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 font-mono">
                                {navLinks.map((link) => (
                                    link.type === "link" ? (
                                        <Link 
                                            key={link.name}
                                            href={link.href} 
                                            className={`text-lg ${location === link.href ? "text-primary" : "text-white hover:text-primary"} transition-colors`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a 
                                            key={link.name}
                                            href={link.href} 
                                            className="text-lg text-white hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}
                                <Button
                                    variant="outline"
                                    className="mt-4 border-primary text-primary hover:bg-primary/10 font-mono w-full"
                                    onClick={() => window.open("/resume.pdf", "_blank")}
                                >
                                    Download Resume
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};
