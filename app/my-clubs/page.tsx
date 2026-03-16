import Link from "next/link";

import ModernBookCover from "@/components/club-library/ModernBookCover";
import { clubs } from "@/components/mock-app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COVER_COLORS = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"] as const;

type CoverColor = (typeof COVER_COLORS)[number];

const resolveCoverColor = (value: string): CoverColor => {
  if (COVER_COLORS.includes(value as CoverColor)) {
    return value as CoverColor;
  }

  return "slate";
};

function ClubModeBadge({ mode }: { mode: string }) {
  return (
    <span className="inline-flex h-8 items-center rounded-none border-2 border-border bg-[var(--color-red-light)] px-2.5 text-[0.7rem] font-black tracking-[0.08em] text-foreground uppercase">
      {mode}
    </span>
  );
}

export default function MyClubsPage() {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-2">
        <h1 className="font-head text-4xl tracking-[0.08em] uppercase sm:text-5xl">Tu base de lectura</h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Selecciona un club para entrar a su panel de lectura sin cambiar tu flujo de trabajo.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club) => (
            <Card key={club.id} className="rounded-none border-4 border-border bg-card py-0 shadow-[8px_8px_0_var(--color-border)]">
              <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-head text-lg tracking-[0.06em] uppercase">{club.name}</CardTitle>
                  <ClubModeBadge mode={club.mode} />
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 px-4 pt-4 pb-5">
                <div className="grid grid-cols-[76px_minmax(0,1fr)] items-center gap-3 rounded-none border-2 border-border bg-background p-3">
                  <ModernBookCover
                    coverSrc={club.bookCover}
                    alt={`Portada de ${club.book}`}
                    title={club.book}
                    size="sm"
                    radius="sm"
                    color={resolveCoverColor(club.mode === "Presencial" ? "rose" : "slate")}
                    isStatic={false}
                    showText={false}
                  />
                  <div className="grid gap-1">
                    <p className="text-xs font-bold tracking-[0.08em] text-muted-foreground uppercase">Libro actual</p>
                    <p className="text-sm font-black tracking-[0.03em] uppercase">{club.book}</p>
                    <p className="text-sm text-muted-foreground">{club.author}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{club.description}</p>
                <div className="grid gap-1 text-sm">
                  <p>
                    <span className="font-bold">Miembros:</span> {club.members}
                  </p>
                  <p>
                    <span className="font-bold">Ubicacion:</span> {club.city}
                  </p>
                  <p>
                    <span className="font-bold">Proxima sesion:</span> {club.nextSession}
                  </p>
                </div>

                <Button asChild className="h-11 w-fit rounded-none border-2 border-border bg-primary px-4 text-xs font-black tracking-[0.08em] uppercase">
                  <Link href={`/my-clubs/${club.id}/dashboard`}>Entrar al club</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </section>
    </main>
  );
}
