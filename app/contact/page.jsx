"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagPill from "@/components/TagPill";
import ClayCard from "@/components/ClayCard";
import ClayIllustration from "@/components/ClayIllustration";
import FAQ from "@/components/FAQ";

const CONTACT_INFO = [
  { icon: Mail, label: "Email Us", value: "hello@kpcreatives.in", href: "mailto:hello@kpcreatives.in" },
  { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, label: "Visit Us", value: "Sector 29, Gurugram, Haryana", href: "#" },
  { icon: Clock, label: "Working Hours", value: "Mon–Fri, 10 AM – 7 PM IST", href: "#" },
];

const CONTACT_FAQS = [
  { q: "What's the typical response time?", a: "We respond to all enquiries within 4 business hours. For urgent requests, call us directly." },
  { q: "Do you offer free consultations?", a: "Yes! Every engagement starts with a free 30-minute discovery call where we discuss your goals and how we can help." },
  { q: "Can I visit your office?", a: "Absolutely. We're in Sector 29, Gurugram. Book a time via email and we'll have the chai ready." },
  { q: "What information should I prepare before contacting?", a: "It helps to have a rough idea of your goals, timeline, and budget range. But don't worry if you're not sure — that's what the discovery call is for." },
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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="section section--sand section--first" id="contact-hero" style={{ overflow: "hidden" }}>
        <div className="container hero">
          <motion.div
            className="hero-text"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}><TagPill>Contact</TagPill></motion.div>
            <motion.h1 className="text-hero hero-headline" variants={fadeInUp}>
              <span>Let&apos;s Start a</span>
              <span className="text-accent">Conversation.</span>
            </motion.h1>
            <motion.p className="text-body" style={{ maxWidth: 480 }} variants={fadeInUp}>
              Whether you have a project in mind, want to explore possibilities, or just need advice
              — we&apos;re here and always happy to chat. No hard sell, ever.
            </motion.p>
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}
              variants={fadeInUp}
            >
              {CONTACT_INFO.map((info) => (
                <a key={info.label} href={info.href} style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink-60)", fontSize: "0.95rem" }} id={`contact-${info.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="icon-circle" style={{ marginLeft: 0 }}>
                    <info.icon size={18} />
                  </div>
                  <div>
                    <div className="text-label" style={{ color: "var(--ink-30)", marginBottom: "2px", fontSize: "0.65rem" }}>{info.label}</div>
                    <span style={{ color: "var(--ink)", fontWeight: 500 }}>{info.value}</span>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
          <div className="hero-illustration">
            <div className="scene-container">
              <ClayIllustration
                src="/images/clay-phone-envelope-v3.png"
                alt="3D clay phone and envelope"
                width={480}
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section className="section section--blush" id="contact-form-section">
        <div className="container" style={{ maxWidth: 720 }}>
          <ClayCard>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 30 }} style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(196,80,26,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--terracotta)" }}>
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-h2">Message Sent!</h3>
                <p className="text-body" style={{ marginTop: "0.75rem" }}>Thanks for reaching out. We&apos;ll get back to you within 4 business hours.</p>
              </motion.div>
            ) : (
              <>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 className="text-h2">Send Us a <span className="text-accent">Message</span></h2>
                  <p className="text-body" style={{ marginTop: "0.5rem" }}>Fill out the form and we&apos;ll be in touch shortly. All fields marked with * are required.</p>
                </div>
                <form onSubmit={handleSubmit} id="contact-form">
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Full Name *</label>
                      <input type="text" id="name" className="form-input" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email Address *</label>
                      <input type="email" id="email" className="form-input" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" className="form-input" placeholder="+91 98765 43210" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="company">Company / Brand</label>
                      <input type="text" id="company" className="form-input" placeholder="Your Company" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="service">What Do You Need? *</label>
                    <select id="service" className="form-select" required>
                      <option value="">Select a service</option>
                      <option value="web-design">Web Design & Development</option>
                      <option value="branding">Brand Identity</option>
                      <option value="marketing">Performance Marketing</option>
                      <option value="seo">SEO & Content</option>
                      <option value="app">Custom Web Application</option>
                      <option value="full-service">Full-Service Package</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">Budget Range</label>
                    <select id="budget" className="form-select">
                      <option value="">Select budget range</option>
                      <option value="under-50k">Under ₹50,000</option>
                      <option value="50k-1.5l">₹50,000 – ₹1,50,000</option>
                      <option value="1.5l-3l">₹1,50,000 – ₹3,00,000</option>
                      <option value="3l-5l">₹3,00,000 – ₹5,00,000</option>
                      <option value="5l-plus">₹5,00,000+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Tell Us About Your Project *</label>
                    <textarea id="message" className="form-textarea" placeholder="Describe your project, goals, timeline, and any inspiration or references you have in mind..." required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }} id="contact-submit">
                    Send Message <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}
          </ClayCard>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section section--sand" id="contact-faq">
        <div className="container">
          <div className="section-header">
            <TagPill>FAQ</TagPill>
            <h2 className="text-h2">Before You <span className="text-accent">Reach Out</span></h2>
          </div>
          <FAQ items={CONTACT_FAQS} />
        </div>
      </section>

      <Footer />
    </>
  );
}
