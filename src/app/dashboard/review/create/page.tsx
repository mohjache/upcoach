"use client";

import { Button } from "~/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useAction, useMutation } from "convex/react";
import { api } from "~/../convex/_generated/api";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
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
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

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
      <h1 className="text-primary pb-8 text-4xl font-bold">Create Review</h1>

      <div className="w-full pb-2 md:w-128">
        <Button asChild variant="outline">
          <Link href="/dashboard" className="text-primary">
            <ArrowLeftIcon className="h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
      <div className="w-full md:w-128">
        {uploadUrl ? (
          <MuxUploader endpoint={uploadUrl} className="text-primary">
            <Button size="lg" type="button" slot="file-select">
              Upload Video
            </Button>
          </MuxUploader>
        ) : (
          <Skeleton className="text-primar h-60 w-full flex-none"></Skeleton>
        )}
      </div>
    </div>
  );
}
