import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";
import { cn } from "~/lib/utils";

interface ReviewsListProps {
  reviews: UserReview[];
}

export type UserReview = {
  id: string;
  previewImage: string;
  reviewedBy: {
    userId: string;
    name: string;
  };
  status: "uploaded" | "assigned" | "reviewed";
  notes: string;
  reviewDate: string;
};

const statusColors = {
  uploaded: "bg-blue-100 text-blue-800",
  assigned: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-purple-100 text-purple-800",
};

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <div className="relative flex">
            <div className="absolute top-2 right-2">
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  statusColors[review.status],
                )}
              >
                {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
              </span>
            </div>
            <div className="relative ml-2 h-24 w-24">
              <Image
                src={review.previewImage}
                alt={`Review by ${review.reviewedBy.name}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <CardHeader>
                <CardTitle>Reviewed by {review.reviewedBy.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Review Date:{" "}
                  {new Date(review.reviewDate).toLocaleDateString()}
                </p>
                <p className="text-d">{review.notes}</p>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
