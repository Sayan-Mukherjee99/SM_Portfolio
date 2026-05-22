"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// SVGs inline for absolute safety and build-correctness
const GithubIcon = () => (
  <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={cn("size-4 shrink-0 transition-transform duration-200", className)} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const contactLinks = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/Sayan-Mukherjee99',
    icon: GithubIcon,
    color: 'hover:bg-[#9BF6FF]/20',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: '#', // placeholder, user will provide later
    icon: LinkedinIcon,
    color: 'hover:bg-[#FF90E8]/20',
  }
];

export default function AssigneeDropdown({ align = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button - Always displays "Contact Me" and never changes its logo/text */}
      <motion.button
        whileHover={{ y: -2, x: -2 }}
        whileTap={{ y: 0, x: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-2 border-2 border-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider bg-[#A388EE] text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none transition-all cursor-pointer h-11"
        )}
      >
        <span className="text-xs uppercase">Contact Me</span>
        <ChevronDownIcon className={cn(isOpen && "rotate-180")} />
      </motion.button>

      {/* Dropdown Menu Panel with GitHub and LinkedIn options only */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute mt-2 w-[180px] rounded-lg border-2 border-black bg-[#FDFBF7] shadow-[4px_4px_0px_0px_#000] z-50 text-black overflow-hidden font-mono text-xs",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {/* Dropdown Header */}
            <div className="px-3 py-2 text-[10px] font-bold text-gray-500 bg-zinc-100/80 border-b-2 border-black uppercase tracking-wider">
              Social Links
            </div>

            {/* Links List */}
            <div className="flex flex-col">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-zinc-200 last:border-b-0 transition-colors font-bold text-black",
                      link.color
                    )}
                  >
                    <Icon />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
