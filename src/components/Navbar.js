"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Stack", href: "#stack" },
    { name: "Credentials", href: "#credentials" },
    { name: "About", href: "#about" }
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 md:px-8">
      {/* Outer Sketchy container: White background, dot matrix, heavy black borders */}
      <div className="mx-auto max-w-7xl rounded-[20px_4px_15px_5px] border-4 border-black bg-white bg-dot-matrix-light shadow-brutal transition-all duration-300 hover:shadow-[7px_7px_0px_0px_#000000] text-black">
        <div className="flex h-16 items-center justify-between px-6">
          
          {/* Logo / Terminal Tag */}
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, "#")}
            className="font-mono text-xl font-black tracking-tighter hover:scale-105 transition-transform"
          >
            DEV_PORTFOLIO://
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono font-bold text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="group relative py-1 px-2 text-black transition-colors"
              >
                <span>{link.name}</span>
                {/* Hand-drawn marker pen indicator underline */}
                <span className="absolute bottom-0 left-0 h-[6px] w-full origin-left scale-x-0 rounded-[20px_5px_15px_3px] bg-neon-purple/75 transition-transform duration-300 ease-out group-hover:scale-x-100 rotate-[-1deg]" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={(e) => {
                const element = document.querySelector("#about");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer font-mono font-black text-sm text-white bg-black border-2 border-black rounded-[5px_12px_4px_10px] px-5 py-2 hover:bg-neon-purple hover:text-black transition-all active:translate-y-[2px] active:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
            >
              Say Hello_
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-md hover:bg-black/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Sketchy Container) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 mx-auto max-w-7xl rounded-[10px_20px_6px_15px] border-4 border-black bg-white bg-dot-matrix-light p-6 text-black shadow-brutal font-mono"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="group relative py-2 text-lg font-bold w-fit"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-0 h-[6px] w-full origin-left scale-x-0 rounded-[20px_5px_15px_3px] bg-neon-purple/70 transition-transform duration-300 ease-out group-hover:scale-x-100 rotate-[-1deg]" />
                </a>
              ))}
              <button
                onClick={(e) => {
                  setIsOpen(false);
                  const element = document.querySelector("#about");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-2 w-full text-center cursor-pointer font-black text-white bg-black border-2 border-black rounded-[5px_15px_4px_12px] py-3 active:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-neon-purple hover:text-black transition-all"
              >
                Say Hello_
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
