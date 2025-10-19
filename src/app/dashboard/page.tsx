"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { FallbackComponent } from "~/components/Fallback";
import { ReviewsList } from "~/components/Reviews/ReviewsList";
import { Skeleton } from "~/components/ui/skeleton";

const Page = () => {
  return (
    <>
      <nav className="border-accent border-b px-8 py-2">
        <div className="flex-rowpx-8 flex">
          <Link href="/">
            <div className="flex flex-row">
              <div className="py-2 pr-2">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <span className="text-primary text-2xl font-bold">UpCoach</span>
            </div>
          </Link>
        </div>
      </nav>
      <div className="py-4"></div>
      <h1 className="px-8 text-4xl font-bold">Welcome to UpCoach</h1>
      <div className="py-2"></div>
      <AuthLoading>
        <div className="flex  flex-row gap-x-2 px-8">
          <Skeleton className="h-96 w-256" />
          <Skeleton className="h-96 w-256" />
          <Skeleton className="h-96 w-256" />
        </div>
      </AuthLoading>
      <Authenticated>
        <div className="flex flex-row gap-x-2 px-8">
          <div className="bg-primary h-96 w-256"></div>
          <div className="bg-primary h-96 w-256"></div>
          <div className="bg-primary h-96 w-256"></div>
        </div>
      </Authenticated>
    </>
  );
};

export default Page;
