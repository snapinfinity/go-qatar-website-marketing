"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right" | "fade";
}

const variants = {
  bottom: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  left:   { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  right:  { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
  fade:   { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export default function AnimateIn({
  children,
  delay = 0,
  className,
  from = "bottom",
}: AnimateInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants[from]}
      transition={{
        duration: 0.55,
        delay: delay / 1000,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerMs = 80,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerMs / 1000 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
