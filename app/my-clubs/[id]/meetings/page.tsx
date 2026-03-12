import { notFound } from "next/navigation";
import { clubs, getClubById } from "@/components/mock-app";
import { DashboardViewport } from "@/components/club-dashboard";
import { MeetingsBoard } from "@/components/club-meetings";

type ClubMeetingsPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return clubs.map((club) => ({ id: club.id }));
}

export default async function ClubMeetingsPage({ params }: ClubMeetingsPageProps) {
  const { id } = await params;
  const club = getClubById(id);

  if (!club) {
    notFound();
  }

  const isAdmin = club.adminId === "elena-vidal"; // simular usuario admin actual

  return (
    <DashboardViewport clubId={id} clubName={club.name} activeItem="meetings">
      <MeetingsBoard
        meetings={club.meetings}
        isAdmin={isAdmin}
        currentUserId={club.adminId}
      />
    </DashboardViewport>
  );
}
