"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { useReveal } from "@/lib/motion";
import ProfileImage from "@/components/ProfileImage";
import SectionHeading from "@/components/SectionHeading";
import Stats from "@/components/Stats";

export default function About() {
  const image = useReveal({ x: 50, y: 0, duration: 0.7 });
  const card = useReveal({ x: -50, y: 0, delay: 0.15, duration: 0.7 });

  return (
    <section id="about" className="mt-20 scroll-mt-24 bg-page sm:ml-9 md:ml-0 lg:mt-24">
      <div className="container mx-auto w-full overflow-x-hidden px-5 md:px-10">
        <SectionHeading title="About Me" />

        <div className="flex flex-col items-center justify-center gap-10 md:flex-row-reverse">
          {/* Portrait */}
          <motion.div {...image} className="group relative flex shrink-0 justify-center">
            <div
              className="relative max-w-65 overflow-hidden rounded-3xl sm:max-w-xs md:max-w-sm lg:max-w-md"
              style={{
                border: "1.5px solid var(--accent-lime-border)",
                boxShadow: "0 0 50px var(--glow-lime), var(--shadow-card)",
              }}
            >
              <div className="h-[420px] w-full md:h-[500px]">
                <ProfileImage className="transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, var(--overlay-dark) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: "var(--overlay-card)",
                  border: "1px solid var(--accent-lime-border)",
                  color: "var(--text-primary)",
                }}
              >
                {portfolio.name}
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-bold text-accent"
                  style={{
                    backgroundColor: "var(--accent-lime-bg)",
                    border: "1px solid var(--accent-lime-border)",
                  }}
                >
                  {portfolio.initials}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text card */}
          <motion.div {...card} className="w-full md:w-1/2 lg:w-2/5">
            <div
              className="relative rounded-3xl p-7 transition-all duration-500 md:p-10"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Corner brackets */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 h-16 w-16 rounded-tl-3xl border-t-2 border-l-2"
                style={{ borderColor: "var(--accent-lime-border)" }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-0 h-16 w-16 rounded-br-3xl border-r-2 border-b-2"
                style={{ borderColor: "var(--accent-lime-border)" }}
              />

              <span
                aria-hidden="true"
                className="mb-3 block font-serif text-5xl leading-none select-none"
                style={{ color: "var(--accent-lime-border)" }}
              >
                &ldquo;
              </span>

              <p className="text-sm leading-relaxed text-med md:text-base">
                I&apos;m <span className="font-semibold text-accent">Solomon Geta</span>, a
                software engineer from {portfolio.location} with a strong focus on full-stack web
                development. I love turning complex problems into simple, elegant, and
                high-performance digital solutions.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-med md:text-base">
                My core stack includes modern JavaScript,{" "}
                <span className="font-semibold text-accent">React</span>,{" "}
                <span className="font-semibold text-accent">Node.js</span>, and robust database
                systems like <span className="font-semibold text-gold">Supabase</span>. When I&apos;m
                not coding, I&apos;m exploring new technologies and optimizing user experiences.
              </p>

              <ul className="mt-6 space-y-2.5" aria-label="Quick facts">
                <li className="flex items-start gap-2.5 text-sm text-lo">
                  <span className="tag-pill mt-0.5 shrink-0">EDUCATION</span>
                  <span>
                    {portfolio.education[0].degree} — {portfolio.education[0].institution}
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-lo">
                  <span className="tag-pill mt-0.5 shrink-0">FOCUS</span>
                  <span>{portfolio.focus.slice(0, 3).join(" · ")}</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-lo">
                  <span className="tag-pill mt-0.5 shrink-0">BASED IN</span>
                  <span>{portfolio.location}</span>
                </li>
              </ul>

              <Stats />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
