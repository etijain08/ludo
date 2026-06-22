"use client";

import { motion } from "framer-motion";
import type { Mode } from "./IllustrationViewer";

interface ModeToggleProps {
  mode: Mode;
  onToggle: () => void;
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle light and dark mode"
      className={`relative flex h-11 w-20 items-center rounded-full border-2 px-1 shadow-inner transition-colors duration-500 ${
        isDark
          ? "border-indigo-300/40 bg-indigo-950"
          : "border-amber-400/60 bg-amber-200"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md ${
          isDark ? "bg-slate-200" : "bg-amber-50"
        }`}
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        <motion.span
          key={mode}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="text-base leading-none"
        >
          {isDark ? "🌙" : "☀️"}
        </motion.span>
      </motion.div>
    </button>
  );
}
