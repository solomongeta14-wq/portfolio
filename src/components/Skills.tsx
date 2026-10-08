"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Blocks,
  Braces,
  Database,
  Globe,
  Layers,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, type Skill, type SkillIconSpec } from "@/data/skills";
import { useReveal } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

const accentColors = {
  lime: "var(--accent-lime)",
  gold: "var(--accent-gold)",
  dim: "var(--accent-lime-dim)",
} as const;

const lucideIcons: Record<Extract<SkillIconSpec, { kind: "lucide" }>["name"], LucideIcon> = {
  braces: Braces,
  layers: Layers,
  globe: Globe,
  database: Database,
  blocks: Blocks,
  workflow: Workflow,
};

function SkillIcon({ spec }: { spec: SkillIconSpec }) {
  if (spec.kind === "lucide") {
    const Icon = lucideIcons[spec.name];
    return <Icon className="h-7 w-7 text-med" strokeWidth={1.5} aria-hidden="true" />;
  }

  return (
    <span
      className="flex h-full w-full items-center justify-center rounded-lg"
      style={
        spec.lightBackground
          ? { backgroundColor: "#f2f2f0" }
          : undefined
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={spec.src}
        alt=""
        loading="lazy"
        className="h-full w-full object-contain p-1 opacity-85 transition-opacity duration-300 group-hover:opacity-100"
        onError={(e) => {
          // Gracefully hide broken CDN icons — the tooltip/label still shows the name.
          e.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}

function SkillTile({ skill }: { skill: Skill }) {
  const reduced = useReducedMotion();

  return (
    <div className="group/tile relative flex aspect-square items-center justify-center">
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        whileHover={reduced ? undefined : { scale: 1.12, y: -5 }}
        transition={{ duration: 0.3 }}
        className="flex h-full w-full items-center justify-center rounded-xl p-3 transition-colors duration-300 group-hover/tile:border-accent-border group-hover/tile:bg-accent-bg"
        style={{
          backgroundColor: "var(--page-bg-deep)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <SkillIcon spec={skill.icon} />
      </motion.div>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 z-50 -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/tile:opacity-100"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--accent-lime-border)",
          color: "var(--text-primary)",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

function SkillGroupCard({ group, index }: { group: (typeof skillGroups)[number]; index: number }) {
  const reveal = useReveal({ y: 24, delay: 0.07 * index, duration: 0.5 });

  return (
    <motion.div
      {...reveal}
      className="portfolio-card rounded-2xl p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3
          className="text-base font-semibold md:text-lg"
          style={{ color: accentColors[group.accent] }}
        >
          {group.title}
        </h3>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-xs"
          style={{
            backgroundColor: "var(--accent-lime-bg)",
            border: "1px solid var(--accent-lime-border)",
            color: "var(--accent-lime)",
          }}
          aria-label={`${group.skills.length} skills`}
        >
          {group.skills.length}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {group.skills.map((skill) => (
          <SkillTile key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mt-20 scroll-mt-24 bg-page sm:ml-9 md:ml-0 lg:mt-24">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <SectionHeading title="My Skills" />
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillGroupCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
