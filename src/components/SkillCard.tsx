"use client";

import { motion } from "framer-motion";
import type { JourneySkill } from "@/data/education";
import { useReveal } from "@/lib/motion";

/** A single technology tile in the journey's skills list. */
export default function SkillCard({ skill, index }: { skill: JourneySkill; index: number }) {
  const reveal = useReveal({ y: 14, delay: 0.04 * index, duration: 0.4 });

  return (
    <motion.div
      {...reveal}
      className="group flex h-full items-center gap-3 rounded-xl p-3 transition-colors duration-300 hover:border-accent-border hover:bg-accent-bg"
      style={{
        backgroundColor: "var(--page-bg-deep)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg p-1.5"
        style={{
          backgroundColor: skill.lightBackground ? "#f2f2f0" : "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.src}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          onError={(e) => {
            // Hide broken CDN icons gracefully; the label still shows the name.
            e.currentTarget.style.display = "none";
          }}
        />
      </span>
      <span className="text-sm font-medium text-med transition-colors duration-300 group-hover:text-accent">
        {skill.name}
      </span>
    </motion.div>
  );
}
