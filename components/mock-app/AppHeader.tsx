import Link from "next/link";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/my-clubs", label: "MisClubs" },
    { href: "/login", label: "Entrar" },
    { href: "/create-acount", label: "Crear cuenta" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Ateneo
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              <span className={styles.linkText}>{item.label}</span>
              <span className={styles.linkTextHover}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
