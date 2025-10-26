"use client";

import { OrganizationSwitcher, UserButton, UserProfile } from "@clerk/nextjs";
import { Authenticated, AuthLoading } from "convex/react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const AuthenticatedNavBar = () => {
  return (
    <nav className="border-accent border-b py-2 pr-8 pl-6">
      <div className="flex flex-row justify-between">
        <Link href="/">
          <div className="flex flex-row items-center gap-2 p-2">
            <div className="">
              <TrendingUp className="text-primary h-6 w-6" />
            </div>
            <span className="text-primary text-2xl font-bold">UpCoach</span>
          </div>
        </Link>
        <>
          <AuthLoading>
            <div className="flex flex-row gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </AuthLoading>
          <Authenticated>
            <div className="flex flex-row gap-2">
              <OrganizationSwitcher
                hidePersonal={true}
                appearance={{
                  elements: {
                    organizationSwitcherTrigger__organization:
                      "max-w-24 md:max-w-48 overflow-hidden",
                  },
                }}
              />
              <UserButton />
            </div>
          </Authenticated>
        </>
      </div>
    </nav>
  );
};

export default AuthenticatedNavBar;
