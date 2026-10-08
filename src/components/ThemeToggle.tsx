"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const THEME_EVENT = "sg-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getTheme(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable — theme still applies for this session */
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerSnapshot);
  const dark = theme === "dark";

  const toggle = useCallback(() => {
    applyTheme(dark ? "light" : "dark");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95",
        className,
      )}
      style={{
        backgroundColor: "var(--accent-lime-bg)",
        border: "1px solid var(--accent-lime-border)",
        color: "var(--accent-lime)",
      }}
    >
      <Sun
        size={17}
        className={cn(
          "absolute transition-all duration-300",
          dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0",
        )}
      />
      <Moon
        size={17}
        className={cn(
          "absolute transition-all duration-300",
          dark ? "-rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
    </button>
  );
}