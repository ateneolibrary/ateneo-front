import { notFound } from "next/navigation";
import { clubs, getClubById } from "@/components/mock-app";
import {
  DashboardSearchBar,
  DashboardViewport,
} from "@/components/club-dashboard";
import ClubLibraryBoard from "@/components/club-library/ClubLibraryBoard";

type ClubLibraryPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return clubs.map((club) => ({ id: club.id }));
}

export default async function ClubLibraryPage({ params }: ClubLibraryPageProps) {
  const { id } = await params;
  const club = getClubById(id);

  if (!club) {
    notFound();
  }

  return (
    <DashboardViewport clubId={id} clubName={club.name} activeItem="library">
      <DashboardSearchBar />
      <ClubLibraryBoard clubId={id} readHistory={club.readHistory} wishList={club.wishList} />
    </DashboardViewport>
  );
}
