"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {
    ArrowRight,
    Sparkles,
    Zap,
    Eye,
    Menu,
    X,
    Shapes,
    Plus,
    Minus,
    Check,
    Star,
    Smile,
    Quote
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- Wobbly Box Component ---
export function WobblyBox({ children, className, hoverEffect = true }: { children: React.ReactNode, className: string, hoverEffect?: boolean }) {
    return (
        <div
            className={cn(
                "bg-white border-4 border-black relative transition-all duration-200",
                "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]",
                hoverEffect ? "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1" : "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                className
            )}
        >
            {children}
        </div>
    );
}

// --- Scribble SVG Components ---
export function UnderlineScribble() {
    return (
        <svg className="absolute -bottom-2 left-0 w-full h-4 text-yellow-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
        </svg>
    );
}

export function ArrowScribble() {
    return (
        <svg className="w-24 h-24 absolute -top-12 -right-12 text-black rotate-12 hidden md:block" viewBox="0 0 100 100" fill="none">
            <path d="M10,90 Q50,10 90,50" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M80,40 L90,50 L70,60" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
    );
}

// 1. Navigation
export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 px-4 py-4 mix-blend-hard-light">
            <WobblyBox className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 bg-white/90 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" hoverEffect={false}>
                <div className="text-2xl font-black tracking-tighter font-marker rotate-1 text-black">
                    SKETCH<span className="text-pink-500">.UP</span>
                </div>

                <div className="hidden md:flex gap-8 font-mono font-bold text-sm items-center text-black">
                    <a href="#work" className="hover:underline decoration-wavy decoration-2 decoration-pink-500 underline-offset-4">Work</a>
                    <a href="#about" className="hover:underline decoration-wavy decoration-2 decoration-cyan-500 underline-offset-4">About</a>
                    <button className="bg-black text-white px-6 py-2 font-marker text-lg rotate-1 hover:-rotate-1 transition-transform border-2 border-transparent hover:border-black hover:bg-yellow-400 hover:text-black">
                        Let's Talk!
                    </button>
                </div>

                <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </WobblyBox>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-24 left-4 right-4 z-40">
                    <WobblyBox className="p-8 flex flex-col gap-6 text-center bg-yellow-400 font-marker text-2xl text-black" hoverEffect={true}>
                        <a href="#" onClick={() => setIsOpen(false)}>Work</a>
                        <a href="#" onClick={() => setIsOpen(false)}>About</a>
                        <a href="#" onClick={() => setIsOpen(false)}>Contact</a>
                    </WobblyBox>
                </div>
            )}
        </nav>
    );
}

// 2. Hero Section
export function Hero() {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".sticker", {
                rotation: "random(-10, 10)",
                y: "random(-10, 10)",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.2
            });
            gsap.from(".hero-char", {
                y: 100,
                opacity: 0,
                rotate: 10,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)"
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const splitText = (text: string) => text.split("").map((char, i) => (
        <span key={i} className="hero-char inline-block">{char === " " ? "\u00A0" : char}</span>
    ));

    return (
        <section ref={container} className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center relative overflow-hidden bg-dot-grid text-black">
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 Q50,100 100,0" stroke="black" strokeWidth="0.5" fill="none" />
                    <path d="M0,100 Q50,0 100,100" stroke="black" strokeWidth="0.5" fill="none" />
                </svg>
            </div>
            <div className="sticker absolute top-32 left-[10%] w-16 h-16 bg-pink-500 rounded-full border-4 border-black flex items-center justify-center text-white font-bold animate-pulse">NEW</div>
            <div className="sticker absolute bottom-32 right-[10%] w-24 h-24 bg-cyan-400 rotate-12 border-4 border-black flex items-center justify-center text-black font-bold font-marker shadow-[4px_4px_0px_0px_#000]">WOW!</div>
            <div className="relative z-10 text-center max-w-5xl mx-auto">
                <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-8 font-sans uppercase">
                    <div className="relative inline-block">
                        {splitText("WE BUILD")}
                        <ArrowScribble />
                    </div>
                    <br />
                    <span className="relative inline-block text-white bg-black px-4 rotate-2 mx-2">{splitText("UGLY")}</span>
                    <br />
                    <div className="relative inline-block">
                        {splitText("STARTUPS")}
                        <UnderlineScribble />
                    </div>
                </h1>
                <p className="font-mono text-lg md:text-xl font-bold bg-white inline-block px-4 py-2 border-2 border-black -rotate-1 shadow-[4px_4px_0px_0px_#000] max-w-2xl">
                    // We embrace the chaos. No polished gradients. No corporate memphis. Just raw, high-converting brutalism.
                </p>
                <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button className="group relative px-8 py-4 bg-yellow-400 text-black border-4 border-black font-black text-xl hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 rounded-sm font-sans uppercase tracking-widest">
                        Start a Project <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="font-marker text-zinc-500 -rotate-3 text-lg">( It costs money though )</span>
                </div>
            </div>
        </section>
    );
};

// 3. Marquee
export function TapeMarquee() {
    return (
        <div className="relative py-12 -rotate-2 scale-110 overflow-hidden bg-pink-500 border-y-4 border-black">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
            <div className="animate-marquee whitespace-nowrap flex gap-12 font-black text-4xl text-white font-sans uppercase tracking-tighter">
                {Array(10).fill("BREAK THINGS • SHIP FAST • NO REGRETS • ").map((t, i) => (
                    <span key={i}>{t}</span>
                ))}
            </div>
        </div>
    );
}

// 4. Services
export function Services() {
    const services = [
        { title: "Chaos Design", icon: Shapes, desc: "We intentionally break grids to capture attention.", color: "bg-cyan-300" },
        { title: "Raw Code", icon: Zap, desc: "React components stripped of bloat. Pure speed.", color: "bg-pink-300" },
        { title: "Brutal SEO", icon: Eye, desc: "Dominate search results by yelling louder.", color: "bg-yellow-300" },
        { title: "Doodle UI", icon: Smile, desc: "Hand-drawn icons that look like a toddler made them.", color: "bg-purple-300" },
    ];

    return (
        <section id="work" className="py-32 px-6 bg-zinc-50 relative text-black">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 flex flex-col md:flex-row items-end gap-6">
                    <h2 className="text-5xl md:text-7xl font-black uppercase font-sans">
                        Our <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Toolkit</span>
                    </h2>
                    <div className="h-1 bg-black flex-1 mb-4 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((s, i) => (
                        <WobblyBox key={i} className={cn("p-8 h-full flex flex-col gap-4", s.color)} hoverEffect={true}>
                            <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                                <s.icon size={32} strokeWidth={3} />
                            </div>
                            <h3 className="text-2xl font-black font-marker rotate-1">{s.title}</h3>
                            <p className="font-mono font-bold text-sm leading-relaxed">{s.desc}</p>
                            <div className="mt-auto pt-4 flex justify-end">
                                <ArrowRight className="w-8 h-8 rotate-45" strokeWidth={3} />
                            </div>
                        </WobblyBox>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 6. Manifesto (Horizontal Scroll Fixed)
export function Manifesto() {
    const container = useRef<HTMLElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!container.current || !wrapper.current) return;

        const ctx = gsap.context(() => {
            gsap.set(wrapper.current, { x: 0 });
            const panels = gsap.utils.toArray<HTMLElement>(".manifesto-panel");

            const getScrollDistance = () => {
                if (!wrapper.current) return 0;
                return wrapper.current.scrollWidth - window.innerWidth;
            };

            gsap.to(wrapper.current, {
                x: () => -getScrollDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => `+=${getScrollDistance()}`,
                    invalidateOnRefresh: true,
                }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const panels = [
        { id: "01", title: "Perfection is a Lie", desc: "Pixel perfection is for cowards. We build interfaces that feel human, raw, and alive.", color: "bg-white", rotate: "rotate-2" },
        { id: "02", title: "Loud is Good", desc: "If they aren't complaining about the font size, make it bigger.", color: "bg-pink-500 text-white", rotate: "-rotate-1" },
        { id: "03", title: "Ship it Ugly", desc: "Polish comes later. Functionality and personality come first.", color: "bg-black text-white", rotate: "rotate-3" },
        { id: "04", title: "Chaos is Order", desc: "Grid systems are just suggestions. We follow the rhythm of the user, not the ruler.", color: "bg-cyan-400", rotate: "-rotate-2" },
    ];

    return (
        <section ref={container} className="h-screen bg-yellow-400 overflow-hidden border-y-8 border-black relative text-black">
            <div className="absolute top-10 left-10 font-marker text-4xl -rotate-6 z-20">MANIFES.TO</div>
            <div ref={wrapper} className="flex h-full items-center pl-[15vw] pr-[15vw]">
                <div className="manifesto-panel min-w-[70vw] md:min-w-[40vw] flex flex-col justify-center flex-shrink-0">
                    <h2 className="text-[12vw] font-black uppercase leading-[0.8] font-sans">THE <br /> MANI <br /> FESTO</h2>
                    <ArrowRight className="w-32 h-32 mt-12 animate-bounce-horizontal" strokeWidth={6} />
                </div>
                {panels.map((p, i) => (
                    <div key={i} className="manifesto-panel min-w-[80vw] md:min-w-[50vw] px-12 flex items-center flex-shrink-0">
                        <WobblyBox className={cn("p-12 max-w-xl relative", p.color, p.rotate)} hoverEffect={true}>
                            <span className="text-[10vw] font-black opacity-10 absolute -top-16 -left-10 font-sans tracking-tighter">{p.id}</span>
                            <h3 className="text-4xl md:text-5xl font-black mb-6 font-marker">{p.title}</h3>
                            <p className="font-mono text-lg font-black leading-relaxed italic border-l-8 border-current pl-6">{p.desc}</p>
                            <div className="mt-8 flex justify-end"><Smile className="w-12 h-12" /></div>
                        </WobblyBox>
                    </div>
                ))}
                <div className="manifesto-panel min-w-[50vw] flex items-center justify-center flex-shrink-0">
                    <h2 className="text-[8vw] font-black uppercase text-white" style={{ WebkitTextStroke: '3px black' }}>END LOOP</h2>
                </div>
            </div>
        </section>
    );
}

// 7. Sketch Pricing
export function SketchPricing() {
    const plans = [
        { name: "Scribble", price: "$0", desc: "Free forever, if you can find the link.", color: "bg-white", features: ["1 Project", "Doodle UI", "Community Support"] },
        { name: "Marker", price: "$49", desc: "For the serious chaos seekers.", color: "bg-cyan-400", popular: true, features: ["Unlimited Projects", "Raw Source", "Priority Jiggle"] },
        { name: "Canvas", price: "$199", desc: "The 'Everything' bucket.", color: "bg-pink-500 text-white", features: ["Full Agency Acc", "Custom Scribbles", "Direct Line to God"] },
    ];

    return (
        <section className="py-40 px-6 bg-zinc-50 border-y-4 border-black text-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-32 relative">
                    <h2 className="text-6xl md:text-8xl font-black uppercase font-sans mb-4">Pick a <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Vibe</span></h2>
                    <div className="font-marker text-3xl text-pink-500 -rotate-3">( Money keeps us alive )</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {plans.map((p, i) => (
                        <WobblyBox key={i} className={cn("p-12 flex flex-col", p.color)} hoverEffect={true}>
                            {p.popular && <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center font-black text-xs rotate-12 shadow-[4px_4px_0px_black]">BEST AF</div>}
                            <h3 className="text-4xl font-black font-marker mb-2 uppercase">{p.name}</h3>
                            <div className="text-7xl font-black mb-8 tracking-tighter line-through decoration-red-500 decoration-8">{p.price}</div>
                            <div className="text-5xl font-black mb-12 tracking-tighter -mt-16 relative bg-white border-2 border-black inline-block px-4 rotate-2">{p.price === "$0" ? "FREE" : p.price}</div>
                            <ul className="space-y-6 mb-16 flex-1 font-mono font-bold text-lg">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-3">
                                        <Check className="w-8 h-8 text-black" strokeWidth={4} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-6 bg-black text-white font-marker text-3xl uppercase rotate-1 hover:-rotate-1 transition-transform border-4 border-transparent hover:border-black hover:bg-yellow-400 hover:text-black">
                                Select
                            </button>
                        </WobblyBox>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 8. Sketch Team
export function SketchTeam() {
    const team = [
        { name: "C. Chaos", role: "Grid Breaker", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Chaos" },
        { name: "P. Pixel", role: "Ugly Designer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Pixel" },
        { name: "B. Bloat", role: "Code Stripper", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Bloat" },
    ];

    return (
        <section className="py-40 px-6 bg-white relative overflow-hidden text-black">
             <div className="absolute top-0 right-0 w-64 h-64 border-l-8 border-b-8 border-black border-dashed opacity-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-6xl md:text-9xl font-black uppercase mb-32 tracking-tight">THE <span className="bg-yellow-400 px-4">CREW_</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {team.map((t, i) => (
                        <div key={i} className="group relative">
                            <WobblyBox className="aspect-square bg-white overflow-hidden p-0 mb-8" hoverEffect={true}>
                                <img src={t.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 -rotate-3" alt={t.name} />
                            </WobblyBox>
                            <h3 className="text-4xl font-black font-marker mb-2 uppercase rotate-2">{t.name}</h3>
                            <p className="font-mono font-bold text-lg text-zinc-500 uppercase tracking-widest">{t.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 9. Sketch FAQ
export function SketchFAQ() {
    const [open, setOpen] = useState(0);
    const faqs = [
        { q: "IS IT REALLY UGLY?", a: "To the untrained eye, yes. To the visionary, it is pure, unadulterated conversion-driven art." },
        { q: "WHY SHIPS FAST?", a: "Because we don't spend 40 hours arguing about the exact shade of grey. We pick black. Or white. Or pink. Then we ship." },
        { q: "REALLY NO REGRETS?", a: "None. We built this for speed. If it breaks, we fix it in public. That's the vibe." }
    ];

    return (
        <section className="py-40 px-6 bg-zinc-50 overflow-hidden text-black">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-center text-7xl font-black mb-24 font-marker uppercase rotate-3">QUESTIONS? <br /> ( PROBABLY NOT )</h2>
                <div className="space-y-8">
                    {faqs.map((f, i) => (
                        <WobblyBox key={i} className={cn("p-1 transition-all duration-500", open === i ? "bg-yellow-400" : "bg-white")} hoverEffect={false}>
                            <button 
                                onClick={() => setOpen(open === i ? -1 : i)}
                                className="w-full p-8 flex justify-between items-center text-left"
                            >
                                <span className="text-3xl font-black font-marker uppercase tracking-tight">{f.q}</span>
                                <div className={cn("w-12 h-12 border-4 border-black rounded-full flex items-center justify-center transition-transform duration-500", open === i ? "rotate-[135deg] bg-black text-white" : "rotate-0")}>
                                    <Plus strokeWidth={5} />
                                </div>
                            </button>
                            {open === i && (
                                <div className="px-8 pb-12 animate-in slide-in-from-top-2 duration-300">
                                    <p className="text-2xl font-mono font-black italic max-w-2xl border-l-[12px] border-black pl-8">{f.a}</p>
                                </div>
                            )}
                        </WobblyBox>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 10. Sketch Stats
export function SketchStats() {
    const stats = [
        { label: "COFFEE / HR", val: "128", color: "bg-pink-300" },
        { label: "BUGS PINNED", val: "404", color: "bg-cyan-300" },
        { label: "USERS SCARED", val: "99k", color: "bg-yellow-300" }
    ];

    return (
        <section className="py-20 bg-black text-white border-y-8 border-black">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-1px bg-zinc-800 text-white">
                {stats.map((s, i) => (
                    <div key={i} className="py-24 px-12 flex flex-col items-center group bg-black transition-colors hover:bg-zinc-900">
                        <div className="text-[10vw] font-black leading-none mb-4 group-hover:scale-110 transition-transform font-sans uppercase">{s.val}</div>
                        <div className={cn("font-marker text-3xl text-black px-6 py-2 rotate-2 group-hover:-rotate-2 transition-transform", s.color)}>{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 11. Sketch Clients
export function SketchClients() {
    const clients = ["NIKE.ISH", "RE-APPLE", "NOT-ION", "GOGGLE", "FI-MA", "DORITO"];
    return (
        <section className="py-20 bg-white border-b-4 border-black text-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-20">
                    {clients.map(c => (
                        <div key={c} className="text-4xl md:text-6xl font-black font-marker opacity-20 hover:opacity-100 hover:text-pink-500 cursor-default transition-all uppercase skew-x-12">
                            {c}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 12. Sketch Testimonials
export function SketchTestimonials() {
    const reviews = [
        { name: "B. Gates", text: "I tried to buy them. They scribbled over the check. 10/10.", rotate: "-rotate-2", color: "bg-yellow-200" },
        { name: "S. Jobs", text: "Finally, something that isn't a rounded rectangle. Pure genius.", rotate: "rotate-1", color: "bg-pink-100" },
        { name: "E. Musk", text: "Too much chaos for even me. I'm scared.", rotate: "rotate-3", color: "bg-cyan-100" },
    ];

    return (
        <section className="py-40 bg-zinc-50 relative text-black">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
                {reviews.map((r, i) => (
                    <div key={i} className={cn("relative p-12 border-4 border-black shadow-[12px_12px_0px_black] aspect-square flex flex-col justify-between", r.color, r.rotate)}>
                        <Quote className="w-16 h-16 opacity-10 absolute top-8 left-8" />
                        <p className="text-3xl font-marker font-black leading-tight mt-12">"{r.text}"</p>
                        <div className="font-mono font-black text-xl border-t-4 border-black pt-4">-- {r.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 13. Sketch Newsletter
export function SketchNewsletter() {
    return (
        <section className="py-40 px-6 bg-yellow-400 text-black">
            <div className="max-w-4xl mx-auto">
                <WobblyBox className="p-16 text-center bg-white rotate-1" hoverEffect={true}>
                    <h2 className="text-6xl md:text-7xl font-black font-marker uppercase mb-8">JOIN THE MADNESS</h2>
                    <p className="font-mono font-bold text-xl mb-12 max-w-lg mx-auto italic">We send emails that look like ransom notes. You'll love it.</p>
                    <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                        <input type="text" placeholder="YOUR.EMAIL@HERE" className="flex-1 bg-zinc-50 border-4 border-black p-6 font-mono font-black text-2xl focus:outline-none" />
                        <button className="bg-black text-white px-12 py-6 font-marker text-4xl uppercase hover:bg-pink-500 hover:text-black transition-colors rotate-1">HELL YES</button>
                    </div>
                </WobblyBox>
            </div>
        </section>
    );
}

// 14. Footer
export function Footer() {
    return (
        <footer className="bg-white pt-20 pb-10 px-6 border-t-4 border-black relative overflow-hidden text-black">
            <div className="max-w-7xl mx-auto text-center">
                <div className="relative inline-block">
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 z-10 relative font-sans">BOOK US <br /> MAYBE?</h2>
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] -z-0 rotate-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="48" ry="40" stroke="yellow" strokeWidth="4" fill="none" className="opacity-50" />
                        <ellipse cx="50" cy="50" rx="46" ry="38" stroke="black" strokeWidth="2" fill="none" strokeDasharray="10 10" />
                    </svg>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
                    <a href="mailto:chaos@sketch.up" className="text-2xl font-mono font-bold hover:bg-yellow-300 px-4 py-2 border-2 border-transparent hover:border-black transition-all -rotate-1">chaos@sketch.up</a>
                    <a href="#" className="text-2xl font-mono font-bold hover:bg-pink-300 px-4 py-2 border-2 border-transparent hover:border-black transition-all rotate-1">@sketch_up</a>
                </div>
                <div className="mt-20 pt-8 border-t-4 border-black border-dashed flex justify-between font-mono text-xs font-bold uppercase">
                    <div>© 2024 Sketch Up Inc.</div>
                    <div>No Rights Reserved. Copy This.</div>
                </div>
            </div>
        </footer>
    );
};