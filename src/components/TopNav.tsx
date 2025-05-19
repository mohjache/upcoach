"use client";

import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "./ui/button";

export const TopNav = () => {
  return (
    <div className="flex h-16 justify-between border-b px-4">
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
            <Button className="cursor-pointer">Sign In</Button>
          </SignInButton>
        </Unauthenticated>
      </div>
    </div>
  );
};
