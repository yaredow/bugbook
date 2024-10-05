import { validateRequest } from "@/auth";
import Header from "@/components/header";
import SessionProvider from "@/components/providers/session-provider";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/signin");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
}
