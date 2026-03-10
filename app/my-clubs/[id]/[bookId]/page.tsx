import { notFound } from "next/navigation";
import { clubs, getBookById, getBookRouteId, getClubById } from "@/components/mock-app";
import {
  DashboardViewport,
  DashboardSearchBar,
} from "@/components/club-dashboard";
import {
  BookHeaderPanel,
  ClubRatingPanel,
  CommunityQuotesSection,
} from "@/components/book-detail";

type BookDetailPageProps = {
  params: Promise<{ id: string; bookId: string }>;
};

export function generateStaticParams() {
  return clubs.flatMap((club) =>
    club.readHistory.map((book) => ({
      id: club.id,
      bookId: getBookRouteId(book.title),
    }))
  );
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id, bookId } = await params;
  const club = getClubById(id);

  if (!club) {
    notFound();
  }

  const book = getBookById(id, bookId);

  if (!book) {
    notFound();
  }

  return (
    <DashboardViewport clubId={id} clubName={club.name}>
      <DashboardSearchBar />

      <BookHeaderPanel book={book} clubId={id} />

      <ClubRatingPanel book={book} shareRating={club.shareRating} />

      {club.shareRating && club.shareQuotes && book.quotes.length > 0 && (
        <CommunityQuotesSection
          quotes={book.quotes}
          members={book.memberRatings}
          totalHighlights={book.totalHighlights}
        />
      )}
    </DashboardViewport>
  );
}
