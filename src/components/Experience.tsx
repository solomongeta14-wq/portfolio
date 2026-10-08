"use client";

import { motion } from "framer-motion";
import { Briefcase, CalendarDays, Check, ExternalLink } from "lucide-react";
import { portfolio, type ExperienceEntry } from "@/data/portfolio";
import { useReveal } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

function ExperienceCard({ job, index }: { job: ExperienceEntry; index: number }) {
  const reveal = useReveal({ y: 28, delay: 0.08 * index, duration: 0.5 });

  return (
    <motion.div
      {...reveal}
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:border-accent-border"
      style={{
        backgroundColor: "var(--card-bg-alt)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: "var(--glow-lime)" }}
      />
      <div
        className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--page-bg-deep)",
        }}
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: "var(--accent-lime-bg)",
            border: "1px solid var(--accent-lime-border)",
            color: "var(--accent-lime)",
          }}
        >
          <Briefcase size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-hi md:text-xl">{job.position}</h3>
          <p className="flex items-center gap-1 text-sm text-accent">{job.company}</p>
        </div>
        <div className="flex items-center gap-3 sm:ml-auto">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs"
            style={{
              backgroundColor: "var(--accent-lime-bg)",
              border: "1px solid var(--accent-lime-border)",
              color: "var(--accent-lime)",
            }}
          >
            <CalendarDays size={12} aria-hidden="true" />
            {job.startDate} — {job.endDate}
          </span>
          <span
            aria-hidden="true"
            className="hidden select-none font-mono text-2xl font-bold sm:block"
            style={{ color: "var(--border-subtle)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="text-sm leading-relaxed text-lo">{job.description}</p>
        {job.responsibilities.length > 0 && (
          <>
            <p className="mt-4 mb-3 text-[10px] font-bold tracking-[0.18em] text-lo uppercase">
              Key Responsibilities
            </p>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-lo">
                  <span
                    className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px]"
                    style={{
                      backgroundColor: "var(--accent-lime-bg)",
                      border: "1px solid var(--accent-lime-border)",
                    }}
                  >
                    <Check size={8} className="text-accent" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        {job.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {job.technologies.map((tech) => (
              <li key={tech} className="tag-pill">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const reveal = useReveal({ y: 28, duration: 0.5 });

  return (
    <section id="experience" className="mt-20 scroll-mt-24 bg-page sm:ml-9 md:ml-0 lg:mt-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="Work Experience" />

        <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-6">
          {portfolio.experience.length === 0 ? (
            /* Placeholder — replace with real entries in data/portfolio.ts */
            <motion.div
              {...reveal}
              className="relative overflow-hidden rounded-2xl p-10 text-center"
              style={{
                backgroundColor: "var(--card-bg-alt)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full opacity-40 blur-[80px]"
                style={{ backgroundColor: "var(--glow-lime)" }}
              />
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--accent-lime-bg)",
                  border: "1px solid var(--accent-lime-border)",
                  color: "var(--accent-lime)",
                }}
              >
                <Briefcase size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-hi md:text-2xl">
                Professional Experience — Coming Soon
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-lo">
                This timeline is ready for my professional journey. I&apos;m currently focused on
                building my full-stack foundation through hands-on projects and continuous
                learning. Watch this space.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-bg px-6 py-2.5 text-sm font-semibold text-accent transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                Get in touch
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </motion.div>
          ) : (
            portfolio.experience.map((job, idx) => (
              <ExperienceCard key={`${job.company}-${job.position}`} job={job} index={idx} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
