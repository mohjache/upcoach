import { db } from "~/server/db";

import { auth } from "@clerk/nextjs/server";

import { Suspense } from "react";

import { eq } from "drizzle-orm";
import { userReviews } from "~/server/db/schema";
import { StudentListView } from "./_components/StudentListView";
import type {
  DrizzleUserReviewSelect,
  DrizzleUserReviewWithVideoSelect,
} from "~/server/db/types";
import LoadingReviewList from "./_components/LoadingReviewList";

const dynamic = "force-dynamic";

async function UserReviewList() {
  const { userId } = await auth();

  const fetchedPosts = (await db.query.userReviews.findMany({
    with: {
      video: true,
    },
    where: eq(userReviews.userId, userId as string),
  })) as DrizzleUserReviewWithVideoSelect[];

  return <StudentListView reviews={fetchedPosts} />;
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingReviewList />}>
      <UserReviewList />
    </Suspense>
  );
}
