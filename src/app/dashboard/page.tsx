"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { FallbackComponent } from "~/components/Fallback";
import { ReviewsList } from "~/components/Reviews/ReviewsList";

const Page = () => {
  return (
    <div className="px-8">
      <nav className="border-accent border-b py-2">
        <div className="flex flex-row">
          <Link href="/">
            <div className="flex flex-row">
              <div className="py-2 pr-2">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <span className="text-primary text-2xl font-bold">UpCoach</span>
            </div>
          </Link>
        </div>
      </nav>
      <div className="py-2"></div>
      <AuthLoading>
        <FallbackComponent></FallbackComponent>
      </AuthLoading>
      <Authenticated>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Welcome to UpCoach</h1>
        </div>
      </Authenticated>
    </div>
  );
};

export default Page;
