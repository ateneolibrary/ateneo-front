import Link from "next/link";

import { CreateAccountAuthCard, LoginAuthCard } from "@/components/auth";
import ModernBookCover from "@/components/club-library/ModernBookCover";
import { clubs, getAllCatalogBooks } from "@/components/mock-app";
import type { ClubMock, FavoriteBook } from "@/components/mock-app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HomePageProps = {
  searchParams?: Promise<{
    auth?: string | string[];
  }>;
};

const BOOK_COVER_COLORS = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

type BookCoverColor = (typeof BOOK_COVER_COLORS)[number];
type AuthView = "signup" | "login";

const ACTIVE_CLUBS_RULE =
  "Consideramos un club activo hoy cuando tiene eventos proximos cargados y una asistencia historica de 85% o mas en el entorno mock.";

const CATALOG = getAllCatalogBooks();
const HERO_BOOK = CATALOG.find((book) => book.id === "hobbit") ?? CATALOG[0] ?? {
  id: "hobbit",
  title: "El Hobbit",
  author: "J.R.R. Tolkien",
  cover: "/images/books/hobbit.jpg",
  color: "green",
};
const MOCK_BOOK_RESULTS = CATALOG.slice(0, 4);
const MOCK_CLUB_RESULTS = clubs.slice(0, 4);
const ACTIVE_CLUB_CARD_COLOR: BookCoverColor = "slate";

const parseAttendance = (attendance: string) => {
  const value = Number.parseInt(attendance.replace("%", ""), 10);
  return Number.isNaN(value) ? 0 : value;
};

const ACTIVE_CLUBS_TODAY = clubs
  .filter((club) => parseAttendance(club.stats.attendance) >= 85 && club.upcomingEvents.length > 0)
  .slice(0, 6);

const isBookCoverColor = (value: string): value is BookCoverColor => {
  return BOOK_COVER_COLORS.includes(value as BookCoverColor);
};

const resolveAuthView = (value: string | undefined): AuthView | null => {
  if (value === "signup" || value === "login") {
    return value;
  }

  return null;
};

function SearchResultsCard({ bookResults, clubResults }: { bookResults: FavoriteBook[]; clubResults: ClubMock[] }) {
  return (
    <Card className="border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
      <CardHeader className="border-b-2 border-border bg-muted/40">
        <CardTitle className="font-head text-2xl tracking-[0.08em] uppercase">Resultados mock inmediatos</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Vista de negocio para validar match entre libros y clubes activos sin salir de la landing.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-6 lg:grid-cols-2">
        <section className="grid gap-3" aria-labelledby="mock-books-title">
          <h3 id="mock-books-title" className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
            Libros sugeridos
          </h3>
          <div className="grid gap-3">
            {bookResults.map((book) => {
              const color = isBookCoverColor(book.color) ? book.color : "green";

              return (
                <article key={book.id} className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 rounded-none border-2 border-border bg-background p-3">
                  <ModernBookCover
                    coverSrc={book.cover}
                    alt={`Portada de ${book.title}`}
                    title={book.title}
                    size="sm"
                    radius="sm"
                    color={color}
                    isStatic={false}
                    showText={false}
                  />
                  <div className="grid gap-1">
                    <p className="text-sm font-black tracking-[0.03em] uppercase">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3" aria-labelledby="mock-clubs-title">
          <h3 id="mock-clubs-title" className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
            Clubes sugeridos
          </h3>
          <div className="grid gap-3">
            {clubResults.map((club) => (
              <article key={club.id} className="grid gap-2 rounded-none border-2 border-border bg-background p-3">
                <p className="text-sm font-black tracking-[0.03em] uppercase">{club.name}</p>
                <p className="text-sm text-muted-foreground">{club.city} · {club.mode}</p>
                <p className="text-xs text-muted-foreground">{club.members} personas · Proxima sesion {club.nextSession}</p>
              </article>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

function ActiveClubsTodayCard() {
  return (
    <Card className="border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
      <CardHeader className="border-b-2 border-border bg-muted/40">
        <CardTitle className="font-head text-2xl tracking-[0.08em] uppercase">Clubes activos hoy</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{ACTIVE_CLUBS_RULE}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Carousel className="w-full" opts={{ align: "start", loop: false }}>
          <CarouselContent>
            {ACTIVE_CLUBS_TODAY.map((club) => (
              <CarouselItem key={club.id} className="md:basis-1/2 xl:basis-1/3">
                <article className="grid h-full gap-3 rounded-none border-2 border-border bg-background p-4">
                  <div className="grid grid-cols-[72px_minmax(0,1fr)] items-start gap-3">
                    <ModernBookCover
                      coverSrc={club.bookCover}
                      alt={`Libro actual de ${club.name}`}
                      title={club.book}
                      size="sm"
                      radius="sm"
                      color={ACTIVE_CLUB_CARD_COLOR}
                      isStatic={false}
                      showText={false}
                    />
                    <div className="grid gap-1">
                      <p className="text-sm font-black tracking-[0.04em] uppercase">{club.name}</p>
                      <p className="text-xs text-muted-foreground">{club.city} · {club.mode}</p>
                      <p className="text-xs text-muted-foreground">Asistencia {club.stats.attendance}</p>
                    </div>
                  </div>
                  <p className="text-sm">Leyendo: {club.book}</p>
                  <p className="text-xs text-muted-foreground">Proxima sesion: {club.nextSession}</p>
                  <Button asChild className="h-10 rounded-none border-2 border-border bg-primary font-black tracking-[0.06em] uppercase">
                    <Link href="/explore">Ver detalle del club</Link>
                  </Button>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 rounded-none border-2 border-border bg-card" />
          <CarouselNext className="right-1 rounded-none border-2 border-border bg-card" />
        </Carousel>
      </CardContent>
    </Card>
  );
}

function NextActionCard({ authView }: { authView: AuthView | null }) {
  const title = authView === "signup" ? "Termina tu registro" : authView === "login" ? "Retoma tu cuenta" : "Tu proxima accion";

  const description =
    authView === "signup"
      ? "Completa el alta para crear o unirte a un club en menos de dos minutos."
      : authView === "login"
        ? "Inicia sesion para retomar tus clubes y proximas reuniones."
        : "Define rapido que queres hacer ahora: entrar, crear cuenta o explorar clubes activos.";

  return (
    <Card className="border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
      <CardHeader className="border-b-2 border-border bg-muted/40">
        <CardTitle className="font-head text-2xl tracking-[0.08em] uppercase">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="grid gap-2 rounded-none border-2 border-border bg-background p-4 text-sm">
          <p className="font-bold">1. Busca un club o libro usando el panel superior.</p>
          <p className="font-bold">2. Revisa la actividad del club y su proxima sesion.</p>
          <p className="font-bold">3. Sumate al club o crea uno nuevo para tu equipo.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Button asChild className="h-11 rounded-none border-2 border-border bg-primary font-black tracking-[0.06em] uppercase">
            <Link href="/?auth=login">Entrar</Link>
          </Button>
          <Button asChild className="h-11 rounded-none border-2 border-border bg-secondary font-black tracking-[0.06em] uppercase">
            <Link href="/?auth=signup">Crear cuenta</Link>
          </Button>
          <Button asChild className="h-11 rounded-none border-2 border-border font-black tracking-[0.06em] uppercase" variant="outline">
            <Link href="/create-club">Crear club</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function HowItWorksCard() {
  return (
    <Card className="border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
      <CardHeader className="border-b-2 border-border bg-muted/40">
        <CardTitle className="font-head text-2xl tracking-[0.08em] uppercase">Como funciona</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="rounded-none border-2 border-border bg-background px-4 py-5 text-base font-black tracking-[0.04em] uppercase sm:text-lg">
          Busca un club -&gt; Unete o crea uno -&gt; Disfruta de la comunidad!!
        </p>
      </CardContent>
    </Card>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const source = resolvedSearchParams.auth;
  const authParam = Array.isArray(source) ? source[0] : source;
  const authView = resolveAuthView(authParam);
  const heroBookCoverColor = isBookCoverColor(HERO_BOOK.color) ? HERO_BOOK.color : "green";

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_12%_18%,var(--color-secondary)_0,var(--color-background)_34%),radial-gradient(circle_at_100%_0%,rgba(234,67,95,0.25)_0,rgba(252,255,231,0)_42%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className={`mx-auto grid w-full max-w-7xl gap-6 ${authView ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]" : ""}`}>
        <section className="grid gap-6">
          <Card className="overflow-hidden border-4 border-border bg-card shadow-[10px_10px_0_var(--color-border)]">
            <CardContent className="grid gap-6 p-0 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-stretch">
              <div className="grid gap-4 p-6 sm:p-8">
                <p className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">Plataforma de negocio para clubes de lectura</p>
                <h1 className="font-head text-6xl leading-[0.88] tracking-[0.08em] uppercase sm:text-8xl xl:text-9xl">ATENEO</h1>
                <p className="max-w-3xl text-base sm:text-lg">
                  Orquesta tu comunidad lectora con datos mock de libros, clubes y proximas sesiones en una sola vista.
                </p>
                <div className="grid gap-3 text-sm sm:grid-cols-3">
                  <p className="rounded-none border-2 border-border bg-background px-3 py-2 font-bold">+3 clubes con actividad semanal</p>
                  <p className="rounded-none border-2 border-border bg-background px-3 py-2 font-bold">+20 libros en catalogo inicial</p>
                  <p className="rounded-none border-2 border-border bg-background px-3 py-2 font-bold">Flujo completo de descubrimiento a accion</p>
                </div>
              </div>

              <div className="border-t-2 border-border bg-muted/40 p-6 lg:border-t-0 lg:border-l-2">
                <p className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">Lectura destacada</p>
                <div className="mx-auto mt-4 w-full max-w-[170px]">
                  <ModernBookCover
                    coverSrc={HERO_BOOK.cover}
                    alt={`Portada de ${HERO_BOOK.title}`}
                    title={HERO_BOOK.title}
                    size="lg"
                    radius="md"
                    color={heroBookCoverColor}
                    isStatic={false}
                    showText={false}
                  />
                </div>
                <p className="mt-4 text-sm font-black tracking-[0.04em] uppercase">{HERO_BOOK.title}</p>
                <p className="text-sm text-muted-foreground">{HERO_BOOK.author}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
            <CardHeader className="border-b-2 border-border bg-muted/40">
              <CardTitle className="font-head text-2xl tracking-[0.08em] uppercase">Buscar libros y clubes</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Control integrado: escribes y ejecutas la busqueda desde el mismo bloque visual.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pt-6">
              <Label className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase" htmlFor="landing-book-search">
                Buscar por libro, autor o club
              </Label>
              <div className="flex h-12 items-stretch rounded-none border-2 border-border bg-background p-1">
                <Input
                  id="landing-book-search"
                  className="h-full flex-1 rounded-none border-0 bg-transparent px-3 text-sm shadow-none focus-visible:ring-0"
                  placeholder="Ej: El Hobbit, Rayuela, SciFi Valencia"
                  type="search"
                />
                <Button className="h-full rounded-none border-2 border-border bg-primary px-6 font-black tracking-[0.06em] uppercase" type="button">
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          <SearchResultsCard bookResults={MOCK_BOOK_RESULTS} clubResults={MOCK_CLUB_RESULTS} />
          <ActiveClubsTodayCard />
          <NextActionCard authView={authView} />
          <HowItWorksCard />
        </section>

        {authView ? (
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            {authView === "signup" ? <CreateAccountAuthCard loginHref="/?auth=login" /> : null}
            {authView === "login" ? <LoginAuthCard signupHref="/?auth=signup" /> : null}
          </aside>
        ) : null}
      </div>
    </main>
  );
}
