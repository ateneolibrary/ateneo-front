import type { ClubMock } from "@/components/mock-app";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatsPanelProps = {
  club: ClubMock;
};

export default function StatsPanel({ club }: StatsPanelProps) {
  const stats = [
    { label: "Members", value: club.members, icon: "◉" },
    { label: "Books Read", value: club.stats.booksRead, icon: "◧" },
    { label: "Asistencia media", value: club.stats.attendance, icon: "✓" },
    { label: "Diversidad de generos", value: club.stats.genres, icon: "△" },
    { label: "Citas compartidas", value: club.stats.quotes, icon: "❝" },
  ];

  return (
    <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
      <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
        <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Club Stats</CardTitle>
      </CardHeader>
      <CardContent className="grid px-4 py-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between border-b-2 border-border/20 py-3 last:border-b-0">
            <div>
              <p className="text-[0.66rem] font-black tracking-[0.08em] text-muted-foreground uppercase">{stat.label}</p>
              <p className="text-3xl leading-none font-black">{stat.value}</p>
            </div>
            <span className="text-2xl text-primary">{stat.icon}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
