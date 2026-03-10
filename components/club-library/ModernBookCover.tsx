import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./ModernBookCover.module.css";

const sizeMap = {
  sm: { spineTranslation: "80px" },
  md: { spineTranslation: "108px" },
  lg: { spineTranslation: "142px" },
};

const colorMap = {
  slate: { from: "#0f172a", to: "#334155" },
  gray: { from: "#111827", to: "#374151" },
  zinc: { from: "#18181b", to: "#3f3f46" },
  neutral: { from: "#171717", to: "#404040" },
  stone: { from: "#1c1917", to: "#57534e" },
  red: { from: "#7f1d1d", to: "#b91c1c" },
  orange: { from: "#7c2d12", to: "#c2410c" },
  amber: { from: "#78350f", to: "#b45309" },
  yellow: { from: "#713f12", to: "#a16207" },
  lime: { from: "#365314", to: "#4d7c0f" },
  green: { from: "#14532d", to: "#15803d" },
  emerald: { from: "#064e3b", to: "#047857" },
  teal: { from: "#134e4a", to: "#0f766e" },
  cyan: { from: "#164e63", to: "#0e7490" },
  sky: { from: "#0c4a6e", to: "#0369a1" },
  blue: { from: "#1e3a8a", to: "#1d4ed8" },
  indigo: { from: "#312e81", to: "#4338ca" },
  violet: { from: "#4c1d95", to: "#6d28d9" },
  purple: { from: "#581c87", to: "#7e22ce" },
  fuchsia: { from: "#701a75", to: "#a21caf" },
  pink: { from: "#831843", to: "#be185d" },
  rose: { from: "#881337", to: "#be123c" },
} as const;

type BookProps = {
  radius?: "sm" | "md" | "lg";
  size?: "sm" | "md" | "lg";
  color?: keyof typeof colorMap;
  isStatic?: boolean;
  className?: string;
  coverSrc: string;
  alt: string;
  title: string;
  subtitle?: string;
  showText?: boolean;
  children?: ReactNode;
};

export default function ModernBookCover({
  radius = "sm",
  size = "md",
  color = "zinc",
  isStatic = false,
  className = "",
  coverSrc,
  alt,
  title,
  subtitle,
  showText = true,
  children,
}: BookProps) {
  const gradient = colorMap[color] ?? colorMap.zinc;
  const sceneStyle = {
    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
  };

  return (
    <div className={`${styles.bookRoot} ${className}`}>
      <div
        className={`${styles.bookScene} ${styles[`size${size[0].toUpperCase()}${size.slice(1)}`]} ${styles[`radius${radius[0].toUpperCase()}${radius.slice(1)}`]} ${
          isStatic ? styles.bookSceneStatic : styles.bookSceneInteractive
        }`}
      >
        <div className={styles.bookFace} style={sceneStyle}>
          <div className={styles.bookCoverWrap}>
            <Image src={coverSrc} alt={alt} fill sizes="220px" className={styles.bookCoverImg} />
          </div>
          {showText ? (
            <div className={styles.bookInfo}>
              {children ?? (
                <>
                  <h3 className={styles.bookTitle}>{title}</h3>
                  {subtitle ? <p className={styles.bookSubtitle}>{subtitle}</p> : null}
                </>
              )}
            </div>
          ) : null}
        </div>

        <div
          className={styles.bookSpine}
          style={{
            transform: `translateX(${sizeMap[size].spineTranslation}) rotateY(90deg)`,
          }}
        />

        <div className={styles.bookBack} style={sceneStyle} />
      </div>
    </div>
  );
}
