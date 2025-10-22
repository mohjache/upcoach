"use client";

import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { CloudUploadIcon } from "lucide-react";
import CreateReviewButton from "~/components/Buttons/CreateReviewButton";
import { Skeleton } from "~/components/ui/skeleton";

const Page = () => {
  //const reviews = useQuery(api.userReview.getUserReviews);

  return (
    <>
      {/* <h1 className="px-8 pt-4 pb-8 text-4xl font-bold">Welcome to UpCoach</h1> */}
      <AuthLoading>
        <div className="grid grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
        </div>
      </AuthLoading>
      <Authenticated>
        <CreateReviewHero />
        {/* {reviews?.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to UpCoach</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create your first review to get started</p>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-2 xl:grid-cols-3">
            <div className="h-96 w-full flex-none bg-amber-600" />
            <div className="h-96 w-full flex-none bg-amber-600" />
          </div>
        )} */}
      </Authenticated>
    </>
  );
};

export default Page;

const CreateReviewHero = () => {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-8">
      <div className="pb-2">
        <CloudUploadIcon className="text-primary h-24 w-24" />
      </div>
      <h1 className="pb-4 text-2xl">
        Upload a video of your gameplay to be reviewed by your coach.
      </h1>
      <CreateReviewButton />
    </div>
  );
};
