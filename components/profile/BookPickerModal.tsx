"use client";

import { useState } from "react";
import Image from "next/image";
import type { FavoriteBook } from "@/components/mock-app";
import { getAllCatalogBooks } from "@/components/mock-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./Profile.module.css";

type BookPickerModalProps = {
  onSelect: (book: FavoriteBook) => void;
  onClose: () => void;
  currentBooks: (FavoriteBook | null)[];
};

export default function BookPickerModal({ onSelect, onClose, currentBooks }: BookPickerModalProps) {
  const [query, setQuery] = useState("");
  const catalog = getAllCatalogBooks();
  const selectedIds = new Set(currentBooks.filter(Boolean).map((b) => b!.id));

  const filtered = query.trim()
    ? catalog.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase())
      )
    : catalog;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.pickerModal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.pickerHead}>
          <h3 className={styles.pickerTitle}>Elige un libro favorito</h3>
          <Button type="button" variant="outline" className={styles.pickerClose} onClick={onClose} aria-label="Cerrar">
            ✕
          </Button>
        </div>

        {/* Search */}
        <div className={styles.pickerSearch}>
          <svg
            className={styles.pickerSearchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <Input
            type="search"
            className={styles.pickerSearchInput}
            placeholder="Buscar por título o autor…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Book list */}
        <ul className={styles.pickerList} role="listbox" aria-label="Catálogo de libros">
          {filtered.length === 0 && (
            <li className={styles.pickerEmpty}>
              Sin resultados para &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((book) => {
            const isPicked = selectedIds.has(book.id);
            return (
              <li key={book.id} role="option" aria-selected={isPicked}>
                <Button
                  type="button"
                  variant="outline"
                  className={`${styles.pickerItem} ${isPicked ? styles.pickerItemPicked : ""}`}
                  onClick={() => !isPicked && onSelect(book)}
                  disabled={isPicked}
                  aria-disabled={isPicked}
                >
                  <Image
                    src={book.cover}
                    alt={`Portada de ${book.title}`}
                    className={styles.pickerItemCover}
                    width={44}
                    height={58}
                  />
                  <div className={styles.pickerItemInfo}>
                    <span className={styles.pickerItemTitle}>{book.title}</span>
                    <span className={styles.pickerItemAuthor}>{book.author}</span>
                  </div>
                  {isPicked && <span className={styles.pickerItemTag}>Ya añadido</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
