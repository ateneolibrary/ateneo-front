"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import styles from "./ClubDashboard.module.css";

type DashboardViewportProps = {
  clubName: string;
  children: React.ReactNode;
};

export default function DashboardViewport({ clubName, children }: DashboardViewportProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`${styles.layout} ${!sidebarOpen ? styles.layoutExpanded : ""}`}>
      {sidebarOpen ? (
        <DashboardSidebar clubName={clubName} onToggleSidebar={() => setSidebarOpen(false)} />
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
