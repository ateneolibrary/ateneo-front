"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookRouteId } from "@/components/mock-app";
import type { ReadHistoryBook } from "@/components/mock-app";
import { cn } from "@/lib/utils";

import ModernBookCover from "./ModernBookCover";

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

const DRAG_TRANSFER_MS = 560;

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

function toKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function stars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

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

  const available = PROPOSAL_CATALOG.filter((book) => !blockedTitles.has(toKey(book.title))).slice(0, 4);

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
  const [activePodiumId, setActivePodiumId] = useState<string | null>(null);

  const readListRowsRef = useRef<HTMLOListElement | null>(null);
  const proposalRowRefs = useRef<Record<string, HTMLElement | null>>({});

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

  const activePodiumBook = activePodiumId ? podium.find((book) => book.id === activePodiumId) : undefined;
  const podiumLayout = [podium[1], podium[0], podium[2]].filter(Boolean) as ReadHistoryBook[];

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
    }

    const ghost = origin.cloneNode(true) as HTMLElement;
    ghost.style.position = "fixed";
    ghost.style.zIndex = "120";
    ghost.style.pointerEvents = "none";
    ghost.style.margin = "0";
    ghost.style.left = `${originRect.left}px`;
    ghost.style.top = `${originRect.top}px`;
    ghost.style.width = `${originRect.width}px`;
    ghost.style.height = `${originRect.height}px`;
    ghost.style.boxShadow = "12px 12px 0 rgba(17,17,17,0.22)";
    document.body.appendChild(ghost);

    const deltaX = targetX - originRect.left;
    const deltaY = targetY - originRect.top;

    const animation = ghost.animate(
      [
        { transform: "translate(0px, 0px) rotate(0deg) scale(1)", opacity: 1 },
        { transform: `translate(${Math.round(deltaX * 0.35)}px, ${Math.round(deltaY * 0.08 - 34)}px) rotate(-4deg) scale(1.02)`, opacity: 1, offset: 0.34 },
        { transform: `translate(${Math.round(deltaX * 0.75)}px, ${Math.round(deltaY * 0.62 - 10)}px) rotate(2deg) scale(1)`, opacity: 1, offset: 0.74 },
        { transform: `translate(${deltaX}px, ${deltaY}px) rotate(0deg) scale(0.96)`, opacity: 1 },
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

  function getPodiumColor(rank: number): "red" | "slate" | "zinc" {
    if (rank === 1) return "red";
    if (rank === 2) return "slate";
    return "zinc";
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_312px] xl:items-start">
      <div className="grid gap-4">
        <Card id="readlist" className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)] scroll-mt-28">
          <CardHeader className="flex flex-row items-center justify-between border-b-2 border-border bg-muted/40 px-4 py-3">
            <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Readlist activa</CardTitle>
            <span className="text-[0.64rem] font-black tracking-[0.08em] uppercase text-muted-foreground">Votación en curso</span>
          </CardHeader>
          <CardContent className="px-4 py-3">
            <ol ref={readListRowsRef} className="grid max-h-[340px] gap-2 overflow-y-auto pr-1">
              {sortedReadList.map((book, index) => {
                const hasVoted = Boolean(votedMap[book.key]);
                return (
                  <li key={book.key}>
                    <article
                      className={cn(
                        "flex items-center gap-2 border-2 border-border bg-card px-2 py-2 transition-colors",
                        insertedReadKey === book.key && "bg-[var(--color-red-light)]"
                      )}
                    >
                      <span className="w-8 text-center text-sm font-black">{String(index + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold">{book.title}</h3>
                        <p className="truncate text-xs text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black">{book.votes}</p>
                        <p className="text-[0.6rem] font-bold tracking-[0.08em] uppercase text-muted-foreground">Votos</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant={hasVoted ? "default" : "outline"}
                        className="rounded-none border-2 border-border px-2 text-[0.62rem] font-black tracking-[0.08em] uppercase"
                        onClick={() => handleVote(book.key)}
                        aria-label={hasVoted ? "Quitar voto del libro" : "Votar libro"}
                      >
                        {hasVoted ? "Votado" : "Votar"}
                      </Button>
                    </article>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>

        <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
          <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
            <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Propuestas de miembros</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 px-4 py-3">
            {proposals.length === 0 ? (
              <p className="border-2 border-dashed border-border bg-muted/20 px-3 py-4 text-center text-sm text-muted-foreground">
                No hay propuestas pendientes.
              </p>
            ) : (
              proposals.map((proposal) => (
                <article
                  key={proposal.key}
                  className={cn(
                    "grid gap-2 border-2 border-border bg-card px-3 py-3 transition-opacity md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center",
                    movingProposalKey === proposal.key && "opacity-20"
                  )}
                  ref={(node) => {
                    proposalRowRefs.current[proposal.key] = node;
                  }}
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black">{proposal.title}</h3>
                    <p className="truncate text-xs text-muted-foreground">{proposal.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {proposal.addedByAvatar ? (
                      <Image
                        src={proposal.addedByAvatar}
                        alt={proposal.addedBy}
                        width={28}
                        height={28}
                        className="h-7 w-7 border-2 border-border object-cover"
                      />
                    ) : (
                      <span className="grid h-7 w-7 place-items-center border-2 border-border bg-muted text-xs font-black">
                        {proposal.addedByInitial}
                      </span>
                    )}
                    <p className="text-xs font-semibold text-muted-foreground">Añadido por {proposal.addedBy}</p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="rounded-none border-2 border-border px-3 text-[0.62rem] font-black tracking-[0.08em] uppercase"
                    onClick={() => handlePromoteToReadList(proposal)}
                    aria-label={`Añadir ${proposal.title} a la ReadList`}
                  >
                    Añadir
                  </Button>
                </article>
              ))
            )}
          </CardContent>
        </Card>

        <Card id="history" className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)] scroll-mt-28">
          <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
            <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Historial del club</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 px-4 py-3">
            {historyRecentFirst.map((book) => (
              <Link
                key={book.id}
                href={`/my-clubs/${clubId}/${getBookRouteId(book.title)}`}
                className="grid gap-1 border-2 border-border bg-card px-3 py-2 transition-colors hover:bg-muted/20 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-black">{book.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">{book.author}</p>
                </div>
                <p className="text-[0.65rem] font-semibold tracking-[0.04em] uppercase text-muted-foreground">
                  {formatShortRange(book.startDate, book.endDate)}
                </p>
                <div className="text-right">
                  <p className="text-xs font-semibold">{stars(book.rating)}</p>
                  <p className="text-sm font-black">{book.rating.toFixed(1)}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <aside>
        <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
          <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
            <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Podio del club</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-4 py-4" onMouseLeave={() => setActivePodiumId(null)}>
            <div className="grid grid-cols-3 items-end gap-2">
              {podiumLayout.map((book) => {
                const rank = podium.findIndex((podiumBook) => podiumBook.id === book.id) + 1;
                return (
                  <button
                    key={book.id}
                    type="button"
                    className={cn(
                      "grid gap-2 border-2 border-border bg-card p-2",
                      rank === 1 && "translate-y-0",
                      rank !== 1 && "translate-y-2",
                      activePodiumBook?.id === book.id && "bg-[var(--color-red-light)]"
                    )}
                    onMouseEnter={() => setActivePodiumId(book.id)}
                    onMouseLeave={() => setActivePodiumId(null)}
                    onFocus={() => setActivePodiumId(book.id)}
                    onBlur={() => setActivePodiumId(null)}
                  >
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
                    <span className="text-center text-xs font-black">#{rank}</span>
                  </button>
                );
              })}
            </div>

            {activePodiumBook ? (
              <article className="grid gap-1 border-2 border-border bg-muted/20 p-3">
                <h3 className="text-sm font-black">{activePodiumBook.title}</h3>
                <p className="text-xs font-semibold text-muted-foreground">
                  Valoración del club: {activePodiumBook.rating.toFixed(1)}/5
                </p>
                <p className="text-sm">{activePodiumBook.consensusVerdict}</p>
                <p className="text-[0.65rem] font-semibold tracking-[0.04em] uppercase text-muted-foreground">
                  {formatShortRange(activePodiumBook.startDate, activePodiumBook.endDate)}
                </p>
              </article>
            ) : (
              <p className="text-xs text-muted-foreground">Pasá el cursor por un puesto del podio para ver el detalle.</p>
            )}
          </CardContent>
        </Card>
      </aside>
    </section>
  );
}
