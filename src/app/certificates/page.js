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
import { certificatesData } from '@/data/portfolioData';

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
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
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

export default function CertificatesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
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
        <div className="mx-auto flex max-w-7xl items-center justify-between">
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
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter">
            <RevealText text="ALL CERTIFICATIONS" />
          </h1>
        </div>
        <p className="mb-16 font-mono text-sm font-bold uppercase tracking-widest text-gray-500 border-b-4 border-black pb-6">
          /// VIEW MY FULL LIST OF VERIFIED CREDENTIALS ({certificatesData.length} CERTIFICATES)
        </p>

        {/* Certificates Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {certificatesData.map((cert, i) => {
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
  );
}
