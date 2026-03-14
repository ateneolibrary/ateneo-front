import Link from "next/link";
import { ScrollReactiveBackdrop, SectionReveal, StickyLandingCta } from "@/components/home";
import ModernBookCover from "@/components/club-library/ModernBookCover";
import { getAllCatalogBooks } from "@/components/mock-app";
import styles from "./page.module.css";

const ACT_ONE_CHALLENGES = [
  {
    title: "Conversaciones dispersas",
    description: "El club vive en chats, notas sueltas y recordatorios que llegan tarde.",
  },
  {
    title: "Ritmo irregular",
    description: "Sin una agenda visible, cuesta sostener reuniones y compromisos compartidos.",
  },
  {
    title: "Poca visibilidad",
    description: "Quien coordina no siempre sabe si la lectura avanza o donde necesita intervenir.",
  },
];

const ACT_TWO_FLOW = [
  {
    title: "Pulso semanal",
    description: "Define lectura actual, proxima seleccion y fecha de encuentro sin abrir otras herramientas.",
    highlight: "Lectura actual + proxima lectura",
  },
  {
    title: "Panel de actividad",
    description: "Visualiza progreso, participacion y tramos del club para ajustar dinamicas con tiempo.",
    highlight: "Estadisticas y seguimiento",
  },
  {
    title: "Eventos del club",
    description: "Publica sesiones, recordatorios y dinamicas en un mismo flujo para no perder contexto.",
    highlight: "Gestion de encuentros propios",
  },
];

const TESTIMONIOS = [
  {
    quote:
      "Antes perdíamos mensajes en tres apps. Con Ateneo dejamos todo el club en una sola vista.",
    author: "Micaela, Club Tinta Roja",
  },
  {
    quote:
      "El panel nos ordenó las reuniones y mejoró muchísimo la participación.",
    author: "Tomás, Círculo del Sur",
  },
];

const ACT_THREE_METRICS = [
  { label: "Continuidad", value: "92%", detail: "de clubes sostienen su calendario del primer trimestre." },
  { label: "Participacion", value: "+34%", detail: "de interacciones cuando el ciclo semanal queda centralizado." },
  { label: "Tiempo de coordinacion", value: "-6h", detail: "menos por mes al eliminar seguimiento manual disperso." },
];

const FAQ = [
  {
    question: "¿Puedo usar Ateneo con un club chico?",
    answer: "Sí. Está pensado para grupos de 5 a 200 personas, con la misma claridad de uso.",
  },
  {
    question: "¿Necesito instalar algo?",
    answer: "No. Entras desde navegador, invitas a tu equipo y empiezas a coordinar en minutos.",
  },
  {
    question: "¿Qué pasa si recién arrancamos?",
    answer: "La plataforma te guía con una estructura base para que tu primer ciclo sea ordenado.",
  },
];

const FOOTER_PRODUCT_LINKS = [
  "Panel de clubes",
  "Calendario editorial",
  "Biblioteca compartida",
  "Analiticas de participacion",
];

const FOOTER_SUPPORT_LINKS = [
  "Centro de ayuda",
  "Guia para coordinadores",
  "Recursos para dinamicas",
  "Estado de plataforma",
];

const FOOTER_LEGAL_LINKS = ["Terminos y condiciones", "Privacidad", "Cookies", "Uso responsable"];

const BOOK_STORY = [
  {
    title: "Por que se eligio",
    description: "Es una lectura que habilita conversaciones sobre coraje, comunidad y cambio de perspectiva.",
  },
  {
    title: "Pregunta disparadora",
    description: "Que riesgo personal aparece cuando una aventura colectiva redefine la identidad del grupo.",
  },
  {
    title: "Que esperar de la sesion",
    description: "Una dinamica de 60 minutos con apertura breve, debate guiado y cierre con proximos acuerdos.",
  },
];

const CATALOG = getAllCatalogBooks();
const BOOK_OF_WEEK = CATALOG.find((book) => book.id === "hobbit") ?? CATALOG[0] ?? {
  id: "hobbit",
  title: "El Hobbit",
  author: "J.R.R. Tolkien",
  cover: "/images/books/hobbit.jpg",
  color: "green",
};
const NEXT_BOOK_OF_WEEK = CATALOG.find((book) => book.id === "rayuela") ?? CATALOG.find((book) => book.id !== BOOK_OF_WEEK.id);

export default function HomePage() {
  return (
    <div className={styles.page}>
      <ScrollReactiveBackdrop />
      <main className={styles.main}>
        <section id="landing-hero" className={styles.hero} data-proxy-section="hero">
          <div className={styles.heroGrid}>
            <article className={styles.heroNarrative}>
              <p className={styles.kicker}>Plataforma para clubes de lectura</p>
              <h1 className={styles.title}>Convierte tu club en una experiencia que la gente quiera sostener.</h1>
              <p className={styles.lead}>
                Ateneo te ayuda a organizar encuentros, lecturas y participacion sin perder el tono humano de la
                conversacion literaria.
              </p>

              <div className={styles.heroActions} data-proxy-ctas="above-the-fold">
                <Link
                  href="/create-account?origin=landing-hero-descubrimiento"
                  className={styles.primaryCta}
                  data-proxy-cta="descubrimiento-crear-cuenta"
                >
                  Crear cuenta
                </Link>
                <Link
                  href="/login?origin=landing-hero-acceso"
                  className={styles.secondaryCta}
                  data-proxy-cta="acceso-login"
                >
                  Ya tengo cuenta
                </Link>
              </div>

              <ul className={styles.heroSignals}>
                <li>
                  <strong>+420 clubes activos</strong>
                  <span>Coordinan lecturas y actividades con ritmo semanal.</span>
                </li>
                <li>
                  <strong>92% de continuidad</strong>
                  <span>Los clubes mantienen sus reuniones durante el primer trimestre.</span>
                </li>
                <li>
                  <strong>4.8/5 en satisfaccion</strong>
                  <span>Coordinadores valoran la claridad para guiar conversaciones.</span>
                </li>
              </ul>
            </article>

            <aside className={styles.heroVisual} aria-label="Pieza editorial de temporada">
              <p className={styles.visualTag}>Manifiesto editorial</p>
              <h2>Leer en comunidad vuelve a unir agendas dispersas.</h2>
              <p>
                La temporada abre con una premisa clara: menos friccion operativa y mas tiempo para hablar de libros
                con contexto.
              </p>
              <dl className={styles.heroHighlights}>
                <div>
                  <dt>Ritmo</dt>
                  <dd>Agenda semanal lista para activar en minutos.</dd>
                </div>
                <div>
                  <dt>Foco</dt>
                  <dd>Un solo tablero para lecturas, eventos y seguimiento.</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <StickyLandingCta heroId="landing-hero" />

        <SectionReveal
          className={`${styles.section} ${styles.storyAct} ${styles.actOne} ${styles.rhythmSegment}`}
          data-proxy-section="acto-1-problema"
          data-rhythm="calma"
        >
          <div className={styles.actGrid}>
            <article className={styles.actIntro}>
              <p className={styles.actTag}>Acto 1</p>
              <h2 className={styles.sectionTitle}>Coordinar un club no falla por entusiasmo, falla por friccion.</h2>
              <p>
                Ateneo parte del problema real: cuando la logistica se dispersa, la conversacion literaria pierde
                continuidad aunque el interes exista.
              </p>
              <blockquote className={styles.editorialQuote}>
                <p>&ldquo;Necesitabamos una rutina clara para no llegar a cada encuentro improvisando todo de nuevo.&rdquo;</p>
                <cite>Coordinacion Club Tinta Roja</cite>
              </blockquote>
            </article>

            <div className={styles.challengeList}>
              {ACT_ONE_CHALLENGES.map((challenge) => (
                <article key={challenge.title} className={styles.challengeCard}>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal
          className={`${styles.section} ${styles.storyAct} ${styles.actTwo} ${styles.rhythmSegment}`}
          data-proxy-section="acto-2-flujo"
          data-rhythm="pulso"
        >
          <header className={styles.actHeader}>
            <p className={styles.actTag}>Acto 2</p>
            <h2 className={styles.sectionTitle}>Un flujo guiado para ordenar lectura, seguimiento y encuentros.</h2>
            <p>Estas son las tres operaciones que sostienen la gestion semanal sin perder el tono editorial del club.</p>
          </header>

          <ol className={styles.flowBoard}>
            {ACT_TWO_FLOW.map((step, index) => (
              <li key={step.title} className={styles.flowCard}>
                <span className={styles.flowIndex}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <strong>{step.highlight}</strong>
              </li>
            ))}
          </ol>

          <div className={styles.inlineCta}>
            <Link
              href="/create-account?origin=landing-intermedio-valor"
              className={styles.secondaryCta}
              data-proxy-cta="valor-explorar-recorrido"
            >
              Explorar recorrido
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal
          className={`${styles.section} ${styles.storyAct} ${styles.actThree} ${styles.rhythmSegment}`}
          data-proxy-section="acto-3-resultado"
          data-rhythm="impacto"
        >
          <header className={styles.actHeader}>
            <p className={styles.actTag}>Acto 3</p>
            <h2 className={styles.sectionTitle}>El resultado: mas participacion y una comunidad que sostiene el ritmo.</h2>
          </header>

          <dl className={styles.metricBoard}>
            {ACT_THREE_METRICS.map((metric) => (
              <div key={metric.label} className={styles.metricCard}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
                <p>{metric.detail}</p>
              </div>
            ))}
          </dl>

          <div className={styles.testimonials}>
            {TESTIMONIOS.map((testimonial) => (
              <blockquote key={testimonial.author} className={styles.testimonialCard}>
                <p>{testimonial.quote}</p>
                <cite>{testimonial.author}</cite>
              </blockquote>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal
          className={`${styles.bookSection} ${styles.rhythmSegment}`}
          data-proxy-section="libro-semana"
          data-rhythm="editorial"
          aria-labelledby="book-week-title"
        >
          <div className={styles.bookVisual}>
            <ModernBookCover
              coverSrc={BOOK_OF_WEEK.cover}
              alt={`Portada de ${BOOK_OF_WEEK.title}`}
              title={BOOK_OF_WEEK.title}
              size="lg"
              radius="md"
              color="red"
              isStatic={true}
              showText={false}
            />
          </div>
          <article className={styles.bookNarrative}>
            <p className={styles.bookTag}>Libro de la semana</p>
            <h2 id="book-week-title" className={styles.sectionTitle}>
              {BOOK_OF_WEEK.title}, lectura disparadora para abrir la temporada.
            </h2>
            <p>{BOOK_OF_WEEK.author}</p>
            <dl className={styles.bookStoryList}>
              {BOOK_STORY.map((item) => (
                <div key={item.title} className={styles.bookStoryItem}>
                  <dt>{item.title}</dt>
                  <dd>{item.description}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.bookStateBoard} aria-label="Continuidad de lectura semanal">
              <article className={`${styles.bookStateCard} ${styles.bookStateCurrent}`}>
                <p className={styles.bookStateTag}>Semana actual</p>
                <h3>{BOOK_OF_WEEK.title}</h3>
                <p>{BOOK_OF_WEEK.author}</p>
                <span>Debate activo con acuerdos de cierre en esta sesion.</span>
              </article>
              <article className={`${styles.bookStateCard} ${styles.bookStateUpcoming}`}>
                <p className={styles.bookStateTag}>Proxima lectura</p>
                {NEXT_BOOK_OF_WEEK ? (
                  <>
                    <h3>{NEXT_BOOK_OF_WEEK.title}</h3>
                    <p>{NEXT_BOOK_OF_WEEK.author}</p>
                    <span>Lista para abrir votacion y calendario del siguiente ciclo.</span>
                  </>
                ) : (
                  <>
                    <h3>Curaduria en curso</h3>
                    <p>Estamos cerrando la proxima lectura del club.</p>
                    <span>Publicacion editorial disponible cada lunes.</span>
                  </>
                )}
              </article>
            </div>
            <div className={styles.bookActions}>
              <Link
                href="/create-account?origin=landing-libro-semana-contexto"
                className={styles.primaryCta}
                data-proxy-cta="contexto-ver-dinamica-semana"
              >
                Ver dinamica de esta semana
              </Link>
            </div>
          </article>
        </SectionReveal>

        <SectionReveal className={`${styles.section} ${styles.rhythmSegment}`} data-proxy-section="faq" data-rhythm="calma">
          <h2 className={styles.sectionTitle}>FAQ breve</h2>
          <div className={styles.faqList}>
            {FAQ.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className={`${styles.closing} ${styles.rhythmSegment}`} data-proxy-section="cierre-cta" data-rhythm="decision">
          <h2 className={styles.sectionTitle}>Listo para activar tu comunidad lectora</h2>
          <p>Publica tu club, suma participantes y guia conversaciones con una estructura clara desde el dia uno.</p>
          <div className={styles.closingActions}>
            <Link
              href="/create-account?origin=landing-cierre-decision"
              className={styles.primaryCta}
              data-proxy-cta="decision-activar-club"
            >
              Activar club ahora
            </Link>
            <Link href="/login?origin=landing-cierre-acceso" className={styles.secondaryCta} data-proxy-cta="acceso-cierre-login">
              Entrar con mi cuenta
            </Link>
          </div>
        </SectionReveal>

        <footer className={styles.footer} aria-labelledby="landing-footer-title">
          <div className={styles.footerInner}>
            <div className={styles.footerTop}>
              <section className={styles.footerBlock}>
                <p className={styles.footerKicker}>Ateneo</p>
                <h2 id="landing-footer-title" className={styles.footerTitle}>
                  Un cierre editorial para una plataforma en evolucion.
                </h2>
                <p className={styles.footerValueLine}>Coordinacion lectora clara para comunidades que sostienen su ritmo.</p>
                <p className={styles.footerMiniCta} aria-label="Etiqueta de llamada a la accion mock">
                  Solicitar demo curada <span>Mock</span>
                </p>
              </section>

              <section className={styles.footerBlock} aria-labelledby="footer-producto-title">
                <h3 id="footer-producto-title" className={styles.footerBlockTitle}>
                  Producto
                </h3>
                <ul className={styles.footerList}>
                  {FOOTER_PRODUCT_LINKS.map((item) => (
                    <li key={item} className={styles.footerListItem}>
                      <span>{item}</span>
                      <small>Proximamente</small>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.footerBlock} aria-labelledby="footer-soporte-title">
                <h3 id="footer-soporte-title" className={styles.footerBlockTitle}>
                  Soporte
                </h3>
                <ul className={styles.footerList}>
                  {FOOTER_SUPPORT_LINKS.map((item) => (
                    <li key={item} className={styles.footerListItem}>
                      <span>{item}</span>
                      <small>Proximamente</small>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.footerBlock} aria-labelledby="footer-legal-title">
                <h3 id="footer-legal-title" className={styles.footerBlockTitle}>
                  Legal
                </h3>
                <ul className={styles.footerList}>
                  {FOOTER_LEGAL_LINKS.map((item) => (
                    <li key={item} className={styles.footerListItem}>
                      <span>{item}</span>
                      <small>Mock</small>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={styles.footerBottom}>
              <p>© {new Date().getFullYear()} Ateneo · Material de demostracion de landing.</p>
              <p className={styles.footerStatus}>Estado actual: footer mock, sin navegacion activa.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
