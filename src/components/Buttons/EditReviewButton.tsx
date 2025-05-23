import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";

const EditReviewButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button size="sm" className="cursor-pointer" asChild>
      <Link href={"/dashboard/review/" + id} onClick={() => setIsLoading(true)}>
        {isLoading ? (
          <div className="border-primary-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        ) : (
          "Edit"
        )}
      </Link>
    </Button>
  );
};

export default EditReviewButton;
