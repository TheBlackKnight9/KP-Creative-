"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useSpring,
  useMotionValue,
  useVelocity,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Globe, Search, Megaphone, Video, BarChart3,
  Palette, TrendingUp, ArrowRight, CheckCircle2,
} from "lucide-react";

const SERVICES = [
  {
    id: "web", icon: Globe, title: "Website Design & Development",
    badge: "WEB STUDIO", number: "01",
    desc: "Responsive, custom websites built with modern frameworks, optimised for speed and conversion.",
    features: ["Business Websites","Portfolio Websites","Landing Pages","E-commerce Websites","Website Redesign","CMS Integration","Maintenance & Support"],
  },
  {
    id: "seo", icon: Search, title: "SEO & Website Optimization",
    badge: "SEO OPTIM", number: "02",
    desc: "Boost organic visibility and site speed. Core web vitals, indexation, and comprehensive analytics setup.",
    features: ["Technical SEO","Website Speed Optimization","Mobile Optimization","Google Search Console Setup","Google Analytics Integration","Website Maintenance"],
  },
  {
    id: "social", icon: Megaphone, title: "Social Media Management",
    badge: "SOCIAL GROWTH", number: "03",
    desc: "Full organic growth strategy and content creation to build a loyal, engaged audience.",
    features: ["Monthly Management","Static Post Design","Story Management","Content Calendar","Caption & Hashtag Research","Monthly Performance Reports"],
  },
  {
    id: "reels", icon: Video, title: "Reel Editing & Content Creation",
    badge: "VIDEO CREATIVE", number: "04",
    desc: "High-impact short-form videos, scripting, captions, and thumbnails that drive engagement.",
    features: ["Professional Reel Editing","Short-form Video Editing","Caption & Script Writing","Thumbnail Design","Content Repurposing"],
  },
  {
    id: "ads", icon: BarChart3, title: "Paid Advertising",
    badge: "ADS MANAGEMENT", number: "05",
    desc: "High-ROI campaigns across Meta and Google to capture leads, drive conversions, and maximise ROAS.",
    features: ["Instagram Ads","Facebook Ads","Google Ads","Lead Generation Campaigns","Retargeting Ads","Campaign Optimization"],
  },
  {
    id: "design", icon: Palette, title: "Graphic Design",
    badge: "BRAND DESIGN", number: "06",
    desc: "Custom brand collateral, logo systems, and packaging assets that make your brand unforgettable.",
    features: ["Logo Design","Social Media Creatives","Visiting Cards","Brochures","Posters","Menu Design","Packaging Design"],
  },
  {
    id: "growth", icon: TrendingUp, title: "Business Growth Packages",
    badge: "GROWTH SUITE", number: "07",
    desc: "All-in-one packages combining web, design, paid ads, and social for maximum digital impact.",
    features: ["Website + Branding","Website + Social Media","Complete Digital Presence","Startup Launch Package","Monthly Growth Package"],
  },
];

const CARD_W   = 330;
const OFF_X    = 88;
const OFF_Y    = 30;

function FloatingCard({ service, cardX, cardY, tilt, visible }) {
  const Icon = service?.icon;
  const [arrowHover, setArrowHover] = useState(false);

  const shadowBlur    = useTransform(tilt, [-12, 0, 12], [64, 22, 64]);
  const shadowOpacity = useTransform(tilt, [-12, 0, 12], [0.28, 0.09, 0.28]);
  const boxShadow = useTransform(
    [shadowBlur, shadowOpacity],
    ([b, o]) => `0 ${b}px ${b * 2}px rgba(28,15,10,${o}), 0 4px 14px rgba(28,15,10,0.05)`
  );

  return (
    <AnimatePresence>
      {visible && service && (
        <motion.div
          key={service.id}
          style={{ position: "fixed", top: 0, left: 0, x: cardX, y: cardY, rotate: tilt, pointerEvents: "none", zIndex: 9999, willChange: "transform" }}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            exit={{ y: 14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: `${CARD_W}px`, background: "var(--terracotta)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "20px", padding: "22px", boxShadow, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 42, height: 42, borderRadius: "11px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", flexShrink: 0 }}
              >
                {Icon && <Icon size={20} strokeWidth={1.6} />}
              </motion.div>
              <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#ffffff", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", padding: "3px 9px", borderRadius: "100px", marginTop: "2px" }}>
                {service.badge}
              </span>
            </div>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.3, marginBottom: "0.65rem", fontFamily: "var(--font-display,'Bricolage Grotesque'),sans-serif", letterSpacing: "-0.01em" }}>
              {service.title}
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "1px", background: "rgba(255,255,255,0.25)", marginBottom: "0.85rem", transformOrigin: "left" }}
            />
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "0.38rem" }}>
              {service.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 + i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "0.81rem", color: "#ffffff", fontWeight: 600, lineHeight: 1.4 }}
                >
                  <CheckCircle2 size={12} strokeWidth={2} style={{ color: "#ffffff", flexShrink: 0 }} />
                  {f}
                </motion.li>
              ))}
            </ul>
            <motion.div
              onHoverStart={() => setArrowHover(true)}
              onHoverEnd={() => setArrowHover(false)}
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.79rem", fontWeight: 600, color: "#ffffff", pointerEvents: "auto", cursor: "pointer" }}
            >
              <span>{"Let's create something amazing"}</span>
              <motion.span animate={{ x: arrowHover ? 6 : 0 }} transition={{ type: "spring", stiffness: 340, damping: 22 }}>
                <ArrowRight size={13} style={{ color: "#ffffff" }} />
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ServiceRow({ service, index, onHover, onLeave, isActive, isMobile, mobileOpen, onMobileToggle }) {
  const Icon = service.icon;
  const isFirst = index === 0;
  const isLast  = index === 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 140, damping: 22, delay: index * 0.065 }}
    >
      <div
        onMouseEnter={!isMobile ? () => onHover(service) : undefined}
        onMouseLeave={!isMobile ? onLeave : undefined}
        onClick={isMobile ? onMobileToggle : undefined}
        role={isMobile ? "button" : undefined}
        tabIndex={isMobile ? 0 : undefined}
        style={{ display: "flex", alignItems: "center", minHeight: "clamp(84px, 8.5vw, 136px)", borderTop: isFirst ? "1px solid var(--blush-border)" : "none", borderBottom: isLast && !isMobile ? "none" : "1px solid var(--blush-border)", position: "relative", cursor: isMobile ? "pointer" : "default", userSelect: "none", paddingInline: "clamp(0.5rem, 1.5vw, 0.75rem)", overflow: "hidden", gap: "clamp(0.75rem, 2vw, 1.5rem)" }}
      >
        <motion.span
          style={{ position: "absolute", inset: 0, background: "rgba(196,80,26,0.05)", pointerEvents: "none", zIndex: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.24 }}
        />

        <motion.span
          animate={{ color: isActive ? "var(--terracotta)" : "var(--ink-30)" }}
          transition={{ duration: 0.22 }}
          style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", fontVariantNumeric: "tabular-nums", flexShrink: 0, zIndex: 1, minWidth: "1.75rem" }}
        >
          {service.number}
        </motion.span>

        <motion.div
          animate={{ x: isActive ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ flex: 1, zIndex: 1 }}
        >
          <motion.span
            animate={{ color: isActive ? "var(--terracotta)" : "var(--ink)" }}
            transition={{ duration: 0.22 }}
            style={{ display: "block", fontSize: "clamp(1.4rem, 3.2vw, 2.85rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", fontFamily: "var(--font-display,'Bricolage Grotesque'),sans-serif" }}
          >
            {service.title}
          </motion.span>
        </motion.div>

        <div style={{ flexShrink: 0, zIndex: 1, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.span
            animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            style={{ display: "block", width: "10px", height: "10px", borderRadius: "50%", background: "var(--terracotta)", boxShadow: "0 0 0 3px rgba(196,80,26,0.22)" }}
          />
        </div>
      </div>

      {isMobile && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ padding: "1.25rem 1rem 1.75rem 2.5rem", background: "var(--blush-deep)", borderBottom: "1px solid var(--blush-border)" }}>
                <p style={{ fontSize: "0.88rem", color: "var(--ink-60)", marginBottom: "1rem", lineHeight: 1.65 }}>{service.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {service.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--ink)" }}>
                      <CheckCircle2 size={13} strokeWidth={2} style={{ color: "var(--terracotta)", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.84rem", fontWeight: 600, color: "var(--terracotta)", borderBottom: "1px solid rgba(196,80,26,0.3)", paddingBottom: "2px" }}>
                  Start a Project <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default function ServiceExplorer() {
  const [activeService, setActiveService] = useState(null);
  const [openMobile,    setOpenMobile]    = useState(null);
  const [isMobile,      setIsMobile]      = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const velX    = useVelocity(rawX);
  const tiltRaw = useTransform(velX, [-2000, 0, 2000], [-12, 0, 12]);
  const tilt    = useSpring(tiltRaw, { stiffness: 65, damping: 14, mass: 0.7 });

  const cfg   = { stiffness: 95, damping: 16, mass: 0.8 };
  const cardX = useSpring(rawX, cfg);
  const cardY = useSpring(rawY, cfg);

  const pathD = useTransform(
    [mouseX, mouseY, cardX, cardY],
    ([mx, my, cx, cy]) => {
      if (cx === 0 && cy === 0) return "";
      const dx = cx - mx;
      const isRight = dx > 0;
      const endX = isRight ? cx : cx + CARD_W;
      const endY = cy + 20;

      const ctrlX1 = mx + (endX - mx) * 0.45;
      const ctrlY1 = my - 25;
      const ctrlX2 = endX - (endX - mx) * 0.15;
      const ctrlY2 = endY;

      return `M ${mx} ${my} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${endX} ${endY}`;
    }
  );

  const vpW = useRef(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 768); vpW.current = window.innerWidth; };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const cx = e.clientX, cy = e.clientY;
      mouseX.set(cx);
      mouseY.set(cy);

      const fitsRight = cx + OFF_X + CARD_W + 20 < vpW.current;
      rawX.set(fitsRight ? cx + OFF_X : cx - OFF_X - CARD_W);
      rawY.set(cy + OFF_Y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY, mouseX, mouseY]);

  const handleHover  = useCallback((svc) => setActiveService(svc), []);
  const handleLeave  = useCallback(() => setActiveService(null), []);
  const toggleMobile = useCallback((id) => setOpenMobile((p) => (p === id ? null : id)), []);

  return (
    <section id="service-explorer" style={{ background: "var(--sand)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
      <div style={{ maxWidth: "var(--container-max,1280px)", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 4rem)" }}>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--terracotta)", marginBottom: "1rem" }}>
            Capabilities
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.035em", color: "var(--ink)", fontFamily: "var(--font-display,'Bricolage Grotesque'),sans-serif", margin: 0 }}>
              {"What We "}<span style={{ color: "var(--terracotta)" }}>Deliver</span>
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--ink-60)", maxWidth: 320, lineHeight: 1.65, margin: 0 }}>
              {isMobile ? "Tap any service to explore what we offer." : "Hover over any service to see a full breakdown."}
            </p>
          </div>
        </motion.div>

        <div>
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.id} service={s} index={i}
              onHover={handleHover} onLeave={handleLeave}
              isActive={activeService?.id === s.id}
              isMobile={isMobile}
              mobileOpen={openMobile === s.id}
              onMobileToggle={() => toggleMobile(s.id)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.55 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginTop: "clamp(2.5rem, 5vw, 4.5rem)", paddingTop: "2rem", borderTop: "1px solid var(--blush-border)" }}
        >
          <p style={{ fontSize: "0.88rem", color: "var(--ink-40)", margin: 0 }}>
            {"Can't decide? We'll figure it out together."}
          </p>
          <Link
            href="/contact"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", fontWeight: 600, color: "var(--terracotta)", background: "rgba(196,80,26,0.1)", border: "1px solid rgba(196,80,26,0.22)", borderRadius: "100px", padding: "10px 22px" }}
          >
            Start a Project <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

      {!isMobile && (
        <>
          <AnimatePresence>
            {activeService && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  pointerEvents: "none",
                  zIndex: 9998,
                  width: "100vw",
                  height: "100vh"
                }}
              >
                <defs>
                  <filter id="glow-terracotta" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="var(--terracotta)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  opacity={0.65}
                />

                <motion.circle
                  cx={mouseX}
                  cy={mouseY}
                  r={8}
                  fill="rgba(196, 80, 26, 0.2)"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.circle
                  cx={mouseX}
                  cy={mouseY}
                  r={3.5}
                  fill="var(--terracotta)"
                  style={{ filter: "url(#glow-terracotta)" }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
          <FloatingCard service={activeService} cardX={cardX} cardY={cardY} tilt={tilt} visible={!!activeService} />
        </>
      )}
    </section>
  );
}
