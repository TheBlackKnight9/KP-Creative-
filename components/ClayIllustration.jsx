import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FLOATERS = [
  {
    type: "sphere",
    color: "#C4501A",
    size: 24,
    top: "12%",
    left: "8%",
    yAnim: [0, -15, 0],
    duration: 5,
  },
  {
    type: "sphere",
    color: "#D9C8BF",
    size: 16,
    top: "75%",
    right: "12%",
    yAnim: [0, -10, 0],
    duration: 4,
  },
  {
    type: "cube",
    color: "#E8744A",
    size: 20,
    bottom: "18%",
    left: "10%",
    yAnim: [0, -12, 0],
    duration: 4.5,
  },
  {
    type: "star",
    color: "#FAF5F2",
    size: 18,
    top: "25%",
    right: "8%",
    yAnim: [0, -8, 0],
    duration: 6,
  },
  {
    type: "sphere",
    color: "#EDE0D8",
    size: 12,
    bottom: "32%",
    right: "20%",
    yAnim: [0, -14, 0],
    duration: 5.5,
  },
];

export default function ClayIllustration({
  src,
  alt,
  width = 480,
  height = 420,
  className = "",
}) {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    setProcessedSrc(src); // Reset on src change

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Use the top-left pixel as background color reference
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const threshold = 18; // color distance tolerance

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean color distance
        const dist = Math.sqrt(
          Math.pow(r - bgR, 2) +
          Math.pow(g - bgG, 2) +
          Math.pow(b - bgB, 2)
        );

        if (dist < threshold) {
          // Set alpha to 0 (make transparent)
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src]);
  return (
    <motion.div
      className={`clay-illustration ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 25,
      }}
      style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Floating decorative clay shapes */}
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className={`clay-floater clay-floater--${f.type}`}
          style={{
            width: f.size,
            height: f.size,
            background: f.color,
            top: f.top,
            left: f.left,
            right: f.right,
            bottom: f.bottom,
            position: "absolute",
            zIndex: 1,
          }}
          animate={{
            y: f.yAnim,
            rotate: f.type === "cube" ? [0, 90, 180, 270, 360] : f.type === "star" ? [45, 90, 45] : 0,
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main clay illustration with subtle 3D floating and tilting motion */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotateZ: [0, 1, -1, 0],
          rotateY: [0, 3, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <motion.img
          src={processedSrc}
          alt={alt}
          width={width}
          height={height}
          style={{
            objectFit: "contain",
            maxWidth: "85%",
            height: "auto",
            filter: "drop-shadow(0 10px 20px rgba(28,15,10,0.08))",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
