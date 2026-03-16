"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClubMeeting } from "@/components/mock-app";
import MonthCalendar from "./MonthCalendar";
import EventPanel from "./EventPanel";

type MeetingsBoardProps = {
  meetings: ClubMeeting[];
  isAdmin: boolean;
  currentUserId: string;
};

export default function MeetingsBoard({ meetings, isAdmin, currentUserId }: MeetingsBoardProps) {
  const [allMeetings, setAllMeetings] = useState<ClubMeeting[]>(meetings);
  const [panelMode, setPanelMode] = useState<"create" | "view" | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<ClubMeeting | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const panelOpen = panelMode !== null;

  function handleDayClick(dateStr: string, dayMeetings: ClubMeeting[]) {
    if (dayMeetings.length > 0) {
      setSelectedMeeting(dayMeetings[0]);
      setPanelMode("view");
    }
  }

  function handleAddEvent() {
    setSelectedMeeting(null);
    setPanelMode("create");
  }

  function handleClosePanel() {
    setPanelMode(null);
    setSelectedMeeting(null);
    setSelectedDate(null);
  }

  function handleCreateMeeting(meeting: ClubMeeting) {
    setAllMeetings((prev) => [...prev, meeting]);
    setPanelMode(null);
    setSelectedMeeting(null);
  }

  function handleUpdateRsvp(meetingId: string, userId: string, status: "si" | "quizas" | "no") {
    setAllMeetings((prev) =>
      prev.map((m) => {
        if (m.id !== meetingId) return m;
        const exists = m.attendees.some((a) => a.userId === userId);
        if (exists) {
          return {
            ...m,
            attendees: m.attendees.map((a) =>
              a.userId === userId ? { ...a, status } : a
            ),
          };
        }
        return m;
      })
    );
    if (selectedMeeting?.id === meetingId) {
      setSelectedMeeting((prev) =>
        prev
          ? {
              ...prev,
              attendees: prev.attendees.map((a) =>
                a.userId === userId ? { ...a, status } : a
              ),
            }
          : prev
      );
    }
  }

  return (
    <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
      <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
        <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
          <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Calendario de reuniones</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-4">
          <MonthCalendar
            meetings={allMeetings}
            isAdmin={isAdmin}
            onDayClick={handleDayClick}
            onAddEvent={handleAddEvent}
          />
        </CardContent>
      </Card>

      <EventPanel
        isOpen={panelOpen}
        mode={panelMode}
        meeting={selectedMeeting}
        defaultDate={selectedDate}
        currentUserId={currentUserId}
        onClose={handleClosePanel}
        onCreate={handleCreateMeeting}
        onRsvp={handleUpdateRsvp}
      />
    </section>
  );
}
