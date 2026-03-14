import Link from "next/link";
import ModernBookCover from "@/components/club-library/ModernBookCover";
import styles from "./page.module.css";

const BENEFICIOS = [
  {
    title: "Agenda simple",
    description: "Organiza lecturas, sesiones y recordatorios sin planillas eternas.",
  },
  {
    title: "Comunidad activa",
    description: "Invita a tu club y seguí el avance de cada integrante en un solo lugar.",
  },
  {
    title: "Clubes con identidad",
    description: "Diseña experiencias de lectura con estilo editorial y foco en conversación.",
  },
];

const PASOS = [
  "Creá tu cuenta y definí el perfil de tu club.",
  "Sumá miembros y elegí el libro de la semana.",
  "Segui encuentros, notas y proximos debates desde el tablero.",
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

const FAQ = [
  {
    question: "¿Puedo usar Ateneo con un club chico?",
    answer: "Sí. Está pensado para grupos de 5 a 200 personas, con la misma claridad de uso.",
  },
  {
    question: "¿Necesito instalar algo?",
    answer: "No. Entrás desde navegador, invitás a tu equipo y empezás a coordinar en minutos.",
  },
  {
    question: "¿Qué pasa si recién arrancamos?",
    answer: "La plataforma te guía con una estructura base para que tu primer ciclo sea ordenado.",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} data-proxy-section="hero">
          <p className={styles.kicker}>Plataforma para clubes de lectura</p>
          <h1 className={styles.title}>Convertí tu club en una experiencia que la gente quiera sostener.</h1>
          <p className={styles.lead}>
            Ateneo te ayuda a organizar encuentros, lecturas y participación sin perder el tono humano de la
            conversación literaria.
          </p>

          <div className={styles.heroActions} data-proxy-ctas="above-the-fold">
            <Link
              href="/create-account?origin=landing-hero"
              className={styles.primaryCta}
              data-proxy-cta="registro-primario"
            >
              Crear cuenta
            </Link>
            <Link href="/login?origin=landing-hero" className={styles.secondaryCta} data-proxy-cta="login-secundario">
              Ya tengo cuenta
            </Link>
          </div>

          <ul className={styles.heroSignals}>
            <li>Sin fricción para sumar miembros.</li>
            <li>Diseño editorial con foco en claridad.</li>
            <li>Flujo de onboarding listo para convertir.</li>
          </ul>
        </section>

        <section className={styles.section} data-proxy-section="beneficios">
          <h2 className={styles.sectionTitle}>Beneficios pensados para coordinadores reales</h2>
          <div className={styles.benefitsGrid}>
            {BENEFICIOS.map((beneficio) => (
              <article key={beneficio.title} className={styles.benefitCard}>
                <h3>{beneficio.title}</h3>
                <p>{beneficio.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} data-proxy-section="como-funciona">
          <h2 className={styles.sectionTitle}>Como funciona</h2>
          <ol className={styles.stepsList}>
            {PASOS.map((paso) => (
              <li key={paso}>{paso}</li>
            ))}
          </ol>
        </section>

        <section className={styles.section} data-proxy-section="prueba-social">
          <h2 className={styles.sectionTitle}>Prueba social</h2>
          <div className={styles.testimonials}>
            {TESTIMONIOS.map((testimonial) => (
              <blockquote key={testimonial.author} className={styles.testimonialCard}>
                <p>{testimonial.quote}</p>
                <cite>{testimonial.author}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className={styles.bookSection} data-proxy-section="libro-semana" aria-labelledby="book-week-title">
          <div className={styles.bookVisual}>
            <ModernBookCover
              coverSrc="/images/books/hobbit.jpg"
              alt="Portada de El Hobbit"
              title="El Hobbit"
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
              El Hobbit, lectura disparadora para abrir la temporada.
            </h2>
            <p>
              Elegimos una historia que invita a conversar sobre coraje, pertenencia y transformacion. La portada
              funciona como ancla visual de la campaña y el contenido editorial vive por fuera del modulo.
            </p>
          </article>
        </section>

        <section className={styles.section} data-proxy-section="faq">
          <h2 className={styles.sectionTitle}>FAQ breve</h2>
          <div className={styles.faqList}>
            {FAQ.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.closing} data-proxy-section="cierre-cta">
          <h2 className={styles.sectionTitle}>Listo para activar tu comunidad lectora</h2>
          <p>Publicá tu club, sumá participantes y guiá conversaciones con una estructura clara desde el día uno.</p>
          <div className={styles.closingActions}>
            <Link
              href="/create-account?origin=landing-cierre"
              className={styles.primaryCta}
              data-proxy-cta="registro-cierre"
            >
              Crear cuenta ahora
            </Link>
            <Link href="/login?origin=landing-cierre" className={styles.secondaryCta}>
              Entrar con mi cuenta
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
