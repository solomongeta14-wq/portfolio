"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";

/**
 * Renders /public/images/profile.jpg with a graceful monogram fallback
 * when the file has not been added yet. Drop your photo at
 * public/images/profile.jpg — no code changes required.
 */
export default function ProfileImage({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-page-deep ${className ?? ""}`}
        role="img"
        aria-label={`${portfolio.name} profile photo placeholder`}
      >
        <span className="font-serif text-6xl font-bold text-accent/70 sm:text-7xl">
          {portfolio.initials}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={portfolio.profileImage}
      alt={`${portfolio.name} — ${portfolio.title}`}
      className={`h-full w-full object-cover ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
