"use client";

import { motion } from "framer-motion";
import type { Mode } from "./IllustrationViewer";

interface ControlPanelProps {
  mode: Mode;
  floatSpeed: number;
  onFloatSpeedChange: (value: number) => void;
  sway: number;
  onSwayChange: (value: number) => void;
  zoom: number;
  onZoomChange: (value: number) => void;
  parallaxEnabled: boolean;
  onParallaxToggle: () => void;
  rotationSpeed: number;
  onRotationChange: (value: number) => void;
  onShake: () => void;
  onPulse: () => void;
}

function SliderRow({
  icon,
  label,
  value,
  min,
  max,
  onChange,
  mode,
  unit = "",
}: {
  icon: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  mode: Mode;
  unit?: string;
}) {
  const isLight = mode === "light";
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${
            isLight ? "text-orange-900" : "text-indigo-100"
          }`}
        >
          <span className="text-lg">{icon}</span>
          {label}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
            isLight ? "bg-orange-200 text-orange-900" : "bg-indigo-800 text-indigo-100"
          }`}
        >
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`game-slider w-full ${isLight ? "game-slider-light" : "game-slider-dark"}`}
      />
    </label>
  );
}

export default function ControlPanel({
  mode,
  floatSpeed,
  onFloatSpeedChange,
  sway,
  onSwayChange,
  zoom,
  onZoomChange,
  parallaxEnabled,
  onParallaxToggle,
  rotationSpeed,
  onRotationChange,
  onShake,
  onPulse,
}: ControlPanelProps) {
  const isLight = mode === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-md rounded-[2rem] border-[3px] p-6 shadow-[0_10px_0_rgba(0,0,0,0.18)] sm:p-7 ${
        isLight
          ? "border-orange-300 bg-gradient-to-b from-orange-100 to-amber-50"
          : "border-indigo-700 bg-gradient-to-b from-indigo-900 to-slate-900"
      }`}
    >
      <h2
        className={`mb-5 text-center text-lg font-extrabold uppercase tracking-widest ${
          isLight ? "text-orange-900" : "text-indigo-100"
        }`}
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        🎮 Illustration Controls
      </h2>

      <div className="space-y-5">
        <SliderRow
          icon="🎈"
          label="Float Speed"
          value={floatSpeed}
          min={0}
          max={100}
          onChange={onFloatSpeedChange}
          mode={mode}
        />
        <SliderRow
          icon="🌬️"
          label="Sway"
          value={sway}
          min={0}
          max={100}
          onChange={onSwayChange}
          mode={mode}
        />
        <SliderRow
          icon="🔍"
          label="Zoom"
          value={zoom}
          min={50}
          max={150}
          onChange={onZoomChange}
          mode={mode}
          unit="%"
        />
        <SliderRow
          icon="🌀"
          label="Rotation"
          value={rotationSpeed}
          min={0}
          max={100}
          onChange={onRotationChange}
          mode={mode}
        />

        <div
          className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 ${
            isLight ? "border-orange-200 bg-white/60" : "border-indigo-700 bg-indigo-950/60"
          }`}
        >
          <span
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${
              isLight ? "text-orange-900" : "text-indigo-100"
            }`}
          >
            <span className="text-lg">🕹️</span> Parallax
          </span>
          <button
            type="button"
            onClick={onParallaxToggle}
            aria-pressed={parallaxEnabled}
            aria-label="Toggle parallax depth effect"
            className={`relative h-7 w-14 rounded-full border-2 transition-colors duration-300 ${
              parallaxEnabled
                ? isLight
                  ? "border-orange-500 bg-orange-400"
                  : "border-emerald-400 bg-emerald-500"
                : isLight
                  ? "border-orange-200 bg-orange-100"
                  : "border-indigo-700 bg-indigo-900"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
              style={{ left: parallaxEnabled ? "calc(100% - 1.4rem)" : "0.15rem" }}
            />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={onShake}
            className={`rounded-2xl border-2 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.3)] transition-all hover:brightness-110 active:translate-y-1 active:shadow-none ${
              isLight ? "border-red-400 bg-red-400" : "border-red-500 bg-red-600"
            }`}
          >
            💥 Shake
          </button>
          <button
            type="button"
            onClick={onPulse}
            className={`rounded-2xl border-2 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_rgba(0,0,0,0.3)] transition-all hover:brightness-110 active:translate-y-1 active:shadow-none ${
              isLight ? "border-pink-400 bg-pink-400" : "border-pink-500 bg-pink-600"
            }`}
          >
            💗 Pulse
          </button>
        </div>
      </div>
    </motion.div>
  );
}
