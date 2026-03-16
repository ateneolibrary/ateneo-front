"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReadHistoryBook } from "@/components/mock-app";

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
    <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
      <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
        <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
          <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">
            Valoración del club <span className="ml-1 text-sm">{book.rating.toFixed(1)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 px-4 py-4">
        {shareRating ? (
          <>
            <div className="grid gap-2">
              {(ratingPages[activeRatingPage] ?? []).map((member) => (
                <div key={member.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-2 border-border bg-card px-2 py-1.5">
                  <span className="grid h-7 w-7 place-items-center border-2 border-border bg-muted text-xs font-black">{member.initial}</span>
                  <span className="truncate text-sm font-semibold">{member.name}</span>
                  <span className="text-xs font-semibold">{renderStars(member.rating)}</span>
                </div>
              ))}
            </div>
            {ratingPages.length > 1 ? (
              <div className="flex flex-wrap gap-1" aria-label="Paginación de valoraciones">
                {ratingPages.map((_, index) => (
                  <Button
                    key={`rating-page-${index}`}
                    type="button"
                    size="sm"
                    variant={index === activeRatingPage ? "default" : "outline"}
                    className="rounded-none border-2 border-border px-2 text-[0.62rem] font-black"
                    aria-label={`Ver valoraciones página ${index + 1}`}
                    onClick={() => setActiveRatingPage(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Este club decidió no compartir valoraciones individuales.</p>
        )}
        </CardContent>
      </Card>

      <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
        <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
          <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Veredicto consensuado</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-4">
          <p className="text-base leading-relaxed">&ldquo;{book.consensusVerdict}&rdquo;</p>
        </CardContent>
      </Card>
    </section>
  );
}
