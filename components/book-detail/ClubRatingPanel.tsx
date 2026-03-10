"use client";

import { useMemo, useState } from "react";
import type { ReadHistoryBook } from "@/components/mock-app";
import styles from "./BookDetail.module.css";

type ClubRatingPanelProps = {
  book: ReadHistoryBook;
  shareRating: boolean;
};

function renderStars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
}

export default function ClubRatingPanel({ book, shareRating }: ClubRatingPanelProps) {
  const ratingsPerPage = 3;
  const ratingPages = useMemo(() => {
    const pages: ReadHistoryBook["memberRatings"][] = [];
    for (let i = 0; i < book.memberRatings.length; i += ratingsPerPage) {
      pages.push(book.memberRatings.slice(i, i + ratingsPerPage));
    }
    return pages;
  }, [book.memberRatings]);
  const [activeRatingPage, setActiveRatingPage] = useState(0);

  return (
    <div className={styles.ratingVerdictGrid}>
      <section className={styles.ratingPanel}>
        <div className={styles.clubRatingBadge}>
          Club Rating <span className={styles.clubRatingValue}>{book.rating.toFixed(1)}</span>
        </div>
        {shareRating ? (
          <>
            <div className={styles.memberRatingsList}>
              {(ratingPages[activeRatingPage] ?? []).map((member) => (
                <div key={member.name} className={styles.memberRatingItem}>
                  <span className={styles.memberInitial}>{member.initial}</span>
                  <span className={styles.memberName}>{member.name}</span>
                  <span className={styles.memberStars}>{renderStars(member.rating)}</span>
                </div>
              ))}
            </div>
            {ratingPages.length > 1 ? (
              <div className={styles.pageControls} aria-label="Paginación de valoraciones">
                {ratingPages.map((_, index) => (
                  <button
                    key={`rating-page-${index}`}
                    type="button"
                    className={`${styles.pageDot} ${index === activeRatingPage ? styles.pageDotActive : ""}`}
                    aria-label={`Ver valoraciones página ${index + 1}`}
                    onClick={() => setActiveRatingPage(index)}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </section>

      <section className={styles.verdictPanel}>
        <span className={styles.verdictLabel}>Consensus Verdict</span>
        <p className={styles.verdictText}>
          &ldquo;{book.consensusVerdict}&rdquo;
        </p>
      </section>
    </div>
  );
}
