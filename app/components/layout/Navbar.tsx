import styles from '../../landing.module.css'
import Image from "next/image";
export default function Navbar(){

    return <header className={styles.header}>
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
}