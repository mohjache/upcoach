import { CheckCircle, ArrowRight } from "lucide-react";
import HeroNavbar from "~/components/public/HeroNavbar";
import PricingPage from "~/components/public/PricingPage";

export default function Page() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for small teams getting started with coaching",
      features: [
        "Up to 25 employees",
        "Basic coach matching",
        "Goal tracking",
        "Monthly progress reports",
        "Email support",
        "Mobile app access",
      ],
      buttonText: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: 79,
      description: "Ideal for growing companies serious about development",
      features: [
        "Up to 100 employees",
        "AI-powered coach matching",
        "Advanced analytics",
        "Custom goal frameworks",
        "Priority support",
        "API access",
        "Team performance insights",
        "Integrations (Slack, Teams)",
      ],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: null,
      description: "For large organizations with complex coaching needs",
      features: [
        "Unlimited employees",
        "Dedicated success manager",
        "Custom integrations",
        "Advanced security & compliance",
        "24/7 phone support",
        "Custom reporting",
        "Single sign-on (SSO)",
        "White-label options",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <>
      <HeroNavbar />
      <PricingPage />
    </>
  );
}
