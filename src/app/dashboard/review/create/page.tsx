"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import MuxUploader from "@mux/mux-uploader-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-8">
      <h1 className="text-foreground pb-8 text-4xl font-bold">Create Review</h1>
      {/* <div className="w-full pb-2 md:w-128">
        <Button asChild variant="secondary">
          <Link href="/dashboard">
            <ArrowLeftIcon className="h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
      <AuthLoading>
        <div className="w-full md:w-128">
          <Skeleton className="h-54 w-full flex-none" />
        </div>
      </AuthLoading>
      <Authenticated>
        <FileUpload />
      </Authenticated> */}
    </div>
  );
}

const FileUpload = () => {
  const [uploadMetadata, setUploadMetadata] = useState<{
    uploadUrl: string;
    videoId: string;
  } | null>(null);

  const router = useRouter();
  return (
    <>
      <div className="w-full md:w-128">
        <MuxUploader
          // endpoint={uploadUrl}
          className="text-foreground"
          endpoint={async () => {
            return "";
          }}
          onSuccess={async (event) => {
            // Go to the review page for the newly uploaded video
            if (uploadMetadata) {
              router.push(`/dashboard/review/${1}`);
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
