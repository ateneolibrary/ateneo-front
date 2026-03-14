import Link from "next/link";
import styles from "./page.module.css";

export default function NewClubDashboardPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article className={styles.card}>
          <p className={styles.badge}>Mock Dashboard</p>
          <h1>Club creado correctamente</h1>
          <p>
            Este es un destino de prueba para el flujo de creacion. Desde aca puedes continuar con el tablero real cuando
            se conecte backend.
          </p>
          <Link href="/my-clubs" className={styles.cta}>
            Ir a mis clubs
          </Link>
        </article>
      </main>
    </div>
  );
}
