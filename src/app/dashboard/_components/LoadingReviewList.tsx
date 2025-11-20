import { Skeleton } from "~/components/ui/skeleton";

const LoadingReviewList = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-8 pt-8 pb-32 lg:grid-cols-2 xl:grid-cols-3">
      <Skeleton className="h-96 w-full flex-none" />
      <Skeleton className="h-96 w-full flex-none" />
      <Skeleton className="h-96 w-full flex-none" />
      <Skeleton className="h-96 w-full flex-none" />
      <Skeleton className="h-96 w-full flex-none" />
      <Skeleton className="h-96 w-full flex-none" />
    </div>
  );
};

export default LoadingReviewList;
