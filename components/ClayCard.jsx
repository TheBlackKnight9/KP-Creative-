"use client";

import { motion } from "framer-motion";

export default function ClayCard({
  children,
  className = "",
  featured = false,
  sand = false,
  delay = 0,
  ...props
}) {
  const variant = featured
    ? "clay-card--featured"
    : sand
      ? "clay-card--sand"
      : "";

  return (
    <motion.div
      className={`clay-card ${variant} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
