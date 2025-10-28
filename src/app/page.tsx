import NavBar from "~/components/Public/Navbar";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
}

export const Hero = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center px-8">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-foreground pb-2 text-4xl font-bold md:text-6xl">
            Transform Your Coaching Business with Data-Driven Insights
          </h1>

          <p className="text-foreground pb-8 text-lg">
            Unlock the power of analytics to understand your students better and
            stay ahead of the competition. Make informed decisions that drive
            growth and success.
          </p>

          <Button size="lg" asChild>
            <a href="/dashboard">Sign in</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
