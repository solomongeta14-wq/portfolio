"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/lib/motion";

export default function SectionHeading({ title }: { title: string }) {
  const reveal = useReveal({ y: 20, duration: 0.6 });

  return (
    <motion.div {...reveal} className="mb-10 overflow-hidden text-center md:my-14">
      <h2 className="text-xl font-bold uppercase tracking-widest text-accent-bright sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <div
        className="mx-auto mt-3 h-0.5 w-16 rounded-full"
        style={{
          background: "linear-gradient(to right, var(--accent-lime), var(--accent-gold-bright))",
        }}
      />
    </motion.div>
  );
}
