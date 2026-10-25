import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { images, profile } from "../../constants";

const PortraitParticles = () => {
  const photoRef = useRef(null);
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("pending");

  useEffect(() => {
    const photo = photoRef.current;
    const canvas = canvasRef.current;
    if (reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("complete");
      return undefined;
    }

    let disposed = false;
    let frame;
    let observer;
    let resizeObserver;
    let removePointerListeners;

    const prepare = () => {
      if (disposed) return;
      try {
        const context = canvas.getContext("2d");
        const sample = document.createElement("canvas");
        sample.width = 96;
        sample.height = Math.max(1, Math.round(96 * photo.naturalHeight / photo.naturalWidth));
        const sampleContext = sample.getContext("2d", { willReadFrequently: true });
        if (!context || !sampleContext) {
          setPhase("fallback");
          return;
        }
        sampleContext.drawImage(photo, 0, 0, sample.width, sample.height);
        const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
        const particles = [];
        for (let row = 0; row < sample.height; row += 1) {
          for (let column = 0; column < sample.width; column += 1) {
            const offset = (row * sample.width + column) * 4;
            if (pixels[offset + 3] < 128) continue;
            particles.push({
              targetX: (column + 0.5) / sample.width,
              targetY: (row + 0.5) / sample.height,
              startX: Math.random(),
              startY: Math.random(),
              delay: Math.random() * 0.18,
              offsetX: 0,
              offsetY: 0,
              color: `rgb(${pixels[offset]}, ${pixels[offset + 1]}, ${pixels[offset + 2]})`,
            });
          }
        }
        if (!particles.length) {
          setPhase("fallback");
          return;
        }
        canvas.dataset.particleCount = particles.length;
        let width;
        let height;
        let photoLeft;
        let photoTop;
        let photoWidth;
        let photoHeight;
        let assembled = false;
        let currentProgress = 0;
        let hoverFrameRunning = false;
        const pointer = { active: false, x: 0, y: 0 };
        const resize = () => {
          const bounds = canvas.getBoundingClientRect();
          const photoBounds = photo.getBoundingClientRect();
          width = bounds.width;
          height = bounds.height;
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.round(width * ratio);
          canvas.height = Math.round(height * ratio);
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          const scale = Math.min(photoBounds.width / photo.naturalWidth, photoBounds.height / photo.naturalHeight);
          photoWidth = photo.naturalWidth * scale;
          photoHeight = photo.naturalHeight * scale;
          photoLeft = photoBounds.left - bounds.left + (photoBounds.width - photoWidth) / 2;
          photoTop = photoBounds.top - bounds.top + photoBounds.height - photoHeight;
          draw(currentProgress);
        };
        const draw = (progress) => {
          currentProgress = progress;
          context.clearRect(0, 0, width, height);
          const blend = Math.max(0, Math.min(1, (progress - 0.88) / 0.12));
          if (blend > 0) {
            context.globalAlpha = blend;
            context.drawImage(photo, photoLeft, photoTop, photoWidth, photoHeight);
            context.globalAlpha = 1;
          }
          let scattered = 0;
          for (const particle of particles) {
            const targetX = photoLeft + particle.targetX * photoWidth;
            const targetY = photoTop + particle.targetY * photoHeight;
            if (progress === 1) {
              if (Math.abs(particle.offsetX) < 0.15 && Math.abs(particle.offsetY) < 0.15) continue;
              scattered += 1;
              context.globalCompositeOperation = "destination-out";
              context.fillRect(
                targetX - photoWidth / sample.width / 2,
                targetY - photoHeight / sample.height / 2,
                photoWidth / sample.width + 0.5,
                photoHeight / sample.height + 0.5
              );
            }
          }
          context.globalCompositeOperation = "source-over";
          for (const particle of particles) {
            const localProgress = Math.min(1, Math.max(0, (progress - particle.delay) / 0.82));
            const eased = localProgress * localProgress * (3 - 2 * localProgress);
            const targetX = photoLeft + particle.targetX * photoWidth;
            const targetY = photoTop + particle.targetY * photoHeight;
            const startX = particle.startX * width;
            const startY = particle.startY * height;
            const radius = 1.2 + eased * Math.max(0, Math.min(photoWidth / sample.width, photoHeight / sample.height) * 0.55 - 1.2);
            if (progress === 1 && Math.abs(particle.offsetX) < 0.15 && Math.abs(particle.offsetY) < 0.15) continue;
            context.globalAlpha = progress === 1 ? 1 : 1 - blend;
            context.beginPath();
            context.fillStyle = particle.color;
            context.arc(startX + (targetX - startX) * eased + particle.offsetX, startY + (targetY - startY) * eased + particle.offsetY, radius, 0, Math.PI * 2);
            context.fill();
          }
          context.globalAlpha = 1;
          canvas.dataset.scatteredCount = scattered;
        };
        const animateHover = () => {
          if (!assembled || disposed || hoverFrameRunning) return;
          hoverFrameRunning = true;
          let previousTime;
          const tick = (timestamp) => {
            if (disposed) return;
            const delta = previousTime === undefined ? 16 : Math.min(32, timestamp - previousTime);
            previousTime = timestamp;
            const smoothing = 1 - Math.exp(-delta / 90);
            const influenceRadius = Math.min(85, photoWidth * 0.22) / 3;
            let moving = false;
            for (const particle of particles) {
              const distanceX = photoLeft + particle.targetX * photoWidth - pointer.x;
              const distanceY = photoTop + particle.targetY * photoHeight - pointer.y;
              const distance = Math.hypot(distanceX, distanceY);
              const strength = pointer.active ? Math.max(0, 1 - distance / influenceRadius) ** 2 * influenceRadius * 1.4 : 0;
              const angle = distance < 0.01 ? particle.targetX * Math.PI * 2 : Math.atan2(distanceY, distanceX);
              const desiredX = Math.cos(angle) * strength;
              const desiredY = Math.sin(angle) * strength;
              particle.offsetX += (desiredX - particle.offsetX) * smoothing;
              particle.offsetY += (desiredY - particle.offsetY) * smoothing;
              if (Math.abs(desiredX - particle.offsetX) > 0.05 || Math.abs(desiredY - particle.offsetY) > 0.05) moving = true;
              else {
                particle.offsetX = desiredX;
                particle.offsetY = desiredY;
              }
            }
            draw(1);
            if (moving) frame = requestAnimationFrame(tick);
            else hoverFrameRunning = false;
          };
          frame = requestAnimationFrame(tick);
        };
        const movePointer = (event) => {
          if (event.pointerType === "touch") return;
          const bounds = canvas.getBoundingClientRect();
          pointer.x = event.clientX - bounds.left;
          pointer.y = event.clientY - bounds.top;
          pointer.active = true;
          animateHover();
        };
        const clearPointer = () => {
          pointer.active = false;
          resize();
          animateHover();
        };
        const host = canvas.parentElement;
        host.addEventListener("pointermove", movePointer);
        host.addEventListener("pointerleave", clearPointer);
        host.addEventListener("pointercancel", clearPointer);
        window.addEventListener("scroll", clearPointer, { passive: true });
        window.addEventListener("resize", clearPointer, { passive: true });
        removePointerListeners = () => {
          host.removeEventListener("pointermove", movePointer);
          host.removeEventListener("pointerleave", clearPointer);
          host.removeEventListener("pointercancel", clearPointer);
          window.removeEventListener("scroll", clearPointer);
          window.removeEventListener("resize", clearPointer);
        };
        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas.parentElement);
        let started = false;
        const start = () => {
          if (started || disposed) return;
          started = true;
          setPhase("assembling");
          let startedAt;
          const tick = (timestamp) => {
            if (disposed) return;
            if (startedAt === undefined) startedAt = timestamp;
            const progress = Math.min(1, (timestamp - startedAt) / 3600);
            draw(progress);
            if (progress < 1) {
              frame = requestAnimationFrame(tick);
            } else {
              assembled = true;
              canvas.dataset.space = "portrait";
              resize();
              setPhase("complete");
              if (pointer.active) animateHover();
            }
          };
          frame = requestAnimationFrame(tick);
        };
        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            start();
          }
        }, { threshold: 0.15 });
        observer.observe(photo);
      } catch {
        removePointerListeners?.();
        resizeObserver?.disconnect();
        observer?.disconnect();
        setPhase("fallback");
      }
    };
    const fallback = () => setPhase("fallback");
    if (photo.complete && photo.naturalWidth) prepare();
    else if (photo.complete) fallback();
    else photo.addEventListener("load", prepare, { once: true });
    photo.addEventListener("error", fallback, { once: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      removePointerListeners?.();
      photo.removeEventListener("load", prepare);
      photo.removeEventListener("error", fallback);
    };
  }, [reduceMotion]);

  const showPhoto = reduceMotion || phase === "fallback";
  return (
    <>
      <img
        ref={photoRef}
        src={images.profile}
        alt={profile.name}
        className="app__header-photo"
        style={{ opacity: showPhoto ? 1 : 0 }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="app__portrait-particles"
        data-phase={phase}
        data-space={phase === "complete" ? "portrait" : "viewport"}
        style={{ opacity: showPhoto || phase === "pending" ? 0 : 1 }}
      />
    </>
  );
};

export default PortraitParticles;