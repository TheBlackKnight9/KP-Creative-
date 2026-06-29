"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClayIllustration from "@/components/ClayIllustration";

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

export default function NotFound() {
  return (
    <>
      <Navbar />

      <section className="section section--sand not-found-page" id="not-found" style={{ overflow: "hidden" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              alignItems: "center",
              maxWidth: 960,
              margin: "0 auto",
            }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Animated Clay Illustration */}
            <motion.div variants={fadeInUp} style={{ maxWidth: 360, width: "100%", margin: "0 auto" }}>
              <div className="scene-container" style={{ minHeight: 320 }}>
                <ClayIllustration
                  src="/images/clay-crumpled-paper-v3.png"
                  alt="3D clay crumpled paper ball"
                  width={320}
                  height={280}
                />
              </div>
            </motion.div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <motion.h1 className="text-hero" style={{ fontSize: "5rem", lineHeight: 1 }} variants={fadeInUp}>
                <span className="text-accent">404</span>
              </motion.h1>

              <motion.h2 className="text-h2" variants={fadeInUp}>Page Not Found</motion.h2>

              <motion.p className="text-body" style={{ maxWidth: 420 }} variants={fadeInUp}>
                The page you&apos;re looking for doesn&apos;t exist, has been moved,
                or is still being molded out of clay. Let&apos;s get you back home.
              </motion.p>

              <motion.div variants={fadeInUp} style={{ marginTop: "1rem" }}>
                <Link href="/" className="btn btn-primary" id="not-found-cta">
                  <ArrowLeft size={18} /> Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
