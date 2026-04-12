import { cn } from "@/lib/utils";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-piece", className)}
      aria-hidden
    />
  );
}

export function FavoritesListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <ul
      className="flex flex-col gap-4"
      aria-busy="true"
      aria-label="Loading favorites"
    >
      {Array.from({ length: rows }, (_, i) => (
        <li
          key={i}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-box last:border-0 pb-4"
        >
          <div className="min-w-0 flex-1 flex flex-col gap-2">
            <SkeletonBar className="h-4 w-[min(100%,14rem)]" />
            <SkeletonBar className="h-3 w-48" />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <SkeletonBar className="h-7 w-4.5rem rounded-md" />
            <SkeletonBar className="size-7 rounded-[min(var(--radius-md),8px)]" />
          </div>
        </li>
      ))}
    </ul>
  );
}
