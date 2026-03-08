import styles from "./ClubDashboard.module.css";
import Link from "next/link";

type DashboardSidebarProps = {
  clubName: string;
  onToggleSidebar: () => void;
};

export default function DashboardSidebar({ clubName, onToggleSidebar }: DashboardSidebarProps) {
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
        <div className={`${styles.navItem} ${styles.navItemActive}`}>Dashboard</div>
        <div className={styles.navItem}>Library</div>
        <div className={styles.navItem}>Members</div>
        <div className={styles.navItem}>Meetings</div>
      </nav>

    </aside>
  );
}
