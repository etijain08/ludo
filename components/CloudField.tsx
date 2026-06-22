"use client";

import { useMemo } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import Cloud from "./Cloud";
import type { Mode } from "./IllustrationViewer";

interface CloudFieldProps {
  mode: Mode;
  count: number;
  speed: number;
}

interface Preset {
  left: number;
  top: number;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { left: 92.44, top: 24.83, width: 3.24, height: 2.82 },
  { left: 35.66, top: 27.3, width: 3.27, height: 2.82 },
  { left: 78.34, top: 7.45, width: 3.24, height: 2.82 },
  { left: 7.11, top: 39.44, width: 3.24, height: 2.82 },
  { left: 51.13, top: 57.34, width: 3.27, height: 2.82 },
  { left: 11.82, top: 34.74, width: 2.43, height: 2.07 },
  { left: 64.19, top: 28.21, width: 2.43, height: 2.07 },
  { left: 87.16, top: 18.64, width: 2.11, height: 1.81 },
  { left: 4.45, top: 32.13, width: 1.9, height: 1.63 },
  { left: 32.27, top: 24.77, width: 1.9, height: 1.63 },
  { left: 68.59, top: 82.2, width: 1.9, height: 1.63 },
];

function extraPreset(index: number): Preset {
  const left = (index * 41.7) % 100;
  const top = 4 + ((index * 23.3) % 38);
  const size = 1.7 + (index % 3) * 0.5;
  return { left, top, width: size, height: size * 0.66 };
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

const CYCLE = 136; // -18 .. 118
const CYCLE_START = -18;

function CloudSprite({ mode, preset, speed }: { mode: Mode; preset: Preset; speed: number }) {
  const left = useMotionValue(preset.left);
  const leftStr = useTransform(left, (v) => `${v}%`);
  const phase = preset.left - CYCLE_START;
  const color = mode === "light" ? "#ffffff" : "#6ebaff";

  useAnimationFrame((t) => {
    if (speed <= 0) return;
    const pxPerSec = lerp(1.5, 30, speed / 100);
    const cyclePos = (phase + (t / 1000) * pxPerSec) % CYCLE;
    left.set(CYCLE_START + cyclePos);
  });

  return (
    <motion.div
      className="absolute"
      style={{
        left: leftStr,
        top: `${preset.top}%`,
        width: `${preset.width}%`,
        height: `${preset.height}%`,
      }}
    >
      <Cloud color={color} />
    </motion.div>
  );
}

export default function CloudField({ mode, count, speed }: CloudFieldProps) {
  const presets = useMemo(() => {
    const list: Preset[] = [];
    for (let i = 0; i < count; i++) {
      list.push(PRESETS[i] ?? extraPreset(i));
    }
    return list;
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {presets.map((preset, i) => (
        <CloudSprite key={i} mode={mode} preset={preset} speed={speed} />
      ))}
    </div>
  );
}
