"use client";

import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-primary text-4xl font-bold tracking-tight sm:text-6xl">
              Transform Your Coaching Business with Data-Driven Insights
            </h1>
            <p className="text-foreground mt-6 text-lg leading-8">
              Unlock the power of analytics to understand your students better
              and stay ahead of the competition. Make informed decisions that
              drive growth and success.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Sign in to existing account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Scale Your Coaching Business
            </h2>
            <p className="text-foreground mt-6 text-lg leading-8">
              Powerful tools and insights to help you understand your students
              and outperform your competition
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-primary text-lg leading-7 font-semibold">
                  Student Analytics
                </dt>
                <dd className="text-foreground mt-4 flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto">
                    Track student progress, engagement, and performance metrics
                    to identify areas for improvement and celebrate successes.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-primary text-lg leading-7 font-semibold">
                  Competitive Intelligence
                </dt>
                <dd className="text-foreground mt-4 flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto">
                    Stay ahead of the curve with insights into market trends,
                    competitor strategies, and industry benchmarks.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-primary text-lg leading-7 font-semibold">
                  Growth Tools
                </dt>
                <dd className="text-foreground mt-4 flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto">
                    Leverage data-driven recommendations to optimize your
                    coaching programs and drive business growth.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Coaching Business?
            </h2>
            <p className="text-foreground mt-6 text-lg leading-8">
              Join leading coaching companies who are already using UpCoach to
              drive growth and success.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-primary text-primary-foreground">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
