"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Terminal, GitBranch, ShieldAlert } from "lucide-react";

export default function SystemAccordions() {
  const [openIndex, setOpenIndex] = useState(0);

  const accordionItems = [
    {
      index: "01",
      title: "PROFILE_PHILOSOPHY // ABOUT ME",
      icon: <Terminal className="h-4 w-4 text-neon-purple" />,
      content: (
        <div className="space-y-4 font-mono text-xs md:text-sm text-gray-400">
          <p>
            I am a Software Engineer focused on constructing robust, deterministic system architectures. I operate at the intersection of native mobile applications and low-latency web environments, prioritizing resource safety, UI responsiveness, and Clean Architecture standards.
          </p>
          <p>
            My approach is rooted in the belief that software should be built like physical infrastructure: resilient, well-documented, and capable of operating under heavy stress parameters without degradation.
          </p>
        </div>
      )
    },
    {
      index: "02",
      title: "PIPELINE_SYSTEMS // CORE PRACTICES",
      icon: <GitBranch className="h-4 w-4 text-neon-green" />,
      content: (
        <div className="space-y-4 font-mono text-xs md:text-sm text-gray-400">
          <p>
            I maintain zero-compromise engineering pipelines to guarantee product stability:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>
              <strong className="text-white">Strict Layout Breakpoints:</strong> Every UI module undergoes layout testing against standard viewports.
            </li>
            <li>
              <strong className="text-white">Memory Profiling:</strong> Routine memory leak evaluations on Android SDK runtimes using LeakCanary and Android Profiler.
            </li>
            <li>
              <strong className="text-white">Continuous Verification:</strong> Fully automated testing pipelines compiling production assets on git triggers.
            </li>
          </ul>
        </div>
      )
    },
    {
      index: "03",
      title: "LEGAL_ARCHIVES // LICENSING & SYSTEM REGS",
      icon: <ShieldAlert className="h-4 w-4 text-neon-yellow" />,
      content: (
        <div className="space-y-4 font-mono text-xs md:text-sm text-gray-400">
          <p>
            This portfolio is initialized as a secure terminal simulation. All rights, software blueprints, code segments, and verification hashes are protected under the MIT License framework.
          </p>
          <p>
            Unauthorized override attempts or memory tampering of verified secure endpoints will be flagged by our logging systems. Access credentials are encrypted on client request.
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 border-t border-white/5" id="about">
      
      {/* Title */}
      <div className="mb-10 space-y-2 text-center md:text-left">
        <div className="inline-block border border-neon-yellow/30 bg-neon-yellow/5 px-3 py-1 text-xs font-mono text-neon-yellow uppercase tracking-widest rounded-md">
          registry://system_accordions
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          SYSTEM_PHILOSOPHY_QUERY
        </h2>
        <p className="text-sm font-mono text-gray-500">// Inspecting core structural philosophy and software runtime principles.</p>
      </div>

      {/* Accordions Stack */}
      <div className="space-y-4 font-mono">
        {accordionItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={item.index}
              className="rounded-xl border border-white/10 bg-black/40 overflow-hidden shadow-[2px_2px_10px_rgba(0,0,0,0.5)] transition-colors hover:border-white/20"
            >
              {/* Header Trigger */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="cursor-pointer w-full flex items-center justify-between p-5 text-left text-white"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-xs text-gray-500 font-bold">{item.index}</span>
                  {item.icon}
                  <span className="text-xs sm:text-sm font-black tracking-wider">{item.title}</span>
                </div>
                
                {/* Rotating Icon (Plus rotates by 135 degrees when active to form an 'x') */}
                <motion.div
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="p-1 rounded-md border border-white/15 bg-white/[0.02] text-gray-400 group-hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
              </button>

              {/* Content Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    <div className="px-5 pb-6 pt-2 border-t border-white/5 bg-white/[0.01]">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Base Meta Label Footer */}
      <footer className="mt-20 border-t border-white/10 pt-10 pb-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
        <div>
          © {new Date().getFullYear()} SAYAN MUKHERJEE // PORTFOLIO. ALL SPECIFICATION STANDARDS MET.
        </div>
        <div className="text-neon-purple/50 tracking-widest font-black animate-pulse">
          // END_OF_TRANSMISSION
        </div>
      </footer>

    </section>
  );
}
