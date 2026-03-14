import Link from "next/link";
import styles from "./page.module.css";

type LoginPageProps = {
  searchParams?: {
    origin?: string | string[];
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const source = searchParams?.origin;
  const origin = Array.isArray(source) ? source[0] : source;
  const cameFromLanding = Boolean(origin?.startsWith("landing-"));

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h1 className={styles.title}>Entrar</h1>
        <p className={styles.text}>Accede para gestionar tus clubs y sesiones de lectura.</p>
        {cameFromLanding ? <p className={styles.originTag}>Llegaste desde la landing de captacion.</p> : null}

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="tu@email.com" />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" placeholder="••••••••" />
        </div>

        <button className={styles.submit} type="button">Entrar</button>

        <div className={styles.links}>
          <Link className={styles.link} href="/my-clubs">Ir a MisClubs</Link>
          <Link className={styles.link} href="/create-account">Crear cuenta</Link>
        </div>
      </main>
    </div>
  );
}
