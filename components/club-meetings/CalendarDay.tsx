import type { ClubMeeting } from "@/components/mock-app";
import styles from "./ClubMeetings.module.css";

type CalendarDayProps = {
  day: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  meetings: ClubMeeting[];
  onClick: () => void;
};

export default function CalendarDay({ day, dateStr, isCurrentMonth, isToday, meetings, onClick }: CalendarDayProps) {
  const today = new Date().toISOString().split("T")[0];
  const isPast = dateStr < today;

  const classes = [
    styles.dayCell,
    !isCurrentMonth ? styles.otherMonth : "",
    isToday ? styles.today : "",
    meetings.length > 0 ? styles.hasEvents : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}>
      <div className={styles.dayNumber}>{day}</div>
      {meetings.length > 0 && (
        <div className={styles.eventDots}>
          {meetings.map((m) => (
            <div key={m.id} className={styles.eventDot}>
              <span className={`${styles.dotMark} ${isPast ? styles.past : ""}`} />
              <span className={styles.eventLabel}>{m.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
