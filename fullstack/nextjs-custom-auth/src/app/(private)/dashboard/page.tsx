import { getUserByTokenOrRedirect } from "@/$server/security";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

async function Dashboard({}: Props) {
  const user = (await getUserByTokenOrRedirect()) as User;
  if (!user) return redirect("/login");
  return (
    <div>
      <h1>
        Hey,
        {user.firstName}
      </h1>
    </div>
  );
}

export default Dashboard;
