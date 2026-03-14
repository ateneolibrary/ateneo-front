"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { ClubMock } from "@/components/mock-app";
import styles from "./ClubDashboard.module.css";

type CurrentReadPanelProps = {
  club: ClubMock;
};

type BookOption = {
  id: string;
  title: string;
  author: string;
  cover: string;
};

type SwitchPhase = "idle" | "exit" | "enter";

function normalizeKey(value: string): string {
  return value.trim().toLowerCase();
}

export default function CurrentReadPanel({ club }: CurrentReadPanelProps) {
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [surveyEnabled, setSurveyEnabled] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [switchPhase, setSwitchPhase] = useState<SwitchPhase>("idle");
  const [bookSwitched, setBookSwitched] = useState(false);
  const finishAnimationTimeoutRef = useRef<number | null>(null);

  const availableBooks = useMemo<BookOption[]>(() => {
    const map = new Map<string, BookOption>();

    const currentKey = normalizeKey(club.book);
    map.set(currentKey, {
      id: currentKey,
      title: club.book,
      author: club.author,
      cover: club.bookCover,
    });

    for (const book of club.readHistory) {
      const key = normalizeKey(book.title);
      if (map.has(key)) continue;
      map.set(key, {
        id: key,
        title: book.title,
        author: book.author,
        cover: book.cover,
      });
    }

    return Array.from(map.values());
  }, [club]);

  const [selectedBook, setSelectedBook] = useState<{ baseBookId: string; id: string } | null>(null);
  const [pendingBookId, setPendingBookId] = useState<string>(normalizeKey(club.book));
  const baseBookId = normalizeKey(club.book);
  const currentBookId = selectedBook?.baseBookId === baseBookId ? selectedBook.id : baseBookId;
  const currentBook = useMemo(() => {
    const matchedBook = availableBooks.find((book) => book.id === currentBookId);
    if (matchedBook) {
      return matchedBook;
    }

    return {
      id: baseBookId,
      title: club.book,
      author: club.author,
      cover: club.bookCover,
    };
  }, [availableBooks, baseBookId, club.author, club.book, club.bookCover, currentBookId]);
  const quotes = [
    "Lectura actual centrada en análisis de personajes y narrativa.",
    "Debate semanal con foco en ritmo, símbolos y evolución del protagonista.",
  ];

  useEffect(() => {
    return () => {
      if (finishAnimationTimeoutRef.current) {
        window.clearTimeout(finishAnimationTimeoutRef.current);
      }
    };
  }, []);

  function openFinishModal() {
    if (finishAnimationTimeoutRef.current) {
      window.clearTimeout(finishAnimationTimeoutRef.current);
    }

    setAnimationDone(false);
    setShowFinishModal(true);
    finishAnimationTimeoutRef.current = window.setTimeout(() => {
      setAnimationDone(true);
    }, 2650);
  }

  function closeFinishModal() {
    if (finishAnimationTimeoutRef.current) {
      window.clearTimeout(finishAnimationTimeoutRef.current);
      finishAnimationTimeoutRef.current = null;
    }

    setShowFinishModal(false);
    setAnimationDone(false);
  }

  function openChangeBookModal() {
    setPendingBookId(currentBook.id);
    setShowChangeModal(true);
  }

  function confirmBookChange() {
    const selected = availableBooks.find((book) => book.id === pendingBookId);
    if (!selected) {
      setShowChangeModal(false);
      return;
    }

    if (selected.id === currentBook.id) {
      setShowChangeModal(false);
      return;
    }

    setShowChangeModal(false);
    setSwitchPhase("exit");

    window.setTimeout(() => {
      setSelectedBook({
        baseBookId,
        id: selected.id,
      });
      setSwitchPhase("enter");
      setBookSwitched(true);

      window.setTimeout(() => {
        setSwitchPhase("idle");
      }, 320);

      window.setTimeout(() => {
        setBookSwitched(false);
      }, 1800);
    }, 260);
  }

  return (
    <>
      <article className={styles.currentRead}>
        <span className={styles.badge}>Current Read</span>
        <div className={styles.featureGrid}>
          <div
            className={`${styles.cover} ${
              switchPhase === "exit"
                ? styles.coverSwitchExit
                : switchPhase === "enter"
                  ? styles.coverSwitchEnter
                  : ""
            }`}
          >
            <Image
              src={currentBook.cover}
              alt={`Portada de ${currentBook.title}`}
              fill
              sizes="270px"
              className={styles.coverImg}
            />
          </div>

          <div
            className={`${
              switchPhase === "exit"
                ? styles.metaSwitchExit
                : switchPhase === "enter"
                  ? styles.metaSwitchEnter
                  : ""
            }`}
          >
            <h1 className={styles.bookTitle}>{currentBook.title}</h1>
            <p className={styles.bookAuthor}>{currentBook.author}</p>
            {surveyEnabled ? <p className={styles.surveyEnabled}>Encuesta habilitada</p> : null}
            {bookSwitched ? <p className={styles.bookChangedFlag}>Nuevo libro activo</p> : null}

            <div className={styles.readActionsGrid}>
              <div className={styles.actionsCol}>
                <div className={styles.ctaRow}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={openFinishModal}
                  >
                    Finalizar lectura
                  </button>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={openChangeBookModal}
                    disabled={switchPhase !== "idle"}
                  >
                    Cambiar libro
                  </button>
                  <button type="button" className={styles.btn}>
                    Añadir cita
                  </button>
                </div>
              </div>

              <div className={styles.quoteCol}>
                {quotes.map((quote, index) => (
                  <p key={`${quote}-${index}`} className={styles.quote}>
                    {quote}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {showFinishModal ? (
        <div className={styles.finishOverlay} role="dialog" aria-modal="true" aria-label="Finalizar lectura">
          <div className={styles.finishModal}>
            <h3 className={styles.finishTitle}>Lectura finalizada</h3>
            <div className={styles.finishBody}>
              <div className={styles.finishBookScene}>
                <div className={styles.finishBook}>
                  <div className={styles.finishInnerCover} aria-hidden="true" />
                  <div className={styles.finishSpine} aria-hidden="true" />
                  <div className={styles.finishRightBlock}>
                    <div className={styles.finishPageStack} aria-hidden="true">
                      <span className={`${styles.finishPage} ${styles.finishPage1}`} />
                      <span className={`${styles.finishPage} ${styles.finishPage2}`} />
                      <span className={`${styles.finishPage} ${styles.finishPage3}`} />
                      <span className={`${styles.finishPage} ${styles.finishPage4}`} />
                      <span className={`${styles.finishPage} ${styles.finishPage5}`} />
                      <span className={`${styles.finishPage} ${styles.finishPage6}`} />
                    </div>
                    <div className={styles.finishPages} />
                    <div className={styles.finishCover} aria-hidden="true">
                      <Image
                        src={currentBook.cover}
                        alt={`Portada de ${currentBook.title}`}
                        fill
                        sizes="220px"
                        className={styles.finishCoverImg}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.finishInfo}>
                <p>{animationDone ? "Libro listo. Puedes lanzar la votación del club." : "Cerrando libro y mostrando portada..."}</p>
              </div>
            </div>
            <div className={styles.finishActions}>
              <button type="button" className={styles.modalBtn} onClick={closeFinishModal}>
                Cerrar
              </button>
              <button
                type="button"
                className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                disabled={!animationDone}
                  onClick={() => {
                    if (!animationDone) return;
                    setSurveyEnabled(true);
                    closeFinishModal();
                  }}
                >
                Lanzar votación
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showChangeModal ? (
        <div className={styles.changeOverlay} role="dialog" aria-modal="true" aria-label="Cambiar libro">
          <div className={styles.changeModal}>
            <h3 className={styles.changeTitle}>Cambiar libro</h3>
            <p className={styles.changeIntro}>Selecciona el próximo libro activo del club.</p>
            <div className={styles.changeGrid}>
              {availableBooks.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  className={`${styles.changeItem} ${pendingBookId === book.id ? styles.changeItemActive : ""}`}
                  onClick={() => setPendingBookId(book.id)}
                >
                  <div className={styles.changeCover}>
                    <Image
                      src={book.cover}
                      alt={`Portada de ${book.title}`}
                      fill
                      sizes="90px"
                      className={styles.changeCoverImg}
                    />
                  </div>
                  <div className={styles.changeMeta}>
                    <p className={styles.changeBookTitle}>{book.title}</p>
                    <p className={styles.changeBookAuthor}>{book.author}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className={styles.changeActions}>
              <button type="button" className={styles.modalBtn} onClick={() => setShowChangeModal(false)}>
                Cerrar
              </button>
              <button type="button" className={`${styles.modalBtn} ${styles.modalBtnPrimary}`} onClick={confirmBookChange}>
                Activar libro
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
