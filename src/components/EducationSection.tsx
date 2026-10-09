"use client";

import { motion } from "framer-motion";
import { Code2, FolderGit2, Pill, Sparkles, type LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { educationStory, journeyProject, journeySkills } from "@/data/education";
import { useReveal } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";
import TimelineItem from "@/components/TimelineItem";
import SkillCard from "@/components/SkillCard";

function PanelIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      style={{
        backgroundColor: "var(--accent-lime-bg)",
        border: "1px solid var(--accent-lime-border)",
        color: "var(--accent-lime)",
      }}
    >
      <Icon size={20} />
    </span>
  );
}

export default function EducationSection() {
  const story = useReveal({ y: 24, duration: 0.55 });
  const skills = useReveal({ y: 24, duration: 0.5 });
  const project = useReveal({ y: 24, delay: 0.1, duration: 0.5 });

  return (
    <section id="education" className="mt-20 scroll-mt-24 bg-page sm:ml-9 md:ml-0 lg:mt-24">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <SectionHeading title="My Education Journey" />

        {/* Personal story intro */}
        <motion.div
          {...story}
          className="portfolio-card relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl p-7 md:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full blur-[90px]"
            style={{ backgroundColor: "var(--glow-lime)" }}
          />
          <div className="relative">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.18em] text-accent uppercase"
              style={{
                backgroundColor: "var(--accent-lime-bg)",
                border: "1px solid var(--accent-lime-border)",
              }}
            >
              <Sparkles size={12} aria-hidden="true" />
              The Journey
            </span>
            <h3 className="mt-5 text-2xl font-bold text-hi md:text-3xl">
              {educationStory.headline}
            </h3>
            <p className="mt-3 text-base font-medium text-accent">{educationStory.supporting}</p>
            {educationStory.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-relaxed text-lo md:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute top-0 left-5 h-full w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-lime), var(--accent-lime-border), transparent)",
            }}
          />
          <ol className="space-y-10 md:space-y-16">
            {portfolio.education.map((entry, index) => (
              <li key={entry.level}>
                <TimelineItem
                  entry={entry}
                  index={index}
                  side={index % 2 === 0 ? "left" : "right"}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* Skills + project highlight */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <motion.div
            {...skills}
            className="portfolio-card rounded-3xl p-6 md:p-8 lg:col-span-3"
          >
            <div className="flex items-center gap-3">
              <PanelIcon icon={Code2} />
              <div>
                <h3 className="text-lg font-bold text-hi md:text-xl">Skills Along the Way</h3>
                <p className="text-sm text-lo">Tools I keep building with as I learn.</p>
              </div>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {journeySkills.map((skill, index) => (
                <li key={skill.name}>
                  <SkillCard skill={skill} index={index} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...project}
            className="portfolio-card rounded-3xl p-6 md:p-8 lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <PanelIcon icon={FolderGit2} />
              <div>
                <h3 className="text-lg font-bold text-hi md:text-xl">Project Highlight</h3>
                <p className="text-sm text-lo">Where theory met practice.</p>
              </div>
            </div>

            <div
              className="mt-6 rounded-2xl p-5"
              style={{
                backgroundColor: "var(--page-bg-deep)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "var(--accent-gold-bg)",
                    border: "1px solid var(--accent-gold)",
                    color: "var(--accent-gold-bright)",
                  }}
                >
                  <Pill size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-hi">{journeyProject.name}</h4>
                  <p className="mt-0.5 font-mono text-xs text-accent">
                    {journeyProject.technology}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-lo">
                {journeyProject.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project technologies">
                {journeyProject.technologies.map((tech) => (
                  <li key={tech} className="tag-pill">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
