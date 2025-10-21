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
import { useAction, useMutation } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1).max(1000),
  description: z.string().min(1).max(1000),
  uploadedFile: z
    .instanceof(File)
    .refine((file) => file?.size <= 1024 * 1024 * 100, {
      message: "File must be less than 100MB",
    })
    .refine((file) => file?.type.startsWith("video/"), {
      message: "File must be a video",
    }),
});

export default function Page() {
  const router = useRouter();
  const createReview = useMutation(api.userReview.createUserReview);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const createUploadUrl = useAction(api.uploadedvideos.createUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      uploadedFile: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // await createReview({
    //   dto: {
    //     notes: values.notes,
    //     youtubeLink: values.youtubeLink,
    //   },
    // });

    console.log(values);
    const uploadUrl = await createUploadUrl({
      description: values.description,
      title: values.name,
    });
    console.log(uploadUrl.uploadUrl);

    // router.push("/dashboard");
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-8">
      <h1 className="pb-8 text-4xl font-bold">Create Review</h1>

      <div className="w-full pb-2 md:w-128">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeftIcon className="h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
      <div className="w-full md:w-128">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Video</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of the video" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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
                <FormField
                  control={form.control}
                  name="uploadedFile"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Upload File</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps} // Spread other field props like onBlur
                          type="file"
                          onChange={(event) => {
                            if (event.target.files) {
                              onChange(event.target.files[0]); // Pass the FileList to React Hook Form
                            }
                          }}
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
      </div>
      {/* <div className="mx-auto max-w-2xl">
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Link Your Video</CardTitle>
          <CardDescription>
            Upload a video from Youtube of your gameplay for analysis.
          </CardDescription>
        </CardHeader>
        
      </Card> */}
    </div>
  );
}
