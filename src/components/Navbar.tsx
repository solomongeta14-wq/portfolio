"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navSections, portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeButton from "@/components/ResumeButton";
import Socials from "@/components/Socials";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("header");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300",
          scrolled ? "backdrop-blur-md" : "",
        )}
        style={{
          backgroundColor: scrolled ? "var(--card-bg-glass)" : "transparent",
          borderBottom: `1px solid ${scrolled ? "var(--border-subtle)" : "transparent"}`,
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6 md:px-10">
          <a
            href="#header"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${portfolio.name} — home`}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold"
              style={{
                backgroundColor: "var(--accent-lime-bg)",
                border: "1px solid var(--accent-lime-border)",
                color: "var(--accent-lime)",
              }}
            >
              {portfolio.initials}
            </span>
            <span className="hidden text-sm font-bold text-hi transition-colors group-hover:text-accent sm:block">
              {portfolio.name}
            </span>
          </a>

          <ul className="mx-auto hidden items-center gap-1 lg:flex">
            {navSections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                    activeId === id ? "text-accent" : "text-lo hover:text-hi",
                  )}
                  aria-current={activeId === id ? "true" : undefined}
                >
                  {label}
                  {activeId === id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{
                        backgroundColor: "var(--accent-lime-bg)",
                        border: "1px solid var(--accent-lime-border)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
            <div className="hidden md:block">
              <Socials orientation="row" />
            </div>
            <div
              className="hidden h-5 w-px sm:block"
              style={{ backgroundColor: "var(--border-subtle)" }}
              aria-hidden="true"
            />
            <div className="hidden sm:block">
              <ResumeButton variant="compact" />
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 lg:hidden"
              style={{
                backgroundColor: "var(--accent-lime-bg)",
                border: "1px solid var(--accent-lime-border)",
                color: "var(--accent-lime)",
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-page-deep/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col items-center gap-2">
              {navSections.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block rounded-full px-6 py-2.5 text-2xl font-bold transition-colors",
                      activeId === id ? "text-accent" : "text-hi hover:text-accent",
                    )}
                    style={
                      activeId === id
                        ? {
                            backgroundColor: "var(--accent-lime-bg)",
                            border: "1px solid var(--accent-lime-border)",
                          }
                        : undefined
                    }
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * navSections.length, duration: 0.35 }}
              className="mt-6 flex flex-col items-center gap-5"
            >
              <ResumeButton variant="ghost" />
              <Socials orientation="row" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
