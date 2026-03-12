"use client";

import { useState } from "react";
import type { ClubMeeting } from "@/components/mock-app";
import styles from "./ClubMeetings.module.css";
import { DatePicker, TimePicker, DurationPicker } from "@/components/ui";

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
    
    // LTR transitions: Online -> Presencial || Presencial -> Ambos || Ambos -> Online
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <input
          id="evento-titulo"
          className={styles.input}
          style={{ fontSize: "1.4rem", fontWeight: 700 }}
          type="text"
          placeholder="Nombre de la reunión..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className={styles.fieldGroup} style={{ zIndex: 30 }}>
        <DatePicker value={fecha} onChange={setFecha} />
      </div>

      <div className={styles.fieldGroup} style={{ zIndex: 20 }}>
        <TimePicker value={hora} onChange={setHora} />
      </div>

      <div className={styles.fieldGroup} style={{ zIndex: 10 }}>
        <DurationPicker value={duracion} onChange={setDuracion} />
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.modalitySwitch}>
          <button type="button" className={`${styles.modalityBtn} ${modalidad === "online" ? styles.active : ""}`} onClick={() => handleModalityChange("online")}>
            <div className={styles.modalityBtnFill} data-active={modalidad === "online"} data-dir={modDir} />
            <span className={styles.modalityBtnText}>Online</span>
          </button>
          <button type="button" className={`${styles.modalityBtn} ${modalidad === "presencial" ? styles.active : ""}`} onClick={() => handleModalityChange("presencial")}>
            <div className={styles.modalityBtnFill} data-active={modalidad === "presencial"} data-dir={modDir} />
            <span className={styles.modalityBtnText}>Presencial</span>
          </button>
          <button type="button" className={`${styles.modalityBtn} ${modalidad === "ambos" ? styles.active : ""}`} onClick={() => handleModalityChange("ambos")}>
            <div className={styles.modalityBtnFill} data-active={modalidad === "ambos"} data-dir={modDir} />
            <span className={styles.modalityBtnText}>Ambos</span>
          </button>
        </div>

        <div className={styles.locationInputWrapper}>
          {(modalidad === "online" || modalidad === "ambos") && (
            <input
              className={styles.input}
              type="url"
              placeholder="Enlace de la videollamada (ej. Google Meet, Zoom)..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          )}

          {(modalidad === "presencial" || modalidad === "ambos") && (
            <>
              <input
                className={styles.input}
                type="text"
                placeholder="Dirección del lugar..."
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
              <div className={styles.mapPlaceholder}>
                [ Mapa Interactivo - Próximamente ]
              </div>
            </>
          )}
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} style={{ marginTop: "1rem" }}>
        Crear reunión
      </button>
    </form>
  );
}
