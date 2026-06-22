"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import CloudField from "./CloudField";
import Fan from "./Fan";

export type Mode = "light" | "dark";

interface IllustrationViewerProps {
  mode: Mode;
  floatSpeed: number;
  sway: number;
  zoom: number;
  parallaxEnabled: boolean;
  rotationSpeed: number;
  shakeTrigger: number;
  pulseTrigger: number;
  cloudCount: number;
  cloudSpeed: number;
  fanSpeed: number;
}

const FAN_BOX = { left: 66.96, top: 6.62, width: 9.06, height: 17.2 };

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

export default function IllustrationViewer({
  mode,
  floatSpeed,
  sway,
  zoom,
  parallaxEnabled,
  rotationSpeed,
  shakeTrigger,
  pulseTrigger,
  cloudCount,
  cloudSpeed,
  fanSpeed,
}: IllustrationViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const bobY = useMotionValue(0);
  const swayX = useMotionValue(0);
  const spinRotate = useMotionValue(0);
  const zoomScale = useMotionValue(zoom / 100);
  const pulseScale = useMotionValue(1);
  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);

  const rawParallaxX = useMotionValue(0);
  const rawParallaxY = useMotionValue(0);
  const parallaxX = useSpring(rawParallaxX, { stiffness: 90, damping: 18, mass: 0.4 });
  const parallaxY = useSpring(rawParallaxY, { stiffness: 90, damping: 18, mass: 0.4 });

  const x = useTransform([swayX, parallaxX, shakeX], sum);
  const y = useTransform([bobY, parallaxY, shakeY], sum);
  const scale = useTransform([zoomScale, pulseScale], ([a, b]: number[]) => a * b);

  // Float / bob
  useEffect(() => {
    if (floatSpeed <= 0) {
      const c = animate(bobY, 0, { duration: 0.4, ease: "easeOut" });
      return () => c.stop();
    }
    const duration = lerp(7, 1.2, floatSpeed / 100);
    const c = animate(bobY, [0, -18, 0], {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => c.stop();
  }, [floatSpeed, bobY]);

  // Sway
  useEffect(() => {
    if (sway <= 0) {
      const c = animate(swayX, 0, { duration: 0.4, ease: "easeOut" });
      return () => c.stop();
    }
    const amplitude = lerp(4, 38, sway / 100);
    const c = animate(swayX, [0, amplitude, 0, -amplitude, 0], {
      duration: 3.6,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => c.stop();
  }, [sway, swayX]);

  // Slow continuous rotation
  useEffect(() => {
    if (rotationSpeed <= 0) return;
    const duration = lerp(22, 2.5, rotationSpeed / 100);
    const c = animate(spinRotate, spinRotate.get() + 360, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => c.stop();
  }, [rotationSpeed, spinRotate]);

  // Zoom
  useEffect(() => {
    const c = animate(zoomScale, zoom / 100, {
      type: "spring",
      stiffness: 120,
      damping: 16,
    });
    return () => c.stop();
  }, [zoom, zoomScale]);

  // Mouse parallax
  useEffect(() => {
    if (!parallaxEnabled) {
      rawParallaxX.set(0);
      rawParallaxY.set(0);
      return;
    }
    function handleMove(e: MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      rawParallaxX.set(dx * 24);
      rawParallaxY.set(dy * 16);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [parallaxEnabled, rawParallaxX, rawParallaxY]);

  // Shake rumble
  useEffect(() => {
    if (shakeTrigger === 0) return;
    animate(shakeX, [0, -22, 20, -16, 14, -8, 6, 0], {
      duration: 0.55,
      ease: "easeInOut",
    });
    animate(shakeY, [0, 8, -8, 6, -6, 3, 0], {
      duration: 0.55,
      ease: "easeInOut",
    });
  }, [shakeTrigger, shakeX, shakeY]);

  // Heartbeat pulse
  useEffect(() => {
    if (pulseTrigger === 0) return;
    animate(pulseScale, [1, 1.28, 0.93, 1.12, 1], {
      duration: 0.6,
      ease: "easeInOut",
    });
  }, [pulseTrigger, pulseScale]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full select-none items-center justify-center"
    >
      <motion.div style={{ x, y }}>
        <motion.div
          style={{ scale, rotate: spinRotate }}
          className="relative aspect-[3368/2267] w-[260px] sm:w-[360px] md:w-[460px] lg:w-[540px]"
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: mode === "light" ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src="/light_mode.png"
              alt="Light mode illustration"
              fill
              priority
              sizes="(max-width: 768px) 260px, (max-width: 1024px) 460px, 540px"
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: mode === "dark" ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src="/night_mode.png"
              alt="Dark mode illustration"
              fill
              priority
              sizes="(max-width: 768px) 260px, (max-width: 1024px) 460px, 540px"
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>

          <CloudField mode={mode} count={cloudCount} speed={cloudSpeed} />

          <div
            className="absolute"
            style={{
              left: `${FAN_BOX.left}%`,
              top: `${FAN_BOX.top}%`,
              width: `${FAN_BOX.width}%`,
              height: `${FAN_BOX.height}%`,
            }}
          >
            <Fan mode={mode} speed={fanSpeed} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
