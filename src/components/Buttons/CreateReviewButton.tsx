import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

const CreateReviewButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      className="text-primary/80 mb-2 cursor-pointer rounded-lg bg-green-300 px-6 py-3 font-semibold transition-colors hover:bg-green-300/70"
      asChild
    >
      <Link
        href="/dashboard/review/create"
        className="flex items-center gap-2"
        onClick={() => setIsLoading(true)}
      >
        {isLoading ? (
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        ) : (
          "Create Review"
        )}
      </Link>
    </Button>
  );
};

export default CreateReviewButton;
