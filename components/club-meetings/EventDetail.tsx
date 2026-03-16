"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ClubMeeting } from "@/components/mock-app";

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
    <div className="grid gap-4">
      <h2 className="text-lg font-black tracking-[0.01em]">{meeting.title}</h2>

      <dl className="grid gap-2 border-2 border-border bg-muted/20 p-3 text-sm">
        <div className="grid gap-1">
          <dt className="text-[0.68rem] font-black tracking-[0.08em] uppercase text-muted-foreground">Fecha</dt>
          <dd className="font-semibold">{formatDate(meeting.date, meeting.time)}</dd>
        </div>
        <div className="grid gap-1">
          <dt className="text-[0.68rem] font-black tracking-[0.08em] uppercase text-muted-foreground">Duración</dt>
          <dd className="font-semibold">{formatDuration(meeting.durationMinutes)}</dd>
        </div>
        <div className="grid gap-1">
          <dt className="text-[0.68rem] font-black tracking-[0.08em] uppercase text-muted-foreground">Lugar</dt>
          <dd className="font-semibold">
          {isUrl(meeting.location) ? (
            <a href={meeting.location} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              Unirse al enlace
            </a>
          ) : (
            meeting.location
          )}
          </dd>
        </div>
      </dl>

      <div className="grid gap-2">
        <p className="text-[0.68rem] font-black tracking-[0.08em] uppercase text-muted-foreground">Tu asistencia</p>
        <div className="grid grid-cols-3 gap-1">
          {RSVP_LABELS.map(({ status, label }) => (
            <Button
              key={status}
              type="button"
              variant={myStatus === status ? "default" : "outline"}
              size="sm"
              className="rounded-none border-2 border-border text-[0.68rem] font-black tracking-[0.08em] uppercase"
              onClick={() => handleRsvp(status)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <p className="text-[0.68rem] font-black tracking-[0.08em] uppercase text-muted-foreground">
          Asistencia · {confirmados.length} confirmados · {quizas.length} quizás · {noVan.length} no van
        </p>
        <div className="grid gap-2">
          {meeting.attendees.map((a) => (
            <div key={a.userId} className="flex items-center gap-2 border-2 border-border bg-card px-2 py-1.5">
              <Image src={a.avatar} alt={a.name} width={28} height={28} className="h-7 w-7 border-2 border-border object-cover" />
              <span className="text-sm font-semibold">{a.name}</span>
              <span className="ml-auto text-[0.68rem] font-black tracking-[0.08em] uppercase text-muted-foreground">
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
