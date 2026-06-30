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

// Custom animated theme toggle switch designed to match reference image (Left Light, Right Dark layout)
function AnimatedThemeToggle({ darkMode, toggleTheme }) {
  return (
    <motion.button
      className="relative w-[72px] h-9 rounded-full p-1 cursor-pointer flex items-center overflow-hidden border focus:outline-none shrink-0"
      onClick={toggleTheme}
      animate={{
        backgroundColor: darkMode ? "#0C0605" : "#EDE0D8", // Deep cocoa backdrop vs blush-deep backdrop
        borderColor: darkMode ? "#3A2A23" : "#D9C8BF"
      }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      id="theme-toggle"
    >
      {/* Sun Icon (Visible on the left in Light Mode, hidden/faded in Dark Mode) */}
      <motion.div
        className="absolute left-2.5 flex items-center justify-center text-[var(--terracotta)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: darkMode ? 0 : 1, scale: darkMode ? 0.6 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </motion.div>

      {/* Moon Icon with Stars (Visible on the right in Dark Mode, hidden/faded in Light Mode) */}
      <motion.div
        className="absolute right-2.5 flex items-center justify-center text-[var(--ink)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: darkMode ? 1 : 0, scale: darkMode ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" />
          <path d="M19 3v1.5M18.25 3.75h1.5M21.5 6.5v1M21 7h1" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* Sliding Knob */}
      <motion.div
        className="w-7 h-7 rounded-full shadow-md relative z-10"
        layout
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        animate={{
          x: darkMode ? 0 : 36,
          backgroundColor: darkMode ? "#F7ECE6" : "#1C0F0A" // Warm white circle vs solid dark ink circle
        }}
      />
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
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
    // Read theme state on mount to sync React state with document attribute set by head script
    const activeTheme = document.documentElement.getAttribute("data-theme") || 
                        localStorage.getItem("theme") || 
                        "light";
    
    setDarkMode(activeTheme === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    document.documentElement.setAttribute("data-theme", nextDark ? "dark" : "light");
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

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
            {mounted ? (
              <AnimatedThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
            ) : (
              <div className="w-[72px] h-9 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse border border-transparent shrink-0" />
            )}

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
