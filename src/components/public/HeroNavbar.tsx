"use client";
import React, { useState } from "react";

import { Menu, X, TrendingUp } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function HeroNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-accent border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="rounded-lg p-2">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <span className="bg-primary bg-clip-text text-2xl font-bold text-transparent">
                UpCoach
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground"
                    : "text-primary hover:text-primary/80 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/pricing")
                    ? "bg-primary text-primary-foreground"
                    : "hover:text-primary hover:bg-gray-50"
                }`}
              >
                Pricing
              </Link>
              {/* <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                About
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Contact
              </a> */}
            </div>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <a
              href="#"
              className="hover:text-primary/80 px-3 py-2 text-sm font-medium transition-colors"
            >
              Sign In
            </a>
            <a
              href="#"
              className="bg-primary text-primary-foreground transform rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Start Free Trial
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-primary/80 p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 border-t border-gray-100 bg-white px-2 pt-2 pb-3 sm:px-3">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-primary hover:text-primary/80 block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            {/* <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary/80"
            >
              Contact
            </a> */}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <a
                href="#"
                className="text-primary hover:text-primary/80 block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50"
              >
                Sign In
              </a>
              <a
                href="#"
                className="bg-primary mx-3 mt-2 block rounded-lg px-4 py-2 text-center text-base font-medium text-white"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
