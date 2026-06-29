"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, X } from "lucide-react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const logoLetters = "KP Creatives".split("");

const logoContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
    }
  }
};

const logoLetterVariants = {
  initial: { opacity: 1, y: 0, scale: 1 },
  animate: {
    y: [0, -5, 0],
    scale: [1, 1.12, 1],
    transition: {
      duration: 1.0,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollTop > window.innerHeight * 0.5);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="main-nav">
        <div className="container navbar-inner">
          <Link href="/" id="nav-logo" style={{ display: "inline-flex" }}>
            <span
              className="navbar-logo"
              style={{ display: "inline-flex" }}
            >
              {logoLetters.map((char, index) => {
                const isKP = index < 2; // "K" and "P" are indices 0 and 1
                return (
                  <motion.span
                    key={index}
                    animate={{
                      y: [0, -5, 0],
                      scale: [1, 1.12, 1],
                    }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      repeatDelay: 1.7,
                      ease: ["easeOut", "easeIn"],
                      delay: index * 0.06,
                    }}
                    style={{
                      display: "inline-block",
                      color: isKP ? "var(--terracotta)" : "var(--ink)",
                      whiteSpace: char === " " ? "pre" : "normal"
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          </Link>

          <div className="navbar-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-link ${pathname === link.href ? "active" : ""}`}
                id={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <button
              className="navbar-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              id="theme-toggle"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/audit" className="btn btn-primary btn-sm hide-mobile" id="nav-cta">
              Free Audit
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              id="mobile-menu-open"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} id="mobile-menu">
        <button
          className="mobile-menu-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          id="mobile-menu-close"
        >
          <X size={22} />
        </button>

        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-link ${pathname === link.href ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/audit"
          className="btn btn-primary"
          onClick={() => setMobileOpen(false)}
        >
          Free Audit
        </Link>
      </div>

      <div className="nav-spacer" />
    </>
  );
}
