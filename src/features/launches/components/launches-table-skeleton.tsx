import type { ComponentProps } from "react";

import { LaunchesTableHead } from "@/features/launches/components/launches-table-head";
import { LAUNCHES_TABLE_ROW_GRID_CLASS } from "@/features/launches/constants/launches-table-constants";
import { cn } from "@/lib/utils";

function SkeletonCell({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-piece", className)}
      {...props}
    />
  );
}

export function LaunchesTableSkeletonRows({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i} className="border-b border-box last:border-0">
          <td className="p-0 align-middle">
            <div
              className={cn(
                LAUNCHES_TABLE_ROW_GRID_CLASS,
                "py-2.5 items-center",
              )}
            >
              <SkeletonCell className="h-4 w-10" />
              <SkeletonCell className="h-4 min-w-0 flex-1 max-w-full" />
              <SkeletonCell className="h-4 w-28 shrink-0" />
              <SkeletonCell className="h-5 w-14 rounded-sm" />
              <SkeletonCell className="h-5 w-10 rounded-sm" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export function LaunchesToolbarSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
      <div className="hidden sm:block h-4 w-36 animate-pulse rounded-md bg-piece" />
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
        <div className="h-8 w-full max-w-96 animate-pulse rounded-lg bg-piece" />
        <div className="h-8 w-5.5rem shrink-0 animate-pulse rounded-lg bg-piece" />
      </div>
    </div>
  );
}

export function LaunchesPageSkeleton({
  tableBodyRows = 12,
}: {
  tableBodyRows?: number;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-xl text-left text-sm">
          <LaunchesTableHead />
          <tbody>
            <LaunchesTableSkeletonRows rows={tableBodyRows} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
