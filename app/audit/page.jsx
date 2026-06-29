"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, FileText, Gauge, Search, BarChart3, PenTool, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagPill from "@/components/TagPill";
import ClayCard from "@/components/ClayCard";
import ClayIllustration from "@/components/ClayIllustration";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";

const AUDIT_INCLUDES = [
  { icon: Gauge, title: "Performance Analysis", desc: "Page speed, Core Web Vitals, and loading performance across devices." },
  { icon: Search, title: "SEO Health Check", desc: "Technical SEO issues, keyword gaps, meta tags, and indexing status." },
  { icon: BarChart3, title: "Competitor Overview", desc: "Where you stand against competitors in your space — and where to outperform them." },
  { icon: PenTool, title: "Design & UX Review", desc: "Visual hierarchy, user flow analysis, and actionable UX improvement tips." },
  { icon: Shield, title: "Security & Accessibility", desc: "SSL, HTTPS, accessibility compliance, and vulnerability assessment." },
  { icon: FileText, title: "Custom PDF Report", desc: "A comprehensive 20+ page report with prioritised recommendations and quick wins." },
];

const AUDIT_PROCESS = [
  { num: "01", title: "You Fill the Form", desc: "Share your website URL, business goals, and any specific concerns. Takes 2 minutes." },
  { num: "02", title: "We Analyse", desc: "Our team runs a deep dive across 50+ checkpoints covering performance, SEO, design, and security." },
  { num: "03", title: "You Get the Report", desc: "A detailed PDF delivered to your inbox within 48 hours, with clear priorities and next steps." },
  { num: "04", title: "We Talk Strategy", desc: "Optional follow-up call to walk through the findings and discuss how to act on them." },
];

const AUDIT_FAQS = [
  { q: "Is the audit really free?", a: "Yes, completely free with no strings attached. We use it to build trust and show you the kind of insight we bring to every project." },
  { q: "How long does it take to receive the report?", a: "Most reports are delivered within 48 hours. Complex sites with 100+ pages may take up to 3 business days." },
  { q: "Will you try to sell me something?", a: "No hard sell. We share the report and if you'd like help implementing the recommendations, we're happy to discuss. If not, the report is yours to keep." },
  { q: "What if my site is brand new?", a: "Even new sites benefit from an audit. We'll catch technical issues early and ensure your foundation is solid before you invest in growth." },
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

export default function AuditPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="section section--sand" id="audit-hero" style={{ overflow: "hidden" }}>
        <div className="container hero">
          <motion.div
            className="hero-text"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}><TagPill>Free Audit</TagPill></motion.div>
            <motion.h1 className="text-hero hero-headline" variants={fadeInUp}>
              <span>Discover What&apos;s</span>
              <span className="text-accent">Holding You Back.</span>
            </motion.h1>
            <motion.p className="text-body" style={{ maxWidth: 500 }} variants={fadeInUp}>
              Get a comprehensive, no-obligation review of your digital presence. We&apos;ll
              identify the quick wins and long-term plays that can transform your online performance.
            </motion.p>
            <motion.div className="hero-cta-row" variants={fadeInUp}>
              <a href="#audit-form-section" className="btn btn-primary" id="audit-scroll-cta">
                Get Your Free Audit <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
          <div className="hero-illustration">
            <div className="scene-container">
              <ClayIllustration
                src="/images/clay-magnifying-glass-v3.png"
                alt="3D clay magnifying glass over a screen"
                width={480}
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section className="section section--blush" id="audit-includes">
        <div className="container">
          <div className="section-header">
            <TagPill>What You Get</TagPill>
            <h2 className="text-h1">A Complete Digital <span className="text-accent">Health Check</span></h2>
            <p className="text-body">Every audit covers these six critical areas — giving you a 360° view of your online presence.</p>
          </div>
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {AUDIT_INCLUDES.map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp}>
                <ClayCard>
                  <div className="service-icon"><item.icon /></div>
                  <h3 className="text-h3" style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p className="text-body">{item.desc}</p>
                </ClayCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="section section--sand" id="audit-process">
        <div className="container">
          <div className="section-header">
            <TagPill>How It Works</TagPill>
            <h2 className="text-h1">Four Simple <span className="text-accent">Steps</span></h2>
          </div>
          <motion.div
            className="grid-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {AUDIT_PROCESS.map((step) => (
              <motion.div key={step.num} variants={fadeInUp}>
                <ClayCard>
                  <div className="process-number" style={{ marginBottom: "1rem" }}>{step.num}</div>
                  <h3 className="text-h3" style={{ marginBottom: "0.35rem" }}>{step.title}</h3>
                  <p className="text-body" style={{ fontSize: "0.9rem" }}>{step.desc}</p>
                </ClayCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ AUDIT FORM ═══ */}
      <section className="section section--blush-deep" id="audit-form-section">
        <div className="container" style={{ maxWidth: 720 }}>
          <ClayCard sand>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 30 }} style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(196,80,26,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--terracotta)" }}>
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-h2">Audit Request Received!</h3>
                <p className="text-body" style={{ marginTop: "0.75rem" }}>We&apos;ll review your website and send a detailed report within 48 hours.</p>
              </motion.div>
            ) : (
              <>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 className="text-h2">Request Your <span className="text-accent">Free Audit</span></h2>
                  <p className="text-body" style={{ marginTop: "0.5rem" }}>Share your details and we&apos;ll get started on your personalised report.</p>
                </div>
                <form onSubmit={handleSubmit} id="audit-form">
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="audit-name">Full Name *</label>
                      <input type="text" id="audit-name" className="form-input" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="audit-email">Email Address *</label>
                      <input type="email" id="audit-email" className="form-input" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="audit-website">Your Website URL *</label>
                    <input type="url" id="audit-website" className="form-input" placeholder="https://yourbusiness.com" required />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="audit-industry">Industry</label>
                      <select id="audit-industry" className="form-select">
                        <option value="">Select your industry</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="saas">SaaS / Tech</option>
                        <option value="services">Professional Services</option>
                        <option value="health">Health & Wellness</option>
                        <option value="food">Food & Hospitality</option>
                        <option value="education">Education</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="audit-priority">Main Priority</label>
                      <select id="audit-priority" className="form-select">
                        <option value="">What matters most?</option>
                        <option value="speed">Site Speed & Performance</option>
                        <option value="seo">SEO & Rankings</option>
                        <option value="design">Design & UX</option>
                        <option value="conversions">Conversion Rate</option>
                        <option value="overall">Overall Health Check</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="audit-goals">What Are Your Main Goals? *</label>
                    <textarea id="audit-goals" className="form-textarea" placeholder="E.g., Increase leads, improve brand perception, rank higher on Google, redesign the site..." required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }} id="audit-submit">
                    Get My Free Audit <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}
          </ClayCard>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section section--sand" id="audit-testimonials">
        <div className="container">
          <div className="section-header">
            <TagPill>Client Love</TagPill>
            <h2 className="text-h2">Trusted by Brands That <span className="text-accent">Grew</span></h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section section--blush" id="audit-faq">
        <div className="container">
          <div className="section-header">
            <TagPill>FAQ</TagPill>
            <h2 className="text-h2">Audit <span className="text-accent">Questions</span></h2>
          </div>
          <FAQ items={AUDIT_FAQS} />
        </div>
      </section>

      <Footer />
    </>
  );
}
