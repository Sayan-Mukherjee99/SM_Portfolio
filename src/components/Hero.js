"use client";

import { motion } from "framer-motion";
import { ArrowDown, Cpu, ShieldAlert, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20" id="hero">
      
      {/* Background neon ambient glows */}
      <div className="absolute top-1/4 left-10 -z-10 h-72 w-72 rounded-full bg-neon-purple/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-neon-green/10 blur-[130px] animate-pulse-slow" />

      {/* Main Brutalist Grid Matrix */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-3"
      >
        
        {/* H1 Main Bio Card (Spans 2 columns) */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 flex flex-col justify-between p-8 rounded-[12px_24px_8px_16px] border-4 border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[4px_4px_20px_rgba(0,0,0,0.8)] relative overflow-hidden group"
        >
          {/* Neon Border Accent Glow */}
          <div className="absolute inset-0 border border-white/5 group-hover:border-neon-purple/40 transition-colors duration-500 rounded-[12px_24px_8px_16px]" />
          
          <div className="space-y-6">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
              </span>
              <span className="font-mono text-xs text-neon-green tracking-widest uppercase">SYSTEMS_ACTIVE // ONLINE</span>
            </div>

            {/* Main Brutalist Heading */}
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl md:leading-[1.15]">
              Hi, I'm <span className="text-black bg-neon-purple px-2 py-1 rounded-[4px_8px_3px_5px] inline-block rotate-[-1deg] font-mono">Sayan Mukherjee</span>, a Developer building native mobile architectures & clean web systems.
            </h1>

            {/* Subtext */}
            <p className="text-base text-gray-400 font-mono font-medium max-w-xl border-l-2 border-neon-cyan pl-4 leading-relaxed">
              Specializing in robust optimization, responsive layouts, and system integrity.
            </p>
          </div>

          {/* Interactive Mechanical Button Area */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => {
                const element = document.querySelector("#projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer font-mono font-black text-sm text-black bg-neon-green border-2 border-black rounded-[4px_8px_3px_10px] px-6 py-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none hover:shadow-none hover:bg-white hover:text-black transition-all"
            >
              COMPILE_PROJECTS.exe
            </button>
            
            <button
              onClick={() => {
                const element = document.querySelector("#credentials");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer font-mono font-black text-sm text-white bg-black border-2 border-white/20 rounded-[8px_4px_10px_3px] px-6 py-3 shadow-[5px_5px_0px_0px_rgba(189,0,255,0.4)] active:translate-y-[4px] active:shadow-none hover:shadow-none hover:border-white transition-all"
            >
              VERIFY_CREDENTIALS.bin
            </button>
          </div>
        </motion.div>

        {/* Info Terminal Card (Spans 1 column) */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col justify-between p-6 rounded-[24px_10px_16px_8px] border-4 border-white/10 bg-black/60 relative overflow-hidden group shadow-[4px_4px_20px_rgba(0,0,0,0.8)] crt-overlay"
        >
          {/* Laser Scanner sweep */}
          <div className="absolute left-0 top-0 w-full h-[2px] bg-neon-cyan shadow-[0_0_10px_#00f0ff] opacity-40 animate-laser z-20 pointer-events-none" />

          <div className="space-y-4">
            {/* Header tab */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-white/40">system_log.sh</span>
            </div>

            {/* Code snippets */}
            <div className="font-mono text-xs text-gray-300 space-y-2 leading-relaxed">
              <p className="text-neon-cyan">$ whoami</p>
              <p className="text-gray-400">sayan_mukherjee</p>
              <p className="text-neon-purple">$ check_stack --verbose</p>
              <div className="pl-3 text-gray-500 border-l border-white/10">
                <p>⚡ android_core: ok</p>
                <p>⚡ javascript_async: ok</p>
                <p>⚡ tailwind_css_v4: active</p>
                <p>⚡ framer_motion_v12: loaded</p>
              </div>
              <p className="text-neon-yellow">$ load_integrity_check</p>
              <p className="text-neon-green">STATUS_INTEGRITY: 100%</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-gray-500">
            <div className="flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-neon-cyan" />
              <span>ENG: NEXT.JS 16</span>
            </div>
            <span>v1.0.4-prod</span>
          </div>
        </motion.div>
        
      </motion.div>

      {/* Down arrow marker badge */}
      <div className="mt-12 flex justify-center">
        <motion.a 
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center p-3 rounded-full border border-white/10 bg-white/[0.02] text-gray-500 hover:text-white hover:border-neon-purple/40 hover:shadow-[0_0_15px_rgba(189,0,255,0.2)] transition-all cursor-pointer"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}
