import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PROVIDER_BUTTON_CLASSNAME =
  "h-11 rounded-none border-2 border-border bg-[#ffda5b] font-black tracking-[0.06em] uppercase shadow-[4px_4px_0_var(--color-border)] transition-all duration-150 hover:bg-[#ffda5b] hover:text-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--color-border)] active:bg-[#ffda5b] active:text-foreground active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-border)] dark:hover:bg-[#ffda5b] dark:active:bg-[#ffda5b]";

const LOGIN_BUTTON_CLASSNAME =
  "group relative isolate h-12 overflow-hidden rounded-none border-2 border-border bg-primary text-base font-black tracking-[0.08em] text-primary-foreground uppercase shadow-[4px_4px_0_var(--color-border)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:text-foreground hover:shadow-[2px_2px_0_var(--color-border)] active:translate-x-[3px] active:translate-y-[3px] active:text-foreground active:shadow-[1px_1px_0_var(--color-border)] before:absolute before:inset-y-0 before:left-0 before:w-0 before:bg-[#ffda5b] before:transition-[width] before:duration-300 hover:before:w-full active:before:w-full";

const APPLE_ICON_PATH =
  "M16.365 1.43c0 1.14-.42 2.28-1.2 3.09-.82.86-2.15 1.52-3.36 1.43-.16-1.11.42-2.31 1.18-3.11.82-.86 2.24-1.46 3.38-1.41Zm3.5 16.15c-.54 1.24-.79 1.79-1.48 2.9-.97 1.57-2.35 3.52-4.07 3.53-1.53.01-1.92-1-4-1-2.08 0-2.5.99-4.03.99-1.72-.01-3.03-1.77-4-3.33-2.71-4.31-3-9.38-1.32-11.96 1.2-1.84 3.1-2.91 4.89-2.91 1.83 0 2.98 1 4.5 1 1.47 0 2.37-1 4.48-1 1.59 0 3.28.86 4.47 2.35-3.93 2.18-3.29 7.8.56 9.53Z";

function AppleBrandIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 21 26" fill="currentColor">
      <path d={APPLE_ICON_PATH} />
    </svg>
  );
}

function GoogleBrandIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 48 48">
      <path
        d="M44.5 20H24v8.5h11.8C34.9 33.9 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 3l6-6C34.4 4.8 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 20-8.7 20-21c0-1.4-.1-2.7-.5-4Z"
        fill="#FFC107"
      />
      <path
        d="M6.1 14.2l7 5.2C15 15.2 19.2 12 24 12c3.1 0 5.9 1.1 8.1 3l6-6C34.4 4.8 29.4 3 24 3 15.9 3 8.8 7.6 6.1 14.2Z"
        fill="#FF3D00"
      />
      <path
        d="M24 45c5.3 0 10.2-1.8 14-4.9l-6.5-5.5C29.4 36.2 26.8 37 24 37c-6 0-10.9-3.1-12.8-7.7l-7 5.4C6.9 40.7 14.9 45 24 45Z"
        fill="#4CAF50"
      />
      <path
        d="M44.5 20H24v8.5h11.8c-.8 3.1-2.8 5.3-4.3 6.1l6.5 5.5C41.9 36.3 45 30.9 45 24c0-1.4-.1-2.7-.5-4Z"
        fill="#1976D2"
      />
    </svg>
  );
}

export type LoginAuthCardProps = {
  signupHref: string;
  showLandingAlert?: boolean;
};

export function LoginAuthCard({ signupHref, showLandingAlert = false }: LoginAuthCardProps) {
  return (
    <Card className="mx-auto w-full max-w-xl rounded-none border-4 border-border bg-card py-0">
      <CardHeader className="gap-0 rounded-none px-0">
        <p className="border-b-4 border-border bg-primary px-6 py-3 text-[0.74rem] font-black tracking-[0.1em] text-primary-foreground uppercase">
          Acceso seguro
        </p>
        <CardTitle className="px-6 pt-5 pb-2 text-2xl font-black tracking-[0.08em] uppercase">Entrar</CardTitle>
        <p className="border-b border-border/30 px-6 pb-4 text-sm text-muted-foreground">
          Accede para gestionar tus clubs y sesiones de lectura.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 px-6 py-6">
        {showLandingAlert ? (
          <Alert className="rounded-none border-2 border-border bg-muted/40 px-3 py-3">
            <AlertTitle className="text-xs font-bold tracking-[0.06em] uppercase">Nueva visita</AlertTitle>
            <AlertDescription className="text-sm text-foreground">Llegaste desde la landing de captacion.</AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-2">
          <Label className="text-xs font-bold tracking-[0.06em] uppercase" htmlFor="email">
            Email
          </Label>
          <Input
            className="h-14 rounded-none border-2 border-border bg-white px-4 text-xl text-black placeholder:text-xl placeholder:text-gray-500 shadow-none"
            id="email"
            type="email"
            placeholder="tu@email.com"
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-xs font-bold tracking-[0.06em] uppercase" htmlFor="password">
            Contraseña
          </Label>
          <Input
            className="h-14 rounded-none border-2 border-border bg-white px-4 text-xl text-black placeholder:text-xl placeholder:text-gray-500 shadow-none"
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <Button className={LOGIN_BUTTON_CLASSNAME} type="button">
          <span className="relative z-10 inline-grid place-items-center">
            <span className="col-start-1 row-start-1 transition-opacity duration-150 group-hover:opacity-0 group-active:opacity-0">
              Entrar
            </span>
            <span className="col-start-1 row-start-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-active:opacity-100">
              -&gt;
            </span>
          </span>
        </Button>

        <div className="flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.08em] text-muted-foreground uppercase" aria-hidden="true">
          <span className="h-px flex-1 bg-border/30" />
          <span>o continua con</span>
          <span className="h-px flex-1 bg-border/30" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className={PROVIDER_BUTTON_CLASSNAME} type="button" variant="outline">
            <span className="inline-flex items-center gap-2">
              <AppleBrandIcon />
              Apple
            </span>
          </Button>
          <Button className={PROVIDER_BUTTON_CLASSNAME} type="button" variant="outline">
            <span className="inline-flex items-center gap-2">
              <GoogleBrandIcon />
              Google
            </span>
          </Button>
        </div>

        <div className="grid gap-3 border-t border-border/30 pt-4">
          <Button
            asChild
            className="h-10 w-full rounded-none border-2 border-border bg-background font-bold tracking-[0.06em] text-foreground uppercase sm:w-fit"
            variant="outline"
          >
            <Link href="/my-clubs">Ir a MisClubs</Link>
          </Button>

          <p className="text-sm text-muted-foreground">
            Todavia no tenes cuenta?{" "}
            <Link className="border-b-2 border-primary font-bold text-foreground" href={signupHref}>
              Crear cuenta
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
