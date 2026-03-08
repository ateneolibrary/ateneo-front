"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ClubMock } from "@/components/mock-app";
import styles from "./ClubDashboard.module.css";

type CurrentReadPanelProps = {
  club: ClubMock;
};

export default function CurrentReadPanel({ club }: CurrentReadPanelProps) {
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [surveyEnabled, setSurveyEnabled] = useState(false);

  useEffect(() => {
    if (!showFinishModal) {
      setAnimationDone(false);
      return;
    }
    const timer = setTimeout(() => setAnimationDone(true), 2650);
    return () => clearTimeout(timer);
  }, [showFinishModal]);

  return (
    <>
      <article className={styles.currentRead}>
        <span className={styles.badge}>Current Read</span>
        <div className={styles.featureGrid}>
          <div className={styles.cover}>
            <Image
              src={club.bookCover}
              alt={`Portada de ${club.book}`}
              fill
              sizes="270px"
              className={styles.coverImg}
            />
          </div>

          <div>
            <h1 className={styles.bookTitle}>{club.book}</h1>
            <p className={styles.bookAuthor}>{club.author}</p>
            {surveyEnabled ? <p className={styles.surveyEnabled}>Encuesta habilitada</p> : null}

            <div className={styles.readActionsGrid}>
              <div className={styles.actionsCol}>
                <div className={styles.ctaRow}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => setShowFinishModal(true)}
                  >
                    Finalizar lectura
                  </button>
                  <button type="button" className={styles.btn}>Cambiar libro</button>
                  <button type="button" className={styles.btn}>Añadir cita</button>
                </div>
              </div>

              <div className={styles.quoteCol}>
                <p className={styles.quote}>
                  "Lectura actual centrada en análisis de personajes y narrativa."
                </p>
                <p className={styles.quote}>
                  "Debate semanal con foco en ritmo, símbolos y evolución del protagonista."
                </p>
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
                        src={club.bookCover}
                        alt={`Portada de ${club.book}`}
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
              <button type="button" className={styles.modalBtn} onClick={() => setShowFinishModal(false)}>
                Cerrar
              </button>
              <button
                type="button"
                className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                disabled={!animationDone}
                onClick={() => {
                  if (!animationDone) return;
                  setSurveyEnabled(true);
                  setShowFinishModal(false);
                }}
              >
                Lanzar votación
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
