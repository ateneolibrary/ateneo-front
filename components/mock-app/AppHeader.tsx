"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockUsers } from "./data";
import styles from "./AppHeader.module.css";

type HeaderVariant = "marketing" | "auth" | "app";

const resolveHeaderVariant = (pathname: string): HeaderVariant => {
  if (pathname === "/") {
    return "marketing";
  }

  if (pathname === "/login" || pathname === "/create-account") {
    return "auth";
  }

  return "app";
};

export default function AppHeader() {
  const pathname = usePathname();
  const variant = resolveHeaderVariant(pathname);
  const currentUser = mockUsers[0];
  const isMarketing = variant === "marketing";
  const isAuth = variant === "auth";
  const isApp = variant === "app";

  const appItems = [
    { href: "/my-clubs", label: "Mis clubes" },
    { href: "/explore", label: "Explorar" },
  ];

  const marketingActions = [
    { href: "/?auth=signup", label: "Crear cuenta", tone: "primary" },
    { href: "/explore", label: "Explorar", tone: "secondary" },
    { href: "/?auth=login", label: "Iniciar sesión", tone: "secondary" },
  ];

  const authActions =
    pathname === "/login"
      ? [{ href: "/create-account", label: "Crear cuenta", tone: "primary" }]
      : [{ href: "/login", label: "Entrar", tone: "secondary" }];

  return (
    <header
      className={`${styles.header} ${isMarketing ? styles.headerMarketing : ""} ${isAuth ? styles.headerAuth : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Ateneo: ir al inicio">
          <span className={styles.brandLogoFrame}>
            <Image
              src="/images/brand/medium.png"
              alt="Logo de Ateneo"
              fill
              className={styles.brandLogo}
              priority
            />
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navegacion principal">
          <Link href="/" className={`${styles.link} ${isMarketing ? styles.marketingHomeLink : ""}`}>
            <span className={styles.linkText}>Inicio</span>
            <span className={styles.linkTextHover}>Inicio</span>
          </Link>

          {isApp &&
            appItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${pathname === item.href ? styles.linkActive : ""}`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <span className={styles.linkText}>{item.label}</span>
                <span className={styles.linkTextHover}>{item.label}</span>
              </Link>
            ))}

          {isMarketing &&
            marketingActions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${item.tone === "primary" ? styles.linkPrimary : styles.linkSecondary} ${item.tone === "primary" ? styles.marketingMainAction : styles.marketingSecondaryAction}`}
              >
                <span className={styles.linkText}>{item.label}</span>
                <span className={styles.linkTextHover}>{item.label}</span>
              </Link>
            ))}

          {isAuth &&
            authActions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${item.tone === "primary" ? styles.linkPrimary : styles.linkSecondary}`}
              >
                <span className={styles.linkText}>{item.label}</span>
                <span className={styles.linkTextHover}>{item.label}</span>
              </Link>
            ))}

          {isApp && currentUser && (
            <Link
              href={`/profile/${currentUser.id}`}
              className={styles.profileAvatarLink}
              aria-label={`Ver perfil de ${currentUser.name}`}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                width={48}
                height={48}
                className={styles.profileAvatar}
              />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
