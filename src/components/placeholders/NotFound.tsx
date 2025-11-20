import { AlertCircleIcon, CloudUploadIcon } from "lucide-react";
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

const NotFound = () => {
  return (
    <Empty className="flex h-[calc(100vh-15rem)] w-full flex-col items-center justify-center">
      <EmptyHeader className="flex flex-col items-center justify-center">
        <EmptyMedia variant="icon">
          <AlertCircleIcon className="text-foreground size-20" />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          The page you are looking for does not exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default NotFound;
