"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

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

export default function TechMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const el = trackRef.current;
    const width = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: -width,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  return (
    <div className="marquee-container" style={{ paddingBlock: "1rem" }}>
      <div className="marquee-track" ref={trackRef} style={{ gap: "16px" }}>
        {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
          <div className="tech-badge" key={`${t}-${i}`} style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
            {TECH_ICONS[t] || null}
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
