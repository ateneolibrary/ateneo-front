import type { ClubMock } from "@/components/mock-app";
import styles from "./ClubDashboard.module.css";

type StatsPanelProps = {
  club: ClubMock;
};

export default function StatsPanel({ club }: StatsPanelProps) {
  return (
    <section className={`${styles.stats} ${styles.panelShell}`}>
      <span className={styles.panelBadge}>Club Stats</span>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Members</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>{club.members}</span>
            <span className={styles.statIcon}>◉</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Books Read</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>{club.stats.booksRead}</span>
            <span className={styles.statIcon}>◧</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Asistencia Media</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>{club.stats.attendance}</span>
            <span className={styles.statIcon}>✓</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Diversidad de géneros</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>{club.stats.genres}</span>
            <span className={styles.statIcon}>△</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Citas compartidas</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>{club.stats.quotes}</span>
            <span className={styles.statIcon}>❝</span>
          </div>
        </div>
      </div>
    </section>
  );
}
