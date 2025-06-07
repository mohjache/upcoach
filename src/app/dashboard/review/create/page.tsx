"use client";

import { Button } from "~/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  youtubeLink: z.string().url().min(10).max(250),
  notes: z.string().min(1).max(1000),
});

export default function Page() {
  const router = useRouter();
  const createReview = useMutation(api.userReview.createUserReview);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeLink: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createReview({
      dto: {
        notes: values.notes,
        youtubeLink: values.youtubeLink,
      },
    });

    router.push("/dashboard");
  };

  return (
    <main className="container mx-auto pt-24 pb-8">
      <h1 className="text-primary mb-8 text-center text-3xl font-bold">
        Create Review
      </h1>

      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Link Your Video</CardTitle>
          <CardDescription>
            Upload a video from Youtube of your gameplay for analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="youtubeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube Link</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                Create Review
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
