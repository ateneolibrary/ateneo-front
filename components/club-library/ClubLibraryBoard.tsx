"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getBookRouteId } from "@/components/mock-app";
import type { ReadHistoryBook } from "@/components/mock-app";
import ModernBookCover from "./ModernBookCover";
import styles from "@/components/club-dashboard/ClubDashboard.module.css";

type WishListBook = {
  title: string;
  author: string;
  cover: string;
  votes: number;
};

type ClubLibraryBoardProps = {
  clubId: string;
  readHistory: ReadHistoryBook[];
  wishList: WishListBook[];
};

type ReadListItem = WishListBook & {
  key: string;
  order: number;
};

type ProposalItem = {
  key: string;
  title: string;
  author: string;
  cover: string;
  addedBy: string;
  addedByAvatar?: string;
  addedByInitial: string;
};

const PROPOSAL_CATALOG = [
  { title: "The Metamorphosis", author: "Franz Kafka", cover: "/images/books/dune.jpg" },
  { title: "The Picture of Dorian Gray", author: "Oscar Wilde", cover: "/images/books/hobbit.jpg" },
  { title: "Fahrenheit 451", author: "Ray Bradbury", cover: "/images/books/1984.jpg" },
  { title: "Piranesi", author: "Susanna Clarke", cover: "/images/books/hobbit.jpg" },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: "/images/books/dune.jpg" },
];

function toKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function stars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

const monthMap: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

const monthShort = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function formatShortDate(value: string): string {
  const match = value
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+),\s*(\d{4})$/i);

  if (!match) return value;

  const day = Number(match[1]);
  const monthName = match[2].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const year = Number(match[3]);
  const monthIndex = monthMap[monthName];

  if (!Number.isInteger(day) || !Number.isInteger(year) || monthIndex === undefined) {
    return value;
  }

  return `${String(day).padStart(2, "0")} ${monthShort[monthIndex]} ${year}`;
}

function formatShortRange(startDate: string, endDate: string): string {
  return `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
}

const DRAG_TRANSFER_MS = 560;

function buildInitialReadList(wishList: WishListBook[]): ReadListItem[] {
  return wishList.map((book, index) => ({
    ...book,
    key: toKey(book.title),
    order: index,
  }));
}

function buildInitialProposals(readHistory: ReadHistoryBook[], wishList: WishListBook[]): ProposalItem[] {
  const memberMap = new Map<
    string,
    { name: string; initial: string; avatar?: string }
  >();

  for (const book of readHistory) {
    for (const member of book.memberRatings) {
      const key = member.name.trim().toLowerCase();
      const existing = memberMap.get(key);

      if (!existing) {
        memberMap.set(key, {
          name: member.name,
          initial: member.initial || member.name.slice(0, 1),
          avatar: member.avatar,
        });
        continue;
      }

      if (!existing.avatar && member.avatar) {
        existing.avatar = member.avatar;
      }
    }
  }

  const members = Array.from(memberMap.values());

  const blockedTitles = new Set([
    ...readHistory.map((book) => toKey(book.title)),
    ...wishList.map((book) => toKey(book.title)),
  ]);

  const available = PROPOSAL_CATALOG.filter(
    (book) => !blockedTitles.has(toKey(book.title))
  ).slice(0, 4);

  return available.map((book, index) => {
    const member = members[index % Math.max(1, members.length)];
    return {
      key: toKey(book.title),
      title: book.title,
      author: book.author,
      cover: book.cover,
      addedBy: member?.name ?? "Miembro del club",
      addedByAvatar: member?.avatar,
      addedByInitial: member?.initial ?? "M",
    };
  });
}

export default function ClubLibraryBoard({ clubId, readHistory, wishList }: ClubLibraryBoardProps) {
  const [readList, setReadList] = useState<ReadListItem[]>(() => buildInitialReadList(wishList));
  const [proposals, setProposals] = useState<ProposalItem[]>(() => buildInitialProposals(readHistory, wishList));
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [movingProposalKey, setMovingProposalKey] = useState<string | null>(null);
  const [insertedReadKey, setInsertedReadKey] = useState<string | null>(null);
  const readListRowsRef = useRef<HTMLOListElement | null>(null);
  const proposalRowRefs = useRef<Record<string, HTMLArticleElement | null>>({});

  const sortedReadList = useMemo(
    () =>
      [...readList].sort((a, b) => {
        if (b.votes !== a.votes) return b.votes - a.votes;
        return a.order - b.order;
      }),
    [readList]
  );

  const historyRecentFirst = useMemo(() => [...readHistory].reverse(), [readHistory]);

  const podium = useMemo(
    () =>
      [...readHistory]
        .sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.totalHighlights - a.totalHighlights;
        })
        .slice(0, 3),
    [readHistory]
  );

  const [activePodiumId, setActivePodiumId] = useState<string | null>(null);
  const activePodiumBook = activePodiumId
    ? podium.find((book) => book.id === activePodiumId)
    : undefined;

  function handleVote(bookKey: string) {
    const hasVoted = Boolean(votedMap[bookKey]);

    setReadList((prev) =>
      prev.map((book) => {
        if (book.key !== bookKey) return book;
        return {
          ...book,
          votes: hasVoted ? Math.max(0, book.votes - 1) : book.votes + 1,
        };
      })
    );

    setVotedMap((prev) => ({ ...prev, [bookKey]: !hasVoted }));
  }

  function launchProposalFlyAnimation(proposal: ProposalItem) {
    const origin = proposalRowRefs.current[proposal.key];
    const destination = readListRowsRef.current;

    if (!origin || !destination) return;

    const originRect = origin.getBoundingClientRect();
    const destinationRect = destination.getBoundingClientRect();
    const lastRow = destination.querySelector("li:last-child article") as HTMLElement | null;

    const targetX = destinationRect.left + 8;
    const minTargetY = destinationRect.top + 8;
    const maxTargetY = destinationRect.bottom - originRect.height - 8;
    let targetY = minTargetY;

    if (lastRow) {
      const lastRowRect = lastRow.getBoundingClientRect();
      const desiredY = lastRowRect.bottom + 8;
      targetY = Math.max(minTargetY, Math.min(desiredY, maxTargetY));
    } else {
      targetY = Math.max(minTargetY, Math.min(destinationRect.top + 12, maxTargetY));
    }

    if (targetY < minTargetY) {
      targetY = minTargetY;
    }

    const ghost = origin.cloneNode(true) as HTMLElement;
    ghost.classList.remove(styles.proposalRowExiting);
    ghost.classList.add(styles.proposalDragGhost);
    ghost.style.left = `${originRect.left}px`;
    ghost.style.top = `${originRect.top}px`;
    ghost.style.width = `${originRect.width}px`;
    ghost.style.height = `${originRect.height}px`;
    document.body.appendChild(ghost);
    const deltaX = targetX - originRect.left;
    const deltaY = targetY - originRect.top;

    const animation = ghost.animate(
      [
        { transform: "translate(0px, 0px) rotate(0deg) scale(1)", opacity: 1, boxShadow: "12px 12px 0 rgba(17, 17, 17, 0.22)" },
        {
          transform: `translate(${Math.round(deltaX * 0.35)}px, ${Math.round(deltaY * 0.08 - 34)}px) rotate(-4deg) scale(1.02)`,
          opacity: 1,
          boxShadow: "16px 16px 0 rgba(17, 17, 17, 0.22)",
          offset: 0.34,
        },
        {
          transform: `translate(${Math.round(deltaX * 0.75)}px, ${Math.round(deltaY * 0.62 - 10)}px) rotate(2deg) scale(1)`,
          opacity: 1,
          boxShadow: "10px 10px 0 rgba(17, 17, 17, 0.2)",
          offset: 0.74,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) rotate(0deg) scale(0.96)`,
          opacity: 1,
          boxShadow: "0 0 0 rgba(17, 17, 17, 0)",
        },
      ],
      {
        duration: DRAG_TRANSFER_MS,
        easing: "cubic-bezier(0.22, 0.88, 0.28, 1)",
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      ghost.remove();
    };
  }

  function handlePromoteToReadList(proposal: ProposalItem) {
    if (movingProposalKey) return;

    setMovingProposalKey(proposal.key);
    launchProposalFlyAnimation(proposal);

    window.setTimeout(() => {
      setProposals((prev) => prev.filter((item) => item.key !== proposal.key));

      setReadList((prev) => {
        const nextOrder = prev.reduce((max, book) => Math.max(max, book.order), -1) + 1;
        return [
          ...prev,
          {
            key: proposal.key,
            title: proposal.title,
            author: proposal.author,
            cover: proposal.cover,
            votes: 0,
            order: nextOrder,
          },
        ];
      });

      setInsertedReadKey(proposal.key);
      setMovingProposalKey(null);

      window.requestAnimationFrame(() => {
        const list = readListRowsRef.current;
        if (!list) return;
        list.scrollTo({
          top: list.scrollHeight,
          behavior: "smooth",
        });
      });

      window.setTimeout(() => {
        setInsertedReadKey((current) => (current === proposal.key ? null : current));
      }, 760);
    }, DRAG_TRANSFER_MS - 20);
  }

  const podiumLayout = [podium[1], podium[0], podium[2]].filter(Boolean) as ReadHistoryBook[];

  function getPodiumColor(rank: number): "red" | "slate" | "zinc" {
    if (rank === 1) return "red";
    if (rank === 2) return "slate";
    return "zinc";
  }

  return (
    <section className={styles.libraryLayoutV2}>
      <div className={styles.libraryMainColumn}>
        <section id="readlist" className={`${styles.libraryBlock} ${styles.panelShell} ${styles.libraryAnchorTarget}`}>
          <span className={styles.panelBadge}>ReadList</span>
          <div className={styles.libraryBlockHead}>
            <span className={styles.libraryHeadBadge}>Active Voting</span>
          </div>
          <ol ref={readListRowsRef} className={styles.readListRows}>
            {sortedReadList.map((book, index) => {
              const hasVoted = Boolean(votedMap[book.key]);
              return (
                <li key={book.key} className={styles.libraryRowItem}>
                  <article className={`${styles.readListRow} ${insertedReadKey === book.key ? styles.readListRowInserted : ""}`}>
                    <span className={styles.readListRank}>{String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.readListText}>
                      <h3 className={styles.readListTitle}>{book.title}</h3>
                      <p className={styles.readListAuthor}>{book.author}</p>
                    </div>
                    <div className={styles.readListVotes}>
                      <span className={styles.readListVotesValue}>{book.votes}</span>
                      <span className={styles.readListVotesLabel}>votes</span>
                    </div>
                    <button
                      type="button"
                      className={`${styles.wishVoteBtn} ${styles.readListVoteBtnCompact} ${hasVoted ? styles.wishVoteBtnVoted : ""}`}
                      onClick={() => handleVote(book.key)}
                      aria-label={hasVoted ? "Quitar voto del libro" : "Votar libro"}
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
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={`${styles.libraryBlock} ${styles.panelShell}`}>
          <span className={styles.panelBadge}>Member Proposal List</span>
          <div className={styles.proposalRows}>
            {proposals.length === 0 ? (
              <p className={styles.proposalEmpty}>No hay propuestas pendientes.</p>
            ) : (
              proposals.map((proposal) => (
                <article
                  key={proposal.key}
                  className={`${styles.proposalRow} ${movingProposalKey === proposal.key ? styles.proposalRowExiting : ""}`}
                  ref={(node) => {
                    proposalRowRefs.current[proposal.key] = node;
                  }}
                >
                  <div>
                    <h3 className={styles.proposalTitle}>{proposal.title}</h3>
                    <p className={styles.proposalAuthor}>{proposal.author}</p>
                  </div>
                  <div className={styles.proposalMember}>
                    {proposal.addedByAvatar ? (
                      <img
                        className={styles.proposalMemberAvatar}
                        src={proposal.addedByAvatar}
                        alt={proposal.addedBy}
                      />
                    ) : (
                      <span className={styles.proposalMemberFallback}>
                        {proposal.addedByInitial}
                      </span>
                    )}
                    <p className={styles.proposalBy}>Añadido por {proposal.addedBy}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.proposalAddBtn}
                    onClick={() => handlePromoteToReadList(proposal)}
                    aria-label={`Añadir ${proposal.title} a la ReadList`}
                  >
                    <span className={styles.proposalAddText}>Añadir</span>
                    <span className={styles.proposalAddArrow} aria-hidden="true">↑</span>
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        <section id="history" className={`${styles.libraryBlock} ${styles.panelShell} ${styles.libraryAnchorTarget}`}>
          <span className={styles.panelBadge}>History</span>
          <div className={styles.historyRows}>
            {historyRecentFirst.map((book) => (
              <Link
                key={book.id}
                href={`/my-clubs/${clubId}/${getBookRouteId(book.title)}`}
                className={styles.historyRow}
              >
                <div className={styles.historyRowMain}>
                  <h3 className={styles.historyRowTitle}>{book.title}</h3>
                  <p className={styles.historyRowAuthor}>{book.author}</p>
                </div>
                <p className={styles.historyRowDates}>
                  {formatShortRange(book.startDate, book.endDate)}
                </p>
                <div className={styles.historyRowRating}>
                  <span className={styles.historyRowStars}>{stars(book.rating)}</span>
                  <span className={styles.historyRowScore}>{book.rating.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <aside className={styles.librarySideColumn}>
        <section className={`${styles.libraryBlock} ${styles.libraryPodiumBlock} ${styles.panelShell}`}>
          <span className={styles.panelBadge}>Top 3 Club Podium</span>
          <div className={styles.podiumStage} onMouseLeave={() => setActivePodiumId(null)}>
            {podiumLayout.map((book) => {
              const rank = podium.findIndex((podiumBook) => podiumBook.id === book.id) + 1;
              return (
                <button
                  key={book.id}
                  type="button"
                  className={`${styles.podiumCard} ${
                    rank === 1
                      ? styles.podiumCardFirst
                      : rank === 2
                        ? styles.podiumCardSecond
                        : styles.podiumCardThird
                  } ${activePodiumBook?.id === book.id ? styles.podiumCardActive : ""}`}
                  onMouseEnter={() => setActivePodiumId(book.id)}
                  onMouseLeave={() => setActivePodiumId(null)}
                  onFocus={() => setActivePodiumId(book.id)}
                  onBlur={() => setActivePodiumId(null)}
                >
                  <div className={styles.podiumBookWrap}>
                    <ModernBookCover
                      size={rank === 1 ? "md" : "sm"}
                      radius="sm"
                      color={getPodiumColor(rank)}
                      coverSrc={book.cover}
                      alt={`Portada de ${book.title}`}
                      title={book.title}
                      subtitle={book.author}
                      showText={false}
                    />
                  </div>
                  <span className={styles.podiumStep}>{rank}</span>
                </button>
              );
            })}
          </div>

          {activePodiumBook ? (
            <article className={styles.podiumDetail}>
              <h3 className={styles.podiumDetailTitle}>{activePodiumBook.title}</h3>
              <p className={styles.podiumDetailRating}>
                Valoración del club: {activePodiumBook.rating.toFixed(1)}/5
              </p>
              <p className={styles.podiumDetailVerdict}>{activePodiumBook.consensusVerdict}</p>
              <p className={styles.podiumDetailDates}>
                {formatShortRange(activePodiumBook.startDate, activePodiumBook.endDate)}
              </p>
            </article>
          ) : null}
        </section>
      </aside>
    </section>
  );
}
