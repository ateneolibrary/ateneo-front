"use client";

import { useMemo, useState } from "react";
import styles from "./MemberPicker.module.css";

export type MemberPickerItem = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initial?: string;
};

type MemberPickerProps = {
  items: MemberPickerItem[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  maxVisible?: number;
};

export default function MemberPicker({
  items,
  selectedIds,
  onChange,
  maxVisible = 4,
}: MemberPickerProps) {
  const [open, setOpen] = useState(false);

  const orderedItems = useMemo(() => {
    const selectedOrder = new Map(selectedIds.map((id, index) => [id, index]));
    const selected = items
      .filter((item) => selectedIds.includes(item.id))
      .sort((a, b) => (selectedOrder.get(a.id) ?? 0) - (selectedOrder.get(b.id) ?? 0));
    const notSelected = items.filter((item) => !selectedIds.includes(item.id));
    return [...selected, ...notSelected];
  }, [items, selectedIds]);

  const visibleItems = orderedItems.slice(0, maxVisible);
  const hiddenCount = Math.max(items.length - maxVisible, 0);

  function toggleItem(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((currentId) => currentId !== id));
      return;
    }
    onChange([...selectedIds, id]);
  }

  function toggleAll() {
    if (selectedIds.length === items.length) {
      onChange([]);
      return;
    }
    onChange(items.map((item) => item.id));
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.stack}>
        {visibleItems.map((item) => {
          const selected = selectedIds.includes(item.id);
          return (
            <button
              key={`member-chip-${item.id}`}
              type="button"
              className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
              onClick={() => toggleItem(item.id)}
              aria-label={`Seleccionar ${item.name}`}
            >
              {item.avatar ? (
                <img className={styles.avatar} src={item.avatar} alt={item.name} />
              ) : (
                <span className={styles.fallback}>{item.initial ?? item.name.slice(0, 1)}</span>
              )}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className={styles.plus}
        aria-expanded={open}
        aria-label="Mostrar miembros"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "×" : hiddenCount > 0 ? `+${hiddenCount}` : "+"}
      </button>

      {open ? (
        <div className={styles.dropdown}>
          <div className={styles.heading}>Select a member</div>
          <button
            type="button"
            className={`${styles.bulkOption} ${selectedIds.length === items.length ? styles.bulkOptionActive : ""}`}
            onClick={toggleAll}
          >
            {selectedIds.length === items.length ? "Deseleccionar todos" : "Seleccionar todos"}
          </button>
          {orderedItems.map((item) => {
            const selected = selectedIds.includes(item.id);
            return (
              <button
                key={`member-option-${item.id}`}
                type="button"
                className={`${styles.option} ${selected ? styles.optionActive : ""}`}
                onClick={() => toggleItem(item.id)}
              >
                {item.avatar ? (
                  <img className={styles.optionAvatar} src={item.avatar} alt={item.name} />
                ) : (
                  <span className={styles.optionFallback}>{item.initial ?? item.name.slice(0, 1)}</span>
                )}
                <span className={styles.optionMeta}>
                  <span className={styles.optionName}>{item.name}</span>
                  <span className={styles.optionRole}>{item.role}</span>
                </span>
                <span className={styles.optionState}>{selected ? "Selected" : ""}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
