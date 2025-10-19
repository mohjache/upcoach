import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <>
      <nav className="border-accent border-b px-8 py-2">
        <div className="flex-rowpx-8 flex">
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
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center px-8">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-center text-4xl font-extrabold">
              Transform Your Coaching Business with Data-Driven Insights
            </h1>
            <div className="py-2"></div>
            <p className="text-foreground text-lg">
              Unlock the power of analytics to understand your students better
              and stay ahead of the competition. Make informed decisions that
              drive growth and success.
            </p>

            <div className="py-4"></div>
            <Button size="lg" asChild>
              <a href="/dashboard">Sign in</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
