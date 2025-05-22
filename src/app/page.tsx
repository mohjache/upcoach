import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  const handleRedirect = () => {
    redirect("/dashboard");
  };
  return (
    <>
      <div className="bg-primary text-primary-foreground flex min-h-screen flex-col items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            Elevate Your Badminton Game
          </h1>
          <p className="mb-8 text-lg sm:text-xl">
            Through world-class remote coaching
          </p>
          <SignedOut>
            <SignInButton>
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/70 cursor-pointer rounded-lg px-6 py-3 font-semibold transition-colors">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/70 cursor-pointer rounded-lg px-6 py-3 font-semibold transition-colors"
              onClick={() => {
                handleRedirect();
              }}
            >
              Go to Dashboard
            </Button>
          </SignedIn>
        </div>
      </div>
    </>
  );
}
