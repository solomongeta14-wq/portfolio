"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Rocket,
  Send,
  User,
} from "lucide-react";
import { portfolio, socialLinks } from "@/data/portfolio";
import { sendContactMessage } from "@/lib/contact";
import { useReveal } from "@/lib/motion";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";

type FormStatus = "idle" | "loading" | "success" | "error";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = "Please tell me your name.";
  if (!email.trim()) {
    errors.email = "Please provide your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!message.trim()) {
    errors.message = "Please write a message.";
  } else if (message.trim().length < 10) {
    errors.message = "A slightly longer message helps (10+ characters).";
  }
  return errors;
}

export default function Contact() {
  const left = useReveal({ x: -40, y: 0, duration: 0.8 });
  const right = useReveal({ x: 40, y: 0, delay: 0.2, duration: 0.8 });
  const reduced = useReducedMotion();

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successNote, setSuccessNote] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const validation = validate(name, email, message);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("loading");
    const result = await sendContactMessage({ name, email, message });

    if (result.ok) {
      if (result.mailto) {
        // No backend is configured: hand the message to the visitor's email app.
        window.location.href = result.mailto;
        setSuccessNote(
          "Your email app should now open with the message ready to send. If it didn't, please email me directly.",
        );
      } else {
        setSuccessNote("Thanks for reaching out — your message has been sent.");
      }
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl py-3.5 pr-4 pl-11 text-sm text-hi outline-none transition-all duration-300 focus:border-accent-dim";
  const inputStyle = {
    backgroundColor: "var(--accent-lime-bg)",
    border: "1px solid var(--border-subtle)",
  } as const;

  return (
    <section id="contact" className="mt-20 scroll-mt-24 bg-page sm:ml-9 md:ml-0 lg:mt-24">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <SectionHeading title="Contact Me" />

        <div className="mt-16 flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-20">
          {/* Left column */}
          <motion.div {...left} className="flex w-full flex-col items-center justify-center space-y-8 lg:w-1/2">
            <div className="relative flex flex-col items-center">
              <div
                aria-hidden="true"
                className="absolute h-48 w-48 animate-pulse rounded-full blur-3xl"
                style={{ backgroundColor: "var(--accent-lime-bg)" }}
              />
              <motion.div
                animate={reduced ? undefined : { y: [0, -18, 0] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                className="relative"
              >
                <Rocket
                  size={110}
                  className="text-accent"
                  style={{ filter: "drop-shadow(0 0 30px var(--glow-cyan))" }}
                  aria-hidden="true"
                />
              </motion.div>
            </div>

            <div className="max-w-sm space-y-4 text-center">
              <h3 className="text-2xl font-bold text-hi md:text-3xl">
                Let&apos;s build something <span className="text-accent">great</span> together
              </h3>
              <p className="text-sm leading-relaxed text-lo">
                Have a project in mind, a question, or just want to say hi? Feel free to reach out
                through the form or any of the channels below.
              </p>
              <p className="flex items-center justify-center gap-1.5 text-xs text-whisper">
                <Clock size={12} aria-hidden="true" />
                I&apos;ll get back to you as soon as I can
              </p>
            </div>

            <ul className="space-y-3 text-sm" aria-label="Contact details">
              <li>
                <a
                  href={`mailto:${portfolio.email}`}
                  className="group flex items-center gap-3 text-med transition-colors hover:text-accent"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "var(--accent-lime-bg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <Mail size={15} className="text-lo group-hover:text-accent" />
                  </span>
                  {portfolio.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${portfolio.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 text-med transition-colors hover:text-accent"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "var(--accent-lime-bg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <Phone size={15} className="text-lo group-hover:text-accent" />
                  </span>
                  {portfolio.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-med">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "var(--accent-lime-bg)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <MapPin size={15} className="text-lo" />
                </span>
                {portfolio.location}
              </li>
            </ul>

            <div className="flex items-center gap-4">
              {socialLinks
                .filter((s) => s.icon === "github" || s.icon === "linkedin" || s.icon === "email")
                .map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={link.name}
                    className="rounded-xl p-3 text-lo transition-all duration-300 hover:text-accent"
                    style={{
                      backgroundColor: "var(--accent-lime-bg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {link.icon === "github" && <Github size={18} />}
                    {link.icon === "linkedin" && <Linkedin size={18} />}
                    {link.icon === "email" && <Mail size={18} />}
                  </a>
                ))}
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div {...right} className="w-full max-w-2xl lg:w-1/2">
            <div
              className="relative rounded-3xl p-8 shadow-2xl backdrop-blur-xl md:p-10"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--accent-lime-border)",
                boxShadow: "var(--shadow-card), 0 0 60px var(--glow-lime)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
                style={{ backgroundColor: "var(--glow-lime)" }}
              />

              <h3 className="mb-1 text-2xl font-bold text-hi md:text-3xl">
                Send a <span className="text-accent">Message</span>
              </h3>
              <p className="mb-8 text-sm text-whisper">Fill in the form below and I&apos;ll reply soon.</p>

              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle2 size={44} className="text-accent" aria-hidden="true" />
                  <h4 className="text-lg font-bold text-hi">Message ready!</h4>
                  <p className="max-w-sm text-sm leading-relaxed text-lo">{successNote}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 rounded-full border border-accent-border bg-accent-bg px-6 py-2.5 text-sm font-semibold text-accent transition-all hover:scale-[1.03]"
                  >
                    Write another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="group relative">
                    <label htmlFor="contact-name" className="sr-only">
                      Your name
                    </label>
                    <User
                      size={14}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-whisper transition-colors group-focus-within:text-accent"
                    />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClass}
                      style={inputStyle}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                      >
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="group relative">
                    <label htmlFor="contact-email" className="sr-only">
                      Your email
                    </label>
                    <Mail
                      size={14}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-whisper transition-colors group-focus-within:text-accent"
                    />
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Your email"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={inputClass}
                      style={inputStyle}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                      >
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="group relative">
                    <label htmlFor="contact-message" className="sr-only">
                      Your message
                    </label>
                    <MessageSquare
                      size={14}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-3.5 left-4 text-whisper transition-colors group-focus-within:text-accent"
                    />
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Your message…"
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                      >
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-red-500"
                    >
                      <AlertCircle size={12} /> Something went wrong. Please try again or email me
                      directly at {portfolio.email}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative w-full overflow-hidden rounded-full py-4 font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      backgroundColor: "var(--accent-lime-bg)",
                      border: "1px solid var(--accent-lime)",
                      color: "var(--accent-lime)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-300 group-hover:translate-y-0 group-disabled:translate-y-full"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-page-deep">
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={15} aria-hidden="true" />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-[11px] text-whisper">
                    Prefer email? Write directly to{" "}
                    <a href={`mailto:${portfolio.email}`} className="text-accent hover:underline">
                      {portfolio.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
