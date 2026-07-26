"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// framer-motion's `motion.*` components pull in the full animation engine
// (drag, layout animations, etc.) into the client bundle regardless of what
// you actually use. `LazyMotion` + the `m.*` components used throughout
// src/components/sections and AnimateIn.tsx only load the `domAnimation`
// feature set (animate/exit/whileInView/gestures — everything this site
// uses, no drag or layout animations), which is the fix for the 431-chunk's
// 54% unused JS flagged by the performance audit.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
