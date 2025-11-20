"use client";

import MuxUploader from "@mux/mux-uploader-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { creatUserReviewForVideoId } from "~/server/api/userreviews/actions";
import { createUploadUrl, finalizeVideo } from "~/server/api/videos/actions";

const FileUpload = () => {
  const [uploadMetadata, setUploadMetadata] = useState<{
    uploadUrl: string;
    videoId: number;
  } | null>(null);
  const [uploadKey, setUploadKey] = useState(0);

  const router = useRouter();

  // Reset state when component mounts (handles navigation back to this page)
  useEffect(() => {
    setUploadMetadata(null);
    setUploadKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <div className="w-full md:w-128">
        <MuxUploader
          key={uploadKey}
          className="text-foreground"
          endpoint={async () => {
            const uploadUrlResult = await createUploadUrl({
              description: "",
              title: "",
            });

            setUploadMetadata(uploadUrlResult);
            return uploadUrlResult.uploadUrl;
          }}
          onSuccess={async (event) => {
            // Go to the review page for the newly uploaded video
            if (uploadMetadata?.videoId) {
              await finalizeVideo(uploadMetadata.videoId);
              const userReview = await creatUserReviewForVideoId(
                uploadMetadata.videoId,
              );

              if (userReview) {
                router.push(`/dashboard/review/${userReview.id}`);
              }
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

export default FileUpload;
