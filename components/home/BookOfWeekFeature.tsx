import Image from "next/image";
import styles from "./BookOfWeekFeature.module.css";

type BookOfWeekFeatureProps = {
  title: string;
  author: string;
  cover: string;
  quote: string;
};

export default function BookOfWeekFeature({ title, author, cover, quote }: BookOfWeekFeatureProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cover}>
        <Image src={cover} alt={`Portada de ${title}`} fill sizes="190px" className={styles.image} />
      </div>
      <div className={styles.meta}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.author}>{author}</p>
        <p className={styles.quote}>{quote}</p>
        <button type="button" className={styles.cta}>
          Añadir al club
        </button>
      </div>
    </div>
  );
}
