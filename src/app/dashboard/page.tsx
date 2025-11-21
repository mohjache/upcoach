import { db } from "~/server/db";

import { auth } from "@clerk/nextjs/server";

import { Suspense } from "react";

import { eq } from "drizzle-orm";
import { userReviews } from "~/server/db/schema";
import { StudentListView } from "./_components/StudentListView";
import LoadingReviewList from "./_components/LoadingReviewList";
import { redirect } from "next/navigation";

const dynamic = "force-dynamic";

async function UserReviewList() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  try {
    const fetchedPosts = await db.query.userReviews.findMany({
      with: {
        video: true,
      },
      where: eq(userReviews.userId, userId),
    });

    return <StudentListView reviews={fetchedPosts ?? []} />;
  } catch {
    return <StudentListView reviews={[]} />;
  }
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingReviewList />}>
      <UserReviewList />
    </Suspense>
  );
}
