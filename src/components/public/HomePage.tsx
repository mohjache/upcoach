"use client";

import router from "next/router";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-primary mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
          Elevate Your Badminton Game
        </h1>
        <p className="mb-8 text-lg sm:text-xl">
          Through world-class remote coaching
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            className="bg-primary text-primary-foreground hover:cursor-pointer"
            size="lg"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {/* <button className="rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-200 hover:border-blue-600 hover:text-blue-600">
            Watch Demo
          </button> */}
        </div>
      </div>
    </div>
  );
}
