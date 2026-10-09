"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useEntrance } from "@/lib/motion";
import ProfileImage from "@/components/ProfileImage";
import ResumeButton from "@/components/ResumeButton";

const ORBIT_RADIUS = 148;
const DOT_COUNT = 6;

function Typewriter({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => (reduced ? words[0] : ""));
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) {
      return;
    }
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 250);
    } else {
      timeout = setTimeout(
        () => {
          const next = deleting
            ? word.slice(0, Math.max(text.length - 1, 0))
            : word.slice(0, text.length + 1);
          setText(next);
        },
        deleting ? 35 : 60,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, reduced]);

  return (
    <span className="text-accent">
      {text}
      <span
        aria-hidden="true"
        className="animate-caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-accent-dim"
      />
    </span>
  );
}

function OrbitRig() {
  const reduced = useReducedMotion();
  const badge = useEntrance({ delay: 0.9, y: 8, duration: 0.5 });
  const chip = useEntrance({ delay: 1.2, y: 0, duration: 0.5 });

  return (
    <div className="relative flex shrink-0 items-center justify-center scale-[0.85] sm:scale-90 md:scale-100">
      <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
        {/* Rotating conic ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0 rounded-full p-0.5"
          style={{
            background:
              "conic-gradient(from 0deg, var(--accent-lime-bright), var(--accent-lime-dim), var(--accent-gold-bright), transparent 60%, var(--accent-lime-bright))",
          }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          <div className="h-full w-full rounded-full bg-page" />
        </motion.div>

        {/* Dashed ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-2 z-0 rounded-full border border-dashed"
          style={{ borderColor: "var(--accent-lime-border)" }}
          animate={reduced ? undefined : { rotate: -360 }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        />

        {/* Photo */}
        <div
          className="absolute inset-4 z-10 overflow-hidden rounded-full"
          style={{
            border: "2px solid var(--accent-lime-border)",
            boxShadow: "0 0 0 1px var(--accent-lime-border), 0 0 40px var(--glow-lime)",
          }}
        >
          <ProfileImage src={portfolio.heroImage} />
        </div>

        {/* Orbiting dots */}
        {!reduced &&
          Array.from({ length: DOT_COUNT }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / DOT_COUNT;
            const isGold = i % 2 === 1;
            return (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 z-20 h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: isGold ? "var(--accent-gold-bright)" : "var(--accent-lime-bright)",
                  boxShadow: `0 0 6px ${isGold ? "var(--accent-gold-bright)" : "var(--accent-lime-bright)"}`,
                }}
                initial={{ x: -3, y: -3, opacity: 0 }}
                animate={{
                  x: ORBIT_RADIUS * Math.cos(angle) - 3,
                  y: ORBIT_RADIUS * Math.sin(angle) - 3,
                  opacity: 1,
                }}
                transition={{ delay: 1.1, duration: 0.01 }}
              />
            );
          })}

        {/* Status badge */}
        <motion.a
          {...badge}
          href="#contact"
          className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-1.5 whitespace-nowrap transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--accent-lime)",
            boxShadow: "0 0 15px var(--glow-lime)",
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: "var(--status-online)" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--status-online)" }}
            />
          </span>
          <span className="text-xs font-bold tracking-wide uppercase text-accent-bright">
            Let&apos;s Connect
          </span>
        </motion.a>

        {/* Initials chip */}
        <motion.div
          {...chip}
          className="absolute -top-2 right-8 z-20 flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-bold text-accent"
          title={portfolio.name}
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--accent-lime-border)",
            boxShadow: "var(--shadow-card)",
          }}
          aria-hidden="true"
        >
          {portfolio.initials}
        </motion.div>
      </div>
    </div>
  );
}

const stackChips = [
  { label: "React", accent: "lime" as const },
  { label: "Node.js", accent: "gold" as const },
  { label: "Supabase", accent: "lime" as const },
  { label: "Docker", accent: "gold" as const },
];

export default function Hero() {
  const textCol = useEntrance({ delay: 0.2, x: 40, y: 0, duration: 0.7 });
  const greeting = useEntrance({ delay: 0.35, y: 12, duration: 0.5 });
  const heading = useEntrance({ delay: 0.45, y: 16, duration: 0.6 });
  const typed = useEntrance({ delay: 0.55, y: 12, duration: 0.5 });
  const subtitle = useEntrance({ delay: 0.65, y: 12, duration: 0.5 });
  const buttons = useEntrance({ delay: 0.75, y: 12, duration: 0.5 });
  const chips = useEntrance({ delay: 0.7, y: 12, duration: 0.5 });

  return (
    <section id="header" className="relative scroll-mt-20 overflow-hidden bg-page">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 h-72 w-72 rounded-full opacity-60 blur-3xl md:h-96 md:w-96"
        style={{ backgroundColor: "var(--glow-lime)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full opacity-60 blur-3xl md:h-80 md:w-80"
        style={{ backgroundColor: "var(--glow-gold)" }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-6 py-20 md:min-h-screen md:flex-row md:gap-16 md:px-16 md:py-20 lg:gap-24">
        <OrbitRig />

        <motion.div {...textCol} className="max-w-xl space-y-4 text-center md:space-y-5 md:text-left">
          <motion.div
            {...greeting}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--accent-lime-bg)",
              border: "1px solid var(--accent-lime-border)",
            }}
          >
            <span className="text-sm font-medium tracking-wide text-accent">👋 Hey, I&apos;m</span>
          </motion.div>

          <motion.h1
            {...heading}
            className="text-4xl leading-tight font-bold text-hi sm:text-5xl lg:text-6xl"
          >
            {portfolio.firstName}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--accent-lime-bright), var(--accent-lime), var(--accent-gold-bright))",
              }}
            >
              {portfolio.lastName}
            </span>
          </motion.h1>

          <motion.p
            {...typed}
            className="h-9 text-lg font-semibold text-accent sm:text-xl lg:text-2xl"
            aria-live="polite"
          >
            <Typewriter words={portfolio.roles} />
          </motion.p>

          <motion.p {...subtitle} className="mx-auto max-w-md text-sm leading-relaxed text-lo md:mx-0 md:text-base">
            {portfolio.shortBio}
          </motion.p>

          <motion.div
            {...buttons}
            className="flex flex-wrap items-center justify-center gap-3 pt-1 md:justify-start"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3 text-sm font-bold text-page-deep shadow-[0_4px_20px_var(--glow-lime)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/15"
              />
              View My Work
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <ResumeButton variant="ghost" />
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-semibold text-lo transition-colors duration-300 hover:text-accent"
            >
              Contact Me
              <ChevronRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <motion.ul
            {...chips}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-2 md:justify-start"
            aria-label="Core technologies"
          >
            {stackChips.map((chip) => (
              <li key={chip.label}>
                <a
                  href="#skills"
                  className="group flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-med transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        chip.accent === "gold" ? "var(--accent-gold)" : "var(--accent-lime)",
                    }}
                  />
                  {chip.label}
                  <ChevronRight
                    size={12}
                    aria-hidden="true"
                    className="rotate-[-45deg] opacity-50 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
