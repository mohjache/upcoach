"use client";
import { Skeleton } from "./ui/skeleton";

export const FallbackComponent = () => {
  return (
    <div className="flex w-full flex-col space-y-2 px-8 md:w-128">
      <Skeleton className="h-16" />
    </div>
  );
};
