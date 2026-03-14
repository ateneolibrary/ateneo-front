"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./StickyLandingCta.module.css";

type StickyLandingCtaProps = {
  heroId: string;
};

export default function StickyLandingCta({ heroId }: StickyLandingCtaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const heroElement = document.getElementById(heroId);
    if (!heroElement) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.06,
      },
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, [heroId]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside className={styles.sticky} data-visible={isVisible ? "true" : "false"} data-minimized={isMinimized ? "true" : "false"}>
      <p className={styles.copy}>Activa tu club cuando termines de recorrer la propuesta.</p>
      <Link href="/create-account?origin=landing-sticky-decision" className={styles.primary} data-proxy-cta="sticky-activar-club">
        Activar club
      </Link>
      <Link href="/login?origin=landing-sticky-acceso" className={styles.secondary} data-proxy-cta="sticky-acceso-login">
        Entrar
      </Link>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => {
          setIsMinimized((currentState) => !currentState);
        }}
        aria-label={isMinimized ? "Expandir CTA fijo" : "Minimizar CTA fijo"}
      >
        {isMinimized ? "Expandir" : "Minimizar"}
      </button>
    </aside>
  );
}
