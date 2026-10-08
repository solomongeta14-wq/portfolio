"use client";

import { motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import type { Project } from "@/data/projects";
import { useReveal } from "@/lib/motion";

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const reveal = useReveal({ y: 30, delay: 0.1 * index, duration: 0.6 });
  const hasGithub = project.github && project.github !== "#";
  const hasDemo = project.demo && project.demo !== "#";

  return (
    <motion.article {...reveal} className="group">
      <div
        className="relative aspect-16/10 overflow-hidden rounded-[2rem] shadow-2xl"
        style={{
          border: "1px solid var(--border-subtle)",
          backgroundColor: "var(--card-bg-alt)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[3s] ease-in-out group-hover:scale-110"
        />
        <div
          className="absolute inset-0 z-10 flex items-center justify-center gap-6 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundColor: "var(--overlay-dark)" }}
        >
          {hasDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live preview of ${project.title}`}
              title="Live Preview"
              className="flex items-center justify-center rounded-full p-4 transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: "var(--accent-lime-bg)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              <ExternalLink size={22} />
            </a>
          )}
          {hasGithub && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Source code of ${project.title}`}
              title="Source Code"
              className="flex items-center justify-center rounded-full p-4 transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: "var(--accent-lime-bg)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              <Github size={22} />
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`Details of ${project.title}`}
            title="View Details"
            className="flex items-center justify-center rounded-full p-4 transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: "var(--accent-lime-bg)",
              border: "1px solid var(--border-strong)",
              color: "var(--text-primary)",
            }}
          >
            <Info size={22} />
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-4 px-2">
        <div className="flex items-center gap-3">
          <span className="tag-pill">{project.category}</span>
          {project.featured && (
            <span
              className="tag-pill"
              style={{
                backgroundColor: "var(--accent-gold-bg)",
                borderColor: "var(--accent-gold)",
                color: "var(--accent-gold)",
              }}
            >
              FEATURED
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-hi transition-colors duration-300 group-hover:text-accent md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 leading-relaxed text-lo">{project.description}</p>
        <ul className="flex flex-wrap gap-2 pt-2" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-accent"
              style={{
                backgroundColor: "var(--accent-lime-bg)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {tech}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-4 inline-block rounded-full border border-accent-border bg-accent-bg px-6 py-2 font-medium text-accent transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
        >
          View Details
        </button>
      </div>
    </motion.article>
  );
}
