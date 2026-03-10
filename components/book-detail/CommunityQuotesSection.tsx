"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { BookMemberRating, BookQuote } from "@/components/mock-app";
import MemberPicker from "./MemberPicker";
import styles from "./BookDetail.module.css";

type CommunityQuotesSectionProps = {
  quotes: BookQuote[];
  members: BookMemberRating[];
  totalHighlights: number;
};

export default function CommunityQuotesSection({
  quotes,
  members,
  totalHighlights,
}: CommunityQuotesSectionProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const autoplayResumeTimeoutRef = useRef<number | null>(null);

  const memberOptions = useMemo(
    () =>
      members.map((member) => ({
        id: member.name,
        name: member.name,
        initial: member.initial,
        avatar: member.avatar,
        role: member.role ?? "Club member",
      })),
    [members]
  );

  const filteredQuotes = useMemo(() => {
    if (selectedMembers.length === 0) {
      return quotes;
    }
    return quotes.filter((quote) => selectedMembers.includes(quote.member));
  }, [quotes, selectedMembers]);

  const quotesPerPage = 4;
  const quotePages = useMemo(() => {
    const pages: BookQuote[][] = [];
    for (let i = 0; i < filteredQuotes.length; i += quotesPerPage) {
      pages.push(filteredQuotes.slice(i, i + quotesPerPage));
    }
    return pages;
  }, [filteredQuotes]);

  useEffect(() => {
    setActivePage(0);
  }, [selectedMembers]);

  useEffect(() => {
    if (quotePages.length <= 1 || isAutoplayPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActivePage((current) => (current + 1) % quotePages.length);
    }, 5500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [quotePages.length, isAutoplayPaused]);

  useEffect(
    () => () => {
      if (autoplayResumeTimeoutRef.current) {
        window.clearTimeout(autoplayResumeTimeoutRef.current);
      }
    },
    []
  );

  const currentPageQuotes = quotePages[activePage] ?? [];
  return (
    <section className={styles.quotesSection}>
      <div className={styles.quotesHeader}>
        <h2 className={styles.quotesTitle}>Community Quotes</h2>
        <div className={styles.quotesHeaderTools}>
          <span className={styles.highlightsBadge}>{totalHighlights} Highlights</span>
          <MemberPicker
            items={memberOptions}
            selectedIds={selectedMembers}
            onChange={setSelectedMembers}
          />
        </div>
      </div>

      <div className={styles.quotesGrid}>
        {currentPageQuotes.map((quote, index) => {
          const globalIndex = activePage * quotesPerPage + index;
          return (
            <div key={`${quote.member}-${globalIndex}`} className={styles.quoteCard}>
              <div className={styles.quoteMark}>&ldquo;&rdquo;</div>
              <p className={styles.quoteText}>{quote.text}</p>
              <div className={styles.quoteFooter}>
                <span className={styles.quoteAuthor}>Highlighted by {quote.member}</span>
                <span className={styles.quotePage}>Pág. {quote.page}</span>
              </div>
            </div>
          );
        })}
        {currentPageQuotes.length === 0 ? (
          <div className={styles.emptyQuotesState}>No hay citas para el filtro seleccionado.</div>
        ) : null}
      </div>

      {quotePages.length > 1 ? (
        <div className={styles.quotesPagination}>
          <div className={styles.pageControls} aria-label="Paginación de citas">
            {quotePages.map((_, index) => (
              <button
                key={`quote-page-${index}`}
                type="button"
                className={`${styles.pageDot} ${index === activePage ? styles.pageDotActive : ""}`}
                aria-label={`Ver citas página ${index + 1}`}
                onClick={() => {
                  setActivePage(index);
                  setIsAutoplayPaused(true);
                  if (autoplayResumeTimeoutRef.current) {
                    window.clearTimeout(autoplayResumeTimeoutRef.current);
                  }
                  autoplayResumeTimeoutRef.current = window.setTimeout(() => {
                    setIsAutoplayPaused(false);
                  }, 10000);
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
