"use client";

import { useState, useEffect } from "react";
import { Particles } from "@/components/ui/particles";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagPill from "@/components/TagPill";
import ClayIllustration from "@/components/ClayIllustration";
import Testimonials from "@/components/Testimonials";

const CATEGORIES = ["All", "Web Design", "Branding", "Marketing", "App"];

const PROJECTS = [
  { title: "Verdant Living", category: "Web Design", color: "#C4501A", desc: "A luxury eco-living brand's full website redesign with immersive scroll animations and 3D product showcases.", tags: ["Next.js", "GSAP", "Three.js"] },
  { title: "Nova Fitness", category: "Branding", color: "#D4845A", desc: "Complete brand identity for a boutique fitness studio — logo, colours, collateral, and social templates.", tags: ["Logo Design", "Brand Guidelines", "Figma"] },
  { title: "CloudSync SaaS", category: "App", color: "#E8744A", desc: "Dashboard UI/UX design and development for a cloud management platform serving enterprise clients.", tags: ["React", "Node.js", "PostgreSQL"] },
  { title: "Bloom Bakery", category: "Web Design", color: "#C4501A", desc: "E-commerce website with online ordering, custom CMS, brand storytelling, and integrated delivery tracking.", tags: ["Shopify", "Custom Theme", "SEO"] },
  { title: "TerraVenture", category: "Marketing", color: "#D4845A", desc: "Multi-channel digital campaign that drove 3x organic growth through SEO, content marketing, and paid ads.", tags: ["Google Ads", "SEO", "Content Strategy"] },
  { title: "Artisan & Co", category: "Branding", color: "#E8744A", desc: "Premium brand identity and packaging design for a handcrafted goods company expanding to e-commerce.", tags: ["Packaging", "Visual Identity", "Print"] },
  { title: "PixelForge Studio", category: "Web Design", color: "#C4501A", desc: "Portfolio website for a creative agency with interactive case study presentations and animated transitions.", tags: ["Next.js", "Framer Motion", "Vercel"] },
  { title: "GreenLeaf Health", category: "Marketing", color: "#D4845A", desc: "Complete digital marketing overhaul for a wellness brand — SEO, social media, and paid acquisition.", tags: ["Meta Ads", "Instagram", "Analytics"] },
  { title: "UrbanCraft Furniture", category: "App", color: "#E8744A", desc: "Custom 3D product configurator web app allowing customers to visualise furniture in their space.", tags: ["Three.js", "WebGL", "React"] },
];

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

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const [particleColor, setParticleColor] = useState("#C4501A");

  useEffect(() => {
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

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="section section--sand section--first relative" id="portfolio-hero" style={{ overflow: "hidden" }}>
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={80}
          ease={80}
          color={particleColor}
          size={2.0}
          refresh
        />
        <div className="container hero relative z-10">
          <motion.div
            className="hero-text"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}><TagPill>Portfolio</TagPill></motion.div>
            <motion.h1 className="text-hero hero-headline" variants={fadeInUp}>
              <span>Work That</span>
              <span className="text-accent">Speaks Volumes.</span>
            </motion.h1>
            <motion.p className="text-body" style={{ maxWidth: 480 }} variants={fadeInUp}>
              A curated selection of projects where design met strategy — and the
              results did the talking. Each project represents a unique challenge
              solved with creativity and precision.
            </motion.p>
            <motion.div className="hero-cta-row" variants={fadeInUp}>
              <Link href="/contact" className="btn btn-primary" id="portfolio-start-project">
                Start Your Project <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
          <div className="hero-illustration">
            <div className="scene-container">
              <ClayIllustration
                src="/images/clay-picture-frames-v3.png"
                alt="3D clay floating picture frames"
                width={480}
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO GRID ═══ */}
      <section className="section section--blush" id="portfolio-grid">
        <div className="container">
          <motion.div
            className="portfolio-filters"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? "active" : ""}`}
                onClick={() => setActive(cat)}
                id={`filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  className="portfolio-card"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                >
                  <div
                    className="portfolio-card-image"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: project.color,
                      opacity: 0.6,
                    }}>
                      {project.title}
                    </span>
                  </div>
                  <div className="portfolio-card-info">
                    <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", marginBottom: "0.35rem" }}>
                      <span className="portfolio-card-title">{project.title}</span>
                      <ExternalLink size={16} style={{ color: "var(--ink-30)", marginLeft: "auto" }} />
                    </div>
                    <span className="portfolio-card-category">{project.category}</span>
                    <p className="text-body" style={{ fontSize: "0.9rem", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
                      {project.desc}
                    </p>
                    <div className="tech-badges">
                      {project.tags.map((tag) => (
                        <span className="tech-badge" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section section--blush-deep" id="portfolio-testimonials">
        <div className="container">
          <div className="section-header">
            <TagPill>Client Stories</TagPill>
            <h2 className="text-h1">What Our Clients <span className="text-accent">Say</span></h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section" id="portfolio-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <TagPill>Your Project Next</TagPill>
            <h2 className="text-h1">
              Let&apos;s Add Your Brand to <span className="text-accent">This Wall</span>
            </h2>
            <p className="text-body">
              Every great portfolio piece started with a conversation. Start yours today.
            </p>
            <Link href="/contact" className="btn btn-primary" id="portfolio-cta-btn">
              Start a Project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
