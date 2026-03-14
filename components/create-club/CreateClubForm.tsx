"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateClubForm.module.css";

type Modality = "online" | "presencial" | "hibrido";
type NextBookStrategy = "admin-decides" | "most-voted" | "random";
type ClubVisibility = "public" | "private";

type FormValues = {
  clubName: string;
  description: string;
  categories: string[];
  modality: Modality;
  address: string;
  nextBookStrategy: NextBookStrategy;
  visibility: ClubVisibility;
  ratingsVisible: boolean;
  quotesVisible: boolean;
  primaryLanguage: string;
  contentWarningsVisible: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const MAX_CATEGORIES = 5;
const FREE_TIER_MAX_MEMBERS = 10;

const CATEGORY_OPTIONS: string[] = [
  "Ficcion",
  "No ficcion",
  "Fantasia",
  "Misterio",
  "Poesia",
  "Historia",
  "Ciencia ficcion",
  "Biografias",
  "Ensayo",
];

const LANGUAGE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "Selecciona idioma" },
  { value: "es", label: "Espanol" },
  { value: "en", label: "Ingles" },
  { value: "pt", label: "Portugues" },
  { value: "fr", label: "Frances" },
  { value: "it", label: "Italiano" },
];

const INITIAL_VALUES: FormValues = {
  clubName: "",
  description: "",
  categories: [],
  modality: "online",
  address: "",
  nextBookStrategy: "admin-decides",
  visibility: "public",
  ratingsVisible: true,
  quotesVisible: true,
  primaryLanguage: "",
  contentWarningsVisible: true,
};

export function CreateClubForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const needsAddress = values.modality === "presencial" || values.modality === "hibrido";

  const errorSummary = useMemo(() => {
    return Object.values(errors).filter(Boolean) as string[];
  }, [errors]);

  const validate = (currentValues: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!currentValues.clubName.trim()) {
      nextErrors.clubName = "El nombre del club es obligatorio.";
    }

    if (!currentValues.description.trim()) {
      nextErrors.description = "La descripcion es obligatoria.";
    }

    if (currentValues.categories.length === 0) {
      nextErrors.categories = "Selecciona al menos una categoria de lectura.";
    } else if (currentValues.categories.length > MAX_CATEGORIES) {
      nextErrors.categories = `Puedes seleccionar hasta ${MAX_CATEGORIES} categorias.`;
    }

    const requiresAddress = currentValues.modality === "presencial" || currentValues.modality === "hibrido";

    if (requiresAddress && !currentValues.address.trim()) {
      nextErrors.address = "La direccion es obligatoria para modalidad presencial o hibrida.";
    }

    if (!currentValues.primaryLanguage) {
      nextErrors.primaryLanguage = "Selecciona un idioma principal.";
    }

    return nextErrors;
  };

  const updateField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError("");
  };

  const toggleCategory = (category: string) => {
    setSubmitError("");

    setValues((prev) => {
      const isSelected = prev.categories.includes(category);

      if (isSelected) {
        const nextCategories = prev.categories.filter((item) => item !== category);
        setErrors((current) => ({ ...current, categories: undefined }));
        return { ...prev, categories: nextCategories };
      }

      if (prev.categories.length >= MAX_CATEGORIES) {
        setErrors((current) => ({
          ...current,
          categories: `Maximo ${MAX_CATEGORIES} categorias. Quita una para continuar.`,
        }));
        return prev;
      }

      setErrors((current) => ({ ...current, categories: undefined }));
      return { ...prev, categories: [...prev.categories, category] };
    });
  };

  const handleModalityChange = (modality: Modality) => {
    if (modality === values.modality) return;

    setValues((prev) => ({
      ...prev,
      modality,
      address: modality === "online" ? "" : prev.address,
    }));
    setErrors((prev) => ({ ...prev, address: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("Revisa los campos marcados y corrige los errores antes de continuar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push("/my-clubs/new-club/dashboard");
    } catch {
      setSubmitError("No se pudo crear el club. Intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <p className={styles.eyebrow}>Free Tier</p>
        <h1 className={styles.title}>Crear club</h1>
        <p className={styles.subtitle}>
          Configura lo esencial para arrancar. Puedes ajustar visibilidad y experiencia de lectura desde el inicio.
        </p>
      </div>

      <fieldset className={styles.fieldset} disabled={isSubmitting}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Informacion base</h2>

          <label className={styles.label} htmlFor="club-name">
            Nombre del club
          </label>
          <input
            id="club-name"
            className={`${styles.input} ${errors.clubName ? styles.inputError : ""}`}
            type="text"
            value={values.clubName}
            onChange={(event) => updateField("clubName", event.target.value)}
            placeholder="Ej. Lecturas de los jueves"
            aria-invalid={Boolean(errors.clubName)}
            aria-describedby={errors.clubName ? "club-name-error" : undefined}
          />
          {errors.clubName && (
            <p className={styles.errorText} id="club-name-error">
              {errors.clubName}
            </p>
          )}

          <label className={styles.label} htmlFor="club-description">
            Descripcion
          </label>
          <textarea
            id="club-description"
            className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Cuenta brevemente que tipo de lecturas y dinamica tendra el club."
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "club-description-error" : undefined}
          />
          {errors.description && (
            <p className={styles.errorText} id="club-description-error">
              {errors.description}
            </p>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Categorias de lectura</h2>
            <span className={styles.counter}>
              {values.categories.length}/{MAX_CATEGORIES}
            </span>
          </div>

          <div className={styles.categoriesGrid}>
            {CATEGORY_OPTIONS.map((category) => {
              const isActive = values.categories.includes(category);
              const isLocked = values.categories.length >= MAX_CATEGORIES && !isActive;

              return (
                <button
                  key={category}
                  type="button"
                  className={`${styles.categoryChip} ${isActive ? styles.categoryChipActive : ""}`}
                  onClick={() => toggleCategory(category)}
                  disabled={isSubmitting || isLocked}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
          {errors.categories && <p className={styles.errorText}>{errors.categories}</p>}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Modalidad y acceso</h2>

          <SegmentedControl<Modality>
            label="Modalidad"
            value={values.modality}
            onChange={handleModalityChange}
            options={[
              { value: "online", label: "Online" },
              { value: "presencial", label: "Presencial" },
              { value: "hibrido", label: "Hibrido" },
            ]}
          />

          {needsAddress && (
            <>
              <label className={styles.label} htmlFor="club-address">
                Direccion
              </label>
              <input
                id="club-address"
                className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
                type="text"
                value={values.address}
                onChange={(event) => updateField("address", event.target.value)}
                placeholder="Ej. Av. Corrientes 1234, CABA"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "club-address-error" : undefined}
              />
              {errors.address && (
                <p className={styles.errorText} id="club-address-error">
                  {errors.address}
                </p>
              )}
            </>
          )}

          <SegmentedControl<NextBookStrategy>
            label="Estrategia para elegir proximo libro"
            value={values.nextBookStrategy}
            onChange={(nextBookStrategy) => updateField("nextBookStrategy", nextBookStrategy)}
            options={[
              { value: "admin-decides", label: "Admin decide" },
              { value: "most-voted", label: "Mas votado" },
              { value: "random", label: "Random" },
            ]}
          />

          <SegmentedControl<ClubVisibility>
            label="Visibilidad del club"
            value={values.visibility}
            onChange={(visibility) => updateField("visibility", visibility)}
            options={[
              { value: "public", label: "Publico" },
              { value: "private", label: "Privado" },
            ]}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Preferencias de comunidad</h2>

          <label className={styles.label} htmlFor="primary-language">
            Idioma principal
          </label>
          <select
            id="primary-language"
            className={`${styles.select} ${errors.primaryLanguage ? styles.inputError : ""}`}
            value={values.primaryLanguage}
            onChange={(event) => updateField("primaryLanguage", event.target.value)}
            aria-invalid={Boolean(errors.primaryLanguage)}
            aria-describedby={errors.primaryLanguage ? "primary-language-error" : undefined}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value || "placeholder"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.primaryLanguage && (
            <p className={styles.errorText} id="primary-language-error">
              {errors.primaryLanguage}
            </p>
          )}

          <ToggleRow
            label="Mostrar calificaciones de libros"
            checked={values.ratingsVisible}
            onChange={(checked) => updateField("ratingsVisible", checked)}
          />
          <ToggleRow
            label="Mostrar citas de miembros"
            checked={values.quotesVisible}
            onChange={(checked) => updateField("quotesVisible", checked)}
          />
          <ToggleRow
            label="Mostrar advertencias de contenido"
            checked={values.contentWarningsVisible}
            onChange={(checked) => updateField("contentWarningsVisible", checked)}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Plan gratis</h2>

          <div className={styles.lockedRow} aria-label="Limite de miembros bloqueado por plan gratis">
            <div className={styles.lockedInfo}>
              <LockIcon />
              <div>
                <p className={styles.lockedLabel}>Maximo de miembros</p>
                <p className={styles.lockedHint}>Este valor es fijo en free tier</p>
              </div>
            </div>
            <strong className={styles.lockedValue}>{FREE_TIER_MAX_MEMBERS}</strong>
          </div>

          <p className={styles.proNote}>
            Las imagenes del club (portada o avatar) no estan disponibles en este plan. Habilitadas solo para Pro.
          </p>
        </section>

        {(submitError || errorSummary.length > 0) && (
          <div className={styles.submitErrorBox} role="alert">
            <p className={styles.submitErrorTitle}>{submitError || "Hay errores en el formulario"}</p>
            {errorSummary.length > 0 && (
              <ul className={styles.submitErrorList}>
                {errorSummary.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando club..." : "Crear club"}
        </button>
      </fieldset>
    </form>
  );
}

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
};

function SegmentedControl<T extends string>({ label, value, options, onChange }: SegmentedControlProps<T>) {
  return (
    <div className={styles.segmentedBlock}>
      <p className={styles.labelAsText}>{label}</p>
      <div
        className={styles.segmentedControl}
        role="radiogroup"
        aria-label={label}
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              className={`${styles.segmentedButton} ${selected ? styles.segmentedButtonActive : ""}`}
              onClick={() => onChange(option.value)}
              role="radio"
              aria-checked={selected}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type ToggleRowProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <div className={styles.toggleRow}>
      <span>{label}</span>
      <button
        type="button"
        className={`${styles.toggleButton} ${checked ? styles.toggleButtonOn : ""}`}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  );
}

function LockIcon() {
  return (
    <svg className={styles.lockIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7 11V8a5 5 0 1 1 10 0v3m-9 0h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm4 4v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
