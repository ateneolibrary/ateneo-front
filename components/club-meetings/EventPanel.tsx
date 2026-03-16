"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClubMeeting } from "@/components/mock-app";
import EventForm from "./EventForm";
import EventDetail from "./EventDetail";

type EventPanelProps = {
  isOpen: boolean;
  mode: "create" | "view" | null;
  meeting: ClubMeeting | null;
  defaultDate?: string | null;
  currentUserId: string;
  onClose: () => void;
  onCreate: (meeting: ClubMeeting) => void;
  onRsvp: (meetingId: string, userId: string, status: "si" | "quizas" | "no") => void;
};

export default function EventPanel({
  isOpen,
  mode,
  meeting,
  defaultDate,
  currentUserId,
  onClose,
  onCreate,
  onRsvp,
}: EventPanelProps) {
  const title = mode === "create" ? "Nueva reunión" : "Detalle de la reunión";

  if (!isOpen) {
    return (
      <Card className="rounded-none border-4 border-dashed border-border bg-muted/20 shadow-none">
        <CardHeader className="border-b-2 border-border bg-muted/30 px-4 py-3">
          <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Panel de reunión</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-4 text-sm text-muted-foreground">
          Seleccioná una fecha con evento o creá una nueva reunión para ver detalles acá.
        </CardContent>
      </Card>
    );
  }

  return (
    <aside aria-label={title} role="complementary">
      <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
        <CardHeader className="flex flex-row items-center justify-between border-b-2 border-border bg-muted/40 px-4 py-3">
          <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">{title}</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-none border-2 border-border px-2"
            onClick={onClose}
            aria-label="Cerrar panel"
          >
            ✕
          </Button>
        </CardHeader>
        <CardContent className="px-4 py-4">
        {mode === "create" && (
          <EventForm defaultDate={defaultDate} onCreate={onCreate} />
        )}
        {mode === "view" && meeting && (
          <EventDetail
            meeting={meeting}
            currentUserId={currentUserId}
            onRsvp={onRsvp}
          />
        )}
        </CardContent>
      </Card>
    </aside>
  );
}
