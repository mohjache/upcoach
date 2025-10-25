/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import type { Id } from "@/convex/_generated/dataModel";
import {
  Authenticated,
  AuthLoading,
  useMutation,
  useQuery,
} from "convex/react";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { api } from "~/../convex/_generated/api";
import { Button } from "~/components/ui/button";
import { Card, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Textarea } from "~/components/ui/textarea";
import MuxPlayer, { type MuxPlayerProps } from "@mux/mux-player-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const formSchema = z.object({
  comment: z.string().min(1).max(1000),
  startTime: z.number().nullable(),
});

export default function Page() {
  const params = useParams();
  const reviewId = params.id as Id<"userReviews">;
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  const playerRef = useRef(null);

  const data = useQuery(api.userReview.getUserReviewDetails, {
    reviewId,
  });
  const addComment = useMutation(api.userReview.addCommentToUserReview);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      startTime: null,
    },
  });

  const handleSkip = (skipTo: number) => {
    if (playerRef.current) {
      (playerRef.current as MuxPlayerProps).currentTime = skipTo;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addComment({
      reviewId,
      comment: values.comment,
      startTime: values.startTime ?? undefined,
    });
    form.reset();
  };

  return (
    <div className="px-8 pt-8">
      <h1 className="text-primary pb-8 text-4xl font-bold">Edit Review</h1>
      <div className="w-full pb-2 md:w-128">
        <Button variant="outline" asChild>
          <Link href="/dashboard" className="text-primary">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <AuthLoading>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Skeleton className="h-128 xl:col-span-2" />
          <Skeleton className="h-128" />
        </div>
      </AuthLoading>
      <Authenticated>
        {data && (
          <div className="grid h-full grid-cols-1 gap-4 pb-16 lg:gap-8 lg:pb-64 xl:grid-cols-3">
            <MuxPlayer
              ref={playerRef}
              playbackId={data.video.muxPlaybackId}
              style={{ aspectRatio: 16 / 9 }}
              className="xl:col-span-2"
              onTimeUpdate={(event) => {
                if ((event.target as MuxPlayerProps)?.currentTime) {
                  setCurrentTime(
                    (event.target as MuxPlayerProps)?.currentTime ?? null,
                  );
                }
              }}
            />

            <Card className="">
              <CardTitle className="px-6">Comments</CardTitle>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 pb-8"
                  >
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Add your comments here"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center">
                        <Button
                          type="button"
                          variant="secondary"
                          disabled={!currentTime}
                          onClick={() => {
                            if (typeof currentTime === "number") {
                              form.setValue(
                                "startTime",
                                Math.floor(currentTime),
                              );
                            }
                          }}
                        >
                          Clip
                        </Button>

                        {!!form.watch("startTime") && (
                          <>
                            <div className="text-muted-foreground text-sm xl:pl-2">
                              {" "}
                              {FormatToTime(Number(form.watch("startTime")))}
                            </div>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              onClick={() => form.setValue("startTime", null)}
                            >
                              <XIcon className="h-2 w-2" />
                            </Button>
                          </>
                        )}
                      </div>
                      <Button type="submit" className="">
                        Add Comment
                      </Button>
                    </div>
                  </form>
                </Form>
                {/* Comments List */}
                {data.review.comments && data.review.comments.length > 0 ? (
                  <div className="flex flex-col gap-4 pt-4">
                    {data.review.comments.map(
                      (comment: {
                        userId: string;

                        comment: string;
                        createdAt: string;
                        startTime?: number | undefined;
                        userProfilePictureUrl?: string | undefined;
                        userFullName?: string | undefined;
                      }) => (
                        <div key={comment.createdAt}>
                          <div className="flex flex-row items-center">
                            <Avatar>
                              <AvatarImage
                                src={comment.userProfilePictureUrl}
                              />
                              <AvatarFallback>
                                {comment.userFullName?.charAt(0) ?? "U"}
                              </AvatarFallback>
                            </Avatar>
                            <p className="pl-2 text-sm font-bold">
                              {comment.userFullName}
                            </p>
                          </div>
                          <p className="bg-muted/50 rounded-lg p-2 break-words whitespace-pre-line">
                            {comment.startTime && (
                              <span
                                className="cursor-pointer text-sm font-bold text-blue-700 underline"
                                onClick={() => {
                                  if (typeof comment.startTime === "number") {
                                    handleSkip(comment.startTime);
                                  }
                                }}
                              >
                                {FormatToTime(Number(comment.startTime))}{" "}
                              </span>
                            )}
                            {comment.comment}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="text-muted-foreground mt-6 text-sm">
                    No comments yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </Authenticated>
    </div>
  );
}

export const FormatToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
