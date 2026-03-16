"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BookMemberRating, BookQuote } from "@/components/mock-app";
import MemberPicker from "./MemberPicker";

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

  function handleSelectedMembersChange(nextSelectedMembers: string[]) {
    setSelectedMembers(nextSelectedMembers);
    setActivePage(0);
  }

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
    <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
      <CardHeader className="flex flex-col gap-3 border-b-2 border-border bg-muted/40 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Citas de la comunidad</CardTitle>
          <span className="border-2 border-border bg-card px-2 py-1 text-[0.62rem] font-black tracking-[0.08em] uppercase">
            {totalHighlights} highlights
          </span>
        </div>
        <div>
          <MemberPicker
            items={memberOptions}
            selectedIds={selectedMembers}
            onChange={handleSelectedMembersChange}
          />
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 px-4 py-4">
        <div className="grid gap-2 sm:grid-cols-2">
        {currentPageQuotes.map((quote, index) => {
          const globalIndex = activePage * quotesPerPage + index;
          return (
            <article key={`${quote.member}-${globalIndex}`} className="grid gap-2 border-2 border-border bg-card px-3 py-3">
              <p className="text-sm leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
                <span>Destacada por {quote.member}</span>
                <span>Pág. {quote.page}</span>
              </div>
            </article>
          );
        })}
        {currentPageQuotes.length === 0 ? (
          <p className="border-2 border-dashed border-border bg-muted/20 px-3 py-4 text-center text-sm text-muted-foreground sm:col-span-2">
            No hay citas para el filtro seleccionado.
          </p>
        ) : null}
        </div>

      {quotePages.length > 1 ? (
          <div className="flex flex-wrap gap-1" aria-label="Paginación de citas">
            {quotePages.map((_, index) => (
              <Button
                key={`quote-page-${index}`}
                type="button"
                size="sm"
                variant={index === activePage ? "default" : "outline"}
                className="rounded-none border-2 border-border px-2 text-[0.62rem] font-black"
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
              >
                {index + 1}
              </Button>
            ))}
          </div>
      ) : null}
      </CardContent>
    </Card>
  );
}
