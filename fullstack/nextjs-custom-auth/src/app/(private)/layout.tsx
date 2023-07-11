import { getUser } from "@/$server/security";
import PublicNavbar from "@/components/navigation/PublicNavbar";
import { User } from "@prisma/client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getUser()) as User;
  return (
    <>
      <PublicNavbar user={user} />
      {children}
    </>
  );
}
