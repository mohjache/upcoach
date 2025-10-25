"use client";

import { UserButton, UserProfile } from "@clerk/nextjs";
import { Authenticated, AuthLoading } from "convex/react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const AuthenticatedNavBar = () => {
  return (
    <nav className="border-accent border-b px-8 py-2 pr-8">
      <div className="flex flex-row justify-between">
        <Link href="/">
          <div className="flex flex-row">
            <div className="pt-2 pr-2">
              <TrendingUp className="text-primary h-6 w-6" />
            </div>
            <span className="text-primary text-2xl font-bold">UpCoach</span>
          </div>
        </Link>
        <>
          <AuthLoading>
            <Skeleton className="h-8 w-8 rounded-full" />
          </AuthLoading>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </>
      </div>
    </nav>
  );
};

export default AuthenticatedNavBar;
