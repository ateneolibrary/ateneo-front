import Link from "next/link";
import styles from "./page.module.css";

type CreateAccountPageProps = {
  searchParams?: {
    origin?: string | string[];
  };
};

export default function CreateAccountPage({ searchParams }: CreateAccountPageProps) {
  const source = searchParams?.origin;
  const origin = Array.isArray(source) ? source[0] : source;
  const cameFromLanding = Boolean(origin?.startsWith("landing-"));

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h1 className={styles.title}>Crear cuenta</h1>
        <p className={styles.text}>Completa tus datos para unirte a Ateneo.</p>
        {cameFromLanding ? <p className={styles.originTag}>Llegaste desde la landing de captacion.</p> : null}

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" placeholder="Tu nombre" />
          </div>
          <div className={styles.field}>
            <label htmlFor="city">Ciudad</label>
            <input id="city" type="text" placeholder="Madrid" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="tu@email.com" />
          </div>
          <div className={styles.field}>
            <label htmlFor="genre">Género favorito</label>
            <select id="genre" defaultValue="">
              <option value="" disabled>Selecciona</option>
              <option value="scifi">Ciencia ficción</option>
              <option value="fantasy">Fantasía</option>
              <option value="classic">Clásicos</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" placeholder="••••••••" />
        </div>

        <button className={styles.submit} type="button">Crear cuenta</button>
        <Link className={styles.link} href="/login">Ya tengo cuenta</Link>
      </main>
    </div>
  );
}
