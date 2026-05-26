'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, X, Smartphone, Code, Heart, Calendar, Home, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import InterstellarFluidBackground from '@/components/InterstellarFluidBackground';
import AssigneeDropdown from '@/components/AssigneeDropdown';

/* ──────────────────────────────────────────────
   HELPER COMPONENTS
   ────────────────────────────────────────────── */

const getProjectIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('neeti')) return <Smartphone className="text-[#A388EE] w-8 h-8 animate-pulse" />;
  if (t.includes('codalyte')) return <Code className="text-[#A388EE] w-8 h-8 animate-pulse" />;
  if (t.includes('healthtrack')) return <Heart className="text-[#A388EE] w-8 h-8 animate-pulse" />;
  return <Calendar className="text-[#A388EE] w-8 h-8 animate-pulse" />;
};

function ProjectCard({
  title,
  category,
  image,
  description,
  techStack,
  index,
  demoVideoUrl,
  onVideoClick,
}) {
  const isVideo = demoVideoUrl?.toLowerCase().endsWith('.mp4') || demoVideoUrl?.toLowerCase().endsWith('.mov') || demoVideoUrl?.toLowerCase().endsWith('.webm');

  const cardInner = (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        className="h-full w-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
        alt={title}
      />

      {/* Description block overlay on hover */}
      <div className="absolute inset-x-6 top-6 bottom-24 flex flex-col justify-center items-center pointer-events-none text-center">
        <div className="mb-2 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
          {getProjectIcon(title)}
        </div>
        <p className="text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 text-white/80 max-w-[95%] font-light leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Glass Footer */}
      <div className="absolute bottom-4 left-4 right-4 h-16 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-between px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 group-hover:bg-black/60">
        <div className="flex flex-col items-start text-left max-w-[60%]">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-[#A388EE]">
            {category}
          </span>
          <span className="text-white text-sm font-bold tracking-tight line-clamp-1">
            {title}
          </span>
        </div>
        <span className="bg-white/10 group-hover:bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider py-2 px-4 rounded-2xl transition-all active:scale-95 border border-white/5 whitespace-nowrap flex items-center gap-1.5">
          {isVideo ? 'Watch Demo' : 'Visit Website'}
          <ArrowUpRight size={12} className="text-white/60" />
        </span>
      </div>
    </div>
  );

  if (isVideo) {
    return (
      <motion.button
        onClick={() => onVideoClick(demoVideoUrl)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
        className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-[#030305]/40 border border-white/10 shadow-lg w-full block text-left cursor-pointer hover:border-white/20 hover:shadow-[0_0_30px_rgba(163,136,238,0.15)] transition-all duration-300"
      >
        {cardInner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={demoVideoUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-[#030305]/40 border border-white/10 shadow-lg w-full block text-left cursor-pointer hover:border-white/20 hover:shadow-[0_0_30px_rgba(163,136,238,0.15)] transition-all duration-300"
    >
      {cardInner}
    </motion.a>
  );
}

function RevealText({ text, className = '' }) {
  const words = text.split(' ');

  return (
    <span className={cn('inline-flex flex-wrap', className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden mr-[0.25em] last:mr-0 pr-1 pb-1">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: (wordIndex * 5 + charIndex) * 0.03, ease: [0.33, 1, 0.68, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Certificates', href: '/certificates' },
  ];

  const projects = [
    {
      title: 'Neeti AI',
      category: 'AI System',
      description: 'An offline-first Android application designed with MVVM, Clean Architecture layers, Kotlin Coroutines, and Dependency Injection using Hilt.',
      techStack: ["Kotlin", "Jetpack Compose", "Android SDK", "Room Database", "Hilt"],
      image: '/projects/android-arch.png',
      demoVideoUrl: '/projects/VID-20260411-WA0014.mp4',
    },
    {
      title: 'Codalyte',
      category: 'Developer Tooling',
      description: 'A lightweight, real-time code execution and collaborative editor platform featuring low-latency synchronizations and inline AST diagnostics.',
      techStack: ["React", "Next.js", "WebSockets", "Node.js", "Monaco Editor"],
      image: '/projects/codalyte.png',
      demoVideoUrl: '/projects/Codalyte.mov',
    },
    {
      title: 'HealthTrack+',
      category: 'Healthcare System',
      description: 'A modern, high-performance mobile health tracking dashboard designed to aggregate and visualize daily steps, heart rates, workouts, and calories in real time.',
      techStack: ["Kotlin", "Jetpack Compose", "Android SDK", "Room Database", "Hilt"],
      image: '/projects/health-tracker.png',
      demoVideoUrl: 'https://www.healthtrack.store/',
    },
    {
      title: 'Study Flow',
      category: 'Productivity System',
      description: 'A modern, high-productivity task manager and study companion that tracks focus sessions, visualizes subject goals, and manages dynamic daily tasks.',
      techStack: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "LocalStorage"],
      image: '/projects/study-flow.png',
      demoVideoUrl: '/projects/Study Flow.mp4',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] font-sans text-black selection:bg-[#FFDC58]">
      <InterstellarFluidBackground />

      {/* ── Progress Bar ── */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-2 origin-left bg-black"
        style={{ scaleX }}
      />

      {/* ── Navbar (same as home page) ── */}
      <nav className="fixed top-0 z-40 w-full border-b-2 border-black bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 border-2 border-black bg-[#FFDC58] flex items-center justify-center">
              <Home size={16} strokeWidth={2.5} className="text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              SAYAN.
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-bold uppercase tracking-wider transition-all hover:underline hover:decoration-[#A388EE] hover:decoration-4 hover:underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <AssigneeDropdown align="right" />
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-full w-full border-b-2 border-black bg-[#9BF6FF] px-6 py-8 md:hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-black uppercase tracking-tight"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3">
                  <AssigneeDropdown align="left" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Main Content ── */}
      <main className="mx-auto max-w-7xl px-6 pb-32 pt-28 relative z-10">
        
        {/* Header */}
        <div className="mb-16 flex items-end justify-between border-b border-black/10 pb-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            All Projects
          </h1>
          <span className="font-mono text-lg font-bold text-gray-400">
            /// {projects.length}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              category={project.category}
              description={project.description}
              techStack={project.techStack}
              image={project.image}
              index={i}
              demoVideoUrl={project.demoVideoUrl}
              onVideoClick={setActiveVideo}
            />
          ))}
        </div>
      </main>

      {/* ── Video Player Modal ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative w-full max-w-4xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b-4 border-black bg-[#9BF6FF] p-4">
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                  // PLAYING_DEMO_REEL
                </span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="border-2 border-black bg-[#FF90E8] p-1.5 font-black text-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="bg-black aspect-video flex items-center justify-center">
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
