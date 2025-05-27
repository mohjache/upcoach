"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <div className="bg-primary text-primary-foreground fixed top-0 right-0 left-0 z-50 flex h-16 justify-between px-4 lg:px-32">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">upCoach</span>
          </Link>
        </div>
        <div className="flex items-center justify-center"></div>
      </div>

      <div className="bg-primary text-primary-foreground flex min-h-screen flex-col items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            Elevate Your Badminton Game
          </h1>
          <p className="mb-8 text-lg sm:text-xl">
            Through world-class remote coaching
          </p>

          <Button
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/70 cursor-pointer rounded-lg px-6 py-3 font-semibold transition-colors"
            onClick={() => router.push("/dashboard")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
