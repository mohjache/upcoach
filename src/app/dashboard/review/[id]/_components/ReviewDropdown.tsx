"use client";

import { useRouter } from "next/navigation";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { removeUserReview } from "~/server/api/userreviews/actions";

export default function ReviewDropdown({ reviewId }: { reviewId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    await removeUserReview(reviewId);
    router.push("/dashboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          variant="destructive"
          onClick={handleDelete}
          className="cursor-pointer"
        >
          <TrashIcon className="h-4 w-4" />
          Delete Review
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
