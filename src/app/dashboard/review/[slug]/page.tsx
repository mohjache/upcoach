"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="container mx-auto pt-24 pb-8">
      <h1 className="text-primary-foreground mb-8 text-center text-3xl font-bold">
        Slug : {slug}
      </h1>
    </main>
  );
}
