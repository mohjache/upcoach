/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Button } from "~/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import { Card, CardContent } from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";

import { Textarea } from "~/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { useRouter } from "next/navigation";

import type { Doc, Id } from "@/convex/_generated/dataModel";
import {
  ReviewPreviewImage,
  ReviewVideoThumbnail,
} from "../Reviews/ReviewPreviewImage";
import Link from "next/link";

const formSchema = z.object({
  notes: z.string().min(1).max(1000),
});
export const UpdateReviewForm = ({
  review,
}: {
  review: Doc<"userReviews">;
}) => {
  const router = useRouter();
  const updateReview = useMutation(api.userReview.updateUserReview);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: (review as { notes: string }).notes,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await updateReview({
      dto: {
        notes: values.notes,
        id: (review as { _id: Id<"userReviews"> })._id,
      },
    });

    router.push("/dashboard");
  };

  return (
    <main className="container mx-auto pb-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>
      <Card className="mx-auto max-w-2xl">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             
            
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Lorem Ipsum.."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Update Review
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};
