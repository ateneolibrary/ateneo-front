import styles from "./ClubDashboard.module.css";

export default function DashboardSearchBar() {
  return (
    <section className={styles.searchBar}>
      <div className={styles.searchIcon}>⌕</div>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="BUSCAR TITULOS, AUTORES O CLUBES..."
        aria-label="Buscar títulos, autores o clubes"
      />
      <button className={styles.searchButton} type="button">
        SEARCH
      </button>
    </section>
  );
}
