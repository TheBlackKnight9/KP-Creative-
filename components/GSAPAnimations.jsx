"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP text reveal — lines slide up from below with stagger.
 */
export function useTextReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const els = ref.current.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    gsap.set(els, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: options.start || "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(els, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: options.stagger || 0.12,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [ref, options.start, options.stagger]);
}

/**
 * GSAP parallax shift on scroll.
 */
export function useParallax(ref, speed = 0.3) {
  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      y: () => speed * 120,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => tween.kill();
  }, [ref, speed]);
}

/**
 * GSAP horizontal scroll section.
 */
export function useHorizontalScroll(containerRef, panelSelector) {
  useEffect(() => {
    if (!containerRef.current) return;

    const panels = containerRef.current.querySelectorAll(panelSelector);
    if (!panels.length) return;

    const tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + containerRef.current.offsetWidth,
      },
    });

    return () => tween.kill();
  }, [containerRef, panelSelector]);
}

/**
 * GSAP counter animation.
 */
export function useCounter(ref, target, duration = 2) {
  useEffect(() => {
    if (!ref.current) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val);
        }
      },
    });

    return () => tween.kill();
  }, [ref, target, duration]);
}

/**
 * GSAP scale-in effect for cards.
 */
export function useScaleIn(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const els = ref.current.querySelectorAll("[data-scale-in]");
    if (!els.length) return;

    gsap.set(els, { scale: 0.85, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: options.start || "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(els, {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      stagger: options.stagger || 0.1,
      ease: "back.out(1.4)",
    });

    return () => tl.kill();
  }, [ref, options.start, options.stagger]);
}

/**
 * GSAP marquee — continuous horizontal scroll.
 */
export function useMarquee(ref, speed = 40) {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const width = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: -width,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    return () => tween.kill();
  }, [ref, speed]);
}
