import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

const CreateReviewButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button asChild size="lg" className="w-full md:w-128">
      <Link
        href="/dashboard/review/create"
        className="flex items-center gap-2"
        onClick={() => setIsLoading(true)}
      >
        {isLoading ? (
          <div className="border-primary-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        ) : (
          "Create Review"
        )}
      </Link>
    </Button>
  );
};

export default CreateReviewButton;
