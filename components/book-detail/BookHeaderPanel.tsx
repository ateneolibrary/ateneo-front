import Image from "next/image";
import Link from "next/link";
import type { ReadHistoryBook } from "@/components/mock-app";
import styles from "./BookDetail.module.css";

type BookHeaderPanelProps = {
  book: ReadHistoryBook;
  clubId: string;
};

export default function BookHeaderPanel({ book, clubId }: BookHeaderPanelProps) {
  return (
    <>
      <div className={styles.headerNav}>
        <Link
          href={`/my-clubs/${clubId}/dashboard`}
          className={styles.backBtn}
          aria-label="Volver al club"
          title="Volver al club"
        >
          <span className={styles.backBtnLabel}>volver al club</span>
          <span className={styles.backBtnIcon} aria-hidden="true">←</span>
        </Link>
      </div>

      <article className={styles.headerPanel}>
        <div className={styles.headerGrid}>
          <div className={styles.cover}>
            <Image
              src={book.cover}
              alt={`Portada de ${book.title}`}
              fill
              sizes="136px"
              className={styles.coverImg}
            />
          </div>

          <div className={styles.bookInfo}>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <p className={styles.bookAuthor}>{book.author}</p>

            <hr className={styles.divider} />

            <div className={styles.datesGrid}>
              <div className={styles.dateField}>
                <span className={styles.dateLabel}>Empezado el</span>
                <span className={styles.dateValue}>{book.startDate}</span>
              </div>
              <div className={styles.dateField}>
                <span className={styles.dateLabel}>Finalizado el</span>
                <span className={styles.dateValue}>{book.endDate}</span>
              </div>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>{book.memberRatings.length} valoraciones</span>
              <span className={styles.metaItem}>{book.totalHighlights} highlights</span>
              <span className={styles.metaItem}>{book.quotes.length} citas destacadas</span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
