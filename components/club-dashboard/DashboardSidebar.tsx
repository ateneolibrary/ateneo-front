import styles from "./ClubDashboard.module.css";
import Link from "next/link";

type DashboardSidebarProps = {
  clubId: string;
  clubName: string;
  onToggleSidebar: () => void;
  activeItem?: "dashboard" | "library" | "members" | "meetings";
};

export default function DashboardSidebar({ clubId, clubName, onToggleSidebar, activeItem }: DashboardSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Link href="/my-clubs" className={styles.backBtn} aria-label="Volver a MisClubs">
          ←
        </Link>
        <span>{clubName}</span>
        <button
          type="button"
          className={styles.sidebarMenuBtn}
          onClick={onToggleSidebar}
          aria-label="Ocultar navegación lateral"
        >
          ☰
        </button>
      </div>
      <nav className={styles.nav}>
        <Link
          href={`/my-clubs/${clubId}/dashboard`}
          className={`${styles.navItem} ${styles.navItemLink} ${activeItem === "dashboard" ? styles.navItemActive : ""}`}
        >
          Dashboard
        </Link>
        <Link
          href={`/my-clubs/${clubId}/library`}
          className={`${styles.navItem} ${styles.navItemLink} ${activeItem === "library" ? styles.navItemActive : ""}`}
        >
          Library
        </Link>
        <Link
          href={`/my-clubs/${clubId}/members`}
          className={`${styles.navItem} ${styles.navItemLink} ${activeItem === "members" ? styles.navItemActive : ""}`}
        >
          Members
        </Link>
        <Link
          href={`/my-clubs/${clubId}/meetings`}
          className={`${styles.navItem} ${styles.navItemLink} ${activeItem === "meetings" ? styles.navItemActive : ""}`}
        >
          Reuniones
        </Link>
      </nav>

    </aside>
  );
}
