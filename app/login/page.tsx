import { LoginAuthCard } from "@/components/auth";

type LoginPageProps = {
  searchParams?: Promise<{
    origin?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const source = resolvedSearchParams.origin;
  const origin = Array.isArray(source) ? source[0] : source;
  const cameFromLanding = Boolean(origin?.startsWith("landing-"));

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6">
      <LoginAuthCard signupHref="/create-account" showLandingAlert={cameFromLanding} />
    </main>
  );
}
