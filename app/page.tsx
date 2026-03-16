import Link from "next/link";

import { CreateAccountAuthCard, LoginAuthCard } from "@/components/auth";
import ModernBookCover from "@/components/club-library/ModernBookCover";
import { getAllCatalogBooks } from "@/components/mock-app";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const BUSINESS_QUOTE =
  "\"No alcanza con leer un buen libro: cuando el grupo discute con foco, la lectura se convierte en decisiones compartidas.\"";

const BOOK_SELECTION_REASON =
  "Elegimos esta lectura porque combina una narrativa accesible con temas que disparan debate real entre perfiles distintos del club: liderazgo, pertenencia y toma de decisiones en equipo.";

const CATALOG = getAllCatalogBooks();
const BOOK_OF_WEEK = CATALOG.find((book) => book.id === "hobbit") ?? CATALOG[0] ?? {
  id: "hobbit",
  title: "El Hobbit",
  author: "J.R.R. Tolkien",
  cover: "/images/books/hobbit.jpg",
  color: "green",
};

const isBookCoverColor = (value: string): value is BookCoverColor => {
  return BOOK_COVER_COLORS.includes(value as BookCoverColor);
};

const resolveAuthView = (value: string | undefined): AuthView | null => {
  if (value === "signup" || value === "login") {
    return value;
  }

  return null;
};

function LandingAuthInfoPanel() {
  return (
    <Card className="border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
      <CardHeader className="border-b-2 border-border bg-muted/40">
        <CardTitle className="font-head text-2xl tracking-[0.08em] uppercase">Acceso del club</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Crea tu cuenta o inicia sesión sin salir de la portada.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 pt-5">
        <Alert className="rounded-none border-2 border-border bg-secondary/50">
          <AlertTitle className="font-bold tracking-[0.06em] uppercase">Acceso rápido</AlertTitle>
          <AlertDescription>
            Esta vista está habilitada para visitantes y personas registradas.
          </AlertDescription>
        </Alert>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild className="h-11 rounded-none border-2 border-border bg-primary font-black tracking-[0.06em] uppercase">
            <Link href="/?auth=signup">Crear cuenta</Link>
          </Button>
          <Button asChild className="h-11 rounded-none border-2 border-border font-black tracking-[0.06em] uppercase" variant="outline">
            <Link href="/?auth=login">Iniciar sesión</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const source = resolvedSearchParams.auth;
  const authParam = Array.isArray(source) ? source[0] : source;
  const authView = resolveAuthView(authParam);
  const bookCoverColor = isBookCoverColor(BOOK_OF_WEEK.color) ? BOOK_OF_WEEK.color : "green";

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_12%_18%,var(--color-secondary)_0,var(--color-background)_34%),radial-gradient(circle_at_100%_0%,rgba(234,67,95,0.25)_0,rgba(252,255,231,0)_42%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:items-stretch">
        <Card className="border-4 border-border bg-card shadow-[10px_10px_0_var(--color-border)]">
          <CardHeader className="border-b-2 border-border bg-muted/40 pb-6">
            <p className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">Plataforma de gestión lectora</p>
            <h1 className="font-head text-5xl leading-none tracking-[0.1em] uppercase sm:text-7xl">ATENEO</h1>
            <p className="max-w-2xl text-base text-foreground sm:text-lg">
              Busca clubes de lectura afines a ti o crea tu propio club de lectura para compartir tus lecturas.
            </p>
          </CardHeader>

          <CardContent className="grid gap-6 pt-6">
            <section className="grid gap-2" aria-labelledby="busqueda-libros-title">
              <h2 id="busqueda-libros-title" className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
                Buscar libros
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Label className="sr-only" htmlFor="landing-book-search">
                  Buscar libro
                </Label>
                <Input id="landing-book-search" placeholder="Ej: El Hobbit, Rayuela, ensayo histórico" type="search" />
                <Button className="h-10 rounded-none border-2 border-border bg-secondary font-black tracking-[0.06em] text-secondary-foreground uppercase" type="button">
                  Buscar
                </Button>
              </div>
            </section>

            <section aria-labelledby="book-of-week-title" className="rounded-none border-2 border-border bg-background p-4 sm:p-5">
              <p className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">Libro de la semana</p>
              <div className="mt-4 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                <div className="mx-auto w-full max-w-[240px]">
                  <ModernBookCover
                    coverSrc={BOOK_OF_WEEK.cover}
                    alt={`Portada de ${BOOK_OF_WEEK.title}`}
                    title={BOOK_OF_WEEK.title}
                    size="lg"
                    radius="md"
                    color={bookCoverColor}
                    isStatic={false}
                    showText={false}
                  />
                </div>

                <article className="grid gap-3">
                  <h2 id="book-of-week-title" className="font-head text-2xl leading-tight tracking-[0.05em] uppercase sm:text-3xl">
                    {BOOK_OF_WEEK.title}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">{BOOK_OF_WEEK.author}</p>

                  <blockquote className="border-l-4 border-primary bg-card px-4 py-3 text-sm leading-relaxed text-foreground">
                    {BUSINESS_QUOTE}
                  </blockquote>

                  <Accordion className="w-full" collapsible type="single">
                    <AccordionItem value="pick-reason">
                      <AccordionTrigger>Motivo de la elección</AccordionTrigger>
                      <AccordionContent>{BOOK_SELECTION_REASON}</AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button className="h-11 rounded-none border-2 border-border bg-primary font-black tracking-[0.06em] uppercase" type="button">
                    Añadir a la lista de lectura del club
                  </Button>
                </article>
              </div>
            </section>
          </CardContent>
        </Card>

        <aside className="lg:pt-8">
          {authView === "signup" ? <CreateAccountAuthCard loginHref="/?auth=login" /> : null}
          {authView === "login" ? <LoginAuthCard signupHref="/?auth=signup" /> : null}
          {!authView ? <LandingAuthInfoPanel /> : null}
        </aside>
      </div>
    </main>
  );
}
