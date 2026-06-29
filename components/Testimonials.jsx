"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "KP Creatives didn't just build us a website — they built a growth engine. Our leads doubled in the first quarter after launch.",
    name: "Aanya Sharma",
    role: "Founder, Verdant Living",
  },
  {
    quote:
      "The attention to detail is unreal. Every micro-interaction, every animation — they treated our brand like their own.",
    name: "Rohan Mehta",
    role: "CEO, CloudSync SaaS",
  },
  {
    quote:
      "Working with KP Creatives felt effortless. They understood our vision immediately and delivered beyond expectations.",
    name: "Priya Kapoor",
    role: "Marketing Head, Nova Fitness",
  },
  {
    quote:
      "From brand identity to our e-commerce site, they handled everything seamlessly. Couldn't recommend more.",
    name: "Vikram Joshi",
    role: "Co-founder, Artisan & Co",
  },
  {
    quote:
      "Our competitors still ask who designed our site. That's the kind of impact KP Creatives made for us.",
    name: "Meera Iyer",
    role: "Director, TerraVenture",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const cardRef = useRef(null);
  const intervalRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.25,
          onComplete: () => {
            setActive(index);
            gsap.fromTo(
              cardRef.current,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
          },
        });
      } else {
        setActive(index);
      }
    },
    []
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [goTo]);

  // Fix: use functional state update for auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % TESTIMONIALS.length;
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
          );
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <div className="testimonials-wrap">
      <div className="testimonial-card" ref={cardRef}>
        <Quote
          size={32}
          style={{ color: "var(--terracotta)", opacity: 0.3, marginBottom: "1rem" }}
        />
        <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
        <div className="testimonial-author">
          <div className="testimonial-avatar">
            {t.name.charAt(0)}
          </div>
          <div>
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-role">{t.role}</div>
          </div>
        </div>
      </div>

      <div className="testimonial-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot ${i === active ? "active" : ""}`}
            onClick={() => {
              clearInterval(intervalRef.current);
              goTo(i);
            }}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
