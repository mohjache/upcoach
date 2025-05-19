"use client";
import { Authenticated } from "convex/react";
import { ReviewsList } from "~/components/ReviewsList";
import { TopNav } from "~/components/TopNav";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="container mx-auto py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Welcome to upCoach!
        </h1>
        <Authenticated>
          <div className="mx-auto max-w-2xl">
            <ReviewsList />
          </div>
        </Authenticated>
      </main>
    </>
  );
}
