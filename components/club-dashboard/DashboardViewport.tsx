"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import DashboardSidebar from "./DashboardSidebar";

type DashboardViewportProps = {
  clubId: string;
  clubName: string;
  children: React.ReactNode;
  activeItem?: "dashboard" | "library" | "members" | "meetings";
};

export default function DashboardViewport({ clubId, clubName, children, activeItem }: DashboardViewportProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncDesktopState = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsDesktop(event.matches);
      if (event.matches) {
        setSidebarOpen(true);
      }
    };

    syncDesktopState(mediaQuery);
    mediaQuery.addEventListener("change", syncDesktopState);

    return () => {
      mediaQuery.removeEventListener("change", syncDesktopState);
    };
  }, []);

  const showExpandedSidebar = isDesktop && sidebarOpen;
  const showMobileSidebarDrawer = !isDesktop && sidebarOpen;
  const layoutClassName = showExpandedSidebar
    ? "grid min-h-[calc(100vh-72px)] grid-cols-[250px_minmax(0,1fr)] overflow-x-hidden bg-[var(--color-paper)] md:grid-cols-[290px_minmax(0,1fr)]"
    : "grid min-h-[calc(100vh-72px)] grid-cols-[56px_minmax(0,1fr)] overflow-x-hidden bg-[var(--color-paper)]";

  return (
    <div className={layoutClassName}>
      {showExpandedSidebar ? (
        <DashboardSidebar
          clubId={clubId}
          clubName={clubName}
          onToggleSidebar={() => setSidebarOpen(false)}
          activeItem={activeItem}
        />
      ) : (
        <aside className="border-r-4 border-border bg-card px-2 py-3">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 rounded-none border-2 border-border p-0 text-base"
            onClick={() => setSidebarOpen(true)}
            aria-label="Mostrar navegación lateral"
          >
            ☰
          </Button>
        </aside>
      )}
      <main className="grid min-h-[calc(100vh-72px)] min-w-0 gap-4 overflow-x-hidden overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">{children}</main>
      {showMobileSidebarDrawer ? (
        <div className="fixed inset-0 z-50 bg-black/45 md:hidden">
          <div className="h-full w-[min(290px,85vw)]">
            <DashboardSidebar
              clubId={clubId}
              clubName={clubName}
              onToggleSidebar={() => setSidebarOpen(false)}
              activeItem={activeItem}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
