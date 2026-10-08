"use client";

import { portfolio } from "@/data/portfolio";

const accentColors = {
  lime: "var(--accent-lime)",
  dim: "var(--accent-lime-dim)",
  gold: "var(--accent-gold)",
} as const;

/**
 * Non-numeric highlights — edit `portfolio.stats` to swap these.
 * No invented metrics: only meaningful, verifiable labels.
 */
export default function Stats() {
  return (
    <div
      className="mt-7 grid grid-cols-3 gap-4 pt-6"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      {portfolio.stats.map((stat, i) => (
        <div
          key={stat.label}
          className="text-center"
          style={
            i > 0
              ? {
                  borderLeft: "1px solid var(--border-subtle)",
                  borderRight: i === 1 ? "1px solid var(--border-subtle)" : undefined,
                }
              : undefined
          }
        >
          <div
            className="text-lg font-bold md:text-2xl"
            style={{ color: accentColors[stat.accent] }}
          >
            {stat.value}
          </div>
          <div className="mt-0.5 text-[10px] tracking-wider text-whisper uppercase">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
