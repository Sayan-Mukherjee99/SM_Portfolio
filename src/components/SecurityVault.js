"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Database, Key, ServerCrash } from "lucide-react";
import { certificatesData } from "../data/portfolioData";

export default function SecurityVault() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 border-t border-white/5" id="credentials">
      
      {/* Title */}
      <div className="mb-12 space-y-2">
        <div className="inline-block border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-xs font-mono text-neon-cyan uppercase tracking-widest rounded-md">
          registry://security_vault
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          CREDENTIAL_VERIFICATION_MATRIX
        </h2>
        <p className="text-sm font-mono text-gray-500">// Decrypted security hashes. Verification clearance level: PUBLIC.</p>
      </div>

      {/* Verification Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificatesData.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative rounded-2xl border-2 ${cert.borderColorClass} bg-black/60 p-6 overflow-hidden flex flex-col justify-between h-72 crt-overlay group shadow-[0_0_20px_rgba(0,0,0,0.8)]`}
            style={{
              boxShadow: `inset 0 0 20px ${cert.themeColor}`,
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
                background: cert.themeColor.replace("0.4", "1"),
                boxShadow: `0 0 12px 2px ${cert.themeColor.replace("0.4", "1")}`,
              }}
            />

            {/* Top Security Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
              <div className="flex items-center gap-1 text-[10px] font-mono text-white/50">
                <Key className="h-3 w-3 text-white/40" />
                <span>HASH_ID: {cert.id.toUpperCase()}</span>
              </div>
              
              {/* Flashing Status Beacon */}
              <div className="flex items-center gap-1.5 bg-neon-green/10 border border-neon-green/30 px-2 py-0.5 rounded-full font-mono text-[9px] text-neon-green">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-green"></span>
                </span>
                <span>{cert.status}</span>
              </div>
            </div>

            {/* Cert Information Body */}
            <div className="space-y-3 my-4 z-10">
              <div className={`font-mono text-[10px] font-bold ${cert.textColorClass} tracking-widest uppercase`}>
                // AUTHENTICATED_CREDENTIAL
              </div>
              <h3 className="text-lg font-black text-white font-mono leading-tight tracking-wide group-hover:text-white/95 transition-colors">
                {cert.title}
              </h3>
              <p className="font-mono text-xs text-gray-400">
                ISSUER // {cert.issuer}
              </p>
            </div>

            {/* Action Command Line Link */}
            <div className="pt-3 border-t border-white/10 z-10">
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between font-mono text-[11px] font-bold hover:underline transition-colors ${cert.textColorClass}`}
              >
                <span>Initialize Verification Sequence</span>
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

      {/* Holographic Diagnostic Summary Block */}
      <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-neon-green animate-pulse" />
          <span>VAULT SHA-256 CHECK: PASSED. ALL CERTIFICATES VERIFIED IN CONFORMANCE WITH RSA-4096 COMPILATION.</span>
        </div>
        <span className="text-neon-cyan/70 shrink-0">KEYRING_SECURE: OK</span>
      </div>

    </section>
  );
}
