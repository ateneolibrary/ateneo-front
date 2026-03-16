import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ReadHistoryBook } from "@/components/mock-app";

type BookHeaderPanelProps = {
  book: ReadHistoryBook;
  clubId: string;
};

export default function BookHeaderPanel({ book, clubId }: BookHeaderPanelProps) {
  return (
    <section className="grid gap-3">
      <Button
        asChild
        variant="outline"
        className="w-fit rounded-none border-2 border-border px-3 text-[0.68rem] font-black tracking-[0.08em] uppercase"
      >
        <Link href={`/my-clubs/${clubId}/dashboard`} aria-label="Volver al club" title="Volver al club">
          ← volver al club
        </Link>
      </Button>

      <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
        <CardContent className="grid gap-4 px-4 py-4 md:grid-cols-[136px_minmax(0,1fr)] md:items-start">
          <div className="relative h-[188px] w-[136px] border-2 border-border bg-muted">
            <Image
              src={book.cover}
              alt={`Portada de ${book.title}`}
              fill
              sizes="136px"
              className="object-cover"
            />
          </div>

          <div className="grid gap-4">
            <div>
              <h1 className="text-2xl font-black leading-tight">{book.title}</h1>
              <p className="text-sm font-semibold text-muted-foreground">{book.author}</p>
            </div>

            <div className="grid gap-2 border-2 border-border bg-muted/20 p-3 md:grid-cols-2">
              <div className="grid gap-1">
                <span className="text-[0.65rem] font-black tracking-[0.08em] uppercase text-muted-foreground">Empezado el</span>
                <span className="text-sm font-semibold">{book.startDate}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-[0.65rem] font-black tracking-[0.08em] uppercase text-muted-foreground">Finalizado el</span>
                <span className="text-sm font-semibold">{book.endDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[0.68rem] font-black tracking-[0.08em] uppercase">
              <span className="border-2 border-border bg-card px-2 py-1">{book.memberRatings.length} valoraciones</span>
              <span className="border-2 border-border bg-card px-2 py-1">{book.totalHighlights} highlights</span>
              <span className="border-2 border-border bg-card px-2 py-1">{book.quotes.length} citas destacadas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
