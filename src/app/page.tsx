"use client";

import { SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { ReviewsList } from "~/components/ReviewsList";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Authenticated>
        <main className="container mx-auto py-8">
          <h1 className="text-primary-foreground mb-8 text-center text-3xl font-bold">
            Welcome to upCoach!
          </h1>

          <div className="mx-auto max-w-2xl">
            <ReviewsList />
          </div>
        </main>
      </Authenticated>
      <Unauthenticated>
        <div className="bg-primary text-primary-foreground flex min-h-screen flex-col items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              Elevate Your Badminton Game
            </h1>
            <p className="mb-8 text-lg sm:text-xl">
              Through world-class remote coaching
            </p>
            <SignInButton>
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/70 cursor-pointer rounded-lg px-6 py-3 font-semibold transition-colors">
                Get Started
              </Button>
            </SignInButton>
          </div>
        </div>
      </Unauthenticated>
    </>
  );
}
