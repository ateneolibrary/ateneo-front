import Image from "next/image";
import Link from "next/link";
import styles from "./ClubDashboard.module.css";

type ReadHistoryItemProps = {
  href: string;
  title: string;
  author: string;
  year: string;
  cover: string;
  rating: number;
};

function stars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

export default function ReadHistoryItem({ href, title, author, year, cover, rating }: ReadHistoryItemProps) {
  return (
    <Link href={href} className={styles.historyItemLink}>
      <article className={styles.historyItem}>
        <div className={styles.historyCover}>
          <Image src={cover} alt={`Portada de ${title}`} fill sizes="48px" className={styles.historyCoverImg} />
        </div>
        <div className={styles.historyBody}>
          <p className={styles.historyTitle}>{title}</p>
          <p className={styles.historyMeta}>{author}</p>
          <div className={styles.historyRatingRow}>
            <span className={styles.historyStars}>{stars(rating)}</span>
            <span className={styles.historyRating}>{rating.toFixed(1)}/5</span>
            <span className={styles.historyYear}>{year}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
