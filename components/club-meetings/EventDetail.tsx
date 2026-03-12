"use client";

import { useState } from "react";
import type { ClubMeeting } from "@/components/mock-app";
import styles from "./ClubMeetings.module.css";

type RSVPStatus = "si" | "quizas" | "no";

type EventDetailProps = {
  meeting: ClubMeeting;
  currentUserId: string;
  onRsvp: (meetingId: string, userId: string, status: RSVPStatus) => void;
};

const MESES_CORTO = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

function formatDate(dateStr: string, time: string): string {
  const [year, mon, day] = dateStr.split("-").map(Number);
  const d = new Date(year, mon - 1, day);
  const dow = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][d.getDay()];
  return `${dow} ${day} de ${MESES_CORTO[mon - 1]} de ${year} · ${time}h`;
}

function formatDuration(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function isUrl(s: string): boolean {
  return /^https?:\/\//.test(s);
}

const RSVP_LABELS: { status: RSVPStatus; label: string }[] = [
  { status: "si", label: "Voy" },
  { status: "quizas", label: "No sé" },
  { status: "no", label: "No voy" },
];

export default function EventDetail({ meeting, currentUserId, onRsvp }: EventDetailProps) {
  const myAttendee = meeting.attendees.find((a) => a.userId === currentUserId);
  const [myStatus, setMyStatus] = useState<RSVPStatus | null>(myAttendee?.status ?? null);

  function handleRsvp(status: RSVPStatus) {
    setMyStatus(status);
    onRsvp(meeting.id, currentUserId, status);
  }

  const confirmados = meeting.attendees.filter((a) => a.status === "si");
  const quizas = meeting.attendees.filter((a) => a.status === "quizas");
  const noVan = meeting.attendees.filter((a) => a.status === "no");

  return (
    <div className={styles.detailBlock}>
      <h2 className={styles.detailTitle}>{meeting.title}</h2>

      <div className={styles.metaGrid}>
        {/* Fecha */}
        <span className={styles.metaIconCell}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <span className={styles.metaValue}>{formatDate(meeting.date, meeting.time)}</span>

        {/* Duración */}
        <span className={styles.metaIconCell}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
        <span className={styles.metaValue}>{formatDuration(meeting.durationMinutes)}</span>

        {/* Lugar */}
        <span className={styles.metaIconCell}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </span>
        <span className={styles.metaValue}>
          {isUrl(meeting.location) ? (
            <a href={meeting.location} target="_blank" rel="noopener noreferrer">
              Unirse al enlace
            </a>
          ) : (
            meeting.location
          )}
        </span>
      </div>

      {/* My RSVP */}
      <div>
        <p className={styles.sectionLabel}>Tu asistencia</p>
        <div className={styles.rsvpRow}>
          {RSVP_LABELS.map(({ status, label }) => (
            <button
              key={status}
              className={`${styles.rsvpBtn} ${myStatus === status ? `${styles.active} ${styles[status]}` : ""}`}
              onClick={() => handleRsvp(status)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Attendees */}
      <div>
        <p className={styles.sectionLabel}>
          Asistencia · {confirmados.length} confirmados · {quizas.length} quizás · {noVan.length} no van
        </p>
        <div className={styles.attendeeList}>
          {meeting.attendees.map((a) => (
            <div key={a.userId} className={styles.attendeeRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.avatar} alt={a.name} className={styles.attendeeAvatar} />
              <span className={styles.attendeeName}>{a.name}</span>
              <span className={`${styles.attendeeStatus} ${styles[a.userId === currentUserId && myStatus ? myStatus : a.status]}`}>
                {a.userId === currentUserId && myStatus
                  ? RSVP_LABELS.find((r) => r.status === myStatus)?.label
                  : RSVP_LABELS.find((r) => r.status === a.status)?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
