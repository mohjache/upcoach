"use client";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";

export default function Page() {
  const params = useParams();
  const videoId = params.videoId as unknown as Id<"videos">;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const videoMetadata = useQuery(api.videomutations.getVideo, {
    videoId,
  });

  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-8">
      <h1 className="text-primary pb-8 text-4xl font-bold">Create Reivew</h1>
      <div className="w-full pb-2 md:w-128">
        <Button variant="outline" asChild>
          <Link href="/dashboard" className="text-primary">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <Card className="w-full md:w-128">
        <CardTitle className="px-8">Finalise Video Review Details</CardTitle>
        <CardContent>
          <Textarea placeholder="Add your notes here" />
        </CardContent>
        <CardFooter>
          <Button size="lg">Create Review</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
