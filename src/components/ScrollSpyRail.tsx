"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Code2,
  GraduationCap,
  Home,
  Mail,
  Layers,
  User,
  type LucideIcon,
} from "lucide-react";
import { navSections } from "@/data/portfolio";

const icons: Record<string, LucideIcon> = {
  header: Home,
  about: User,
  experience: Briefcase,
  skills: Code2,
  projects: Layers,
  education: GraduationCap,
  contact: Mail,
};

/**
 * Fixed left scroll-spy rail — the signature navigation of the design language.
 */
export default function ScrollSpyRail() {
  const [activeId, setActiveId] = useState<string>("header");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 left-0 z-30 hidden -translate-y-1/2 rounded-r-2xl py-4 pl-1 sm:block md:pl-3"
      style={{
        backgroundColor: "var(--card-bg-glass)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid var(--border-subtle)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <ul className="flex flex-col gap-1">
        {navSections.map(({ id, label }) => {
          const Icon = icons[id] ?? Home;
          const active = activeId === id;
          return (
            <li key={id} className="group/rail relative">
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={active ? "true" : undefined}
                className="relative flex items-center rounded-xl p-2 transition-all duration-200"
                style={{ backgroundColor: active ? "var(--accent-lime-bg)" : "transparent" }}
              >
                <span
                  className="absolute top-1/2 left-0 w-0.5 -translate-y-1/2 rounded-r-full transition-all duration-300"
                  style={{
                    height: active ? "1.5rem" : "0rem",
                    backgroundColor: "var(--accent-lime)",
                  }}
                  aria-hidden="true"
                />
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  style={{ color: active ? "var(--accent-lime)" : "var(--text-subtle)" }}
                />
              </a>
              <span
                className="pointer-events-none absolute top-1/2 left-[calc(100%+2px)] z-50 hidden -translate-x-1 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap opacity-0 transition-all duration-200 group-hover/rail:translate-x-0 group-hover/rail:opacity-100 md:block"
                style={{
                  backgroundColor: "var(--accent-lime-bg)",
                  border: "1px solid var(--accent-lime-border)",
                  color: "var(--accent-lime)",
                }}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
