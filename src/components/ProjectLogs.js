"use client";

import { motion } from "framer-motion";
import { Key, Terminal, ShieldCheck } from "lucide-react";
import { projectsData } from "../data/portfolioData";

export default function ProjectLogs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 border-t border-white/5" id="projects">

      {/* Section Header */}
      <div className="mb-12 space-y-2">
        <div className="inline-block border border-neon-green/30 bg-neon-green/5 px-3 py-1 text-xs font-mono text-neon-green uppercase tracking-widest rounded-md">
          registry://project_logs
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          UNHOSTED_VISUAL_PROOF
        </h2>
        <p className="text-sm font-mono text-gray-500">// Terminal compilation archives. Direct inspection authorized.</p>
      </div>

      {/* Project Cards Grid — same layout as SecurityVault */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative rounded-2xl border-2 ${project.borderColorClass} bg-black/60 p-6 overflow-hidden flex flex-col justify-between h-72 crt-overlay group shadow-[0_0_20px_rgba(0,0,0,0.8)]`}
            style={{
              boxShadow: `inset 0 0 20px ${project.themeColor}`,
            }}
          >
            {/* Holographic scanning laser line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 w-full h-[2.5px] z-20 pointer-events-none"
              style={{
                background: project.themeColor.replace("0.4", "1"),
                boxShadow: `0 0 12px 2px ${project.themeColor.replace("0.4", "1")}`,
              }}
            />

            {/* Top Security Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
              <div className="flex items-center gap-1 text-[10px] font-mono text-white/50">
                <Key className="h-3 w-3 text-white/40" />
                <span>HASH_ID: {project.id.toUpperCase()}</span>
              </div>

              {/* Flashing Status Beacon */}
              <div className="flex items-center gap-1.5 bg-neon-green/10 border border-neon-green/30 px-2 py-0.5 rounded-full font-mono text-[9px] text-neon-green">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-green"></span>
                </span>
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Project Information Body */}
            <div className="space-y-3 my-4 z-10">
              <div className={`font-mono text-[10px] font-bold ${project.textColorClass} tracking-widest uppercase`}>
                // COMPILED_PROJECT_MODULE
              </div>
              <h3 className="text-lg font-black text-white font-mono leading-tight tracking-wide group-hover:text-white/95 transition-colors">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-gray-400">
                STACK // {project.techStack.slice(0, 3).join(" · ")}
              </p>
            </div>

            {/* Action Command Line Link */}
            <div className="pt-3 border-t border-white/10 z-10">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between font-mono text-[11px] font-bold hover:underline transition-colors ${project.textColorClass}`}
              >
                <span>Explore Source Code</span>
                <span className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  [ ↗ ]
                </span>
              </a>
            </div>

            {/* Micro Dot Matrix Grid inside Card */}
            <div className="absolute inset-0 bg-grid-mesh opacity-10 pointer-events-none z-0" />
          </motion.div>
        ))}
      </div>

      {/* Diagnostic Summary Block */}
      <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-neon-green animate-pulse" />
          <span>PROJECT_LOG INTEGRITY: VERIFIED. ALL MODULES COMPILED AND REGISTERED IN SOURCE CONTROL.</span>
        </div>
        <span className="text-neon-cyan/70 shrink-0">BUILD_STATUS: OK</span>
      </div>

    </section>
  );
}
