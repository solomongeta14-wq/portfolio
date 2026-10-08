"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import type { Project } from "@/data/projects";

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-[10px] font-bold tracking-[0.18em] text-lo uppercase">{title}</h4>
      <div className="text-sm leading-relaxed text-med">{children}</div>
    </div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const hasGithub = project?.github && project.github !== "#";
  const hasDemo = project?.demo && project.demo !== "#";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "var(--overlay-dark)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--accent-lime-border)",
              boxShadow: "var(--shadow-card-hover), 0 0 60px var(--glow-lime)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              <X size={18} />
            </button>

            <div
              className="relative aspect-16/10 w-full overflow-hidden"
              style={{ backgroundColor: "var(--card-bg-alt)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="space-y-6 p-7 md:p-10">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="tag-pill">{project.category}</span>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-hi md:text-3xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-med md:text-base">
                  {project.longDescription}
                </p>
              </div>

              {project.problem && (
                <DetailBlock title="The Problem">{project.problem}</DetailBlock>
              )}
              {project.solution && (
                <DetailBlock title="The Solution">{project.solution}</DetailBlock>
              )}
              {project.features && project.features.length > 0 && (
                <DetailBlock title="Key Features">
                  <ul className="space-y-1.5">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--accent-lime)" }}
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              )}
              {project.challenges && project.challenges.length > 0 && (
                <DetailBlock title="Challenges & Learnings">
                  <ul className="space-y-1.5">
                    {project.challenges.map((challenge) => (
                      <li key={challenge} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--accent-gold)" }}
                          aria-hidden="true"
                        />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {hasGithub && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-bg px-6 py-2.5 text-sm font-semibold text-accent transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <Github size={15} />
                    Source Code
                  </a>
                )}
                {hasDemo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-page-deep shadow-[0_4px_20px_var(--glow-lime)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <ExternalLink size={15} />
                    Live Preview
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
