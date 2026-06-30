"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Palette,
  BarChart3,
  Search,
  ArrowRight,
  Zap,
  Layers,
  Target,
  Sparkles,
  Users,
  Code,
  PenTool,
  Megaphone,
  Video,
  Map,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagPill from "@/components/TagPill";
import ClayCard from "@/components/ClayCard";
import ClayIllustration from "@/components/ClayIllustration";
import IndustriesMarquee from "@/components/IndustriesMarquee";
import TechMarquee from "@/components/TechMarquee";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CreativeHeading from "@/components/CreativeHeading";
import { ImagesBadge } from "@/components/ui/images-badge";
import { Particles } from "@/components/ui/particles";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Design & Development",
    badge: "WEB STUDIO",
    image: "/images/clay-web-design.png",
    desc: "We build high-performance, tactile digital experiences that convert visitors into loyal customers.",
    features: [
      "Basic & Business Websites",
      "Premium Custom Solutions",
      "Mobile Responsive Design",
      "WhatsApp & Form Integration",
      "Advanced SEO & Speed Optimization",
      "Custom UI/UX Prototyping",
      "Domain & Hosting Setup Support"
    ]
  },
  {
    icon: Search,
    title: "SEO & Website Optimization",
    badge: "SEO OPTIM",
    desc: "Boost organic visibility and site speed. Core web vitals, indexation, and comprehensive analytics setup.",
    features: [
      "Technical SEO",
      "Website Speed Optimization",
      "Mobile Optimization",
      "Google Search Console Setup",
      "Google Analytics Integration",
      "Website Maintenance"
    ]
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    badge: "SOCIAL GROWTH",
    image: "/images/clay-social-media.png",
    desc: "We help brands grow their presence, engagement, and reach across all major social platforms.",
    features: [
      "Monthly Management & Strategy",
      "Static Post & Story Design",
      "Reels Creation & Short Video Editing",
      "Caption & Hashtag Research",
      "Competitor Analysis & Reports",
      "Dedicated Social Growth Manager",
      "Meta Ad Campaign Setup Assistance"
    ]
  },
  {
    icon: Video,
    title: "Reel Editing & Content Creation",
    badge: "CONTENT LAB",
    image: "/images/clay-reel-editing.png",
    desc: "High-impact short-form videos, scripting, captions, and thumbnails that drive engagement and organic virality.",
    features: [
      "Short-form Video Editing",
      "Caption & Script Writing",
      "Thumbnail Design",
      "Content Repurposing",
      "Professional Color Grading",
      "Sound FX & Trending Audio Matching",
      "Hook & Engagement Optimization"
    ]
  },
  {
    icon: BarChart3,
    title: "Paid Advertising",
    badge: "ADS MANAGEMENT",
    desc: "High-ROI campaigns across Meta and Google to capture leads, drive conversions, and maximise ROAS.",
    features: [
      "Instagram Ads",
      "Facebook Ads",
      "Google Ads",
      "Lead Generation Campaigns",
      "Retargeting Ads",
      "Campaign Optimization"
    ]
  },
  {
    icon: Palette,
    title: "Graphic Design",
    badge: "VISUAL IDENTITY",
    image: "/images/clay-graphic-design.png",
    desc: "Custom brand design collateral, visual logo systems, and digital assets designed to make your brand memorable.",
    features: [
      "Logo & Brand Visual Systems",
      "Social Media Visual Assets",
      "Visiting Cards & Stationeries",
      "Brochure, Flyer & Print Design",
      "Custom Visual Illustration Packs",
      "Pitch Decks & Presentation Templates"
    ]
  },
  {
    icon: Layers,
    title: "Growth Packages",
    badge: "SCALE UP",
    image: "/images/clay-shapes-stacked-v3.png",
    desc: "All-in-one packages combining web, design, paid ads, and social for maximum digital impact.",
    features: [
      "Website + Social Media Bundle",
      "Full Growth Acceleration Package",
      "Integrated Brand Strategy",
      "Monthly Marketing Strategy Audits",
      "Conversion Funnel Optimization"
    ]
  }
];

const PROCESS = [
  { num: "01", title: "Discovery & Research", desc: "We dive deep into your business, audience, and competition to lay a strategic foundation.", icon: Search },
  { num: "02", title: "Strategy & Planning", desc: "A tailored game plan covering user experience, design direction, tech stack, and timeline.", icon: Map },
  { num: "03", title: "Design & Development", desc: "We craft pixel-perfect designs in Figma and bring them to life with clean, high-performance code.", icon: Code },
  { num: "04", title: "Launch & Optimise", desc: "Post-launch support, performance monitoring, and optimizations to keep your brand scaling.", icon: Target },
];

const WHY_US = [
  { icon: Sparkles, title: "Design Excellence", desc: "Every pixel is intentional. We obsess over the details so your audience doesn't have to think twice." },
  { icon: Target, title: "Results-Driven", desc: "Beautiful is the baseline. We optimise for conversions, speed, and engagement metrics that matter." },
  { icon: Zap, title: "Lightning Fast", desc: "Agile workflows and sprint-based delivery mean you get to market faster without sacrificing quality." },
  { icon: Users, title: "Dedicated Team", desc: "No handoffs to juniors. The senior team you meet is the team that builds your project from day one." },
  { icon: Code, title: "Modern Tech Stack", desc: "Next.js, React, GSAP, Three.js — we use the same tools that power the world's best digital experiences." },
  { icon: PenTool, title: "Full Ownership", desc: "You own everything we create — code, designs, assets, domains. No vendor lock-in, ever." },
];

const FAQS = [
  { q: "How long does a typical project take?", a: "Most websites take 4–8 weeks from kickoff to launch. Branding projects are usually 3–5 weeks. Complex web applications can take 8–16 weeks depending on scope." },
  { q: "What does your pricing look like?", a: "We offer project-based pricing starting from ₹50,000 for landing pages and ₹1,50,000+ for full websites. Every project gets a detailed proposal before we start." },
  { q: "Do you work with businesses outside Delhi NCR?", a: "Absolutely. While we're based in Delhi NCR, we work with clients across India and internationally. All collaboration happens seamlessly via video calls and shared workspaces." },
  { q: "What happens after the website launches?", a: "We offer ongoing maintenance and growth retainers. This includes hosting management, performance monitoring, content updates, and monthly optimisation sprints." },
  { q: "Can you redesign my existing website?", a: "Yes! Many of our projects are redesigns. We audit your current site, identify what's working, and build a new experience that preserves what's good while fixing what isn't." },
];

const TECH_ICONS = {
  "Next.js": (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.02 15.42L7.33 12.3h2.36l2.36 3.12h.06v-3.12h1.8v5.12h-1.39l-3.23-4.22h-.06v4.22h-1.8zm5.77 0V12.3h1.8v5.12h-1.8z" />
    </svg>
  ),
  React: (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  GSAP: (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  "Three.js": (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Figma: (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 12a3.5 3.5 0 1 1 0-7H12v7H8.5zm0-7A3.5 3.5 0 0 0 5 8.5C5 10.43 6.57 12 8.5 12H12V5H8.5zM15.5 12a3.5 3.5 0 0 1 3.5 3.5c0 1.93-1.57 3.5-3.5 3.5H12v-7h3.5zm-3.5 0h3.5a3.5 3.5 0 0 0 3.5-3.5C19 6.57 17.43 5 15.5 5H12v7zm0 0v7h3.5a3.5 3.5 0 1 0 0-7H12z" />
    </svg>
  ),
  "Framer Motion": (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l12 12h-12l-12-12h24zm0 24l-12-12h12l12 12h-24z" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm-1 15.5l-4-2.3v-4.4l4 2.3v4.4zm5.5-3.2l-4 2.3v-4.4l4-2.3v4.4z" />
    </svg>
  ),
  Vercel: (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  ),
  Shopify: (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  WordPress: (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8.67 6.13c.27.67.43 1.39.43 2.15 0 2.22-1.07 4.19-2.73 5.43l-3.32-9.61c3.15.53 5.12 1.25 5.62 2.03zM12 3.75c1.47 0 2.82.41 3.98 1.11l-2.42 7.02L11 6.54c.73-.08 1.4-.13 1.4-.13.38-.03.35-.61-.03-.58 0 0-1.28.1-2.11.1-.8 0-2.08-.1-2.08-.1-.38-.03-.41.55-.03.58 0 0 .54.05.9.1l2.58 7.21-2.58 7.74L5 6.64c.36-.05.9-.1.9-.1.38-.03.35-.61-.03-.58 0 0-1.28.1-2.11.1-.64 0-1.63-.07-1.92-.09C3.65 4.38 7.55 3.75 12 3.75zm-6.2 9.07l2.84 8.24A8.204 8.204 0 0 1 3.8 12c0-1.12.21-2.19.59-3.18zm8.01 7.84L10.02 9.17l3.79 11.49z" />
    </svg>
  ),
  "Google Analytics": (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  "Meta Ads": (
    <svg className="w-5 h-5 text-[#C4501A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14 7.64c-.94-.85-2.22-1.32-3.53-1.32-1.74 0-3.33.84-4.22 2.25l-.2.32-.2-.32C10.1 7.16 8.51 6.32 6.77 6.32c-1.31 0-2.59.47-3.53 1.32C1.35 9.34.25 11.75.25 14.33c0 2.58 1.1 4.99 2.99 6.69.94.85 2.22 1.32 3.53 1.32 1.74 0 3.33-.84 4.22-2.25l.2-.32.2.32c.89 1.41 2.48 2.25 4.22 2.25 1.31 0 2.59-.47 3.53-1.32 1.89-1.7 2.99-4.11 2.99-6.69 0-2.58-1.1-4.99-2.99-6.69zm-12.37 11c-1.92 0-3.48-1.57-3.48-3.5 0-1.93 1.56-3.5 3.48-3.5s3.48 1.57 3.48 3.5c0 1.93-1.56 3.5-3.48 3.5zm8.85 0c-1.92 0-3.48-1.57-3.48-3.5 0-1.93 1.56-3.5 3.48-3.5s3.48 1.57 3.48 3.5c0 1.93-1.56 3.5-3.48 3.5z" />
    </svg>
  ),
};

const TECH_STACK = [
  "Next.js", "React", "GSAP", "Three.js", "Figma", "Framer Motion",
  "Node.js", "Vercel", "Shopify", "WordPress", "Google Analytics", "Meta Ads",
];

// Framer Motion Animation Variants
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 22,
      delay: 0.4,
    },
  },
};

function ServiceCard({ s, isExpanded, isMobile, onHover, isRowActive }) {
  const Icon = s.icon;

  return (
    <div
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`relative overflow-hidden rounded-[20px] border smooth-expand w-full h-full cursor-pointer flex p-6 md:p-7
        ${isExpanded 
          ? "border-[var(--terracotta)]/50 bg-[var(--blush)] shadow-[0_22px_48px_rgba(0,0,0,0.12)]" 
          : "border-[var(--blush-border)] bg-[var(--sand)] shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:border-[var(--terracotta)]/30"
        }`}
    >
      <div className="flex w-full h-full flex-row justify-between items-center gap-6">
        
        {/* Left Column: Text Content */}
        <div className={`flex flex-col items-start smooth-expand shrink-0 ${isExpanded && !isMobile ? "w-[58%]" : "w-full"}`}>
          {/* Icon */}
          <div
            className={`flex items-center justify-center rounded-[14px] text-[#C4501A] smooth-expand
              ${isExpanded ? "w-14 h-14 bg-[#C4501A]/18 mb-4" : "w-11 h-11 bg-[#C4501A]/10 mb-3"}`}
          >
            <Icon size={isExpanded ? 26 : 20} />
          </div>

          {/* Badge */}
          {s.badge && (
            <span
              className="text-[10px] font-bold tracking-wider uppercase text-[#C4501A] bg-[#C4501A]/9 border border-[#C4501A]/17 px-2.5 py-1 rounded-full mb-2 inline-block"
            >
              {s.badge}
            </span>
          )}

          {/* Title */}
          <h3
            className={`font-bold tracking-tight text-[var(--ink)] smooth-expand leading-tight
              ${isExpanded ? "text-2xl mb-2" : "text-[16px] md:text-[18px] mb-0"}`}
          >
            {s.title}
          </h3>

          {/* Description Paragraph (Always in DOM, height transitioned smoothly) */}
          <div
            className={`smooth-expand overflow-hidden w-full
              ${isExpanded ? "opacity-100 max-h-24 mt-2" : "opacity-0 max-h-0 pointer-events-none mt-0"}`}
          >
            {s.desc && (
              <p className="text-sm text-[var(--ink-60)] leading-relaxed">
                {s.desc}
              </p>
            )}
          </div>

          {/* Features List (Single stable list: extra items transition max-height and opacity) */}
          <ul className="list-none p-0 mt-3 flex flex-col gap-2 w-full">
            {s.features.map((f, i) => {
              const isExtra = i >= (isRowActive ? 5 : 3);
              return (
                <li
                  key={i}
                  className={`flex items-center gap-2 text-xs font-semibold text-[var(--ink)] smooth-expand
                    ${isExtra && !isExpanded 
                      ? "opacity-0 max-h-0 overflow-hidden pointer-events-none mt-0 py-0" 
                      : "opacity-100 max-h-8 py-0.5"}`}
                >
                  <span className="text-[#C4501A] font-bold text-sm leading-none">•</span>
                  <span className="truncate">{f}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column: Styled Preview Box (always in DOM on desktop to prevent mounting delays) */}
        {!isMobile && (
          <div
            className={`smooth-expand flex items-center justify-center pl-2 overflow-hidden shrink-0
              ${isExpanded ? "w-[42%] opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
          >
            <img
              src={s.image}
              alt={s.title}
              className={`max-w-[100%] max-h-[220px] object-contain mix-blend-multiply filter drop-shadow-[0_12px_32px_rgba(28,15,10,0.12)] transition-all duration-500
                ${isExpanded ? "scale-100 rotate-0" : "scale-90 rotate-2"}`}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeId, setActiveId] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [particleColor, setParticleColor] = useState("#C4501A");

  useEffect(() => {
    // Sync particle color to active theme state (MutationObserver captures custom data-theme switch)
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      setParticleColor(isDark ? "#FAF5F2" : "#C4501A");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setParticleColor(isDark ? "#FAF5F2" : "#C4501A");

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const listener = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  const SELECTED_SERVICES = SERVICES.filter((s) =>
    [
      "Website Design & Development",
      "Social Media Management",
      "Reel Editing & Content Creation",
      "Graphic Design",
      "Growth Packages",
    ].includes(s.title)
  );

  const row1Cards = [
    SELECTED_SERVICES.find(s => s.title === "Website Design & Development"),
    SELECTED_SERVICES.find(s => s.title === "Social Media Management")
  ];

  const row2Cards = [
    SELECTED_SERVICES.find(s => s.title === "Graphic Design"),
    SELECTED_SERVICES.find(s => s.title === "Reel Editing & Content Creation"),
    SELECTED_SERVICES.find(s => s.title === "Growth Packages")
  ];

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="section section--sand section--first relative" id="hero" style={{ overflow: "hidden" }}>
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={80}
          ease={80}
          color={particleColor}
          size={2.0}
          refresh
        />
        <div className="container hero relative z-10">
          {/* Left – Text */}
          <motion.div
            className="hero-text"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <TagPill>Digital Agency</TagPill>
            </motion.div>

            <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              <CreativeHeading
                text="We Build Digital Presences That Actually Work."
                highlight="Actually Work."
                className="text-hero"
              />
            </div>

            <motion.p
              className="text-body"
              style={{ maxWidth: 480 }}
              variants={fadeInUp}
            >
              Websites, brands, and campaigns for businesses ready to grow — not
              just look good. We combine craft with strategy to create digital
              experiences that drive real results.
            </motion.p>

            <motion.div className="hero-cta-row" variants={fadeInUp}>
              <Link href="/contact" className="btn btn-primary" id="hero-cta-primary">
                Start a Project <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="btn btn-secondary" id="hero-cta-secondary">
                See Our Work
              </Link>
            </motion.div>

            <motion.div className="hero-trust" variants={fadeInUp}>
              <div className="icon-stack">
                <div className="icon-circle"><Zap size={18} /></div>
                <div className="icon-circle"><Layers size={18} /></div>
                <div className="icon-circle"><Target size={18} /></div>
              </div>
              <span className="hero-trust-text">
                Trusted by businesses across Delhi NCR
              </span>
            </motion.div>
          </motion.div>

          {/* Right – Illustrated 3D Clay Laptop */}
          <motion.div
            className="hero-illustration"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="scene-container">
              <ClayIllustration
                src="/images/clay-browser-laptop-v3.png"
                alt="3D clay-rendered browser laptop window"
                width={520}
                height={460}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INDUSTRIES WE SERVE ═══ */}
      <section className="section section--sand" id="industries" style={{ overflow: "hidden" }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                }
              }
            }}
            className="section-header"
            style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem auto" }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              <TagPill>Industries We Serve</TagPill>
            </motion.div>

            <motion.div
              style={{ marginTop: "0.75rem" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
                }
              }}
            >
              <CreativeHeading
                text="Helping Businesses Across Industries"
                highlight="Across Industries"
                className="text-h1"
              />
            </motion.div>

            <motion.p
              className="text-body"
              style={{ marginTop: "1.25rem", color: "var(--ink-60)" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
                }
              }}
            >
              From ambitious startups to established local businesses, we create digital experiences that help brands grow, build trust, and attract more customers.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <IndustriesMarquee />
          </motion.div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="section section--blush-deep" id="process" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="section-header">
            <TagPill>Our Process</TagPill>
            <div style={{ marginTop: "0.5rem" }}>
              <CreativeHeading
                text="How We Make It Happen"
                highlight="Happen"
                className="text-h1"
              />
            </div>
            <p className="text-body" style={{ marginTop: "1rem" }}>
              A proven four-step approach that turns ideas into high-performing digital experiences — on time, every time.
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto py-12 md:py-20 mt-12">
            {/* SVG S-Curve dotted timeline path (Desktop only) */}
            <svg 
              className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-40 h-full pointer-events-none hidden md:block" 
              viewBox="0 0 160 800" 
              preserveAspectRatio="none"
            >
              <path
                d="M 80 20 C 180 180, -20 220, 80 400 C 180 580, -20 620, 80 800"
                fill="none"
                stroke="var(--terracotta)"
                strokeWidth="2.5"
                strokeDasharray="6,6"
                opacity="0.35"
              />
            </svg>

            {/* Straight vertical line for mobile */}
            <div className="absolute left-6 top-4 bottom-4 w-[2px] border-l-2 border-dashed border-[#C4501A]/35 md:hidden" />

            <div className="flex flex-col gap-12 md:gap-16 relative">
              {PROCESS.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                const Icon = step.icon;

                // Alternate background styling based on brand colors
                let bgClass = "";
                let textClass = "";
                let descClass = "";
                let bubbleClass = "";
                let iconClass = "";

                if (idx === 0) {
                  bgClass = "bg-[var(--terracotta)] shadow-[0_12px_32px_rgba(0,0,0,0.15)]";
                  textClass = "text-white";
                  descClass = "text-white/80";
                  bubbleClass = "bg-[var(--sand)] shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.04),_0_8px_16px_rgba(0,0,0,0.1)]";
                  iconClass = "text-[var(--terracotta)]";
                } else if (idx === 1) {
                  bgClass = "bg-[var(--blush)] border border-[var(--blush-border)]/30 shadow-[0_12px_32px_rgba(0,0,0,0.04)]";
                  textClass = "text-[var(--ink)]";
                  descClass = "text-[var(--ink-60)]";
                  bubbleClass = "bg-[var(--terracotta)] shadow-[0_8px_16px_rgba(196,80,26,0.15)]";
                  iconClass = "text-white";
                } else if (idx === 2) {
                  bgClass = "bg-[var(--card-dark-bg)] shadow-[0_12px_32px_rgba(0,0,0,0.2)]";
                  textClass = "text-white";
                  descClass = "text-white/70";
                  bubbleClass = "bg-[var(--terracotta)] shadow-[0_8px_16px_rgba(196,80,26,0.15)]";
                  iconClass = "text-white";
                } else {
                  bgClass = "bg-[var(--terracotta)] shadow-[0_12px_32px_rgba(0,0,0,0.15)]";
                  textClass = "text-white";
                  descClass = "text-white/80";
                  bubbleClass = "bg-[var(--sand)] shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.04),_0_8px_16px_rgba(0,0,0,0.1)]";
                  iconClass = "text-[var(--terracotta)]";
                }

                return (
                  <motion.div 
                    key={step.num}
                    className="w-full flex flex-col md:grid md:grid-cols-[1fr_100px_1fr] items-center relative"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, delay: idx * 0.1 }}
                  >
                    {/* LEFT COLUMN */}
                    <div className={`w-full flex ${isLeft ? "justify-start pl-12 pr-4 md:pl-0 md:justify-end md:pr-0" : "justify-start pl-12 pr-4 md:pl-0 md:justify-end md:pr-12 md:text-right order-2 md:order-1"}`}>
                      {isLeft ? (
                        /* Left Card: on mobile, bubble is on the left; on desktop, bubble is on the right next to center line */
                        <motion.div 
                          whileHover={{ scale: 1.02, y: -4 }}
                          className={`w-full max-w-[420px] rounded-[24px] md:rounded-full py-4 px-8 md:px-10 flex flex-row-reverse md:flex-row items-center justify-between gap-6 transition-all duration-300 ${bgClass}`}
                        >
                          <div className="flex flex-col flex-1 text-left">
                            <h3 className={`text-base md:text-lg font-bold tracking-tight mb-1 ${textClass}`}>{step.title}</h3>
                            <p className={`text-xs md:text-sm leading-relaxed ${descClass}`}>{step.desc}</p>
                          </div>
                          <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${bubbleClass}`}>
                            {Icon && <Icon className={iconClass} size={20} />}
                          </div>
                        </motion.div>
                      ) : (
                        /* Step Number Indicator (Left Card Row) - hidden on mobile */
                        <div className="hidden md:flex flex-col items-end pr-10">
                          <span className="font-display text-5xl font-extrabold text-[var(--terracotta)]/35 tracking-tight">{`STEP ${step.num}`}</span>
                          <span className="text-[10px] font-bold tracking-widest text-[var(--ink-30)]/40 uppercase mt-1">Our Process</span>
                        </div>
                      )}
                    </div>

                    {/* MIDDLE COLUMN (Timeline dot/ring - matches SVG path crossing) */}
                    <div className="absolute left-6 top-[28px] md:top-1/2 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:static md:translate-y-0 flex items-center justify-center h-full order-1 md:order-2 z-10">
                      <div className="w-5 h-5 rounded-full bg-[var(--sand)] border-4 border-[var(--terracotta)] shadow-sm" />
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className={`w-full flex ${isLeft ? "justify-start pl-12 pr-4 md:pl-0 md:justify-start md:pl-12 text-left order-3 md:order-3" : "justify-start pl-12 pr-4 md:pl-0 order-3 md:order-3"}`}>
                      {isLeft ? (
                        /* Step Number Indicator (Right Card Row) - hidden on mobile */
                        <div className="hidden md:flex flex-col items-start pl-10">
                          <span className="font-display text-5xl font-extrabold text-[var(--terracotta)]/35 tracking-tight">{`STEP ${step.num}`}</span>
                          <span className="text-[10px] font-bold tracking-widest text-[var(--ink-30)]/40 uppercase mt-1">Our Process</span>
                        </div>
                      ) : (
                        /* Right Card: bubble is on the left next to central line on desktop, and next to left line on mobile */
                        <motion.div 
                          whileHover={{ scale: 1.02, y: -4 }}
                          className={`w-full max-w-[420px] rounded-[24px] md:rounded-full py-4 px-8 md:px-10 flex flex-row-reverse items-center justify-between gap-6 transition-all duration-300 ${bgClass}`}
                        >
                          <div className="flex flex-col flex-1 text-left">
                            <h3 className={`text-base md:text-lg font-bold tracking-tight mb-1 ${textClass}`}>{step.title}</h3>
                            <p className={`text-xs md:text-sm leading-relaxed ${descClass}`}>{step.desc}</p>
                          </div>
                          <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${bubbleClass}`}>
                            {Icon && <Icon className={iconClass} size={20} />}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Mobile Only: Step Number Tag */}
                    <div className="w-full pl-12 pr-4 md:hidden mt-2 mb-4 order-3 flex items-center gap-2">
                      <span className="font-display text-[10px] font-extrabold tracking-widest text-[#C4501A]/55 uppercase">{`STEP ${step.num}`}</span>
                      <div className="h-[1px] bg-[#D9C8BF]/30 flex-1" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW ═══ */}
      <section className="section section--blush" id="services-preview">
        <div className="container">
          <div className="section-header">
            <TagPill>What We Do</TagPill>
            <div style={{ marginTop: "0.5rem" }}>
              <CreativeHeading
                text="Everything Your Brand Needs to Stand Out"
                highlight="Stand Out"
                className="text-h1"
              />
            </div>
            <p className="text-body" style={{ marginTop: "1rem" }}>
              From first impression to lasting impact — we handle design,
              development, branding, and marketing under one roof.
            </p>
          </div>

          <div className="w-full flex flex-col gap-6 md:h-[760px] pb-6 overflow-visible">
            {/* Top Row: 2 cards */}
            <div
              className="flex flex-col md:flex-row gap-6 w-full smooth-expand flex-nowrap"
              style={{
                flexGrow: (activeId === 0 || activeId === 1) ? 1.4 : 1,
                flexShrink: 1,
                flexBasis: isMobile ? "auto" : "0%",
              }}
            >
              <motion.div
                className="h-full flex smooth-expand"
                style={{
                  flexGrow: activeId === 0 ? 2.5 : 1,
                  flexShrink: 1,
                  flexBasis: isMobile ? "auto" : "0%",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 150, damping: 22 }}
              >
                <ServiceCard
                  s={{ ...row1Cards[0], row: 1 }}
                  isExpanded={activeId === 0}
                  isMobile={isMobile}
                  onHover={() => setActiveId(0)}
                  isRowActive={activeId === 0 || activeId === 1}
                />
              </motion.div>

              <motion.div
                className="h-full flex smooth-expand"
                style={{
                  flexGrow: activeId === 1 ? 2.5 : 1,
                  flexShrink: 1,
                  flexBasis: isMobile ? "auto" : "0%",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 150, damping: 22, delay: 0.05 }}
              >
                <ServiceCard
                  s={{ ...row1Cards[1], row: 1 }}
                  isExpanded={activeId === 1}
                  isMobile={isMobile}
                  onHover={() => setActiveId(1)}
                  isRowActive={activeId === 0 || activeId === 1}
                />
              </motion.div>
            </div>

            {/* Bottom Row: 3 cards */}
            <div
              className="flex flex-col md:flex-row gap-6 w-full smooth-expand flex-nowrap"
              style={{
                flexGrow: (activeId === 2 || activeId === 3 || activeId === 4) ? 1.4 : 1,
                flexShrink: 1,
                flexBasis: isMobile ? "auto" : "0%",
              }}
            >
              <motion.div
                className="h-full flex smooth-expand"
                style={{
                  flexGrow: activeId === 2 ? 1.8 : 1,
                  flexShrink: 1,
                  flexBasis: isMobile ? "auto" : "0%",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 150, damping: 22, delay: 0.1 }}
              >
                <ServiceCard
                  s={{ ...row2Cards[0], row: 2 }}
                  isExpanded={activeId === 2}
                  isMobile={isMobile}
                  onHover={() => setActiveId(2)}
                  isRowActive={activeId === 2 || activeId === 3 || activeId === 4}
                />
              </motion.div>

              <motion.div
                className="h-full flex smooth-expand"
                style={{
                  flexGrow: activeId === 3 ? 1.8 : 1,
                  flexShrink: 1,
                  flexBasis: isMobile ? "auto" : "0%",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 150, damping: 22, delay: 0.15 }}
              >
                <ServiceCard
                  s={{ ...row2Cards[1], row: 2 }}
                  isExpanded={activeId === 3}
                  isMobile={isMobile}
                  onHover={() => setActiveId(3)}
                  isRowActive={activeId === 2 || activeId === 3 || activeId === 4}
                />
              </motion.div>

              <motion.div
                className="h-full flex smooth-expand"
                style={{
                  flexGrow: activeId === 4 ? 1.8 : 1,
                  flexShrink: 1,
                  flexBasis: isMobile ? "auto" : "0%",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 150, damping: 22, delay: 0.2 }}
              >
                <ServiceCard
                  s={{ ...row2Cards[2], row: 2 }}
                  isExpanded={activeId === 4}
                  isMobile={isMobile}
                  onHover={() => setActiveId(4)}
                  isRowActive={activeId === 2 || activeId === 3 || activeId === 4}
                />
              </motion.div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "clamp(2rem, 4vw, 3rem)" }}>
            <Link href="/services" className="btn btn-secondary" id="services-cta">
              All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section className="section section--sand relative" id="why-us" style={{ overflow: "hidden" }}>
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={60}
          ease={80}
          color={particleColor}
          size={2.0}
          refresh
        />
        <div className="container relative z-10">
          <div className="section-header">
            <TagPill>Why KP Creatives</TagPill>
            <div style={{ marginTop: "0.5rem" }}>
              <CreativeHeading
                text="Craft Meets Strategy"
                highlight="Strategy"
                className="text-h1"
              />
            </div>
            <p className="text-body" style={{ marginTop: "1rem" }}>
              We don&apos;t just make things pretty — we make them perform. Every decision is backed by your business goals.
            </p>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-y-12 gap-x-6 mt-12 w-full"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {WHY_US.map((item, idx) => {
              // Assign distinct clay graphic image stacks for each badge
              let badgeImages = [];
              if (idx === 0) {
                badgeImages = ["/images/clay-web-design.png", "/images/clay-graphic-design.png", "/images/clay-picture-frames.png"];
              } else if (idx === 1) {
                badgeImages = ["/images/clay-magnifying-glass.png", "/images/clay-shapes-stacked.png", "/images/clay-digital-transformation.png"];
              } else if (idx === 2) {
                badgeImages = ["/images/clay-mouse-solid.png", "/images/clay-browser-laptop-solid.png", "/images/clay-toolbox.png"];
              } else if (idx === 3) {
                badgeImages = ["/images/clay-phone-envelope.png", "/images/clay-picture-frames.png", "/images/clay-social-media.png"];
              } else if (idx === 4) {
                badgeImages = ["/images/clay-web-design.png", "/images/clay-browser-laptop.png", "/images/clay-digital-transformation.png"];
              } else {
                badgeImages = ["/images/clay-toolbox.png", "/images/clay-shapes-stacked.png", "/images/clay-crumpled-paper.png"];
              }

              return (
                <motion.div 
                  key={item.title} 
                  variants={fadeInUp}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] flex justify-center py-2"
                >
                  <div className="flex flex-col items-center text-center w-full max-w-[290px]">
                    <div className="h-16 flex items-center justify-center relative overflow-visible">
                      <ImagesBadge
                        text={item.title}
                        images={badgeImages}
                        folderSize={{ width: 52, height: 38 }}
                        teaserImageSize={{ width: 44, height: 30 }}
                        hoverImageSize={{ width: 130, height: 100 }}
                        hoverTranslateY={-95}
                        hoverSpread={45}
                      />
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed text-[var(--ink-60)] mt-4 px-4">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="section section--blush" id="tech-stack">
        <div className="container">
          <div className="section-header">
            <TagPill>Our Stack</TagPill>
            <div style={{ marginTop: "0.5rem" }}>
              <CreativeHeading
                text="Tools We Use"
                highlight="Use"
                className="text-h2"
              />
            </div>
            <p className="text-body" style={{ marginTop: "1rem" }}>
              We use the same modern tools that power the world&apos;s best digital experiences.
            </p>
          </div>
          <TechMarquee />
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section section--blush-deep" id="testimonials">
        <div className="container">
          <div className="section-header">
            <TagPill>Client Love</TagPill>
            <div style={{ marginTop: "0.5rem" }}>
              <CreativeHeading
                text="Don't Take Our Word For It"
                highlight="For It"
                className="text-h1"
              />
            </div>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section section--sand" id="faq">
        <div className="container">
          <div className="section-header">
            <TagPill>FAQ</TagPill>
            <div style={{ marginTop: "0.5rem" }}>
              <CreativeHeading
                text="Questions We Get A Lot"
                highlight="A Lot"
                className="text-h1"
              />
            </div>
          </div>
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section" id="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <TagPill>Let&apos;s Talk</TagPill>
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "0.5rem" }}>
              <CreativeHeading
                text="Ready to Build Something Remarkable?"
                highlight="Remarkable?"
                className="text-h1 text-center"
                style={{ color: "#FFF9F6", justifyContent: "center" }}
              />
            </div>
            <p className="text-body">
              Get a free audit of your current digital presence and discover
              exactly where the biggest opportunities are hiding.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/audit" className="btn btn-primary" id="cta-audit">
                Get Free Audit <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn btn-ghost" id="cta-contact">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
