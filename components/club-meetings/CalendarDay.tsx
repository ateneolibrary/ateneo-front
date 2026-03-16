import type { ClubMeeting } from "@/components/mock-app";
import { cn } from "@/lib/utils";

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

  return (
    <button
      type="button"
      className={cn(
        "min-h-[104px] border-2 border-border bg-card p-2 text-left transition-colors hover:bg-muted/20",
        !isCurrentMonth && "bg-muted/20 text-muted-foreground",
        isToday && "border-[var(--color-red-mid)]",
        meetings.length > 0 && "shadow-[3px_3px_0_var(--color-border)]"
      )}
      onClick={onClick}
    >
      <span className="text-sm font-black">{day}</span>
      {meetings.length > 0 && (
        <span className="mt-2 grid gap-1">
          {meetings.map((m) => (
            <span key={m.id} className="flex items-center gap-1 text-[0.66rem] font-semibold leading-tight">
              <span
                className={cn(
                  "h-2 w-2 rounded-full border border-border bg-[var(--color-red-mid)]",
                  isPast && "bg-muted"
                )}
              />
              <span className="line-clamp-1">{m.title}</span>
            </span>
          ))}
        </span>
      )}
    </button>
  );
}
