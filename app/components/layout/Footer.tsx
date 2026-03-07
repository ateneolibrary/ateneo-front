import styles from "@/app/landing.module.css";
import Image from "next/image";
export default function Footer(){
    return <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerRow}`}>
          <div className={styles.footerBrand}>
            <Image
              src="/images/brand/small.PNG"
              alt="Ateneo logo pequeño"
              width={50}
              height={50}
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
}