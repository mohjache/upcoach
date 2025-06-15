"use client";
import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: 2,
      descripton: "Perfect for small teams getting started with coaching",
      features: [
        "Up to 5 students and 5 employees",
        "Goal tracking for students",
        "Basic Reports on the organisation",
        "Email support",
      ],
      link: "/onboarding",
      buttonText: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: 4,
      description: "Ideal for growing companies serious about development",
      features: [
        "Unlimited employees",
        "Advanced analytics",
        "Bulk student discounts",
      ],
      link: "/onboarding",
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: null,
      description: "For large organisations with complex coaching needs",
      features: [
        "Custom integrations",
        "24/7 phone support",
        "Custom reporting",
        "White-label options",
      ],
      buttonText: "Contact Sales",
      link: "/#",
      popular: false,
    },
  ];

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-primary mb-6 text-4xl font-bold md:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Choose the perfect plan for your organization. All plans include a
            14-day free trial and can be cancelled anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-background transform rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.popular ? "color-ring relative ring-2" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                  <span className="bg-background text-foreground rounded-full px-4 py-2 text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-foreground mb-2 text-2xl font-bold">
                  {plan.name}
                </h3>
                <p className="text-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  {plan.price ? (
                    <div className="flex items-baseline">
                      <span className="text-foreground font-bold not-first:text-5xl">
                        ${plan.price}
                      </span>
                      <span className="text-foreground ml-2">
                        /month per client
                      </span>
                    </div>
                  ) : (
                    <div className="text-foreground text-3xl font-bold">
                      Custom Pricing
                    </div>
                  )}
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="text-primary mt-0.5 mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="bg-primary text-primary-foreground w-full hover:cursor-pointer"
                  size="lg"
                  asChild
                >
                  <Link href={plan.link}>
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-background rounded-2xl p-8 shadow-sm">
          <h2 className="text-primary mb-8 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-primary mb-3 text-lg font-semibold">
                Is there a setup fee?
              </h3>
              <p className="text-primary/80">
                No, there are no setup fees. You can start using UpCoach
                immediately after signing up for your free trial.
              </p>
            </div>

            <div>
              <h3 className="text-primary mb-3 text-lg font-semibold">
                Can I change plans anytime?
              </h3>
              <p className="text-primary/80">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately, and billing is prorated.
              </p>
            </div>

            <div>
              <h3 className="text-primary mb-3 text-lg font-semibold">
                What&apos;s included in the free trial?
              </h3>
              <p className="text-primary/80">
                Your 14-day free trial includes full access to all features in
                your chosen plan. No credit card required to start.
              </p>
            </div>

            <div>
              <h3 className="text-primary mb-3 text-lg font-semibold">
                Do you offer discounts for annual billing?
              </h3>
              <p className="text-primary/80">
                Yes, we offer a 20% discount when you pay annually. Contact our
                sales team for enterprise volume discounts.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-primary mb-4 text-3xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-primary/80 mb-8 text-xl">
            Join thousands of companies transforming their teams with UpCoach
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:cursor-pointer"
            size="lg"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
