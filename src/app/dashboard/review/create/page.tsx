"use client";

import { Button } from "~/components/ui/button";

import { useAction } from "convex/react";
import { api } from "~/../convex/_generated/api";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import MuxUploader from "@mux/mux-uploader-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const formSchema = z.object({
//   name: z.string().min(1).max(1000),
//   description: z.string().min(1).max(1000),
//   uploadedFile: z
//     .instanceof(File)
//     .refine((file) => file?.size <= 1024 * 1024 * 100, {
//       message: "File must be less than 100MB",
//     })
//     .refine((file) => file?.type.startsWith("video/"), {
//       message: "File must be a video",
//     }),
// });

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-8">
      <h1 className="text-primary pb-8 text-4xl font-bold">Create Review</h1>
      <FileUpload />
    </div>
  );
}

const FileUpload = () => {
  const [uploadMetadata, setUploadMetadata] = useState<{
    uploadUrl: string;
    videoId: string;
  } | null>(null);
  const createUploadUrl = useAction(api.videos.createUploadUrl);
  const router = useRouter();
  return (
    <>
      <div className="w-full pb-2 md:w-128">
        <Button asChild variant="outline">
          <Link href="/dashboard" className="text-primary">
            <ArrowLeftIcon className="h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
      <div className="w-full md:w-128">
        <MuxUploader
          // endpoint={uploadUrl}
          className="text-primary"
          endpoint={async () => {
            const uploadUrlResult = await createUploadUrl({
              description: "",
              title: "",
            });

            setUploadMetadata(uploadUrlResult);
            return uploadUrlResult.uploadUrl;
          }}
          onSuccess={(event) => {
            // Go to the review page for the newly uploaded video
            if (uploadMetadata) {
              void router.push(
                `/dashboard/review/create/${uploadMetadata.videoId}`,
              );
            }
          }}
        >
          <Button size="lg" type="button" slot="file-select">
            Upload Video
          </Button>
        </MuxUploader>
      </div>
    </>
  );
};
