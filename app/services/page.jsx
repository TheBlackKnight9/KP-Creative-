"use client";

import { useState } from "react";
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

const ENGAGEMENT_MODELS = [
  {
    title: "Project-Based Development",
    desc: "Perfect for startups and businesses looking to establish or upgrade their digital presence with a custom-built solution.",
    features: [
      "Custom Strategy",
      "Discovery & Planning",
      "Fixed Project Timeline",
      "UI/UX Design",
      "Website Development",
      "Quality Assurance",
      "Launch Support",
      "Post-Launch Assistance"
    ],
    buttonText: "Start Your Project",
    image: "/images/clay-web-design.png",
    featured: false
  },
  {
    title: "Monthly Growth Partnership",
    desc: "Ideal for businesses that want continuous digital marketing, content creation, and long-term online growth.",
    features: [
      "Social Media Management",
      "Content Strategy",
      "Reels & Short-form Videos",
      "Instagram & Meta Ads",
      "Monthly Performance Reports",
      "Website Maintenance",
      "SEO Improvements",
      "Dedicated Account Support"
    ],
    buttonText: "Grow My Business",
    image: "/images/clay-social-media.png",
    featured: true,
    badge: "MOST POPULAR"
  },
  {
    title: "Complete Digital Transformation",
    desc: "A comprehensive solution for established businesses looking to scale with a complete digital ecosystem.",
    features: [
      "Premium Website",
      "Branding & Identity",
      "SEO Strategy",
      "Paid Advertising",
      "Content Creation",
      "Lead Generation",
      "Growth Consultation",
      "Long-Term Partnership"
    ],
    buttonText: "Let's Scale Together",
    image: "/images/clay-digital-transformation.png",
    featured: false
  }
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

function ModelCard({ model }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={{
        hidden: { opacity: 0, y: 35 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 20
          }
        }
      }}
      className={`relative rounded-[24px] border p-8 flex flex-col h-full justify-between transition-all duration-500 ease-in-out cursor-pointer
        ${model.featured 
          ? "border-[#C4501A] bg-[#F5EDE8] shadow-[0_30px_60px_rgba(28,15,10,0.12)] md:scale-[1.03]" 
          : "border-[#D9C8BF] bg-[#FAF5F2] shadow-[0_2px_16px_rgba(28,15,10,0.06)] hover:border-[#C4501A]"
        }
        ${hovered ? "shadow-[0_30px_60px_rgba(28,15,10,0.15)] -translate-y-2 border-[#C4501A]" : ""}
      `}
      style={{
        transition: "border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      <div className="flex flex-col items-start w-full">
        {/* Badge */}
        {model.badge && (
          <span className="text-[10px] font-bold tracking-wider uppercase text-white bg-[#C4501A] px-3 py-1 rounded-full mb-4 inline-block shadow-sm">
            {model.badge}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-[#1C0F0A] tracking-tight mb-3">
          {model.title}
        </h3>

        {/* Illustration */}
        {model.image && (
          <div className="w-full flex items-center justify-center py-4 mb-4 bg-[#1C0F0A]/[0.02] rounded-[16px] overflow-hidden">
            <img
              src={model.image}
              alt={model.title}
              className="max-h-[140px] object-contain mix-blend-multiply drop-shadow-[0_8px_24px_rgba(28,15,10,0.06)]"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-[#1C0F0A]/60 leading-relaxed mb-6">
          {model.desc}
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#D9C8BF] mb-6" />

        {/* Features List */}
        <ul className="list-none p-0 m-0 flex flex-col gap-3 w-full mb-8">
          {model.features.map((f, i) => (
            <motion.li
              key={f}
              animate={{
                y: hovered ? -3 : 0,
                opacity: hovered ? 1 : 0.85,
              }}
              transition={{
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex items-center gap-3 text-sm font-semibold text-[#1C0F0A]"
            >
              <CheckCircle size={16} className="text-[#C4501A] shrink-0" />
              <span>{f}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <Link
        href="/contact"
        className={`btn w-full flex items-center justify-center gap-2 ${model.featured ? "btn-primary" : "btn-secondary"}`}
      >
        <span>{model.buttonText}</span>
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowRight size={16} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

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

      {/* ═══ ENGAGEMENT MODELS ═══ */}
      <section className="section section--blush-deep" id="engagement-models">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TagPill>Engagement Models</TagPill>
            <h2 className="text-h1">Choose the Right <span className="text-accent">Engagement Model</span></h2>
            <p className="text-body">
              Whether you&apos;re launching a new business, looking for consistent monthly growth, or planning a complete digital transformation, we offer flexible engagement models tailored to your goals.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {ENGAGEMENT_MODELS.map((model) => (
              <ModelCard key={model.title} model={model} />
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
