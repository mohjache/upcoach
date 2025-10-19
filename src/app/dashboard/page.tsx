"use client";

import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { Link } from "lucide-react";
import CreateReviewButton from "~/components/Buttons/CreateReviewButton";
import NavBar from "~/components/Public/Navbar";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/../convex/_generated/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

const Page = () => {
  const reviews = useQuery(api.userReview.getUserReviews);

  return (
    <>
      <h1 className="px-8 pt-4 pb-8 text-4xl font-extrabold">
        Welcome to UpCoach
      </h1>
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
        {/* <div className="px-8 pb-2">
          <CreateReviewButton />
        </div> */}

        <div className="w-full px-8 pb-32 md:w-128">
          <Card className="">
            <CardTitle className="px-4 font-semibold">Get Started</CardTitle>
            <CardContent className="px-4">
              <p>
                Upload a video of your gameplay to be reviewed by your coach.
              </p>
            </CardContent>
            <CardFooter className=" px-4">
              <CreateReviewButton />
            </CardFooter>
          </Card>
        </div>
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
