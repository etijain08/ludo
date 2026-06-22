"use client";

import { useState } from "react";
import IllustrationViewer, { type Mode } from "@/components/IllustrationViewer";
import ControlPanel from "@/components/ControlPanel";
import ModeToggle from "@/components/ModeToggle";

export default function Home() {
  const [mode, setMode] = useState<Mode>("light");
  const [floatSpeed, setFloatSpeed] = useState(35);
  const [sway, setSway] = useState(15);
  const [zoom, setZoom] = useState(100);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const [cloudCount, setCloudCount] = useState(6);
  const [cloudSpeed, setCloudSpeed] = useState(35);
  const [fanSpeed, setFanSpeed] = useState(30);

  const isLight = mode === "light";

  return (
    <main
      className={`relative flex min-h-screen flex-col overflow-hidden transition-colors duration-700 ${
        isLight
          ? "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100"
          : "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
      }`}
    >
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div>
          <h1
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${
              isLight ? "text-orange-900" : "text-indigo-100"
            }`}
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Ludo Illustration Lab
          </h1>
          <p className={`text-sm ${isLight ? "text-orange-700/70" : "text-indigo-300/70"}`}>
            Tweak the board-game art in real time
          </p>
        </div>
        <ModeToggle mode={mode} onToggle={() => setMode(isLight ? "dark" : "light")} />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-10 lg:flex-row lg:gap-16 lg:px-16">
        <div className="flex h-[320px] w-full items-center justify-center sm:h-[420px] lg:h-[560px] lg:flex-1">
          <IllustrationViewer
            mode={mode}
            floatSpeed={floatSpeed}
            sway={sway}
            zoom={zoom}
            parallaxEnabled={parallaxEnabled}
            rotationSpeed={rotationSpeed}
            shakeTrigger={shakeTrigger}
            pulseTrigger={pulseTrigger}
            cloudCount={cloudCount}
            cloudSpeed={cloudSpeed}
            fanSpeed={fanSpeed}
          />
        </div>

        <ControlPanel
          mode={mode}
          floatSpeed={floatSpeed}
          onFloatSpeedChange={setFloatSpeed}
          sway={sway}
          onSwayChange={setSway}
          zoom={zoom}
          onZoomChange={setZoom}
          parallaxEnabled={parallaxEnabled}
          onParallaxToggle={() => setParallaxEnabled((v) => !v)}
          rotationSpeed={rotationSpeed}
          onRotationChange={setRotationSpeed}
          onShake={() => setShakeTrigger((t) => t + 1)}
          onPulse={() => setPulseTrigger((t) => t + 1)}
          cloudCount={cloudCount}
          onCloudCountChange={setCloudCount}
          cloudSpeed={cloudSpeed}
          onCloudSpeedChange={setCloudSpeed}
          fanSpeed={fanSpeed}
          onFanSpeedChange={setFanSpeed}
        />
      </div>
    </main>
  );
}
