import Link from "next/link";
import { Globe, Send, Share2, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { href: "/services", label: "Web Design" },
    { href: "/services", label: "Branding" },
    { href: "/services", label: "Marketing" },
    { href: "/services", label: "SEO" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
    { href: "/audit", label: "Free Audit" },
  ],
  Legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">KP Creatives</div>
            <p className="footer-desc">
              A digital agency that blends craft with strategy — building
              websites, brands, and campaigns that actually move the needle.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <div className="footer-heading">{heading}</div>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} KP Creatives. All rights reserved.
          </span>

          <div className="footer-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Instagram"
              id="footer-ig"
            >
              <Globe size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Twitter"
              id="footer-tw"
            >
              <Send size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="LinkedIn"
              id="footer-li"
            >
              <Share2 size={16} />
            </a>
            <a
              href="mailto:hello@kpcreatives.in"
              className="footer-social"
              aria-label="Email"
              id="footer-email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
