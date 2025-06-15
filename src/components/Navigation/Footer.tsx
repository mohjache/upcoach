"use client";

import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">upCoach</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Transform your coaching business with data-driven insights
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contact.upcoach@gmail.com"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  contact.upcoach@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-muted-foreground text-sm">Australia</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          {/* <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary"
              >
                <TrendingUp className="h-5 w-5" />
              </Link>
            </div>
          </div> */}
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} upCoach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
