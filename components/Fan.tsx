"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import type { Mode } from "./IllustrationViewer";

interface FanProps {
  mode: Mode;
  speed: number;
}

const PALETTES: Record<Mode, { blades: [string, string, string, string]; center: string; stem: string }> = {
  light: {
    blades: ["#f987dc", "#47dddd", "#98ef7b", "#fca377"],
    center: "#ffff73",
    stem: "#5e3d2c",
  },
  dark: {
    blades: ["#e52cac", "#20bcc4", "#60bc46", "#ef7633"],
    center: "#ffff73",
    stem: "#8a5a3f",
  },
};

const PIVOT = { x: 158.5, y: 152 };
const STEM_END = { x: 280, y: 370 };

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

const BLADE_PATH = "M0,0 L-23,-14 C-32,-58 -14,-112 7,-118 C24,-92 20,-32 0,0 Z";

export default function Fan({ mode, speed }: FanProps) {
  const rotate = useMotionValue(0);
  const transform = useTransform(rotate, (r) => `rotate(${r} ${PIVOT.x} ${PIVOT.y})`);
  const palette = PALETTES[mode];

  useEffect(() => {
    if (speed <= 0) return;
    const duration = lerp(18, 1.5, speed / 100);
    const controls = animate(rotate, rotate.get() + 360, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [speed, rotate]);

  return (
    <svg viewBox="0 0 305 390" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
      <line
        x1={PIVOT.x}
        y1={PIVOT.y}
        x2={STEM_END.x}
        y2={STEM_END.y}
        style={{ stroke: palette.stem, transition: "stroke 0.5s ease" }}
        strokeWidth={9}
        strokeLinecap="round"
      />
      <motion.g transform={transform}>
        {palette.blades.map((color, i) => (
          <g key={i} transform={`translate(${PIVOT.x} ${PIVOT.y}) rotate(${i * 90})`}>
            <path
              d={BLADE_PATH}
              style={{ fill: color, transition: "fill 0.5s ease" }}
              stroke="#000"
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </g>
        ))}
        <circle
          cx={PIVOT.x}
          cy={PIVOT.y}
          r={13}
          style={{ fill: palette.center, transition: "fill 0.5s ease" }}
          stroke="#000"
          strokeWidth={3}
        />
      </motion.g>
    </svg>
  );
}
