"use client";
import { User } from "@prisma/client";
import { ThemeToggle } from "../theme-toggle";
import { UserProfileNav } from "./UserProfile";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";

import React from "react";

type Props = {
  user: User;
};

function PrivateNavbar({ user }: Props) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserProfileNav user={user} />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default PrivateNavbar;
