"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const INDUSTRIES = [
  { icon: "☕", name: "Cafés" },
  { icon: "🍰", name: "Bakeries" },
  { icon: "🍽", name: "Restaurants" },
  { icon: "💎", name: "Jewellery Stores" },
  { icon: "🪑", name: "Furniture Stores" },
  { icon: "👗", name: "Fashion Brands" },
  { icon: "👟", name: "Clothing Stores" },
  { icon: "🛍", name: "Retail Stores" },
  { icon: "🏥", name: "Clinics & Healthcare" },
  { icon: "💄", name: "Beauty Salons" },
  { icon: "💇", name: "Hair Studios" },
  { icon: "🏋", name: "Gyms & Fitness Centers" },
  { icon: "🏡", name: "Real Estate" },
  { icon: "🏨", name: "Hotels & Resorts" },
  { icon: "🎓", name: "Schools & Coaching Institutes" },
  { icon: "🚗", name: "Automobile Businesses" },
  { icon: "🛒", name: "E-commerce Brands" },
  { icon: "📷", name: "Photography Studios" },
  { icon: "💼", name: "Professional Services" },
  { icon: "🚀", name: "Startups" },
  { icon: "🏭", name: "Manufacturing Businesses" },
  { icon: "📦", name: "Wholesale Businesses" },
  { icon: "🧁", name: "Home-Based Businesses" }
];

export default function IndustriesMarquee() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const el = trackRef.current;
    const width = el.scrollWidth / 2;

    // Adjust speed based on viewport
    let duration = 30; // Desktop
    if (window.innerWidth < 992 && window.innerWidth >= 768) {
      duration = 40; // Tablet (slower)
    } else if (window.innerWidth < 768) {
      duration = 32; // Mobile (smooth scroll distance adjusted)
    }

    const tween = gsap.to(el, {
      x: -width,
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => tween.kill();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <div 
      className="marquee-container" 
      style={{ paddingBlock: "1.5rem" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="marquee-track" ref={trackRef} style={{ gap: "clamp(24px, 4vw, 36px)" }}>
        {[...INDUSTRIES, ...INDUSTRIES].map((item, index) => (
          <div 
            className="industry-pill" 
            key={`${item.name}-${index}`}
          >
            <span className="industry-pill-icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
