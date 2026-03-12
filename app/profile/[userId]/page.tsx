import { notFound } from "next/navigation";
import { mockUsers, getUserById, getClubById } from "@/components/mock-app";
import ProfileBoard from "@/components/profile/ProfileBoard";
import type { ClubMock } from "@/components/mock-app";

type ProfilePageProps = {
  params: Promise<{ userId: string }>;
};

export function generateStaticParams() {
  return mockUsers.map((user) => ({ userId: user.id }));
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  const user = getUserById(userId);

  if (!user) {
    notFound();
  }

  const userClubs = user.clubIds
    .map((id) => getClubById(id))
    .filter((c): c is ClubMock => c !== undefined);

  return <ProfileBoard user={user} userClubs={userClubs} />;
}
