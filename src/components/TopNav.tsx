"use client";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";
export const dynamic = "force-dynamic";

export const TopNav = () => {
  return (
    <div className="bg-primary text-primary-foreground fixed top-0 right-0 left-0 z-50 flex h-16 justify-between px-4 lg:px-32">
      <div className="mr-4 flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">upCoach</span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/70 cursor-pointer rounded-lg px-6 py-3 font-semibold transition-colors">
              Sign In
            </Button>
          </SignInButton>
        </Unauthenticated>
      </div>
    </div>
  );
};
