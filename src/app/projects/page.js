'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  AnimatePresence,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  ArrowLeft,
  X,
  Menu,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import InterstellarFluidBackground from '@/components/InterstellarFluidBackground';
import AssigneeDropdown from '@/components/AssigneeDropdown';

const MotionLink = motion(Link);

/* ──────────────────────────────────────────────
   HELPER COMPONENTS
   ────────────────────────────────────────────── */

function NeoButton({
  children,
  color = 'bg-[#A388EE]',
  textColor = 'text-black',
  shadow = 'shadow-[4px_4px_0px_0px_#000]',
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -2, x: -2 }}
      whileTap={{ y: 0, x: 0 }}
      className={cn(
        'inline-flex items-center gap-2 border-2 border-black px-6 py-3 font-bold uppercase tracking-wider transition-all',
        color,
        textColor,
        shadow,
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function ProjectCard({
  title,
  category,
  image,
  description,
  techStack,
  color,
  index,
  demoVideoUrl,
  onVideoClick,
}) {
  const isVideo = demoVideoUrl?.toLowerCase().endsWith('.mp4') || demoVideoUrl?.toLowerCase().endsWith('.mov') || demoVideoUrl?.toLowerCase().endsWith('.webm');

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="border-2 border-black shadow-[4px_4px_0px_0px_#000] h-full flex flex-col bg-white"
    >
      <div className="aspect-[4/3] overflow-hidden border-b-2 border-black bg-gray-100">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className={cn('p-6 flex-grow flex flex-col justify-between', color)}>
        <div>
          <p className="mb-1 font-mono text-xs font-bold uppercase tracking-widest text-gray-700">
            {category}
          </p>
          <h3 className="text-2xl font-black uppercase tracking-tight text-black group-hover:underline mb-3">
            {title}
          </h3>
          <p className="font-medium text-sm text-gray-800 leading-relaxed mb-6">
            {description}
          </p>
          {techStack && (
            <div className="flex flex-wrap gap-2 mb-6">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="border-2 border-black bg-white px-2.5 py-1 font-mono text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        <div>
          <span className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-bold uppercase tracking-wider text-black text-xs shadow-[2px_2px_0px_0px_#000] transition-all group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_#000]">
            {isVideo ? 'Watch Demo' : 'Visit Website'} <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isVideo) {
    return (
      <button
        onClick={() => onVideoClick(demoVideoUrl)}
        className="block text-left w-full h-full group cursor-pointer bg-transparent border-0 p-0 font-inherit"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <a
      href={demoVideoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group cursor-pointer h-full"
    >
      {cardContent}
    </a>
  );
}

function RevealText({ text, className = '' }) {
  const chars = text.split('');

  return (
    <span className={cn('inline-flex flex-wrap overflow-hidden', className)}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: i * 0.03, ease: [0.33, 1, 0.68, 1] }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
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
    { label: 'Projects', href: '/#projects' },
    { label: 'Certificates', href: '/#certificates' },
    { label: 'Skills', href: '/#skills' },
  ];

  const projects = [
    {
      title: 'Neeti AI',
      category: 'AI System',
      description: 'An offline-first Android application designed with MVVM, Clean Architecture layers, Kotlin Coroutines, and Dependency Injection using Hilt.',
      techStack: ["Kotlin", "Jetpack Compose", "Android SDK", "Room Database", "Hilt"],
      image: '/projects/android-arch.png',
      color: 'bg-[#FF90E8]',
      demoVideoUrl: '/projects/VID-20260411-WA0014.mp4',
    },
    {
      title: 'Codalyte',
      category: 'Developer Tooling',
      description: 'A lightweight, real-time code execution and collaborative editor platform featuring low-latency synchronizations and inline AST diagnostics.',
      techStack: ["React", "Next.js", "WebSockets", "Node.js", "Monaco Editor"],
      image: '/projects/codalyte.png',
      color: 'bg-[#9BF6FF]',
      demoVideoUrl: '/projects/Codalyte.mov',
    },
    {
      title: 'Health Tracker',
      category: 'Healthcare System',
      description: 'A modern, high-performance mobile health tracking dashboard designed to aggregate and visualize daily steps, heart rates, workouts, and calories in real time.',
      techStack: ["Kotlin", "Jetpack Compose", "Android SDK", "Room Database", "Hilt"],
      image: '/projects/health-tracker.png',
      color: 'bg-[#FFDC58]',
      demoVideoUrl: 'https://www.healthtrack.store/',
    },
    {
      title: 'Study Flow',
      category: 'Productivity System',
      description: 'A modern, high-productivity task manager and study companion that tracks focus sessions, visualizes subject goals, and manages dynamic daily tasks.',
      techStack: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "LocalStorage"],
      image: '/projects/study-flow.png',
      color: 'bg-[#A388EE]',
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

      {/* ── Navbar ── */}
      <nav className="fixed top-0 z-40 w-full border-b-2 border-black bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 border-2 border-black bg-[#FFDC58] flex items-center justify-center">
              <Home size={16} strokeWidth={2.5} className="text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-black">
              SAYAN.
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-bold uppercase tracking-wider text-black transition-all hover:underline hover:decoration-[#A388EE] hover:decoration-4 hover:underline-offset-4"
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
            className="md:hidden text-black"
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
                    className="text-2xl font-black uppercase tracking-tight text-black"
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
      <main className="mx-auto max-w-7xl px-6 pb-32 pt-32 relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-12">
          <MotionLink
            href="/"
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Home
          </MotionLink>
        </div>

        <div className="mb-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">
            <RevealText text="ALL PROJECTS" />
          </h1>
        </div>
        <p className="mb-16 font-mono text-sm font-bold uppercase tracking-widest text-gray-500 border-b-4 border-black pb-6">
          /// ARCHIVE OF RECENT APPLICATIONS AND EXPERIMENTS ({projects.length} PROJECTS)
        </p>

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
              color={project.color}
              index={i}
              demoVideoUrl={project.demoVideoUrl}
              onVideoClick={setActiveVideo}
            />
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-black bg-black py-8 relative z-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="font-medium text-white">
            © 2026 Sayan Mukherjee. Built with Next.js, Tailwind CSS &amp;
            Framer Motion.
          </p>
        </div>
      </footer>

      {/* ── Video Modal ── */}
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
