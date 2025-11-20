import { Skeleton } from "~/components/ui/skeleton";

export default function ReviewLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Skeleton className="h-128 xl:col-span-2" />
      <Skeleton className="h-128" />
    </div>
  );
}
