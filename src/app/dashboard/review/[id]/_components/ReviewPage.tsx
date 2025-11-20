"use client";

import { ClerkLoading, SignedIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import type { MuxPlayerProps } from "@mux/mux-player-react";
import MuxPlayer from "@mux/mux-player-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  ArrowLeftIcon,
  Loader2,
  Scissors,
  SquareScissorsIcon,
  XIcon,
} from "lucide-react";

import { useState, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardTitle, CardContent } from "~/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { cn, FormatToTime } from "~/lib/utils";
import { addCommentToUserReview } from "~/server/api/userreviews/actions";
import type { DrizzleComment } from "~/server/db/schema";
import type { DrizzleUserReviewWithVideoSelect } from "~/server/db/types";
import ReviewLoading from "./ReviewLoading";
import { useSubmit } from "~/hooks/useSubmit";

const formSchema = z.object({
  comment: z.string().min(1).max(1000),
});

const ReviewPage = ({ data }: { data: DrizzleUserReviewWithVideoSelect }) => {
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const playerRef = useRef(null);

  const { submit, isSaving } = useSubmit(addCommentToUserReview, {
    onSuccess: () => {
      setCurrentTime(null);
      form.reset();
    },
    onError: (error: Error) => {
      console.error("Failed to add comment:", error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleSkip = (skipTo: number) => {
    if (playerRef.current) {
      (playerRef.current as MuxPlayerProps).currentTime = skipTo;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submit(data.id, values.comment, currentTime ?? undefined);
  };

  return (
    <>
      <ClerkLoading>
        <ReviewLoading />
      </ClerkLoading>
      <SignedIn>
        {data.video.muxPlaybackId && (
          <div className="grid h-full grid-cols-1 gap-4 pb-16 lg:gap-8 lg:pb-64 xl:grid-cols-3">
            <MuxPlayer
              ref={playerRef}
              playbackId={data.video.muxPlaybackId}
              style={{
                aspectRatio: data.video.aspectRatio
                  ? parseInt(data.video.aspectRatio)
                  : 16 / 9,
              }}
              className="xl:col-span-2"
            />

            <Card
              className={cn(
                "xl:col-span-1",
                data.video.aspectRatio
                  ? `aspect-[${data.video.aspectRatio}]`
                  : "aspect-video",
              )}
            >
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
                          onClick={() => {
                            if (playerRef.current) {
                              const player =
                                playerRef.current as MuxPlayerProps;
                              const time = player.currentTime;

                              if (time && !isNaN(time)) {
                                console.log("time", time);
                                setCurrentTime(Math.floor(time));
                              }
                            }
                          }}
                        >
                          <Scissors className="h-2 w-2" />
                          Clip
                        </Button>

                        {currentTime && (
                          <>
                            <div className="text-muted-foreground text-sm xl:pl-2">
                              {" "}
                              {FormatToTime(Number(currentTime))}
                            </div>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              onClick={() => setCurrentTime(null)}
                            >
                              <XIcon className="h-2 w-2" />
                            </Button>
                          </>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className=""
                        disabled={isSaving || !form.formState.isValid}
                      >
                        {isSaving ? (
                          <Loader2 className="h-2 w-2 animate-spin" />
                        ) : (
                          "Add Comment"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>

                {data.comments && data.comments.length > 0 ? (
                  <div className="flex flex-col gap-4 pt-4">
                    {data.comments.map((comment: DrizzleComment) => (
                      <div key={comment.createdAt}>
                        <div className="flex flex-row items-center">
                          <Avatar>
                            <AvatarImage
                              className="h-4 w-4 rounded-full"
                              src={comment.userProfilePictureUrl}
                            />
                            <AvatarFallback className="h-4 w-4 rounded-full">
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
                    ))}
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
      </SignedIn>
    </>
  );
};

export default ReviewPage;
