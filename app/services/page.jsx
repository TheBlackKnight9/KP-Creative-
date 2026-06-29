"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Globe, Palette, BarChart3, Search, Code, PenTool,
  Megaphone, TrendingUp, CheckCircle, Video,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagPill from "@/components/TagPill";
import ClayCard from "@/components/ClayCard";
import ClayIllustration from "@/components/ClayIllustration";
import FAQ from "@/components/FAQ";
import ServiceExplorer from "@/components/ServiceExplorer";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Design & Development",
    badge: "WEB STUDIO",
    desc: "Responsive, custom business websites built with modern web frameworks, optimized for speed, performance, and visitor conversion.",
    features: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages",
      "E-commerce Websites",
      "Website Redesign"
    ],
    featured: true
  },
  {
    icon: Search,
    title: "SEO & Website Optimization",
    badge: "SEO OPTIM",
    desc: "Boost your organic visibility and speed. We optimize core web vitals, indexation issues, and setup comprehensive tracking analytics.",
    features: [
      "Technical SEO",
      "Website Speed Optimization",
      "Mobile Optimization",
      "Google Search Console Setup",
      "Google Analytics Integration",
      "Website Maintenance"
    ],
    featured: false
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    badge: "SOCIAL GROWTH",
    desc: "Complete organic channel strategy and content creation across major social media accounts to build a loyal audience.",
    features: [
      "Monthly Management",
      "Static Post Design",
      "Story Management",
      "Content Calendar",
      "Caption & Hashtag Research",
      "Monthly Performance Reports"
    ],
    featured: false
  },
  {
    icon: Video,
    title: "Reel Editing & Content Creation",
    badge: "VIDEO CREATIVE",
    desc: "High-impact short-form video layouts, detailed professional editing, captions, and script planning to drive engagement and organic virality.",
    features: [
      "Professional Reel Editing",
      "Short-form Video Editing",
      "Caption & Script Writing",
      "Thumbnail Design",
      "Content Repurposing"
    ],
    featured: true
  },
  {
    icon: BarChart3,
    title: "Paid Advertising",
    badge: "ADS MANAGEMENT",
    desc: "High-ROI digital advertising campaigns built to capture leads, drive conversions, and re-engage visitors with continuous optimization.",
    features: [
      "Instagram Ads",
      "Facebook Ads",
      "Google Ads",
      "Lead Generation Campaigns",
      "Retargeting Ads",
      "Campaign Optimization"
    ],
    featured: false
  },
  {
    icon: Palette,
    title: "Graphic Design",
    badge: "BRAND DESIGN",
    desc: "Custom brand design collateral, visual logo schemes, print layouts, and digital packaging assets designed to make you memorable.",
    features: [
      "Logo Design",
      "Social Media Creatives",
      "Visiting Cards",
      "Brochures",
      "Posters",
      "Menu Design",
      "Packaging Design"
    ],
    featured: false
  },
  {
    icon: TrendingUp,
    title: "Growth Packages",
    badge: "GROWTH SUITE",
    desc: "Integrated, result-oriented growth packages combining web engineering, paid advertising, and social media layout operations.",
    features: [
      "Website + Branding",
      "Website + Social Media",
      "Complete Digital Presence",
      "Startup Launch Package",
      "Monthly Growth Package"
    ],
    featured: false
  }
];

const PACKAGES = [
  {
    name: "Starter",
    price: "₹50K",
    period: "one-time",
    desc: "Perfect for startups and small businesses needing a strong online presence.",
    features: ["Single-page website", "Mobile responsive design", "Basic SEO setup", "Contact form integration", "1 round of revisions", "2-week delivery"],
    popular: false,
  },
  {
    name: "Growth",
    price: "₹1.5L",
    period: "one-time",
    desc: "For businesses ready to level up with a comprehensive digital presence.",
    features: ["Multi-page website (up to 8 pages)", "Custom animations & interactions", "Advanced SEO optimisation", "CMS integration", "Blog setup", "3 rounds of revisions", "4-week delivery"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "scoped",
    desc: "Full-service engagement for ambitious brands with complex requirements.",
    features: ["Unlimited pages", "Custom web application features", "E-commerce integration", "Performance marketing setup", "Brand identity package", "Dedicated project manager", "Ongoing support retainer"],
    popular: false,
  },
];

const SERVICE_FAQS = [
  { q: "How do we get started?", a: "It starts with a free discovery call. We'll discuss your goals, timeline, and budget — then provide a detailed proposal within 3 business days." },
  { q: "Can I mix and match services?", a: "Absolutely. Most clients combine web design with branding or SEO. We'll create a custom package that fits your exact needs." },
  { q: "Do you offer ongoing maintenance?", a: "Yes. We offer monthly retainers starting at ₹15,000/month that cover hosting, updates, security patches, and performance monitoring." },
  { q: "What if I'm not happy with the design?", a: "Every project includes revision rounds built into the timeline. We iterate until you're thrilled. Our process is designed to align early so surprises are rare." },
  { q: "Do you work with international clients?", a: "Yes! We have clients across India, the UK, and the US. Time zone differences are managed through async workflows and scheduled check-ins." },
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

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="section section--sand" id="services-hero" style={{ overflow: "hidden" }}>
        <div className="container hero">
          <motion.div
            className="hero-text"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}><TagPill>Our Services</TagPill></motion.div>
            <motion.h1 className="text-hero hero-headline" variants={fadeInUp}>
              <span>Full-Stack Digital</span>
              <span className="text-accent">Solutions.</span>
            </motion.h1>
            <motion.p className="text-body" style={{ maxWidth: 500 }} variants={fadeInUp}>
              Design, development, branding, and marketing — everything your business needs
              to thrive online, delivered by one cohesive team who cares about results.
            </motion.p>
            <motion.div className="hero-cta-row" variants={fadeInUp}>
              <Link href="/contact" className="btn btn-primary" id="services-cta-start">
                Start a Project <ArrowRight size={18} />
              </Link>
              <Link href="/audit" className="btn btn-secondary" id="services-audit-link">
                Get Free Audit
              </Link>
            </motion.div>
          </motion.div>
          <div className="hero-illustration">
            <div className="scene-container">
              <ClayIllustration
                src="/images/clay-toolbox-v3.png"
                alt="3D clay toolbox"
                width={480}
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICE EXPLORER ═══ */}
      <ServiceExplorer />

      {/* ═══ PRICING ═══ */}
      <section className="section section--blush-deep" id="pricing">
        <div className="container">
          <div className="section-header">
            <TagPill>Pricing</TagPill>
            <h2 className="text-h1">Transparent <span className="text-accent">Pricing</span></h2>
            <p className="text-body">
              No hidden fees. No surprise invoices. Here&apos;s what to expect.
            </p>
          </div>
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {PACKAGES.map((pkg) => (
              <motion.div key={pkg.name} variants={fadeInUp}>
                <ClayCard featured={pkg.popular} sand={!pkg.popular}>
                  <div style={{ position: "relative" }}>
                    {pkg.popular && <div className="pricing-badge">Most Popular</div>}
                    <h3 className="text-h3" style={{ marginBottom: "0.5rem" }}>{pkg.name}</h3>
                    <div className="pricing-amount">
                      {pkg.price} <span className="pricing-period">/{pkg.period}</span>
                    </div>
                    <p className="text-body" style={{ fontSize: "0.9rem", marginTop: "0.75rem" }}>{pkg.desc}</p>
                    <div className="pricing-features">
                      {pkg.features.map((f) => (
                        <div key={f} className="pricing-feature">
                          <CheckCircle size={16} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className={`btn ${pkg.popular ? "btn-primary" : "btn-secondary"}`}
                      style={{ width: "100%" }}
                    >
                      Get Started <ArrowRight size={16} />
                    </Link>
                  </div>
                </ClayCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section section--sand" id="services-faq">
        <div className="container">
          <div className="section-header">
            <TagPill>FAQ</TagPill>
            <h2 className="text-h1">Common <span className="text-accent">Questions</span></h2>
          </div>
          <FAQ items={SERVICE_FAQS} />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section" id="services-cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <TagPill>Not Sure What You Need?</TagPill>
            <h2 className="text-h1">Get a Free <span className="text-accent">Audit</span></h2>
            <p className="text-body">
              We&apos;ll analyse your current digital presence and tell you exactly where the biggest opportunities are.
            </p>
            <Link href="/audit" className="btn btn-primary" id="services-audit-cta">
              Request Free Audit <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
