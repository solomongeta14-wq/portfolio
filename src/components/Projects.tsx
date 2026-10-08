"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { projectCategories, projects, type Project } from "@/data/projects";
import { useReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const header = useReveal({ y: 20, duration: 0.5 });
  const cta = useReveal({ y: 20, delay: 0.1, duration: 0.5 });

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="mt-20 scroll-mt-24 bg-page sm:ml-7 md:ml-0 lg:mt-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="Featured Projects" />

        <motion.div
          {...header}
          className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <h3 className="text-lg font-bold text-hi md:text-xl">Selected Work</h3>
            <p className="mt-3 text-sm leading-relaxed text-lo">
              A showcase of things I&apos;ve built while sharpening my full-stack skills. Details
              are being finalized — each card opens a full project breakdown.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {projectCategories.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(category)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                    active ? "text-page-deep" : "text-lo hover:text-accent",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {!active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{
                        backgroundColor: "var(--accent-lime-bg)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={i} onOpen={setOpenProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-lo">
            [ADD PROJECT HERE] — no projects in this category yet.
          </p>
        )}

        <motion.div {...cta} className="mt-20 flex justify-center">
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full border border-accent-border px-5 py-2 text-sm font-bold text-accent transition-all duration-300 md:px-10 md:py-4 md:text-base"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 z-0 translate-y-full rounded-full bg-accent transition-transform duration-300 group-hover:translate-y-0"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-page-deep">
              VIEW ALL ON GITHUB
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </a>
        </motion.div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
