"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollReactiveBackdrop.module.css";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function ScrollReactiveBackdrop() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rootNode = rootRef.current;
    if (!rootNode) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = motionQuery.matches;
    let frameId = 0;

    const renderProgress = () => {
      frameId = 0;

      const scrollLimit = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollLimit > 0 ? clamp(window.scrollY / scrollLimit, 0, 1) : 0;
      const viewportProgress = window.innerHeight > 0 ? clamp(window.scrollY / window.innerHeight, 0, 1.6) : 0;

      rootNode.style.setProperty("--scroll-progress", scrollProgress.toFixed(4));
      rootNode.style.setProperty("--viewport-progress", viewportProgress.toFixed(4));
      rootNode.dataset.reducedMotion = isReducedMotion ? "true" : "false";
    };

    const requestRender = () => {
      if (isReducedMotion || frameId !== 0) {
        return;
      }
      frameId = window.requestAnimationFrame(renderProgress);
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      isReducedMotion = event.matches;
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      renderProgress();
    };

    motionQuery.addEventListener("change", handleMotionChange);
    renderProgress();

    if (!isReducedMotion) {
      window.addEventListener("scroll", requestRender, { passive: true });
      window.addEventListener("resize", requestRender);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.backdrop} data-reduced-motion="false" aria-hidden="true">
      <span className={styles.layerA} />
      <span className={styles.layerB} />
    </div>
  );
}
