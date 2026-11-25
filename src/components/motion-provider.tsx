"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Magic UI animates with `motion`. With `reducedMotion="user"`, it follows
 * the visitor's "reduce motion" setting: no movement, only fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
