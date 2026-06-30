"use client";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

export function ImagesBadge({
  text,
  images = [],
  folderSize = { width: 48, height: 36 },
  teaserImageSize = { width: 40, height: 28 },
  hoverImageSize = { width: 130, height: 100 },
  hoverTranslateY = -95,
  hoverSpread = 45,
  hoverRotation = 12,
  className = "",
}) {
  const [isActive, setIsActive] = useState(false);

  // Swap center and right image so the right-side image becomes the main (center) image
  const reorderedImages = [...images];
  if (reorderedImages.length >= 3) {
    const temp = reorderedImages[1];
    reorderedImages[1] = reorderedImages[2];
    reorderedImages[2] = temp;
  }

  const handleToggle = useCallback(() => setIsActive((v) => !v), []);
  const handleClose = useCallback(() => setIsActive(false), []);

  return (
    <div
      // Desktop: hover
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      // Mobile: tap to toggle
      onTouchStart={handleToggle}
      className={`inline-flex items-center gap-3 bg-[var(--sand)] border border-[var(--blush-border)]/60 rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-colors duration-200 cursor-pointer select-none relative touch-manipulation ${isActive ? "bg-[var(--blush)] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : ""} ${className}`}
    >
      {/* Folder/Thumbnail area */}
      <div
        className="relative flex items-center justify-center rounded-lg overflow-visible shrink-0"
        style={{ width: folderSize.width, height: folderSize.height }}
      >
        {reorderedImages.map((img, idx) => {
          // Horizontal spread offset on active
          let xOffset = 0;
          if (isActive) {
            if (idx === 0) xOffset = -hoverSpread;
            if (idx === 2) xOffset = hoverSpread;
          } else {
            xOffset = (idx - 1) * 3;
          }

          // Rotation angle on active
          let rotateAngle = 0;
          if (isActive) {
            if (idx === 0) rotateAngle = -hoverRotation;
            if (idx === 2) rotateAngle = hoverRotation;
          } else {
            rotateAngle = (idx - 1) * 4;
          }

          // z-index: center image on top when idle, outer spread when active
          const zIndex = isActive ? (idx === 1 ? 20 : 10) : (idx === 1 ? 10 : 5);

          return (
            <motion.div
              key={idx}
              className="absolute rounded-md overflow-hidden border border-[var(--blush-border)]/80 shadow-[0_2px_8px_rgba(0,0,0,0.12)] bg-neutral-100 shrink-0"
              style={{ zIndex, willChange: "transform" }}
              animate={{
                width: isActive ? hoverImageSize.width : teaserImageSize.width,
                height: isActive ? hoverImageSize.height : teaserImageSize.height,
                x: xOffset,
                y: isActive ? hoverTranslateY : 0,
                rotate: rotateAngle,
                scale: isActive ? 1 : 1,
              }}
              transition={{
                // Snappier, lighter animation — no scale, reduced stiffness
                type: "spring",
                stiffness: 280,
                damping: 24,
                mass: 0.6,
              }}
            >
              <img
                src={img}
                alt={`badge-${idx}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Text label */}
      <span className="text-xs md:text-sm font-bold tracking-tight text-[var(--ink)]">
        {text}
      </span>
    </div>
  );
}
