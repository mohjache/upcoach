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

      <div className="grid grid-cols-1 gap-4 px-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="h-96 w-full flex-none bg-amber-600" />
        <div className="h-96 w-full flex-none bg-amber-600" />
        <div className="h-96 w-full flex-none bg-amber-600" />
        <div className="h-96 w-full flex-none bg-cyan-700" />
        <div className="h-96 w-full flex-none bg-cyan-700" />
        <div className="h-96 w-full flex-none bg-cyan-700" />
        <div className="h-96 w-full flex-none bg-emerald-600" />
      </div>
      {/* <AuthLoading>
        <div className="flex flex-col px-8 sm:gap-y-2 md:flex-row md:gap-x-2">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full md:w-1/3" />
          <Skeleton className="h-96 w-full md:w-1/3" />
          <Skeleton className="h-96 w-full md:w-1/3" />
        </div>
      </AuthLoading>
      <Authenticated>
        <div className="flex flex-col px-8 sm:gap-y-2 md:flex-row md:gap-x-2">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full md:w-1/3" />
          <Skeleton className="h-96 w-full md:w-1/3" />
          <Skeleton className="h-96 w-full md:w-1/3" />
        </div>
      </Authenticated> */}
      <div className="py-8"></div>
    </>
  );
};

export default Page;
