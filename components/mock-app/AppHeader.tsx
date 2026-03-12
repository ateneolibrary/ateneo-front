"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockUsers } from "./data";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  const pathname = usePathname();
  const currentUser = mockUsers[0];
  const isAuthRoute = pathname === "/login" || pathname === "/create-acount";
  const isLoggedIn = !isAuthRoute;

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/my-clubs", label: "MisClubs" },
  ];

  const authItems = [
    { href: "/login", label: "Entrar" },
    { href: "/create-acount", label: "Crear cuenta" },
  ];

  return (
    <header className={styles.header}>
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
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              <span className={styles.linkText}>{item.label}</span>
              <span className={styles.linkTextHover}>{item.label}</span>
            </Link>
          ))}

          {!isLoggedIn &&
            authItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.link}>
                <span className={styles.linkText}>{item.label}</span>
                <span className={styles.linkTextHover}>{item.label}</span>
              </Link>
            ))}

          {isLoggedIn && currentUser && (
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
