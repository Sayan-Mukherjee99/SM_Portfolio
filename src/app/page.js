'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  Zap,
  Box,
  Layers,
  X,
  Menu,
  Star,
  Home,
  Smartphone,
  Code,
  Heart,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import InterstellarFluidBackground from '@/components/InterstellarFluidBackground';
import AssigneeDropdown from '@/components/AssigneeDropdown';
import { certificatesData, projectsData } from '@/data/portfolioData';
import StarBorder from '@/components/ui/StarBorder';
import SplashLoader from '@/components/SplashLoader';


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

function CertificateCard({ title, issuer, verificationUrl, color, index, onCertClick }) {
  return (
    <button
      onClick={() => onCertClick({ title, issuer, verificationUrl })}
      className="block group cursor-pointer text-left w-full h-full bg-transparent border-0 p-0 font-inherit"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="border-2 border-black shadow-[4px_4px_0px_0px_#000] h-full bg-white flex flex-col"
      >
        {/* Certificate Image Thumbnail Preview */}
        <div className="aspect-[4/3] w-full overflow-hidden border-b-2 border-black bg-gray-100 relative">
          <motion.img
            src={verificationUrl}
            alt={title}
            className="h-full w-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
          />
        </div>

        <div className={cn('p-6 flex-1 flex flex-col justify-between min-h-[160px]', color)}>
          <div>
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-700">
              ISSUER // {issuer}
            </p>
            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-black group-hover:underline line-clamp-2">
              {title}
            </h3>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-bold uppercase tracking-wider text-black text-xs shadow-[2px_2px_0px_0px_#000] transition-all group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_#000]">
              View Full Size <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </motion.div>
    </button>
  );
}

function FeatureCard({ icon: Icon, title, description, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, rotate: -1 }}
      className={cn(
        'border-2 border-black p-8 shadow-[4px_4px_0px_0px_#000]',
        color
      )}
    >
      <div className="mb-6 inline-block border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_#000]">
        <Icon size={32} strokeWidth={2.5} />
      </div>
      <h3 className="mb-3 text-2xl font-black uppercase tracking-tight">
        {title}
      </h3>
      <p className="font-medium leading-relaxed text-gray-800">
        {description}
      </p>
    </motion.div>
  );
}

function FloatingShapes() {
  const shapes = [
    { className: 'top-20 left-10 h-16 w-16 bg-[#FF90E8] rotate-12', delay: 0 },
    { className: 'top-40 right-20 h-12 w-12 bg-[#9BF6FF] -rotate-6', delay: 0.5 },
    { className: 'bottom-40 left-1/4 h-20 w-20 bg-[#FFDC58] rotate-45', delay: 1 },
    { className: 'top-1/3 right-1/3 h-10 w-10 bg-[#A388EE] -rotate-12', delay: 1.5 },
  ];

  return (
    <>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: shape.delay, duration: 0.8, type: 'spring' }}
          className={cn(
            'absolute border-2 border-black shadow-[3px_3px_0px_0px_#000]',
            shape.className
          )}
          style={{ zIndex: 0 }}
        />
      ))}
    </>
  );
}

function MarqueeTape({ text, rotate = 0, color = 'bg-white' }) {
  return (
    <div
      className={cn(
        'absolute left-0 right-0 z-20 overflow-hidden border-y-2 border-black py-3 font-mono font-bold uppercase tracking-widest text-black',
        color
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 10 }}
        className="flex whitespace-nowrap"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="mx-4 flex items-center gap-4">
            {text} <Star size={16} fill="black" />
          </span>
        ))}
      </motion.div>
    </div>
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

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 border-black">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-xl font-black uppercase tracking-tight md:text-2xl">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-[#FFDC58] text-2xl font-black shadow-[2px_2px_0px_0px_#000]"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-lg font-medium leading-relaxed text-gray-700">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


const getProjectIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('neeti')) return <Smartphone className="text-[#A388EE] w-8 h-8 animate-pulse" />;
  if (t.includes('codalyte')) return <Code className="text-[#A388EE] w-8 h-8 animate-pulse" />;
  if (t.includes('healthtrack')) return <Heart className="text-[#A388EE] w-8 h-8 animate-pulse" />;
  return <Calendar className="text-[#A388EE] w-8 h-8 animate-pulse" />;
};

function WorkCard({ title, category, image, description, techStack, index, demoVideoUrl, onVideoClick }) {
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
        transition={{ duration: 0.5, delay: index * 0.1 }}
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-[#030305]/40 border border-white/10 shadow-lg w-full block text-left cursor-pointer hover:border-white/20 hover:shadow-[0_0_30px_rgba(163,136,238,0.15)] transition-all duration-300"
    >
      {cardInner}
    </motion.a>
  );
}


/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const languageModules = [
    {
      name: 'Python',
      color: 'bg-[#FF90E8]'
    },
    {
      name: 'Java',
      color: 'bg-[#9BF6FF]'
    },
    {
      name: 'SQL',
      color: 'bg-[#FFDC58]'
    },
    {
      name: 'JavaScript',
      color: 'bg-[#A388EE]'
    },
    {
      name: 'TypeScript',
      color: 'bg-[#FF8B3D]'
    },
    {
      name: 'C',
      color: 'bg-[#CAFFBF]'
    }
  ];

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Skills', href: '#skills' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Python & Java',
      color: 'bg-[#FF90E8]',
      description:
        'Building robust backends, automation scripts, data pipelines, and enterprise-grade applications with Python and Java.',
    },
    {
      icon: Box,
      title: 'SQL & Databases',
      color: 'bg-[#9BF6FF]',
      description:
        'Complex queries, schema design, performance tuning, and working with PostgreSQL, MySQL, and cloud-hosted databases.',
    },
    {
      icon: Layers,
      title: 'Full Stack Web Dev',
      color: 'bg-[#FFDC58]',
      description:
        'End-to-end web applications with React, Next.js, Node.js, REST APIs, and modern frontend frameworks.',
    },
  ];

  const projects = [
    {
      title: 'Neeti AI',
      category: 'AI System',
      image: '/projects/android-arch.png',
      color: 'bg-[#FF90E8]',
      demoVideoUrl: '/projects/VID-20260411-WA0014.mp4',
    },
    {
      title: 'Codalyte',
      category: 'Developer Tooling',
      image: '/projects/codalyte.png',
      color: 'bg-[#9BF6FF]',
      demoVideoUrl: '/projects/Codalyte.mov',
    },
    {
      title: 'HealthTrack+',
      category: 'Healthcare System',
      image: '/projects/health-tracker.png',
      color: 'bg-[#FFDC58]',
      demoVideoUrl: 'https://www.healthtrack.store/',
    },
    {
      title: 'Study Flow',
      category: 'Productivity System',
      image: '/projects/study-flow.png',
      color: 'bg-[#A388EE]',
      demoVideoUrl: '/projects/Study Flow.mp4',
    },
  ];





  const faqs = [
    {
      question: 'Do you work with startups?',
      answer:
        'Absolutely. I thrive in fast-paced environments where shipping speed and code quality both matter.',
    },
    {
      question: "What's your tech stack?",
      answer:
        'Python and Java for backend systems, SQL for data management, and React/Next.js/Node.js for full stack web development.',
    },
    {
      question: 'Are you open to remote work?',
      answer:
        "Yes. I've worked remotely with teams across multiple time zones. Communication and async workflows are second nature.",
    },
  ];

  return (
    <SplashLoader>
    <div className="relative min-h-screen bg-[#FDFBF7] font-sans text-black selection:bg-[#FFDC58]">
      <InterstellarFluidBackground />

      {/* ── Progress Bar ── */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-2 origin-left bg-black"
        style={{ scaleX }}
      />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 z-40 w-full border-b-2 border-black bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="h-8 w-8 border-2 border-black bg-[#FFDC58] flex items-center justify-center">
              <Home size={16} strokeWidth={2.5} className="text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              SAYAN.
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-bold uppercase tracking-wider transition-all hover:underline hover:decoration-[#A388EE] hover:decoration-4 hover:underline-offset-4"
              >
                {link.label}
              </a>
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
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-black uppercase tracking-tight"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3">
                  <AssigneeDropdown align="left" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <FloatingShapes />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-block border-2 border-black bg-[#FF90E8] px-4 py-2 font-mono font-bold shadow-[4px_4px_0px_0px_#000]"
          >
            Hi, I&apos;m
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter space-x-2"
          >
            <span className="inline-block bg-[#FFDC58] px-4 py-1 border-2 border-black">
              Sayan
            </span>{' '}
            <span className="inline-block bg-[#FFDC58] px-4 py-1 border-2 border-black">
              Mukherjee.
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8 text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 space-x-2"
          >
            <span className="inline-block bg-[#A388EE] px-3 py-0.5 text-white border-2 border-black">
              A
            </span>{' '}
            <span className="inline-block bg-[#A388EE] px-3 py-0.5 text-white border-2 border-black">
              Software
            </span>{' '}
            <span className="inline-block bg-[#A388EE] px-3 py-0.5 text-white border-2 border-black">
              Engineer
            </span>
          </motion.h2>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-gray-700"
          >
            <p>
              I design and build complete, scalable applications. Combining a strong foundation in{' '}
              <span className="inline-block bg-[#FF90E8] px-2 py-0.5 border-2 border-black font-black text-black rotate-[-1deg] mx-1">
                Problem-Solving
              </span>{' '}
              with core technologies like{' '}
              <span className="inline-block bg-[#9BF6FF] px-2 py-0.5 border-2 border-black font-black text-black rotate-[1deg] mx-1">
                Python
              </span>
              ,{' '}
              <span className="inline-block bg-[#9BF6FF] px-2 py-0.5 border-2 border-black font-black text-black rotate-[-1deg] mx-1">
                Java
              </span>
              , and{' '}
              <span className="inline-block bg-[#9BF6FF] px-2 py-0.5 border-2 border-black font-black text-black rotate-[1deg] mx-1">
                SQL
              </span>
              , I focus on writing clean, highly efficient, and optimized code.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <NeoButton
              color="bg-[#A388EE]"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects <ArrowUpRight size={18} />
            </NeoButton>
            <NeoButton
              color="bg-[#FF90E8]"
              onClick={() => {
                document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Certificates <ArrowUpRight size={18} />
            </NeoButton>
          </motion.div>
        </div>

        {/* Marquee Tape */}
        <div className="absolute bottom-12 left-0 right-0">
          <MarqueeTape
            text="PYTHON • JAVA • SQL • FULL STACK WEB DEV • REACT • NEXT.JS • PROBLEM SOLVER •"
            rotate={-2}
            color="bg-[#FFDC58]"
          />
        </div>
      </section>

      {/* ── Feature Stack Section ── */}
      <section id="skills" className="border-t-2 border-black bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-16 flex items-end justify-between border-b-4 border-black pb-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              The Stack
            </h2>
            <span className="font-mono text-lg font-bold text-gray-500">
              /// 01
            </span>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>



      {/* ── Selected Work Section ── */}
      <section id="projects" className="border-t border-b border-white/10 bg-transparent pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-16 flex items-end justify-between border-b border-black/10 pb-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
              Projects
            </h2>
            <span className="font-mono text-lg font-bold text-gray-400">
              /// 02
            </span>
          </div>

          {/* Work Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {projectsData.map((project, i) => (
              <WorkCard
                key={project.id}
                title={project.title}
                category={project.subtitle}
                image={project.imagePath}
                description={project.description}
                techStack={project.techStack}
                index={i}
                demoVideoUrl={project.demoVideoUrl}
                onVideoClick={setActiveVideo}
              />
            ))}
          </div>

          {/* Explore My Projects Button */}
          <div className="mt-16 text-center">
            <StarBorder
              as="a"
              href="/projects"
              color="#A388EE"
              speed="4s"
              thickness={2}
              className="cursor-pointer explore-projects-btn"
            >
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-neutral-950 text-lg">
                view all projects <ArrowUpRight size={20} />
              </span>
            </StarBorder>
          </div>
        </div>
      </section>

      {/* ── Certificates Section ── */}
      <section id="certificates" className="border-t-2 border-black bg-[#FDFBF7] py-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-16 flex items-end justify-between border-b border-black/10 pb-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
              Certifications
            </h2>
            <span className="font-mono text-lg font-bold text-gray-500">
              /// 03
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {certificatesData.slice(0, 4).map((cert, i) => {
              const cardColors = ['bg-[#FF90E8]', 'bg-[#9BF6FF]', 'bg-[#FFDC58]', 'bg-[#A388EE]'];
              return (
                <CertificateCard
                  key={cert.id}
                  title={cert.title}
                  issuer={cert.issuer}
                  verificationUrl={cert.verificationUrl}
                  color={cardColors[i % cardColors.length]}
                  index={i}
                  onCertClick={setActiveCert}
                />
              );
            })}
          </div>

          {/* View All Certificates Button */}
          <div className="mt-16 text-center">
            <StarBorder
              as="a"
              href="/certificates"
              color="#A388EE"
              speed="5s"
              thickness={3}
              className="cursor-pointer"
            >
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-white text-lg">
                View All Certificates <ArrowUpRight size={20} />
              </span>
            </StarBorder>
          </div>
        </div>
      </section>






      {/* ── Language Badges ── */}
      <section className="border-t-2 border-black bg-[#FDFBF7] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-matrix-light opacity-30 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-between gap-6 mb-8 lg:flex-row lg:items-end">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-black">
                  Languages
                </h3>
              </div>
            </div>

            {/* Grid of clean language cards */}
            <div className="relative z-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-8">
              {languageModules.map((module, i) => (
                <motion.div
                  key={module.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={cn("h-4 w-4 border border-black rounded-full shrink-0", module.color)} />
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-black">
                      {module.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="border-t-2 border-black bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-16 border-b-8 border-black pb-6 text-4xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter">
            F.A.Q.
          </h2>

          <div>
            {faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="border-t-2 border-black bg-[#FFDC58] py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tighter"
          >
            Contact Me
          </motion.h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <StarBorder
              as="a"
              href="https://github.com/Sayan-Mukherjee99"
              target="_blank"
              rel="noopener noreferrer"
              color="#4ade80"
              speed="4s"
              thickness={3}
              className="cursor-pointer"
            >
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-white text-lg">
                GitHub <ArrowUpRight size={20} />
              </span>
            </StarBorder>
            <StarBorder
              as="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              color="#FF90E8"
              speed="4s"
              thickness={3}
              className="cursor-pointer"
            >
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-white text-lg">
                LinkedIn <ArrowUpRight size={20} />
              </span>
            </StarBorder>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-black bg-black py-8">
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

      {/* ── Certificate Modal ── */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setActiveCert(null)}
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
              <div className="flex items-center justify-between border-b-4 border-black bg-[#FFDC58] p-4">
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-black line-clamp-1">
                  // CERTIFICATE: {activeCert.title}
                </span>
                <button
                  onClick={() => setActiveCert(null)}
                  className="border-2 border-black bg-[#FF90E8] p-1.5 font-black text-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="bg-gray-100 flex items-center justify-center p-4 md:p-8">
                <img
                  src={activeCert.verificationUrl}
                  alt={activeCert.title}
                  className="w-full max-h-[70vh] object-contain border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </SplashLoader>
  );
}
