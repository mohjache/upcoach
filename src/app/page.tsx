"use client";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Suspense } from "react";
import { FallbackComponent } from "~/components/Fallback";
import { ReviewsList } from "~/components/ReviewsList";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  //   {
  //     id: "123456",
  //     reviewedBy: {
  //       userId: "1",
  //       name: "Anaru",
  //     },
  //     reviewDate: "2025-05-10T17:00:00",
  //     notes: "",
  //     status: "uploaded",
  //     previewImage:
  //       "https://3gyi2yzoja.ufs.sh/f/6MkX0sloZNbBe0j1rjWqSa8VGxmtUODwrgP2NqIvE74kFLpn",
  //   },

  //   {
  //     id: "456",
  //     reviewedBy: {
  //       userId: "1",
  //       name: "Anaru",
  //     },
  //     reviewDate: "2025-05-11T17:00:00",
  //     notes: "",
  //     status: "assigned",
  //     previewImage:
  //       "https://3gyi2yzoja.ufs.sh/f/6MkX0sloZNbBe0j1rjWqSa8VGxmtUODwrgP2NqIvE74kFLpn",
  //   },
  //   {
  //     id: "789",
  //     reviewedBy: {
  //       userId: "1",
  //       name: "Anaru",
  //     },
  //     notes:
  //       "Need better timing and active footwork after clear so you are ready for the next shot",
  //     status: "reviewed",
  //     reviewDate: "2025-05-12T17:00:00",
  //     previewImage:
  //       "https://3gyi2yzoja.ufs.sh/f/6MkX0sloZNbBe0j1rjWqSa8VGxmtUODwrgP2NqIvE74kFLpn",
  //   },
  // ];
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

export const TopNav = () => {
  return (
    <div className="flex h-16 justify-between border-b px-4">
      <div className="mr-4 flex">
        <a className="mr-6 flex items-center space-x-2" href="/">
          <span className="font-bold">upCoach</span>
        </a>
      </div>
      <div className="flex items-center justify-center">
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </Unauthenticated>
      </div>
    </div>
  );
};
