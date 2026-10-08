import { useReducedMotion } from "framer-motion";

type RevealOptions = {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
};

/**
 * Shared whileInView reveal props that respect prefers-reduced-motion.
 */
export function useReveal({
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.6,
}: RevealOptions = {}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return {
      initial: false as const,
      whileInView: { opacity: 1, y: 0, x: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration, delay, ease: "easeOut" as const },
  };
}

/**
 * Shared initial/animate props (no scroll needed — e.g. hero entrance).
 */
export function useEntrance({ delay = 0, y = 16, x = 0, duration = 0.7 }: RevealOptions = {}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0, x: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y, x },
    animate: { opacity: 1, y: 0, x: 0 },
    transition: { duration, delay, ease: "easeOut" as const },
  };
}
