"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 15,
    },
  },
};

export default function CreativeHeading({
  text = "",
  highlight = "",
  className = "text-h1",
  style = {},
}) {
  const words = text.split(" ");
  const highlightWords = highlight.split(" ");

  return (
    <motion.h1
      className={`${className} creative-heading`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        rowGap: "0.2em",
        columnGap: "0.25em",
        ...style,
      }}
    >
      {words.map((word, index) => {
        // Check if this word (ignoring punctuation) matches the highlight list
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            style={{ display: "inline-block", position: "relative" }}
          >
            {isHighlighted ? (
              <span className="heading-highlight-wrapper">
                {/* Clay bubble background highlight */}
                <motion.span
                  className="heading-highlight-bg"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.3 + index * 0.05,
                  }}
                />
                <span className="text-accent" style={{ position: "relative", zIndex: 2 }}>
                  {word}
                </span>
              </span>
            ) : (
              <span>{word}</span>
            )}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
