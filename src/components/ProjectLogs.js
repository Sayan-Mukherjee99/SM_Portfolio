"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
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

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="flex flex-col rounded-2xl border-4 border-black bg-[#0c0b11] overflow-hidden shadow-[5px_5px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[5px_5px_0px_0px_var(--neon-green)] hover:border-neon-green/20 transition-all duration-300 group"
          >
            {/* Visual Display Zone */}
            <div className="relative h-60 w-full bg-black/80 flex items-center justify-center overflow-hidden border-b-4 border-black">
              {/* Scanlines layer */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
              
              {/* Fallback visual if GIF/image path fails */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 font-mono text-[10px] text-gray-600 bg-grid-mesh">
                <div className="flex justify-between items-center text-neon-green/40">
                  <span>DISP://CRT_004</span>
                  <span>PREVIEW_LOCK // OFF</span>
                </div>
                
                {/* Visual Graphic Representation */}
                <div className="flex flex-col items-center gap-2 my-auto">
                  <Terminal className="h-10 w-10 text-white/10 group-hover:text-neon-green/20 transition-colors" />
                  <span className="text-[11px] text-white/20 group-hover:text-neon-green/40 tracking-widest">{project.title.toUpperCase()}</span>
                  <span className="text-[9px] text-white/10 bg-white/[0.02] px-2 py-0.5 rounded border border-white/5">SRC_LINK_VERIFIED</span>
                </div>

                <div className="flex justify-between items-center text-white/20">
                  <span>RESOLVING: {project.techStack.slice(0,2).join(" | ")}</span>
                  <span>SYS_ID: {project.id}</span>
                </div>
              </div>

              {/* Real Image or GIF if loaded (with error handler fallback) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imagePath}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen group-hover:scale-102 group-hover:opacity-100 transition-all duration-500 z-0"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              
              {/* Neon scanner laser */}
              <div className="absolute left-0 w-full h-[2px] bg-neon-green shadow-[0_0_10px_#39ff14] opacity-20 animate-laser pointer-events-none" />
            </div>

            {/* Information Text Panel */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-black text-white tracking-wide group-hover:text-neon-green transition-colors">{project.title}</h3>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 border border-white/10 bg-white/[0.03] text-gray-400 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-400 font-mono leading-relaxed">
                  {project.description}
                </p>

                {/* Highlighted Technical Challenge Panel */}
                <div className="p-4 border border-l-4 border-white/10 border-l-neon-green bg-white/[0.01] rounded-r-lg font-mono space-y-1">
                  <div className="text-[10px] font-bold text-neon-green uppercase tracking-wider">
                    // RESOLVED TECHNICAL CONFLICT:
                  </div>
                  <p className="text-xs text-gray-300 italic leading-snug">
                    "{project.technicalChallenge}"
                  </p>
                </div>
              </div>

              {/* Action Enclosures */}
              <div className="pt-2 font-mono text-xs">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-white/20 bg-white/[0.02] text-white hover:bg-white hover:text-black hover:border-white rounded-lg py-2.5 transition-all text-center w-full"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>[ Explore Source Code ]</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
