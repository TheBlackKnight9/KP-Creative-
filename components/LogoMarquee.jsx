"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const LOGOS = [
  "TechNova",
  "Verdant Living",
  "CloudSync",
  "Bloom Bakery",
  "Artisan & Co",
  "TerraVenture",
  "Nova Fitness",
  "PixelForge",
  "GreenLeaf",
  "UrbanCraft",
];

export default function LogoMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const el = trackRef.current;
    const width = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: -width,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee-track" ref={trackRef}>
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <div className="marquee-item" key={`${name}-${i}`}>
            <span className="marquee-logo-text">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
