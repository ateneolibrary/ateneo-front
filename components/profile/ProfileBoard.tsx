"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FavoriteBook, UserProfile, ClubMock } from "@/components/mock-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModernBookCover from "@/components/club-library/ModernBookCover";
import BookPickerModal from "./BookPickerModal";
import styles from "./Profile.module.css";

const LOGGED_USER_ID = "elena-vidal";
const MAX_GENRES = 5;

type ProfileBoardProps = {
  user: UserProfile;
  userClubs: ClubMock[];
};

type EditableProfileState = {
  name: string;
  bio: string;
  avatar: string;
  favoriteGenres: string[];
  favoriteBooks: (FavoriteBook | null)[];
};

function normalizeFavoriteBooks(books: (FavoriteBook | null)[]): (FavoriteBook | null)[] {
  const normalized = [...books.slice(0, 4)];
  while (normalized.length < 4) normalized.push(null);
  return normalized;
}

function toEditableState(user: UserProfile): EditableProfileState {
  return {
    name: user.name,
    bio: user.bio,
    avatar: user.avatar,
    favoriteGenres: [...user.favoriteGenres],
    favoriteBooks: normalizeFavoriteBooks(user.favoriteBooks),
  };
}

function cloneEditableState(profile: EditableProfileState): EditableProfileState {
  return {
    ...profile,
    favoriteGenres: [...profile.favoriteGenres],
    favoriteBooks: [...profile.favoriteBooks],
  };
}

export default function ProfileBoard({ user, userClubs }: ProfileBoardProps) {
  const router = useRouter();
  const isOwnProfile = user.id === LOGGED_USER_ID;

  const [profile, setProfile] = useState<EditableProfileState>(() => toEditableState(user));
  const [draft, setDraft] = useState<EditableProfileState>(() => toEditableState(user));
  const [isEditing, setIsEditing] = useState(false);

  const [flipped, setFlipped] = useState([false, false, false, false]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [genreInput, setGenreInput] = useState("");

  const activeProfile = isEditing ? draft : profile;
  const books = activeProfile.favoriteBooks;

  const filledIndices = books.map((book, index) => (book !== null ? index : -1)).filter((index) => index >= 0);
  const allFilledFlipped = filledIndices.length > 0 && filledIndices.every((index) => flipped[index]);

  function resetTransientUi() {
    setFlipped([false, false, false, false]);
    setPickerOpen(false);
    setPickerSlot(null);
    setGenreInput("");
  }

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/my-clubs");
  }

  function handleStartEditing() {
    setDraft(cloneEditableState(profile));
    setIsEditing(true);
    resetTransientUi();
  }

  function handleCancelEditing() {
    setDraft(cloneEditableState(profile));
    setIsEditing(false);
    resetTransientUi();
  }

  function handleSaveEditing() {
    const nextName = draft.name.trim();
    const nextBio = draft.bio.trim();
    const nextAvatar = draft.avatar.trim();

    setProfile((prev) => ({
      name: nextName || prev.name,
      bio: nextBio,
      avatar: nextAvatar || prev.avatar,
      favoriteGenres: draft.favoriteGenres.slice(0, MAX_GENRES),
      favoriteBooks: normalizeFavoriteBooks(draft.favoriteBooks),
    }));

    setIsEditing(false);
    resetTransientUi();
  }

  function handleFlipAll() {
    if (isEditing) return;

    setFlipped((prev) => {
      const next = [...prev];
      if (allFilledFlipped) {
        filledIndices.forEach((index) => {
          next[index] = false;
        });
      } else {
        filledIndices.forEach((index) => {
          next[index] = true;
        });
      }
      return next;
    });
  }

  function handleCardClick(index: number) {
    if (isEditing && isOwnProfile) {
      setPickerSlot(index);
      setPickerOpen(true);
      return;
    }

    if (!books[index]) return;

    setFlipped((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  function handleBookPicked(book: FavoriteBook) {
    if (!isEditing || pickerSlot === null) return;

    setDraft((prev) => {
      const nextBooks = [...prev.favoriteBooks];
      nextBooks[pickerSlot] = book;
      return { ...prev, favoriteBooks: nextBooks };
    });

    setPickerOpen(false);
    setPickerSlot(null);
  }

  function handleRemoveBook(index: number) {
    if (!isEditing) return;

    setDraft((prev) => {
      const nextBooks = [...prev.favoriteBooks];
      nextBooks[index] = null;
      return { ...prev, favoriteBooks: nextBooks };
    });
  }

  function handleAddGenre() {
    if (!isEditing) return;

    const cleaned = genreInput.trim().replace(/\s+/g, " ");
    if (!cleaned || draft.favoriteGenres.length >= MAX_GENRES) return;

    const exists = draft.favoriteGenres.some(
      (genre) => genre.toLowerCase() === cleaned.toLowerCase()
    );
    if (exists) return;

    setDraft((prev) => ({
      ...prev,
      favoriteGenres: [...prev.favoriteGenres, cleaned],
    }));
    setGenreInput("");
  }

  function handleRemoveGenre(index: number) {
    if (!isEditing) return;

    setDraft((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className={styles.page}>
      <div className={styles.topActions}>
        <Button type="button" variant="outline" className={styles.backLink} onClick={handleBack}>
          ← Volver
        </Button>

        {isOwnProfile && (
          <div className={styles.editActions}>
            {isEditing ? (
              <>
                <Button type="button" className={styles.editPrimaryBtn} onClick={handleSaveEditing}>
                  Guardar cambios
                </Button>
                <Button type="button" variant="outline" className={styles.editSecondaryBtn} onClick={handleCancelEditing}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button type="button" className={styles.editPrimaryBtn} onClick={handleStartEditing}>
                Editar perfil
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ── PROFILE HEADER ── */}
      <section className={styles.profileHeader}>
        <div className={styles.profileAvatarWrap}>
          <Image
            src={activeProfile.avatar}
            alt={activeProfile.name}
            width={88}
            height={88}
            className={styles.profileAvatar}
          />

          {isEditing && (
            <label className={styles.fieldLabel}>
              Foto de perfil (URL)
              <Input
                type="url"
                className={styles.fieldInput}
                value={draft.avatar}
                onChange={(e) => setDraft((prev) => ({ ...prev, avatar: e.target.value }))}
                placeholder="https://..."
              />
            </label>
          )}
        </div>

        <div className={styles.profileInfo}>
          {isEditing ? (
            <Input
              type="text"
              className={styles.nameInput}
              value={draft.name}
              onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Tu nombre"
              maxLength={64}
            />
          ) : (
            <h1 className={styles.profileName}>{activeProfile.name}</h1>
          )}

          <p className={styles.profileUsername}>{user.username}</p>

          {isEditing ? (
            <label className={styles.fieldLabel}>
              Descripcion
              <textarea
                className={styles.bioInput}
                value={draft.bio}
                onChange={(e) => setDraft((prev) => ({ ...prev, bio: e.target.value }))}
                rows={4}
                maxLength={240}
              />
            </label>
          ) : (
            <p className={styles.profileBio}>{activeProfile.bio}</p>
          )}
        </div>
      </section>

      {/* ── BODY: main + side ── */}
      <div className={styles.profileBody}>
        {/* LEFT: favorite books */}
        <div className={styles.profileMain}>
          <section className={styles.panel}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Top 4 Libros Favoritos</h2>
              {isEditing ? (
                <span className={styles.editHint}>Clic en una tarjeta para cambiar</span>
              ) : (
                filledIndices.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    className={styles.flipAllBtn}
                    onClick={handleFlipAll}
                  >
                    {allFilledFlipped ? "Ocultar todos" : "Girar todos"}
                  </Button>
                )
              )}
            </div>

            <div className={styles.favGrid}>
              {books.map((book, index) => {
                const isFlipped = (isEditing && book !== null) || (!isEditing && flipped[index] && book !== null);

                return (
                  <div
                    key={index}
                    className={`${styles.flipCard} ${isEditing ? styles.flipCardEditable : ""}`}
                    onClick={() => handleCardClick(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      isEditing
                        ? book
                          ? `Cambiar ${book.title}`
                          : "Anadir libro favorito"
                        : book
                          ? isFlipped
                            ? `Ocultar ${book.title}`
                            : `Revelar ${book.title}`
                          : "Sin libro en esta posicion"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick(index);
                      }
                    }}
                  >
                    <div className={`${styles.flipCardInner} ${isFlipped ? styles.flipped : ""}`}>
                      {/* FRONT: white card */}
                      <div className={styles.flipCardFront}>
                        {book ? (
                          <div className={styles.whiteCard}>
                            <svg
                              className={styles.whiteCardIcon}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span className={styles.whiteCardHint}>
                              {isEditing ? "Clic para cambiar" : "Clic para revelar"}
                            </span>
                          </div>
                        ) : (
                          <div className={styles.emptyCard}>
                            <span className={styles.emptyCardPlus}>+</span>
                            <span className={styles.emptyCardLabel}>Anadir libro</span>
                          </div>
                        )}
                      </div>

                      {/* BACK: ModernBookCover */}
                      <div className={styles.flipCardBack}>
                        {book && (
                          <ModernBookCover
                            coverSrc={book.cover}
                            alt={book.title}
                            title={book.title}
                            subtitle={book.author}
                            size="lg"
                            color={book.color as Parameters<typeof ModernBookCover>[0]["color"]}
                            isStatic={false}
                            showText
                          />
                        )}
                      </div>
                    </div>

                    {isEditing && book && (
                      <Button
                        type="button"
                        variant="outline"
                        className={styles.removeBookBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBook(index);
                        }}
                        aria-label={`Quitar ${book.title}`}
                      >
                        Quitar
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT: genres + clubs */}
        <div className={styles.profileSide}>
          <section className={styles.panel}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Generos Favoritos</h2>
            </div>

            {isEditing && (
              <div className={styles.genreEditor}>
                <div className={styles.genreAddRow}>
                  <Input
                    type="text"
                    className={styles.genreInput}
                    value={genreInput}
                    onChange={(e) => setGenreInput(e.target.value)}
                    placeholder="Anadir genero"
                    maxLength={32}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddGenre();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className={styles.genreAddBtn}
                    onClick={handleAddGenre}
                    disabled={!genreInput.trim() || draft.favoriteGenres.length >= MAX_GENRES}
                  >
                    Anadir
                  </Button>
                </div>
                <p className={styles.genreCounter}>{activeProfile.favoriteGenres.length}/{MAX_GENRES}</p>
              </div>
            )}

            <ul className={styles.genreList}>
              {activeProfile.favoriteGenres.map((genre, index) => (
                <li key={`${genre}-${index}`} className={styles.genreItem}>
                  <span className={styles.genreItemText}>
                    <span className={styles.genreDot} aria-hidden="true" />
                    {genre}
                  </span>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      className={styles.genreRemoveBtn}
                      onClick={() => handleRemoveGenre(index)}
                      aria-label={`Quitar genero ${genre}`}
                    >
                      Quitar
                    </Button>
                  )}
                </li>
              ))}
              {activeProfile.favoriteGenres.length === 0 && (
                <li className={styles.genreItemEmpty}>Sin generos anadidos</li>
              )}
            </ul>
          </section>

          <section className={styles.panel}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Clubs</h2>
            </div>
            <div className={styles.clubList}>
              {userClubs.map((club) => (
                <Link
                  key={club.id}
                  href={`/my-clubs/${club.id}/dashboard`}
                  className={styles.clubCard}
                >
                  <div className={styles.clubCardAccent} aria-hidden="true" />
                  <div className={styles.clubCardInfo}>
                    <span className={styles.clubCardName}>{club.name}</span>
                    <span className={styles.clubCardMeta}>
                      {club.members} miembros · {club.city}
                    </span>
                  </div>
                </Link>
              ))}
              {userClubs.length === 0 && (
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#b0bac8", textTransform: "uppercase", fontWeight: 800 }}>
                  Sin clubs
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* BOOK PICKER MODAL */}
      {pickerOpen && isEditing && (
        <BookPickerModal
          onSelect={handleBookPicked}
          onClose={() => {
            setPickerOpen(false);
            setPickerSlot(null);
          }}
          currentBooks={draft.favoriteBooks}
        />
      )}
    </div>
  );
}
