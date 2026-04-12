import {
  LaunchesPageSkeleton,
  LaunchesToolbarSkeleton,
} from "@/features/launches/components/launches-table-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 sm:gap-2 py-12">
      <div className="h-8 w-40 max-w-full animate-pulse rounded-md bg-piece" />
      <LaunchesToolbarSkeleton />
      <LaunchesPageSkeleton tableBodyRows={12} />
    </div>
  );
}
