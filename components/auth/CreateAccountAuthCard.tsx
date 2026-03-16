"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { format, isValid, parse, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SUBMIT_BUTTON_CLASSNAME =
  "group relative isolate h-12 overflow-hidden rounded-none border-2 border-border bg-primary text-base font-black tracking-[0.08em] text-primary-foreground uppercase shadow-[4px_4px_0_var(--color-border)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:text-foreground hover:shadow-[2px_2px_0_var(--color-border)] active:translate-x-[3px] active:translate-y-[3px] active:text-foreground active:shadow-[1px_1px_0_var(--color-border)] before:absolute before:inset-y-0 before:left-0 before:w-0 before:bg-[#ffda5b] before:transition-[width] before:duration-300 hover:before:w-full active:before:w-full";

const FIELD_CLASSNAME =
  "h-14 rounded-none border-2 border-border bg-white px-4 text-xl text-black placeholder:text-xl placeholder:text-gray-500 shadow-none";

const PASSWORD_FIELD_CLASSNAME = `${FIELD_CLASSNAME} placeholder:text-2xl placeholder:tracking-[0.2em]`;

const LABEL_CLASSNAME = "text-xs font-bold tracking-[0.06em] uppercase";

const BIRTH_DATE_INPUT_FORMAT = "dd/MM/yyyy";
const BIRTH_DATE_STORAGE_FORMAT = "yyyy-MM-dd";

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type PasswordRule = {
  id: string;
  label: string;
  isValid: boolean;
};

const INITIAL_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  birthDate: "",
  password: "",
  confirmPassword: "",
};

const parseBirthDateInput = (value: string) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return null;
  }

  const parsedDate = parse(value, BIRTH_DATE_INPUT_FORMAT, new Date());

  if (!isValid(parsedDate)) {
    return null;
  }

  return format(parsedDate, BIRTH_DATE_INPUT_FORMAT) === value ? parsedDate : null;
};

export type CreateAccountAuthCardProps = {
  loginHref: string;
  showLandingAlert?: boolean;
};

export function CreateAccountAuthCard({ loginHref, showLandingAlert = false }: CreateAccountAuthCardProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [birthDateInput, setBirthDateInput] = useState("");

  const passwordRules = useMemo<PasswordRule[]>(() => {
    const normalizedPassword = values.password.toLowerCase();
    const normalizedName = values.firstName.trim().toLowerCase();
    const normalizedLastName = values.lastName.trim().toLowerCase();

    return [
      {
        id: "length",
        label: "Tener mas de 8 caracteres (minimo 9)",
        isValid: values.password.length > 8,
      },
      {
        id: "upper",
        label: "Incluir al menos 1 letra mayuscula",
        isValid: /[A-Z]/.test(values.password),
      },
      {
        id: "lower",
        label: "Incluir al menos 1 letra minuscula",
        isValid: /[a-z]/.test(values.password),
      },
      {
        id: "number",
        label: "Incluir al menos 1 numero",
        isValid: /[0-9]/.test(values.password),
      },
      {
        id: "special",
        label: "Incluir al menos 1 caracter especial",
        isValid: /[^A-Za-z0-9]/.test(values.password),
      },
      {
        id: "name",
        label: "No contener tu nombre",
        isValid: normalizedName.length === 0 || !normalizedPassword.includes(normalizedName),
      },
      {
        id: "lastName",
        label: "No contener tus apellidos",
        isValid: normalizedLastName.length === 0 || !normalizedPassword.includes(normalizedLastName),
      },
    ];
  }, [values.firstName, values.lastName, values.password]);

  const arePasswordRulesValid = passwordRules.every((rule) => rule.isValid);
  const hasStartedPassword = values.password.length > 0;
  const missingPasswordRules = passwordRules.filter((rule) => !rule.isValid);

  const passwordsMatch = values.confirmPassword.length > 0 && values.confirmPassword === values.password;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors: FormErrors = {};

    if (values.firstName.trim().length === 0) {
      nextErrors.firstName = "El nombre es obligatorio.";
    }

    if (values.lastName.trim().length === 0) {
      nextErrors.lastName = "Los apellidos son obligatorios.";
    }

    if (values.username.trim().length === 0) {
      nextErrors.username = "El nombre de usuario es obligatorio.";
    }

    if (values.email.trim().length === 0) {
      nextErrors.email = "El email es obligatorio.";
    }

    if (birthDateInput.trim().length > 0 && !parseBirthDateInput(birthDateInput.trim())) {
      nextErrors.birthDate = "Ingresa una fecha valida con formato dd/MM/yyyy.";
    }

    if (values.password.length === 0) {
      nextErrors.password = "La contraseña es obligatoria.";
    } else if (!arePasswordRulesValid) {
      nextErrors.password = "La contraseña no cumple todos los requisitos.";
    }

    if (values.confirmPassword.length === 0) {
      nextErrors.confirmPassword = "Tenes que confirmar la contraseña.";
    } else if (!passwordsMatch) {
      nextErrors.confirmPassword = "La confirmacion no coincide con la contraseña.";
    }

    setErrors(nextErrors);
  };

  const handleChange = (field: keyof FormValues, fieldValue: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: fieldValue,
    }));

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    }
  };

  const clearBirthDateError = () => {
    if (!errors.birthDate) {
      return;
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      birthDate: undefined,
    }));
  };

  const handleBirthDateInputChange = (nextValue: string) => {
    setBirthDateInput(nextValue);
    clearBirthDateError();

    const normalizedValue = nextValue.trim();

    if (normalizedValue.length === 0) {
      handleChange("birthDate", "");
      return;
    }

    const parsedDate = parseBirthDateInput(normalizedValue);

    if (parsedDate) {
      handleChange("birthDate", format(parsedDate, BIRTH_DATE_STORAGE_FORMAT));
    }
  };

  const handleBirthDateInputBlur = () => {
    const normalizedValue = birthDateInput.trim();

    if (normalizedValue.length === 0) {
      clearBirthDateError();
      handleChange("birthDate", "");
      return;
    }

    const parsedDate = parseBirthDateInput(normalizedValue);

    if (!parsedDate) {
      handleChange("birthDate", "");
      setErrors((currentErrors) => ({
        ...currentErrors,
        birthDate: "Ingresa una fecha valida con formato dd/MM/yyyy.",
      }));
      return;
    }

    const normalizedBirthDate = format(parsedDate, BIRTH_DATE_INPUT_FORMAT);
    setBirthDateInput(normalizedBirthDate);
    handleChange("birthDate", format(parsedDate, BIRTH_DATE_STORAGE_FORMAT));
  };

  const handleBirthDateSelect = (date: Date | undefined) => {
    if (!date) {
      setBirthDateInput("");
      handleChange("birthDate", "");
      clearBirthDateError();
      return;
    }

    setBirthDateInput(format(date, BIRTH_DATE_INPUT_FORMAT));
    handleChange("birthDate", format(date, BIRTH_DATE_STORAGE_FORMAT));
    clearBirthDateError();
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <Card className="mx-auto w-full max-w-xl rounded-none border-4 border-border bg-card py-0">
      <CardHeader className="gap-0 rounded-none px-0">
        <p className="border-b-4 border-border bg-primary px-6 py-3 text-[0.74rem] font-black tracking-[0.1em] text-primary-foreground uppercase">
          Registro
        </p>
        <CardTitle className="px-6 pt-5 pb-2 text-2xl font-black tracking-[0.08em] uppercase">Crear cuenta</CardTitle>
        <p className="border-b border-border/30 px-6 pb-4 text-sm text-muted-foreground">
          Completa tus datos para unirte a Ateneo.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 px-6 py-6">
        {showLandingAlert ? (
          <Alert className="rounded-none border-2 border-border bg-muted/40 px-3 py-3">
            <AlertTitle className="text-xs font-bold tracking-[0.06em] uppercase">Nueva visita</AlertTitle>
            <AlertDescription className="text-sm text-foreground">Llegaste desde la landing de captacion.</AlertDescription>
          </Alert>
        ) : null}

        {submitted && hasErrors ? (
          <Alert className="rounded-none border-2 border-border bg-primary/10 px-3 py-3">
            <AlertTitle className="text-xs font-bold tracking-[0.06em] uppercase">Revisa el formulario</AlertTitle>
            <AlertDescription className="text-sm text-foreground">
              Hay campos obligatorios sin completar o con errores.
            </AlertDescription>
          </Alert>
        ) : null}

        <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className={LABEL_CLASSNAME} htmlFor="firstName">
                Nombre
              </Label>
              <Input
                className={FIELD_CLASSNAME}
                id="firstName"
                type="text"
                value={values.firstName}
                onChange={(event) => handleChange("firstName", event.target.value)}
                placeholder="Tu nombre"
              />
              {errors.firstName ? <p className="text-sm text-primary">{errors.firstName}</p> : null}
            </div>

            <div className="grid gap-2">
              <Label className={LABEL_CLASSNAME} htmlFor="lastName">
                Apellidos
              </Label>
              <Input
                className={FIELD_CLASSNAME}
                id="lastName"
                type="text"
                value={values.lastName}
                onChange={(event) => handleChange("lastName", event.target.value)}
                placeholder="Tus apellidos"
              />
              {errors.lastName ? <p className="text-sm text-primary">{errors.lastName}</p> : null}
            </div>

            <div className="grid gap-2">
              <Label className={LABEL_CLASSNAME} htmlFor="username">
                Nombre de usuario
              </Label>
              <Input
                className={FIELD_CLASSNAME}
                id="username"
                type="text"
                value={values.username}
                onChange={(event) => handleChange("username", event.target.value)}
                placeholder="@usuario"
              />
              {errors.username ? <p className="text-sm text-primary">{errors.username}</p> : null}
            </div>

            <div className="grid gap-2">
              <Label className={LABEL_CLASSNAME} htmlFor="birthDate">
                Fecha de nacimiento (opcional)
              </Label>
              <div className="flex items-stretch gap-2">
                <Input
                  className={FIELD_CLASSNAME}
                  id="birthDate"
                  type="text"
                  value={birthDateInput}
                  onBlur={handleBirthDateInputBlur}
                  onChange={(event) => handleBirthDateInputChange(event.target.value)}
                  placeholder="dd/MM/yyyy"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      aria-label="Abrir calendario de fecha de nacimiento"
                      className="h-14 w-14 rounded-none border-2 border-border bg-white p-0 text-black shadow-none"
                      type="button"
                      variant="outline"
                    >
                      <CalendarIcon className="size-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto rounded-none border-2 border-border p-0">
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={values.birthDate ? parseISO(values.birthDate) : undefined}
                      onSelect={handleBirthDateSelect}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {errors.birthDate ? <p className="text-sm text-primary">{errors.birthDate}</p> : null}
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label className={LABEL_CLASSNAME} htmlFor="email">
                Email
              </Label>
              <Input
                className={FIELD_CLASSNAME}
                id="email"
                type="email"
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder="tu@email.com"
              />
              {errors.email ? <p className="text-sm text-primary">{errors.email}</p> : null}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label className={LABEL_CLASSNAME} htmlFor="password">
                Contraseña
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="inline-flex items-center gap-1 border-b border-border text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                      type="button"
                    >
                      <InfoIcon className="size-3.5" />
                      Ver requisitos
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80 rounded-none border-2 border-border bg-card p-3 text-xs text-foreground" sideOffset={6}>
                    <ul className="grid gap-1.5">
                      {passwordRules.map((rule) => (
                        <li key={rule.id} className={rule.isValid ? "text-foreground" : "text-active"}>
                          <span className="mr-2 inline-block min-w-14 font-black uppercase">
                            {rule.isValid ? "OK" : "FALTA"}
                          </span>
                          {rule.label}
                        </li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              className={PASSWORD_FIELD_CLASSNAME}
              id="password"
              type="password"
              value={values.password}
              onChange={(event) => handleChange("password", event.target.value)}
              placeholder="••••••••••"
            />
            {errors.password ? <p className="text-sm text-primary">{errors.password}</p> : null}

            {hasStartedPassword && missingPasswordRules.length > 0 ? (
              <div className="rounded-none border-2 border-border bg-white px-4 py-3">
                <p className="text-xs font-bold tracking-[0.06em] text-active uppercase">Te falta cumplir:</p>
                <ul className="mt-2 grid gap-1 text-sm text-active">
                  {missingPasswordRules.map((rule) => (
                    <li key={rule.id}>
                      <span className="mr-2 inline-block min-w-14 font-black uppercase">FALTA</span>
                      {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label className={LABEL_CLASSNAME} htmlFor="confirmPassword">
              Confirmar contraseña
            </Label>
            <Input
              className={PASSWORD_FIELD_CLASSNAME}
              id="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={(event) => handleChange("confirmPassword", event.target.value)}
              placeholder="••••••••••"
            />
            {errors.confirmPassword ? <p className="text-sm text-primary">{errors.confirmPassword}</p> : null}
            {values.confirmPassword.length > 0 && !errors.confirmPassword ? (
              <p className={passwordsMatch ? "text-sm text-foreground" : "text-sm text-primary"}>
                {passwordsMatch
                  ? "La confirmacion coincide con la contraseña."
                  : "La confirmacion no coincide con la contraseña."}
              </p>
            ) : null}
          </div>

          <Button className={SUBMIT_BUTTON_CLASSNAME} type="submit">
            <span className="relative z-10 inline-grid place-items-center">
              <span className="col-start-1 row-start-1 transition-opacity duration-150 group-hover:opacity-0 group-active:opacity-0">
                Crear cuenta
              </span>
              <span className="col-start-1 row-start-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-active:opacity-100">
                -&gt;
              </span>
            </span>
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          Ya tenes cuenta?{" "}
          <Link className="border-b-2 border-primary font-bold text-foreground" href={loginHref}>
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
