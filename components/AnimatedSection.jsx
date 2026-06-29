"use client";

import { motion } from "framer-motion";

export default function AnimatedSection({ children, className = "", id, delay = 0 }) {
  return (
    <motion.section
      className={className}
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.section>
  );
}
