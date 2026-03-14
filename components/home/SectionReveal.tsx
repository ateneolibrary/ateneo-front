"use client";

import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function SectionReveal({ children, className, ...rest }: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const nodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches);
      if (event.matches) {
        setIsVisible(true);
      }
    };

    motionQuery.addEventListener("change", handleMotionPreference);

    if (isReducedMotion) {
      return () => {
        motionQuery.removeEventListener("change", handleMotionPreference);
      };
    }

    const currentNode = nodeRef.current;
    if (!currentNode || !("IntersectionObserver" in window)) {
      return () => {
        motionQuery.removeEventListener("change", handleMotionPreference);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(currentNode);

    return () => {
      motionQuery.removeEventListener("change", handleMotionPreference);
      observer.disconnect();
    };
  }, [isReducedMotion]);

  return (
    <section
      {...rest}
      ref={nodeRef}
      className={className}
      data-reveal-visible={isVisible ? "true" : "false"}
      data-reveal-reduced-motion={isReducedMotion ? "true" : "false"}
    >
      {children}
    </section>
  );
}
