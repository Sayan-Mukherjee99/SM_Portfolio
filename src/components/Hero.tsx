'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroProps {
  /** Optional custom handler for when the user clicks Explore Projects */
  onExploreProjects?: () => void;
  /** Optional custom handler for when the user clicks View Certificates */
  onViewCertificates?: () => void;
  /** Destination URL for downloading the resume (if needed) */
  resumeUrl?: string;
  /** Optional container class name override */
  className?: string;
}

const floatingShapesData = [
  { className: 'top-20 left-10 h-16 w-16 bg-[#FF90E8] rotate-12', delay: 0 },
  { className: 'top-40 right-20 h-12 w-12 bg-[#9BF6FF] -rotate-6', delay: 0.5 },
  { className: 'bottom-40 left-1/4 h-20 w-20 bg-[#FFDC58] rotate-45', delay: 1 },
  { className: 'top-1/3 right-1/3 h-10 w-10 bg-[#A388EE] -rotate-12', delay: 1.5 },
];

const techStackItems: readonly string[] = [
  'Next.js',
  'TypeScript',
  'FastAPI',
  'Rust',
  'Python',
  'Java',
  'SQL',
  'Tailwind CSS',
];

const marqueeText =
  'NEXT.JS • TYPESCRIPT • FASTAPI • RUST • PYTHON • JAVA • SQL • REACT • FULL STACK • HACKATHON BUILDER • ';

/**
 * Animated Marquee Strip
 */
interface MarqueeTapeProps {
  text: string;
  rotate?: number;
  color?: string;
}

function MarqueeTape({ text, rotate = 0, color = 'bg-[#FFDC58]' }: MarqueeTapeProps) {
  return (
    <div
      className={cn(
        'absolute left-0 right-0 z-20 overflow-hidden border-y-2 border-black py-3 font-mono font-bold uppercase tracking-widest text-black shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        color
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 12 }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="mx-4 flex items-center gap-4 text-xs sm:text-sm">
            {text} <Star size={14} fill="currentColor" className="text-black shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Hero Component
 * Displays copy, availability status, tech stack badges, dual CTAs, and continuous marquee ticker.
 */
export default function Hero({
  onExploreProjects,
  onViewCertificates,
  resumeUrl = '/resume.pdf',
  className = '',
}: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleExploreClick = () => {
    if (onExploreProjects) {
      onExploreProjects();
      return;
    }
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewCertificates = () => {
    if (onViewCertificates) {
      onViewCertificates();
      return;
    }
    const certsEl = document.getElementById('certificates');
    if (certsEl) {
      certsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction & Hero"
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-36',
        className
      )}
    >
      {/* Playful Floating Shapes Background Layer */}
      {floatingShapesData.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ delay: shape.delay, duration: 0.8, type: 'spring' }}
          className={cn(
            'pointer-events-none absolute border-2 border-black shadow-[3px_3px_0px_0px_#000]',
            shape.className
          )}
          style={{ zIndex: 0 }}
        />
      ))}

      {/* Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Status / Availability Pill (Above headline) */}
        <motion.div variants={itemVariants} className="mb-4 inline-block">
          <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-black bg-white/90 px-4 py-1.5 font-mono text-xs sm:text-sm font-bold text-black shadow-[3px_3px_0px_0px_#000] backdrop-blur-md transition-all hover:shadow-[4px_4px_0px_0px_#000]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span className="tracking-tight text-neutral-900">
              National Hackathon Finalist • Open to Opportunities
            </span>
          </div>
        </motion.div>

        {/* Supertitle - Sayan Mukherjee box made prominent & larger */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <span className="inline-block border-2 border-black bg-[#FF90E8] px-6 py-2.5 sm:px-8 sm:py-3 font-mono text-base sm:text-xl md:text-2xl font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_#000] rotate-[-0.5deg]">
            Hi, I&apos;m Sayan Mukherjee
          </span>
        </motion.div>

        {/* Headline with decreased, refined box sizing */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black uppercase leading-tight tracking-tight"
        >
          <span className="inline-block bg-[#FFDC58] px-2.5 py-1 sm:px-3.5 sm:py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] rotate-[-0.5deg] mr-2 mb-2">
            Full-Stack
          </span>{' '}
          <span className="inline-block bg-[#FFDC58] px-2.5 py-1 sm:px-3.5 sm:py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] rotate-[0.5deg] mr-2 mb-2">
            Software
          </span>{' '}
          <span className="inline-block bg-[#FFDC58] px-2.5 py-1 sm:px-3.5 sm:py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] mr-2 mb-2">
            Engineer
          </span>{' '}
          <span className="inline-block text-xl sm:text-2xl md:text-3xl font-black text-black/40 mx-1 align-middle">
            &amp;
          </span>{' '}
          <span className="inline-block bg-[#A388EE] text-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] rotate-[-0.5deg] mr-2 mb-2">
            System
          </span>{' '}
          <span className="inline-block bg-[#A388EE] text-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] rotate-[0.5deg] mb-2">
            Builder.
          </span>
        </motion.h1>

        {/* Body Paragraph */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-8 max-w-3xl text-base sm:text-lg font-medium leading-relaxed text-gray-800"
        >
          <p>
            I engineer resilient, end-to-end web applications and high-performance backends. Experienced
            across hackathon pressure cookers and production environments, I bridge core systems in{' '}
            <span className="inline-block bg-[#FF90E8] px-2 py-0.5 border-2 border-black font-black text-black rotate-[-1deg] mx-0.5 shadow-[2px_2px_0px_0px_#000]">
              Python
            </span>
            ,{' '}
            <span className="inline-block bg-[#9BF6FF] px-2 py-0.5 border-2 border-black font-black text-black rotate-[1deg] mx-0.5 shadow-[2px_2px_0px_0px_#000]">
              Java
            </span>
            , and{' '}
            <span className="inline-block bg-[#FFDC58] px-2 py-0.5 border-2 border-black font-black text-black rotate-[-1deg] mx-0.5 shadow-[2px_2px_0px_0px_#000]">
              Rust
            </span>{' '}
            with modern web architectures using{' '}
            <span className="inline-block bg-[#A388EE] text-white px-2 py-0.5 border-2 border-black font-black rotate-[1deg] mx-0.5 shadow-[2px_2px_0px_0px_#000]">
              Next.js
            </span>
            ,{' '}
            <span className="inline-block bg-[#9BF6FF] px-2 py-0.5 border-2 border-black font-black text-black rotate-[-1deg] mx-0.5 shadow-[2px_2px_0px_0px_#000]">
              TypeScript
            </span>
            , and{' '}
            <span className="inline-block bg-[#4ade80] px-2 py-0.5 border-2 border-black font-black text-black rotate-[1deg] mx-0.5 shadow-[2px_2px_0px_0px_#000]">
              FastAPI
            </span>
            .
          </p>
        </motion.div>

        {/* Tech Stack Tag Pills */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
          role="list"
          aria-label="Key Technologies"
        >
          {techStackItems.map((tech, idx) => (
            <motion.div
              key={tech}
              role="listitem"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + idx * 0.04, duration: 0.35 }}
              whileHover={{
                y: -3,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="group relative cursor-default select-none rounded-full border-2 border-black bg-white/95 px-4 py-1.5 font-mono text-xs sm:text-sm font-bold text-neutral-900 shadow-[2px_2px_0px_0px_#000] backdrop-blur-md transition-all hover:bg-black hover:text-white hover:shadow-[0_0_15px_rgba(163,136,238,0.5)]"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A388EE] transition-all group-hover:scale-125 group-hover:bg-[#FFDC58]" />
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Dual Call-to-Action (CTA) Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Primary CTA: Explore Projects */}
          <motion.button
            type="button"
            whileHover={{ y: -3, x: -3 }}
            whileTap={{ y: 0, x: 0 }}
            onClick={handleExploreClick}
            className="inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-[#A388EE] px-6 sm:px-8 py-3.5 font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_#000] transition-all hover:bg-[#9171ee] hover:shadow-[6px_6px_0px_0px_#000] active:shadow-none"
          >
            <span>Explore Projects</span>
            <ArrowDown size={18} strokeWidth={2.5} />
          </motion.button>

          {/* Secondary CTA: View Certificates */}
          <motion.button
            type="button"
            whileHover={{ y: -3, x: -3 }}
            whileTap={{ y: 0, x: 0 }}
            onClick={handleViewCertificates}
            className="inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-[#FFDC58] px-6 sm:px-8 py-3.5 font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_#000] transition-all hover:bg-[#ffd736] hover:shadow-[6px_6px_0px_0px_#000] active:shadow-none"
          >
            <span>View Certificates</span>
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Infinite Scrolling Background Ticker / Marquee */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0">
        <MarqueeTape text={marqueeText} rotate={-1.5} color="bg-[#FFDC58]" />
      </div>
    </section>
  );
}
