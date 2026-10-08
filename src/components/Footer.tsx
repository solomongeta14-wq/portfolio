"use client";

import { useSyncExternalStore } from "react";
import { portfolio } from "@/data/portfolio";
import Socials from "@/components/Socials";

function getYear() {
  return new Date().getFullYear();
}

function getServerSnapshot() {
  return 0;
}

/**
 * Reads the current year without breaking prerender/static caching —
 * resolves to the real year once the page hydrates.
 */
function CurrentYear() {
  const year = useSyncExternalStore(() => () => {}, getYear, getServerSnapshot);
  if (!year) return null;
  return <>{year}</>;
}

export default function Footer() {
  return (
    <footer className="bg-page pb-8">
      <div className="section-divider" aria-hidden="true" />
      <div className="container mx-auto px-6 pt-10 md:px-12 lg:px-20">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-hi">{portfolio.name}</p>
            <p className="mt-0.5 text-sm text-lo">{portfolio.title}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-lo transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Socials orientation="row" />
        </div>

        <p className="mt-8 text-center text-sm text-lo">
          ©&nbsp;<CurrentYear /> {portfolio.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}