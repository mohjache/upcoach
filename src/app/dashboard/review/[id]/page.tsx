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
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { api } from "~/../convex/_generated/api";
import { Button } from "~/components/ui/button";
import { Card, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Textarea } from "~/components/ui/textarea";
import MuxPlayer from "@mux/mux-player-react";
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

const formSchema = z.object({
  comment: z.string().max(1000),
});

export default function Page() {
  const params = useParams();
  const reviewId = params.id as Id<"userReviews">;

  const data = useQuery(api.userReview.getUserReviewDetails, {
    reviewId,
  });

  const addComment = useMutation(api.userReview.addCommentToUserReview);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await addComment({
      reviewId,
      comment: values.comment,
    });
  };

  return (
    <div className="px-8 pt-8">
      <h1 className="text-primary pb-8 text-4xl font-bold">Update Review</h1>
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
          <div className="grid h-full grid-cols-1 gap-4 pb-8 xl:grid-cols-3">
            <MuxPlayer
              playbackId={data.video.muxPlaybackId}
              style={{ aspectRatio: 16 / 9 }}
              className="xl:col-span-2"
            />

            <Card className="">
              <CardTitle className="px-6">Comments</CardTitle>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
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

                    <Button type="submit" className="">
                      Add Comment
                    </Button>
                  </form>
                </Form>
                {/* Comments List */}
                {data.review.comments && data.review.comments.length > 0 ? (
                  <div className="mt-6 flex flex-col gap-4">
                    {data.review.comments.map(
                      (comment: {
                        userId: string;
                        userRole: string;
                        comment: string;
                        createdAt: string;
                      }) => (
                        <div
                          key={comment.createdAt}
                          className="bg-muted/50 flex items-start gap-4 rounded-lg p-4"
                        >
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex items-center gap-2">
                              {comment.userRole === "org:student" ? (
                                <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-bold text-white">
                                  Student
                                </span>
                              ) : (
                                <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
                                  Coach
                                </span>
                              )}
                            </div>
                            <div className="text-foreground text-sm">
                              {comment.comment}
                            </div>
                          </div>
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
