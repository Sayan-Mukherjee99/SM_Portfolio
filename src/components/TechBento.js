"use client";

import { motion } from "framer-motion";
import { Cpu, Code, Layers, Settings, Globe, Database, Milestone } from "lucide-react";

export default function TechBento() {
  const hoverAnimation = {
    hover: {
      y: -6,
      borderColor: "rgba(189, 0, 255, 0.5)",
      boxShadow: "0px 10px 30px -10px rgba(189, 0, 255, 0.3)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const badgeHover = {
    hover: {
      scale: 1.05,
      borderColor: "rgba(0, 240, 255, 0.6)",
      backgroundColor: "rgba(0, 240, 255, 0.05)",
      color: "#00f0ff",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8" id="stack">
      
      {/* Title */}
      <div className="mb-10 space-y-2">
        <div className="inline-block border border-neon-purple/30 bg-neon-purple/5 px-3 py-1 text-xs font-mono text-neon-purple uppercase tracking-widest rounded-md">
          registry://core_stack
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          SYSTEM HARDWARE INDEX
        </h2>
        <p className="text-sm font-mono text-gray-500">// Mapping active developer modules and runtime environments.</p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[180px]">
        
        {/* Box 1 (Spans 2 cols, 2 rows): Android Architecture Module */}
        <motion.div 
          variants={hoverAnimation}
          whileHover="hover"
          className="md:col-span-2 md:row-span-2 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-purple-950/30 via-black to-black p-8 relative overflow-hidden group flex flex-col justify-between"
        >
          {/* Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-neon-purple/15 blur-3xl group-hover:bg-neon-purple/25 transition-colors duration-500 animate-pulse-slow" />
          
          <div className="space-y-4 z-10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-neon-purple">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white tracking-wider">Android Architecture Module</h3>
            </div>
            <p className="text-sm text-gray-400 font-mono leading-relaxed max-w-md">
              Engineered with clean architectural layers, MVVM, and offline-first database systems. Optimized for thread concurrency and strict resource consumption guidelines.
            </p>
          </div>

          {/* Android stack list */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 z-10 font-mono">
            {[
              { name: "Kotlin", detail: "Coroutines & Flow" },
              { name: "Jetpack Compose", detail: "Declarative UI" },
              { name: "Android SDK", detail: "API Level 21-34" },
              { name: "Room / SQLite", detail: "Persistence Layer" }
            ].map((tech) => (
              <div 
                key={tech.name} 
                className="p-3 border border-white/5 bg-white/[0.01] rounded-xl hover:border-neon-purple/40 hover:bg-purple-950/20 transition-all duration-300"
              >
                <div className="text-xs font-bold text-white">{tech.name}</div>
                <div className="text-[9px] text-gray-500 mt-1">{tech.detail}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Box 2 (Standard Cell): JavaScript Scripting Core */}
        <motion.div 
          variants={hoverAnimation}
          whileHover="hover"
          className="rounded-2xl border-2 border-white/10 bg-black/60 p-6 relative overflow-hidden group flex flex-col justify-between"
        >
          {/* Subtle cyan ambient blur */}
          <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-neon-cyan/5 blur-2xl group-hover:bg-neon-cyan/10 transition-colors duration-500" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="font-mono text-xs font-bold text-white/50 tracking-wider">JS_SCRIPTING_CORE</h3>
            <Code className="h-4 w-4 text-neon-cyan" />
          </div>

          <div className="space-y-1">
            <h4 className="font-mono text-md font-bold text-white">Event Loop Engines</h4>
            <p className="text-xs text-gray-400 font-mono leading-normal">
              High-performance asynchronous loop cycles, microtask queuing, and worker threads.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 px-2 py-1 w-fit rounded-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-cyan"></span>
            </span>
            <span>V8 ENGINE EMULATION</span>
          </div>
        </motion.div>

        {/* Box 3 (Standard Cell): HTML5 / CSS3 Layouts */}
        <motion.div 
          variants={hoverAnimation}
          whileHover="hover"
          className="rounded-2xl border-2 border-white/10 bg-black/60 p-6 relative overflow-hidden group flex flex-col justify-between"
        >
          {/* Subtle yellow ambient blur */}
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-neon-yellow/5 blur-2xl group-hover:bg-neon-yellow/10 transition-colors duration-500" />

          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="font-mono text-xs font-bold text-white/50 tracking-wider">LAYOUT_PARSER.CSS</h3>
            <Globe className="h-4 w-4 text-neon-yellow" />
          </div>

          <div className="space-y-1">
            <h4 className="font-mono text-md font-bold text-white">Semantic DOM Matrices</h4>
            <p className="text-xs text-gray-400 font-mono leading-normal">
              Grid compilation templates, typography scale, and responsive viewport mapping.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-neon-yellow bg-neon-yellow/5 border border-neon-yellow/20 px-2 py-1 w-fit rounded-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-yellow"></span>
            </span>
            <span>W3C COMPILATION: 100%</span>
          </div>
        </motion.div>

        {/* Box 4 (Spans all 3 cols at base): Development Environments */}
        <motion.div 
          variants={hoverAnimation}
          whileHover="hover"
          className="md:col-span-3 rounded-2xl border-2 border-white/10 bg-black/60 p-6 relative overflow-hidden flex flex-col justify-between md:flex-row md:items-center gap-6"
        >
          <div className="space-y-1.5 min-w-[250px]">
            <div className="flex items-center gap-2 text-gray-400">
              <Settings className="h-4 w-4" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">Development Environments</h3>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              Engineered compiler chains and system deployment frameworks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 font-mono">
            {[
              "Android Studio",
              "VS Code",
              "Git / GitHub",
              "Tailwind CSS",
              "Gradle Build Tool",
              "Webpack / Vite"
            ].map((env) => (
              <motion.div
                key={env}
                variants={badgeHover}
                whileHover="hover"
                className="cursor-default px-3 py-1.5 text-xs text-gray-300 border border-white/10 bg-white/[0.02] rounded-md transition-colors shadow-[2px_2px_0px_rgba(255,255,255,0.05)]"
              >
                {env}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
