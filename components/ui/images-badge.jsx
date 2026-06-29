"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function ImagesBadge({
  text,
  images = [],
  folderSize = { width: 48, height: 36 },
  teaserImageSize = { width: 40, height: 28 },
  hoverImageSize = { width: 140, height: 108 },
  hoverTranslateY = -110,
  hoverSpread = 50,
  hoverRotation = 12,
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Swap center and right image so the right-side image becomes the main (center) image
  const reorderedImages = [...images];
  if (reorderedImages.length >= 3) {
    const temp = reorderedImages[1];
    reorderedImages[1] = reorderedImages[2];
    reorderedImages[2] = temp;
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center gap-3 bg-[#FAF5F2] hover:bg-[#F5EDE8] border border-[#D9C8BF]/60 rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(28,15,10,0.04)] hover:shadow-[0_8px_24px_rgba(28,15,10,0.08)] transition-all duration-300 cursor-pointer select-none relative ${className}`}
    >
      {/* Folder/Thumbnail area */}
      <div
        className="relative flex items-center justify-center bg-[#1C0F0A]/5 rounded-lg overflow-visible shrink-0"
        style={{ width: folderSize.width, height: folderSize.height }}
      >
        {reorderedImages.map((img, idx) => {
          // Horizontal spread offset on hover
          let xOffset = 0;
          if (isHovered) {
            if (idx === 0) xOffset = -hoverSpread;
            if (idx === 2) xOffset = hoverSpread;
          } else {
            // Slight fan out in teaser state
            xOffset = (idx - 1) * 3;
          }

          // Rotation angle on hover
          let rotateAngle = 0;
          if (isHovered) {
            if (idx === 0) rotateAngle = -hoverRotation;
            if (idx === 2) rotateAngle = hoverRotation;
          } else {
            rotateAngle = (idx - 1) * 4;
          }

          // Z-index calculation to overlay center image on top in teaser, but right image on top in spread (or vice versa)
          const zIndex = isHovered ? (idx === 1 ? 20 : 10) : (idx === 1 ? 10 : 5);

          return (
            <motion.div
              key={idx}
              className="absolute rounded-md overflow-hidden border border-white/80 shadow-[0_2px_8px_rgba(28,15,10,0.12)] bg-neutral-100 shrink-0"
              style={{ zIndex }}
              animate={{
                width: isHovered ? hoverImageSize.width : teaserImageSize.width,
                height: isHovered ? hoverImageSize.height : teaserImageSize.height,
                x: xOffset,
                y: isHovered ? hoverTranslateY : 0,
                rotate: rotateAngle,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
            >
              <img
                src={img}
                alt={`teaser-${idx}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Text label */}
      <span className="text-xs md:text-sm font-bold tracking-tight text-[#1C0F0A]">
        {text}
      </span>
    </div>
  );
}
