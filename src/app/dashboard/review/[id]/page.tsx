import { Suspense } from "react";
import type { DrizzleUserReviewWithVideoSelect } from "~/server/db/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { userReviews } from "~/server/db/schema";
import ReviewPage from "./_components/ReviewPage";
import ReviewLoading from "./_components/ReviewLoading";
import NotFound from "~/components/placeholders/NotFound";
import { isAllowedToViewReview } from "~/lib/isAllowedToViewReview";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import ReviewDropdown from "./_components/ReviewDropdown";

async function GetReview({ id }: { id: string }) {
  const { userId, orgId, orgPermissions } = await auth();

  const data = (await db.query.userReviews.findFirst({
    where: eq(userReviews.id, Number(id)),
    with: {
      video: true,
    },
  })) as DrizzleUserReviewWithVideoSelect | null;

  if (!data) {
    return <NotFound />;
  }

  var allowed = await isAllowedToViewReview({
    data,
    userId,
    orgId,
    orgPermissions,
  });

  if (!allowed) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<ReviewLoading />}>
      <ReviewPage data={data} />
    </Suspense>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="px-8 pt-8">
      <div className="flex w-full flex-row justify-between pb-2">
        <div className="flex">
          <Button variant="secondary" asChild>
            <Link href="/dashboard">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="flex">
          <ReviewDropdown reviewId={Number(id)} />
        </div>
      </div>

      <Suspense fallback={<ReviewLoading />}>
        <GetReview id={id} />
      </Suspense>
    </div>
  );
}
