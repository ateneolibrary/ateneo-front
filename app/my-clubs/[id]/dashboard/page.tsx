import { notFound } from "next/navigation";
import { clubs, getClubById } from "@/components/mock-app";
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
    <DashboardViewport clubName={club.name}>
        <DashboardSearchBar />

        <section className={styles.topGrid}>
          <div className={styles.mainColumn}>
            <CurrentReadPanel club={club} />
            <section className={`${styles.listPanel} ${styles.panelShell}`}>
              <span className={styles.panelBadge}>Club History</span>
              <div className={styles.historyCarousel}>
                <div className={styles.historyTrack}>
                  {[...club.readHistory.slice(0, 5), ...club.readHistory.slice(0, 5)].map((book, index) => (
                    <ReadHistoryItem
                      key={`${book.title}-${book.year}-${index}`}
                      title={book.title}
                      author={book.author}
                      year={book.year}
                      cover={book.cover}
                      rating={book.rating}
                    />
                  ))}
                </div>
              </div>
              <button className={styles.historyFullBtn} type="button">
                Ver historia completa
              </button>
            </section>

            <section className={`${styles.listPanel} ${styles.panelShell}`}>
              <span className={styles.panelBadge}>Community Readlist</span>
              <div className={styles.readlistStatic}>
                {topWishList.map((book) => (
                  <WishBookVoteItem
                    key={book.title}
                    title={book.title}
                    author={book.author}
                    cover={book.cover}
                    votes={book.votes}
                  />
                ))}
              </div>
              <button className={styles.historyFullBtn} type="button">Ver readlist completa</button>
            </section>
          </div>
          <div className={styles.sideColumn}>
            <StatsPanel club={club} />
            <section className={`${styles.listPanel} ${styles.panelShell}`}>
              <span className={styles.panelBadge}>Meetings</span>
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
            </section>
          </div>
        </section>

    </DashboardViewport>
  );
}
