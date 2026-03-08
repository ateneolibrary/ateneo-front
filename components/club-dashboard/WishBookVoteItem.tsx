"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ClubDashboard.module.css";

type WishBookVoteItemProps = {
  title: string;
  author: string;
  cover: string;
  votes: number;
};

export default function WishBookVoteItem({ title, author, cover, votes }: WishBookVoteItemProps) {
  const [count, setCount] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);

  function handleVote() {
    if (hasVoted) {
      setCount((prev) => Math.max(votes, prev - 1));
      setHasVoted(false);
      return;
    }
    setCount((prev) => prev + 1);
    setHasVoted(true);
  }

  return (
    <article className={styles.wishVoteItem}>
      <div className={styles.wishVoteCover}>
        <Image src={cover} alt={`Portada de ${title}`} fill sizes="62px" className={styles.wishVoteCoverImg} />
      </div>
      <div>
        <p className={styles.wishVoteTitle}>{title}</p>
        <p className={styles.wishVoteMeta}>{author}</p>
      </div>
      <div className={styles.votePanel}>
        <div className={styles.voteStat}>
          <span className={styles.voteNumber}>{count}</span>
          <span className={styles.voteLabel}>VOTES</span>
        </div>
        <button
          className={`${styles.wishVoteBtn} ${hasVoted ? styles.wishVoteBtnVoted : ""}`}
          type="button"
          onClick={handleVote}
          aria-label={hasVoted ? "Quitar voto de este libro" : "Votar este libro"}
        >
          <svg
            className={styles.wishVoteIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M7 10v10" />
            <path
              className={styles.wishVoteIconThumb}
              d="M11 10V7a3 3 0 0 1 3-3h1l-1 5h5.2a2 2 0 0 1 2 2.4l-1.1 7A2 2 0 0 1 18.1 20H9a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2Z"
            />
            <rect x="3" y="10" width="4" height="10" rx="1" ry="1" />
          </svg>
        </button>
      </div>
    </article>
  );
}
