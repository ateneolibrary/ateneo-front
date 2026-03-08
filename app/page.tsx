import { BookOfWeekFeature } from "@/components/home";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
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

        <section className={styles.hero}>
          <article className={styles.heroBox}>
            <span className={styles.badge}>BOOK OF THE WEEK</span>
            <BookOfWeekFeature
              title="El Hobbit"
              author="J.R.R. Tolkien"
              cover="/images/books/hobbit.jpg"
              quote="Una aventura clásica sobre amistad, coraje y viaje interior que sigue definiendo la fantasía moderna."
            />
          </article>

          <aside className={styles.panel}>
            <h2 className={styles.panelTitle}>LOCATE US</h2>
            <div className={styles.mapPlaceholder} />
            <ul className={styles.locations}>
              <li>
                <strong>MAIN ARCHIVE - MITTE</strong>
                <span>Kantstrasse 12, 10623</span>
              </li>
              <li>
                <strong>THE BAUHAUS SHOP</strong>
                <span>Dessau-Rosslau, 06846</span>
              </li>
            </ul>
            <button className={styles.directoryBtn} type="button">
              View directory
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}
