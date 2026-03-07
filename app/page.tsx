import Image from "next/image";
import styles from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.gridBg} />
      <div className={`${styles.shape} ${styles.redCircle}`} />
      <div className={`${styles.shape} ${styles.blueRect}`} />
      <div className={`${styles.shape} ${styles.yellowBar}`} />

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.nav}`}>
          <a className={styles.brand} href="#">
            <Image
              src="/images/brand/medium.PNG"
              alt="Ateneo logo"
              width={125}
              height={125}
              className={styles.brandLogo}
            />
            <span className={styles.brandText}>Ateneo</span>
          </a>

          <nav className={styles.navLinks}>
            <a href="#clubs">Explorar clubs</a>
            <a href="#librerias">Librerías</a>
            <a href="#como-funciona">Cómo funciona</a>
          </nav>

          <div className={styles.navActions}>
            <a className={`${styles.btn} ${styles.btnSecondary}`} href="#">
              Login
            </a>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#">
              Crear cuenta
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroWrap}`}>
            <div>
              <div className={styles.eyebrow}>
                Lectura compartida · clubs locales · librerías independientes
              </div>
              <h1>Encuentra personas leyendo los mismos libros que tú.</h1>
              <p>
                Busca un libro, descubre qué clubs lo están leyendo ahora mismo
                y encuentra librerías cercanas sin perder una experiencia limpia,
                editorial y funcional.
              </p>

              <div className={styles.searchCard}>
                <div className={styles.searchRow}>
                  <label className={styles.searchInput}>
                    <span>🔎</span>
                    <input type="text" defaultValue="Dune" aria-label="Buscar libro" />
                  </label>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    Buscar
                  </button>
                </div>
                <div className={styles.tagRow}>
                  <span className={styles.tag}>1984</span>
                  <span className={styles.tag}>El nombre del viento</span>
                  <span className={styles.tag}>Tokio Blues</span>
                  <span className={styles.tag}>Cien años de soledad</span>
                </div>
              </div>
            </div>

            <aside className={styles.heroPanel}>
              <h3>Resultado destacado</h3>
              <div className={styles.bookPreview}>
                <div className={styles.bookCover}>
                  <Image
                    src="/images/books/dune.jpg"
                    alt="Portada de Dune"
                    fill
                    sizes="110px"
                    className={styles.coverImg}
                  />
                </div>
                <div>
                  <div className={styles.miniMeta}>
                    Frank Herbert · Ciencia ficción
                  </div>
                  <strong className={styles.bookTitle}>Dune</strong>
                  <div className={styles.miniMeta}>
                    3 clubs lo están leyendo ahora · 1 presencial en Valencia ·
                    2 online
                  </div>
                  <button className={`${styles.btn} ${styles.btnSecondary}`}>
                    Ver libro
                  </button>
                </div>
              </div>

              <div className={styles.clubList}>
                <div className={styles.clubMini}>
                  <div>
                    <strong>SciFi Valencia</strong>
                    <span>📍 Valencia · 👥 12 miembros</span>
                  </div>
                  <a href="#">Ver</a>
                </div>
                <div className={styles.clubMini}>
                  <div>
                    <strong>Dune Readers Online</strong>
                    <span>🌍 Online · 👥 28 miembros</span>
                  </div>
                  <a href="#">Ver</a>
                </div>
                <div className={styles.clubMini}>
                  <div>
                    <strong>Lecturas del desierto</strong>
                    <span>📍 Madrid · 👥 7 miembros</span>
                  </div>
                  <a href="#">Ver</a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="clubs" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>Clubs activos ahora</h2>
              </div>
              <p>
                Una selección de clubs que están leyendo ahora mismo. Sin
                iniciar sesión ya puedes explorar libros, ciudades y grupos
                activos.
              </p>
            </div>

            <div className={styles.cards}>
              <article className={styles.card}>
                <div className={styles.clubCardTop}>
                  <div className={styles.miniCover}>
                    <Image
                      src="/images/books/dune.jpg"
                      alt="Portada de Dune"
                      fill
                      sizes="66px"
                      className={styles.coverImg}
                    />
                  </div>
                  <div>
                    <h3>SciFi Valencia</h3>
                    <div className={styles.miniMeta}>Libro actual: Dune</div>
                  </div>
                </div>
                <div className={styles.metaLine}>
                  <span>📍 Valencia</span>
                  <span>👥 12 miembros</span>
                  <span>📅 Jueves 19:00</span>
                </div>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  Ver club
                </button>
              </article>

              <article className={styles.card}>
                <div className={styles.clubCardTop}>
                  <div className={styles.miniCover}>
                    <Image
                      src="/images/books/1984.jpg"
                      alt="Portada de 1984"
                      fill
                      sizes="66px"
                      className={styles.coverImg}
                    />
                  </div>
                  <div>
                    <h3>Clásicos Madrid</h3>
                    <div className={styles.miniMeta}>Libro actual: 1984</div>
                  </div>
                </div>
                <div className={styles.metaLine}>
                  <span>📍 Madrid</span>
                  <span>👥 14 miembros</span>
                  <span>📅 Domingo 11:30</span>
                </div>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  Ver club
                </button>
              </article>

              <article className={styles.card}>
                <div className={styles.clubCardTop}>
                  <div className={styles.miniCover}>
                    <Image
                      src="/images/books/hobbit.jpg"
                      alt="Portada de El Hobbit"
                      fill
                      sizes="66px"
                      className={styles.coverImg}
                    />
                  </div>
                  <div>
                    <h3>Fantasía Online</h3>
                    <div className={styles.miniMeta}>Libro actual: El Hobbit</div>
                  </div>
                </div>
                <div className={styles.metaLine}>
                  <span>🌍 Online</span>
                  <span>👥 21 miembros</span>
                  <span>📅 Martes 20:00</span>
                </div>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  Ver club
                </button>
              </article>
            </div>
          </div>
        </section>

        <section id="librerias" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>Librerías cerca de los clubs</h2>
              </div>
              <p>
              </p>
            </div>

            <div className={styles.mapBlock}>
              <div>
              </div>
              <div className={styles.storeList}>
                <article className={styles.storeItem}>
                  <div>
                    <strong>Bartleby</strong>
                    <span>A 1,2 km del club · recomendaciones del mes</span>
                  </div>
                  <a href="#">Mapa</a>
                </article>
                <article className={styles.storeItem}>
                  <div>
                    <strong>Paris-Valencia</strong>
                    <span>A 1,5 km del club · segunda mano y fondo editorial</span>
                  </div>
                  <a href="#">Mapa</a>
                </article>
                <article className={styles.storeItem}>
                  <div>
                    <strong>Railowsky</strong>
                    <span>A 2 km del club · novedades y fotografía</span>
                  </div>
                  <a href="#">Mapa</a>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>Cómo funciona</h2>
              </div>
              <p>
              </p>
            </div>

            <div className={styles.steps}>
              <article className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Busca un libro</h3>
                <p>
                  Sin cuenta ya puedes consultar títulos y ver qué clubs lo
                  están leyendo.
                </p>
              </article>
              <article className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Descubre clubs</h3>
                <p>
                  Filtra por ciudad, online o tipo de lectura y encuentra tu
                  grupo ideal.
                </p>
              </article>
              <article className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Conecta con librerías</h3>
                <p>
                  Ubica librerías cercanas al club sin exigirles una gestión
                  pesada del catálogo.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <div className={styles.ctaBox}>
              <div>
                <h2>¿No encuentras un club para tu próximo libro?</h2>
                <p>
                  Crea uno en minutos, elige una ciudad o formato online y
                  empieza la conversación.
                </p>
              </div>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#">
                Crear mi club
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerRow}`}>
          <div className={styles.footerBrand}>
            <Image
              src="/images/brand/small.PNG"
              alt="Ateneo logo pequeño"
              width={26}
              height={26}
              className={styles.footerLogo}
            />
            <span>Ateneo · lectura compartida para clubs y librerías independientes</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">About</a>
            <a href="#">Contacto</a>
            <a href="#">Privacidad</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
