"use client";

import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Availability = "checking" | "available" | "missing";

/**
 * Checks that the CV actually exists before linking to it, so a missing
 * file degrades into a graceful "CV Coming Soon" state instead of a 404.
 */
export function useResumeAvailability(): Availability {
  const [status, setStatus] = useState<Availability>("checking");

  useEffect(() => {
    let cancelled = false;

    fetch(portfolio.resumePath, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get("content-type") ?? "";
        setStatus(res.ok && (type.includes("pdf") || type.includes("octet-stream")) ? "available" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}

type Variant = "primary" | "ghost" | "compact";

const variants: Record<Variant, string> = {
  primary:
    "relative overflow-hidden rounded-full px-7 py-3 text-sm font-bold shadow-[0_4px_20px_var(--glow-lime)] hover:scale-[1.03] active:scale-[0.97]",
  ghost:
    "rounded-full border border-accent-border bg-accent-bg px-7 py-3 text-sm font-bold text-accent hover:scale-[1.03] active:scale-[0.97]",
  compact:
    "rounded-full border border-accent-border bg-accent-bg px-4 py-1.5 text-xs font-semibold text-accent hover:scale-[1.03] active:scale-[0.97]",
};

export default function ResumeButton({
  variant = "primary",
  withView = false,
  className,
}: {
  variant?: Variant;
  withView?: boolean;
  className?: string;
}) {
  const status = useResumeAvailability();

  if (status !== "available") {
    return (
      <span
        className={cn(
          "inline-flex cursor-not-allowed items-center gap-2 border border-subtle bg-card-alt text-lo",
          variants[variant],
          className,
        )}
        title={
          status === "checking"
            ? "Checking CV availability…"
            : "CV coming soon — add it at public/resume/solomon-geta-cv.pdf"
        }
        aria-disabled="true"
      >
        <FileText size={15} aria-hidden="true" />
        {status === "checking" ? "Loading CV…" : "CV Coming Soon"}
      </span>
    );
  }

  return (
    <a
      href={portfolio.resumePath}
      download={`Resume of ${portfolio.name}.pdf`}
      className={cn(
        "group inline-flex items-center gap-2 transition-all duration-300",
        variant === "primary"
          ? "bg-accent text-page-deep"
          : "border border-accent-border bg-accent-bg text-accent",
        variants[variant],
        className,
      )}
    >
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/15"
        />
      )}
      <Download size={15} className="relative z-10" aria-hidden="true" />
      <span className="relative z-10">Download CV</span>
      {withView && (
        <span className="relative z-10 ml-1 border-l border-current pl-2 opacity-80">View</span>
      )}
    </a>
  );
}
