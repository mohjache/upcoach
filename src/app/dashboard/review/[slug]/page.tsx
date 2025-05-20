"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { slug } = params;
  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Slug : {slug}</h1>
    </main>
  );
}
