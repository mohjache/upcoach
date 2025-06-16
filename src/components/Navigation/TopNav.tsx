"use client";
import { UserButton, SignInButton, OrganizationProfile } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";
import { Building } from "lucide-react";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

export const TopNav = () => {
  return (
    <div className="bg-background text-primary fixed top-0 right-0 left-0 z-50 flex h-16 justify-between px-4 lg:px-32">
      <div className="mr-4 flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">upCoach</span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Authenticated>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Manage Organisation"
                labelIcon={<Building size={16} />}
                href="/dashboard/manage-organisation"
              />
            </UserButton.MenuItems>
          </UserButton>
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
