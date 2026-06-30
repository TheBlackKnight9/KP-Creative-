"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Lightbulb, Users, Rocket, Award, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagPill from "@/components/TagPill";
import ClayCard from "@/components/ClayCard";
import ClayIllustration from "@/components/ClayIllustration";
import LogoMarquee from "@/components/LogoMarquee";

const VALUES = [
  { icon: Heart, title: "Craft Over Speed", desc: "We'd rather ship something exceptional a week later than push out something mediocre on time. Quality is non-negotiable." },
  { icon: Lightbulb, title: "Strategy First", desc: "Every design choice, every line of copy, every pixel is backed by purpose and research — never guesswork." },
  { icon: Users, title: "Partnership, Not Service", desc: "We embed ourselves in your world. Your success is our success — we grow when you grow." },
  { icon: Rocket, title: "Always Evolving", desc: "The digital landscape moves fast. We stay ahead of trends so you never fall behind the competition." },
  { icon: Award, title: "Honest & Transparent", desc: "No hidden fees, no jargon, no surprises. We communicate clearly and keep you informed at every step." },
  { icon: Shield, title: "Reliability You Can Count On", desc: "Deadlines met, promises kept. We treat every project with the urgency and care it deserves." },
];

const TEAM = [
  { name: "Karan Patel", initials: "KP", role: "Founder & Creative Director" },
  { name: "Priya Sharma", initials: "PS", role: "Lead Designer" },
  { name: "Arjun Mehta", initials: "AM", role: "Full-Stack Developer" },
  { name: "Neha Gupta", initials: "NG", role: "Marketing Strategist" },
  { name: "Rahul Singh", initials: "RS", role: "UI/UX Designer" },
  { name: "Divya Nair", initials: "DN", role: "Content & SEO Lead" },
];

const TIMELINE = [
  { year: "2019", title: "The Spark", desc: "Started as a solo freelance designer taking on passion projects from a college dorm room." },
  { year: "2020", title: "First Big Client", desc: "Landed our first enterprise client during the pandemic — built a complete e-commerce platform in 6 weeks." },
  { year: "2021", title: "Team of Three", desc: "Brought on a developer and a strategist. Officially registered as KP Creatives." },
  { year: "2022", title: "Studio Space", desc: "Moved into our first office in Gurugram. Expanded to a team of five." },
  { year: "2023", title: "Award-Winning Work", desc: "Won recognition for design excellence. Crossed 50 client projects delivered." },
  { year: "2024", title: "Full-Service Agency", desc: "Added performance marketing, SEO, and content services. Now a complete digital partner." },
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

export default function AboutPage() {
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

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="section section--sand section--first relative" id="about-hero" style={{ overflow: "hidden" }}>
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
            <motion.div variants={fadeInUp}><TagPill>About Us</TagPill></motion.div>
            <motion.h1 className="text-hero hero-headline" variants={fadeInUp}>
              <span>A Small Team With</span>
              <span className="text-accent">Big Ambitions.</span>
            </motion.h1>
            <motion.p className="text-body" style={{ maxWidth: 500 }} variants={fadeInUp}>
              KP Creatives was born from a simple belief — great digital experiences
              shouldn&apos;t be reserved for Fortune 500 companies. Every business
              deserves a presence that inspires trust and drives growth.
            </motion.p>
            <motion.div className="hero-cta-row" variants={fadeInUp}>
              <Link href="/contact" className="btn btn-primary" id="about-cta-hero">
                Work With Us <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="btn btn-secondary" id="about-work-link">
                See Our Work
              </Link>
            </motion.div>
          </motion.div>
          <div className="hero-illustration">
            <div className="scene-container">
              <ClayIllustration
                src="/images/clay-shapes-stacked-v3.png"
                alt="3D clay shapes stacked"
                width={480}
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="section section--blush" id="story">
        <div className="container">
          <div className="split-section">
            <div>
              <TagPill>Our Story</TagPill>
              <h2 className="text-h2" style={{ marginTop: "1.5rem", marginBottom: "1.25rem" }}>
                Started With a Laptop and a <span className="text-accent">Vision</span>
              </h2>
              <p className="text-body" style={{ marginBottom: "1rem" }}>
                What began as freelance design gigs in college dorm rooms evolved into a
                full-service digital agency serving clients across industries. We noticed a gap —
                businesses were either paying astronomical agency fees for cookie-cutter websites
                or settling for DIY tools that never quite felt right.
              </p>
              <p className="text-body" style={{ marginBottom: "1rem" }}>
                KP Creatives fills that gap. We bring enterprise-level craft and strategy to
                businesses of every size, at a price that makes sense. No templates. No shortcuts.
                Just thoughtful, hand-crafted digital experiences built to perform.
              </p>
              <p className="text-body">
                Today, we&apos;re a team of designers, developers, strategists, and storytellers
                who genuinely love what we do. We believe in the transformative power of great
                design — and we pour that belief into every project.
              </p>
            </div>
            <div>
              <ClayCard>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="stat-number">30+</div>
                    <div className="stat-label">Happy Clients</div>
                  </div>
                  <div>
                    <div className="stat-number">6</div>
                    <div className="stat-label">Team Members</div>
                  </div>
                  <div>
                    <div className="stat-number">5+</div>
                    <div className="stat-label">Years of Experience</div>
                  </div>
                </div>
              </ClayCard>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ JOURNEY TIMELINE ═══ */}
      <section className="section section--sand relative" id="journey" style={{ overflow: "hidden" }}>
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
            <TagPill>Our Journey</TagPill>
            <h2 className="text-h1">
              From Dorm Room to <span className="text-accent">Digital Studio</span>
            </h2>
          </div>
          <motion.div
            className="timeline"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {TIMELINE.map((item) => (
              <motion.div key={item.year} className="timeline-item" variants={fadeInUp}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-desc">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="section section--blush-deep" id="values">
        <div className="container">
          <div className="section-header">
            <TagPill>Our Values</TagPill>
            <h2 className="text-h1">What We <span className="text-accent">Stand For</span></h2>
            <p className="text-body">
              These principles guide every decision we make — from hiring to design to how we treat clients.
            </p>
          </div>
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={fadeInUp}>
                <ClayCard sand>
                  <div className="service-icon"><v.icon /></div>
                  <h3 className="text-h3" style={{ marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p className="text-body">{v.desc}</p>
                </ClayCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="section section--sand" id="team">
        <div className="container">
          <div className="section-header">
            <TagPill>The Team</TagPill>
            <h2 className="text-h1">
              Meet the <span className="text-accent">Humans</span> Behind the Pixels
            </h2>
            <p className="text-body">
              A small, senior team of specialists — not a revolving door of juniors.
            </p>
          </div>
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <ClayCard>
                  <div className="team-card">
                    <div className="team-avatar">{member.initials}</div>
                    <div className="team-name">{member.name}</div>
                    <div className="team-role">{member.role}</div>
                  </div>
                </ClayCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ LOGOS ═══ */}
      <section className="section--blush" style={{ paddingBlock: "1rem" }} id="about-logos">
        <div className="container">
          <p className="text-label text-center" style={{ color: "var(--ink-30)" }}>
            Brands we&apos;ve worked with
          </p>
          <LogoMarquee />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section" id="about-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <TagPill>Work With Us</TagPill>
            <h2 className="text-h1">Let&apos;s Create Something <span className="text-accent">Together</span></h2>
            <p className="text-body">
              Whether you&apos;re starting from scratch or levelling up an existing brand, we&apos;d love to hear about your project.
            </p>
            <Link href="/contact" className="btn btn-primary" id="about-cta-btn">
              Get in Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
