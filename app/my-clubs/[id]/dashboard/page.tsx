import { notFound } from "next/navigation";
import Link from "next/link";

import { clubs, getBookRouteId, getClubById } from "@/components/mock-app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CurrentReadPanel,
  DashboardViewport,
  DashboardSearchBar,
  ReadHistoryItem,
  StatsPanel,
  WishBookVoteItem,
} from "@/components/club-dashboard";
import styles from "@/components/club-dashboard/ClubDashboard.module.css";

type ClubDashboardPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return clubs.map((club) => ({ id: club.id }));
}

export default async function ClubDashboardPage({ params }: ClubDashboardPageProps) {
  const { id } = await params;
  const club = getClubById(id);

  if (!club) {
    notFound();
  }

  const topWishList = [...club.wishList]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <DashboardViewport clubId={id} clubName={club.name} activeItem="dashboard">
      <DashboardSearchBar />

      <section className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-start">
        <div className="grid gap-4">
          <CurrentReadPanel club={club} />

          <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
            <CardHeader className="flex flex-col items-start justify-between gap-3 border-b-2 border-border bg-muted/40 px-4 py-3 sm:flex-row sm:items-center">
              <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Club History</CardTitle>
              <Button asChild variant="outline" className="h-8 rounded-none border-2 border-border px-3 text-[0.62rem] font-black tracking-[0.08em] uppercase">
                <Link href={`/my-clubs/${id}/library#history`}>Ver historia completa</Link>
              </Button>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <div className={styles.historyCarousel}>
                <div className={styles.historyTrack}>
                  {[...club.readHistory.slice(0, 5), ...club.readHistory.slice(0, 5)].map((book, index) => (
                    <ReadHistoryItem
                      key={`${book.title}-${book.year}-${index}`}
                      href={`/my-clubs/${id}/${getBookRouteId(book.title)}`}
                      title={book.title}
                      author={book.author}
                      year={book.year}
                      cover={book.cover}
                      rating={book.rating}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
            <CardHeader className="flex flex-col items-start justify-between gap-3 border-b-2 border-border bg-muted/40 px-4 py-3 sm:flex-row sm:items-center">
              <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Community Readlist</CardTitle>
              <Button asChild variant="outline" className="h-8 rounded-none border-2 border-border px-3 text-[0.62rem] font-black tracking-[0.08em] uppercase">
                <Link href={`/my-clubs/${id}/library#readlist`}>Ver readlist completa</Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-2 px-4 py-3">
              {topWishList.map((book) => (
                <WishBookVoteItem
                  key={book.title}
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                  votes={book.votes}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <StatsPanel club={club} />

          <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
            <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
              <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Meetings</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-4">
              <div className={styles.meetingsList}>
                {club.upcomingEvents.slice(0, 2).map((event, index) => (
                  <article key={`${event.date}-${event.title}`} className={styles.meetingItem}>
                    <span className={`${styles.meetingDot} ${index === 0 ? styles.meetingDotActive : ""}`} />
                    <div className={styles.meetingLine} />
                    <div className={styles.meetingBody}>
                      <p className={`${styles.meetingDate} ${index === 0 ? styles.meetingDateActive : ""}`}>{event.date}</p>
                      <h4 className={styles.meetingHeading}>{event.title}</h4>
                      <p className={styles.meetingPlace}>{event.location}</p>
                    </div>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </DashboardViewport>
  );
}
