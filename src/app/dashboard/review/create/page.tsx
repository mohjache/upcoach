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
import {
  Authenticated,
  AuthLoading,
  useAction,
  useMutation,
} from "convex/react";
import { api } from "~/../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { Progress } from "~/components/ui/progress";
import MuxUploader from "@mux/mux-uploader-react";

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
  const createReview = useMutation(api.userReview.createUserReview);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchUploadUrl = async () => {
      const uploadUrl = await createUploadUrl({
        description: "",
        title: "",
      });
      setUploadUrl(uploadUrl.uploadUrl);
    };

    void fetchUploadUrl();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const xhr = new XMLHttpRequest();

    try {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          form.reset();
          setUploadProgress(0);
        } else {
          form.setError("uploadedFile", {
            message: "Upload failed. Please try again.",
          });
        }
      });

      xhr.addEventListener("error", () => {
        form.setError("uploadedFile", {
          message: "Upload failed. Please try again.",
        });
      });

      xhr.open("PUT", uploadUrl.uploadUrl);
      xhr.send(values.uploadedFile);
    } catch (error) {
      form.setError("uploadedFile", {
        message: "Upload failed. Please try again.",
      });
    }
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
        {/* <Card>
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
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Upload File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="Upload a video"
                          onChange={(e) => onChange(e.target.files?.[0])}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <Progress value={uploadProgress} />
                )}

                <Button type="submit" className="w-full cursor-pointer">
                  {uploadProgress > 0 && uploadProgress < 100
                    ? "Uploading..."
                    : "Upload Video"}
                </Button>
              </form>
            </Form> 
          </CardContent>
        </Card> */}

        {uploadUrl ? (
          <MuxUploader endpoint={uploadUrl}></MuxUploader>
        ) : (
          <Skeleton className="h-60 w-full flex-none"></Skeleton>
        )}
      </div>
    </div>
  );
}
