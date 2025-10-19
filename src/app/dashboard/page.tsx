"use client";

import { Authenticated, AuthLoading } from "convex/react";
import NavBar from "~/components/Public/Navbar";
import { Skeleton } from "~/components/ui/skeleton";

const Page = () => {
  return (
    <>
      <NavBar />
      <h1 className="p-4 px-8 text-4xl font-extrabold">Welcome to UpCoach</h1>
      <AuthLoading>
        <div className="grid grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
        </div>
      </AuthLoading>
      <Authenticated>
        <div className="grid grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-2 xl:grid-cols-3">
          <div className="h-96 w-full flex-none bg-amber-600" />
          <div className="h-96 w-full flex-none bg-amber-600" />
          {/* <div className="h-96 w-full flex-none bg-amber-600" />
          <div className="h-96 w-full flex-none bg-amber-600" />
          <div className="h-96 w-full flex-none bg-cyan-700" />
          <div className="h-96 w-full flex-none bg-cyan-700" />
          <div className="h-96 w-full flex-none bg-cyan-700" />
          <div className="h-96 w-full flex-none bg-emerald-600" /> */}
        </div>
      </Authenticated>
    </>
  );
};

export default Page;
