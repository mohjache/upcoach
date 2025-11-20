import { Button } from "~/components/ui/button";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import FileUpload from "./_components/FileUpload";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-8">
      <h1 className="text-foreground pb-8 text-4xl font-bold">Create Review</h1>
      <div className="w-full pb-2 md:w-128">
        <Button asChild variant="secondary">
          <Link href="/dashboard">
            <ArrowLeftIcon className="h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <FileUpload />
      </Suspense>
    </div>
  );
}
