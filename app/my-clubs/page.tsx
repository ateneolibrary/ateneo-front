import Link from "next/link";
import Image from "next/image";
import { clubs } from "@/components/mock-app";
import styles from "./page.module.css";

export default function MyClubsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.head}>
          <h1>Mis clubs</h1>
          <p>Selecciona un club para entrar a su panel de lectura.</p>
        </section>

        <section className={styles.grid}>
          {clubs.map((club) => (
            <article key={club.id} className={styles.card}>
              <div className={styles.row}>
                <h2 className={styles.title}>{club.name}</h2>
                <span className={styles.badge}>{club.mode}</span>
              </div>
              <div className={styles.bookRow}>
                <div className={styles.bookCover}>
                  <Image
                    src={club.bookCover}
                    alt={`Portada de ${club.book}`}
                    fill
                    sizes="76px"
                    className={styles.coverImg}
                  />
                </div>
                <div>
                  <p className={styles.meta}>Libro actual: {club.book}</p>
                  <p className={styles.meta}>Autor: {club.author}</p>
                </div>
              </div>
              <p className={styles.meta}>{club.description}</p>
              <p className={styles.meta}>Miembros: {club.members}</p>
              <p className={styles.meta}>Ubicación: {club.city}</p>
              <p className={styles.meta}>Próxima sesión: {club.nextSession}</p>
              <Link className={styles.enter} href={`/my-clubs/${club.id}/dashboard`}>
                Entrar al club
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
