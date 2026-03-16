import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type DashboardSidebarProps = {
  clubId: string;
  clubName: string;
  onToggleSidebar: () => void;
  activeItem?: "dashboard" | "library" | "members" | "meetings";
};

export default function DashboardSidebar({ clubId, clubName, onToggleSidebar, activeItem }: DashboardSidebarProps) {
  const navItems: Array<{ key: "dashboard" | "library" | "members" | "meetings"; label: string; href: string }> = [
    { key: "dashboard", label: "Dashboard", href: `/my-clubs/${clubId}/dashboard` },
    { key: "library", label: "Library", href: `/my-clubs/${clubId}/library` },
    { key: "members", label: "Members", href: `/my-clubs/${clubId}/members` },
    { key: "meetings", label: "Reuniones", href: `/my-clubs/${clubId}/meetings` },
  ];

  return (
    <aside className="h-full border-r-4 border-border bg-card p-3 sm:p-4">
      <Card className="h-full rounded-none border-4 border-border bg-[var(--color-paper)] shadow-[8px_8px_0_var(--color-border)]">
        <CardHeader className="flex flex-row items-center gap-2 border-b-2 border-border bg-muted/40 px-3 py-3 sm:px-4">
          <Button asChild className="h-8 w-8 rounded-none border-2 border-border bg-primary p-0 text-sm font-black" size="icon">
            <Link href="/my-clubs" aria-label="Volver a Mis clubs">
              ←
            </Link>
          </Button>
          <p className="min-w-0 flex-1 text-xs font-black tracking-[0.08em] uppercase">{clubName}</p>
          <Button
            type="button"
            variant="outline"
            className="h-8 w-8 rounded-none border-2 border-border p-0 text-sm"
            onClick={onToggleSidebar}
            aria-label="Ocultar navegación lateral"
          >
            ☰
          </Button>
        </CardHeader>
        <CardContent className="grid gap-2 px-3 py-4 sm:px-4">
          {navItems.map((item) => {
            const isActive = item.key === activeItem;

            return (
              <Button
                key={item.key}
                asChild
                variant="outline"
                className={`h-11 justify-start rounded-none border-2 border-border px-3 text-xs font-black tracking-[0.08em] uppercase ${isActive ? "bg-primary text-primary-foreground" : "bg-card"}`}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </aside>
  );
}
