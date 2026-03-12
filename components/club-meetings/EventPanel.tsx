"use client";

import type { ClubMeeting } from "@/components/mock-app";
import styles from "./ClubMeetings.module.css";
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
  const panelClasses = `${styles.panel} ${isOpen ? styles.panelVisible : ""}`;
  const title = mode === "create" ? "Nueva reunión" : "Detalle de la reunión";

  return (
    <aside className={panelClasses} aria-label={title} role="complementary">
      <div className={styles.panelHeader}>
        {mode === "create" ? (
          <span className={`${styles.panelTitle} ${styles.panelTitleRed}`}>{title}</span>
        ) : (
          <span className={styles.panelTitle}>{title}</span>
        )}
        <button className={styles.panelCloseBtn} onClick={onClose} aria-label="Cerrar panel">
          ✕
        </button>
      </div>
      <div className={styles.panelBody}>
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
      </div>
    </aside>
  );
}
