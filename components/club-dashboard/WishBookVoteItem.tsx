"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <Card className="grid max-w-full min-w-0 grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 rounded-none border-2 border-border border-l-[8px] border-l-primary bg-card px-2 py-2 shadow-none">
      <div className="relative aspect-[0.68] w-[52px] overflow-hidden border-2 border-border">
        <Image src={cover} alt={`Portada de ${title}`} fill sizes="62px" className="object-cover" />
      </div>
      <div>
        <p className="text-xs font-black tracking-[0.06em] uppercase">{title}</p>
        <p className="mt-0.5 text-[0.68rem] font-bold tracking-[0.04em] text-muted-foreground uppercase">{author}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="grid min-w-10 justify-items-center">
          <span className="text-2xl leading-none font-black">{count}</span>
          <span className="text-[0.52rem] font-black tracking-[0.08em] text-muted-foreground uppercase">VOTES</span>
        </div>
        <Button
          variant="outline"
          className={`h-11 w-11 rounded-none border-2 border-border bg-card p-0 ${hasVoted ? "text-primary" : "text-foreground"}`}
          type="button"
          onClick={handleVote}
          aria-label={hasVoted ? "Quitar voto de este libro" : "Votar este libro"}
        >
          <svg
            className="h-5 w-5 fill-none stroke-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10v10" />
            <path
              className={hasVoted ? "fill-primary" : "fill-transparent"}
              d="M11 10V7a3 3 0 0 1 3-3h1l-1 5h5.2a2 2 0 0 1 2 2.4l-1.1 7A2 2 0 0 1 18.1 20H9a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2Z"
            />
            <rect x="3" y="10" width="4" height="10" rx="1" ry="1" />
          </svg>
        </Button>
      </div>
    </Card>
  );
}
