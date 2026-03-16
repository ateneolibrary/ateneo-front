"use client";

import Image from "next/image";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {visibleItems.map((item, index) => {
          const selected = selectedIds.includes(item.id);
          return (
            <button
              key={`member-chip-${item.id}`}
              type="button"
              className={cn(
                "relative -ml-1 grid h-8 w-8 place-items-center overflow-hidden border-2 border-border bg-card first:ml-0",
                index === 0 && "ml-0",
                selected && "ring-2 ring-[var(--color-red-mid)]"
              )}
              onClick={() => toggleItem(item.id)}
              aria-label={`Seleccionar ${item.name}`}
            >
              {item.avatar ? (
                <Image className="h-full w-full object-cover" src={item.avatar} alt={item.name} width={32} height={32} />
              ) : (
                <span className="text-xs font-black">{item.initial ?? item.name.slice(0, 1)}</span>
              )}
            </button>
          );
        })}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-none border-2 border-border px-2 text-[0.62rem] font-black"
            aria-label="Mostrar miembros"
          >
            {hiddenCount > 0 ? `+${hiddenCount}` : "Filtro"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[290px] rounded-none border-2 border-border bg-card p-2">
          <PopoverHeader>
            <PopoverTitle className="text-[0.68rem] font-black tracking-[0.08em] uppercase">Filtrar miembros</PopoverTitle>
          </PopoverHeader>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-none border-2 border-border text-[0.62rem] font-black tracking-[0.08em] uppercase"
            onClick={toggleAll}
          >
            {selectedIds.length === items.length ? "Deseleccionar todos" : "Seleccionar todos"}
          </Button>

          <div className="grid gap-1.5">
            {orderedItems.map((item) => {
              const selected = selectedIds.includes(item.id);
              return (
                <button
                  key={`member-option-${item.id}`}
                  type="button"
                  className={cn(
                    "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-2 border-border px-2 py-1.5 text-left",
                    selected ? "bg-[var(--color-red-light)]" : "bg-card"
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  {item.avatar ? (
                    <Image className="h-8 w-8 border-2 border-border object-cover" src={item.avatar} alt={item.name} width={32} height={32} />
                  ) : (
                    <span className="grid h-8 w-8 place-items-center border-2 border-border bg-muted text-xs font-black">
                      {item.initial ?? item.name.slice(0, 1)}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{item.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{item.role}</span>
                  </span>
                  <span className="text-[0.62rem] font-black tracking-[0.08em] uppercase text-muted-foreground">
                    {selected ? "Activo" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
