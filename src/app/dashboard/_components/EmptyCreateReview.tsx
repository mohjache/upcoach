import { CloudUploadIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
  EmptyDescription,
} from "~/components/ui/empty";

const CreateReviewHero = () => {
  return (
    <Empty className="flex h-[calc(100vh-15rem)] w-full flex-col items-center justify-center">
      <EmptyHeader className="flex flex-col items-center justify-center">
        <EmptyMedia variant="icon">
          <CloudUploadIcon className="text-foreground size-20" />
        </EmptyMedia>
        <EmptyTitle>Create Review</EmptyTitle>
        <EmptyDescription>
          Upload a video of your gameplay to be reviewed by your coach.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/dashboard/review/create">Create Review</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default CreateReviewHero;
