"use client";

import { useState } from "react";
import type { ClubMeeting } from "@/components/mock-app";
import styles from "./ClubMeetings.module.css";
import CalendarDay from "./CalendarDay";

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type MonthCalendarProps = {
  meetings: ClubMeeting[];
  isAdmin: boolean;
  onDayClick: (dateStr: string, dayMeetings: ClubMeeting[]) => void;
  onAddEvent: () => void;
};

/** Returns ISO date string "YYYY-MM-DD" for a local date */
function toISODate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Builds the grid cells for a given month/year (Mon-first week) */
function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  // Convert Sunday-first to Monday-first
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { year: number; month: number; day: number; isCurrentMonth: boolean }[] = [];

  // Fill leading cells from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ year: month === 0 ? year - 1 : year, month: month === 0 ? 11 : month - 1, day: daysInPrevMonth - i, isCurrentMonth: false });
  }

  // Fill current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ year, month, day: d, isCurrentMonth: true });
  }

  // Fill trailing cells to complete the last week
  const remainder = cells.length % 7;
  if (remainder !== 0) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let d = 1; d <= (7 - remainder); d++) {
      cells.push({ year: nextYear, month: nextMonth, day: d, isCurrentMonth: false });
    }
  }

  return cells;
}

export default function MonthCalendar({ meetings, isAdmin, onDayClick, onAddEvent }: MonthCalendarProps) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const todayStr = toISODate(now.getFullYear(), now.getMonth(), now.getDate());
  const cells = buildCalendarDays(viewYear, viewMonth);

  // Index meetings by date string
  const meetingsByDate = new Map<string, ClubMeeting[]>();
  for (const m of meetings) {
    if (!meetingsByDate.has(m.date)) meetingsByDate.set(m.date, []);
    meetingsByDate.get(m.date)!.push(m);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  return (
    <div>
      {/* Header */}
      <div className={styles.calendarHeader}>
        <button className={styles.navBtn} onClick={prevMonth} aria-label="Mes anterior">
          ←
        </button>
        <span className={styles.monthName}>
          {MESES[viewMonth]} {viewYear}
        </span>
        <button className={styles.navBtn} onClick={nextMonth} aria-label="Mes siguiente">
          →
        </button>
        {isAdmin && (
          <button className={styles.addEventBtn} onClick={onAddEvent}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="2" x2="8" y2="14" />
              <line x1="2" y1="8" x2="14" y2="8" />
            </svg>
            Nueva reunión
          </button>
        )}
      </div>

      {/* Grid */}
      <div className={styles.calendarGrid}>
        {DIAS_SEMANA.map((d) => (
          <div key={d} className={styles.weekDayLabel}>{d}</div>
        ))}
        {cells.map((cell, i) => {
          const dateStr = toISODate(cell.year, cell.month, cell.day);
          const dayMeetings = meetingsByDate.get(dateStr) ?? [];
          return (
            <CalendarDay
              key={i}
              day={cell.day}
              dateStr={dateStr}
              isCurrentMonth={cell.isCurrentMonth}
              isToday={dateStr === todayStr}
              meetings={dayMeetings}
              onClick={() => onDayClick(dateStr, dayMeetings)}
            />
          );
        })}
      </div>
    </div>
  );
}
