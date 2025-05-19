"use client";

import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "./ui/button";

export const TopNav = () => {
  return (
    <div className="bg-primary text-primary-foreground flex h-16 justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <div className="mr-4 flex">
        <a className="mr-6 flex items-center space-x-2">
          <span className="font-bold">upCoach</span>
        </a>
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
