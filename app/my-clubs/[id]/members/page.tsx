import { notFound } from "next/navigation";
import { clubs, getClubById } from "@/components/mock-app";
import { DashboardViewport, DashboardSearchBar, MembersBoard } from "@/components/club-dashboard";

type ClubMembersPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return clubs.map((club) => ({ id: club.id }));
}

export default async function ClubMembersPage({ params }: ClubMembersPageProps) {
  const { id } = await params;
  const club = getClubById(id);

  if (!club) {
    notFound();
  }

  return (
    <DashboardViewport clubId={id} clubName={club.name} activeItem="members">
      <DashboardSearchBar />
      <MembersBoard
        membersList={club.membersList}
        adminId={club.adminId}
        currentUserId={club.adminId}   /* simulate being the admin */
      />
    </DashboardViewport>
  );
}
