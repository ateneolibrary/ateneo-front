"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker, TimePicker, DurationPicker } from "@/components/ui";
import type { ClubMeeting } from "@/components/mock-app";

type EventFormProps = {
  defaultDate?: string | null;
  onCreate: (meeting: ClubMeeting) => void;
};

type Modality = "online" | "presencial" | "ambos";
const MODALITIES: Modality[] = ["online", "presencial", "ambos"];

export default function EventForm({ defaultDate, onCreate }: EventFormProps) {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState(defaultDate ?? "");
  const [hora, setHora] = useState("19:00");
  const [duracion, setDuracion] = useState(60);
  const [modalidad, setModalidad] = useState<Modality>("presencial");
  const [modDir, setModDir] = useState<"ltr" | "rtl">("ltr");
  const [url, setUrl] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleModalityChange = (target: Modality) => {
    if (modalidad === target) return;

    const isLTR =
      (modalidad === "online" && target === "presencial") ||
      (modalidad === "presencial" && target === "ambos") ||
      (modalidad === "ambos" && target === "online");

    setModDir(isLTR ? "ltr" : "rtl");
    setModalidad(target);
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !fecha) return;

    let finalLocation = "";
    if (modalidad === "online") finalLocation = url.trim() || "Enlace pendiente";
    else if (modalidad === "presencial") finalLocation = direccion.trim() || "Por confirmar";
    else finalLocation = `${direccion.trim() || "Por confirmar"} / ${url.trim() || "Enlace pendiente"}`;

    const newMeeting: ClubMeeting = {
      id: `meeting-${Date.now()}`,
      title: titulo.trim(),
      date: fecha,
      time: hora,
      durationMinutes: duracion,
      location: finalLocation,
      attendees: [],
    };
    onCreate(newMeeting);
  }

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <div>
        <Input
          id="evento-titulo"
          className="h-10 rounded-none border-2 border-border text-lg font-bold"
          type="text"
          placeholder="Nombre de la reunión..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div style={{ zIndex: 30 }}>
        <DatePicker value={fecha} onChange={setFecha} />
      </div>

      <div style={{ zIndex: 20 }}>
        <TimePicker value={hora} onChange={setHora} />
      </div>

      <div style={{ zIndex: 10 }}>
        <DurationPicker value={duracion} onChange={setDuracion} />
      </div>

      <div className="grid gap-2">
        <div className="grid grid-cols-3 gap-1 border-2 border-border bg-muted/30 p-1">
          {MODALITIES.map((option) => (
            <Button
              key={option}
              type="button"
              variant={modalidad === option ? "default" : "outline"}
              size="sm"
              className="rounded-none border-2 border-border text-[0.68rem] font-black tracking-[0.08em] uppercase"
              onClick={() => handleModalityChange(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <div
          className="grid gap-2"
          data-direction={modDir}
        >
          {(modalidad === "online" || modalidad === "ambos") && (
            <Input
              className="h-9 rounded-none border-2 border-border"
              type="url"
              placeholder="Enlace de la videollamada (ej. Google Meet, Zoom)..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          )}

          {(modalidad === "presencial" || modalidad === "ambos") && (
            <>
              <Input
                className="h-9 rounded-none border-2 border-border"
                type="text"
                placeholder="Dirección del lugar..."
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
              <div className="border-2 border-dashed border-border bg-muted/20 p-3 text-center text-xs font-semibold tracking-[0.05em] uppercase text-muted-foreground">
                [ Mapa Interactivo - Próximamente ]
              </div>
            </>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-2 h-9 rounded-none border-2 border-border bg-primary px-4 text-[0.72rem] font-black tracking-[0.08em] uppercase">
        Crear reunión
      </Button>
    </form>
  );
}
