"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import styles from "./ClubDashboard.module.css";

type DashboardViewportProps = {
  clubId: string;
  clubName: string;
  children: React.ReactNode;
  activeItem?: "dashboard" | "library" | "members" | "meetings";
};

export default function DashboardViewport({ clubId, clubName, children, activeItem }: DashboardViewportProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`${styles.layout} ${!sidebarOpen ? styles.layoutExpanded : ""}`}>
      {sidebarOpen ? (
        <DashboardSidebar
          clubId={clubId}
          clubName={clubName}
          onToggleSidebar={() => setSidebarOpen(false)}
          activeItem={activeItem}
        />
      ) : (
        <aside className={styles.sidebarCollapsed}>
          <button
            type="button"
            className={styles.sidebarReopenBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Mostrar navegación lateral"
          >
            ☰
          </button>
        </aside>
      )}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
