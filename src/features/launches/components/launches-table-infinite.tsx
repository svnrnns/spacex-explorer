"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { loadMoreLaunches } from "@/features/launches/api/launches-actions";
import type { LaunchListFilters } from "@/features/launches/api/launch-list-filters";
import { LaunchesTableHead } from "@/features/launches/components/launches-table-head";
import { useLaunchesListNav } from "@/features/launches/components/launches-list-nav-context";
import { LaunchesTableNoResults } from "@/features/launches/components/launches-table-no-results";
import { useFavoriteLaunches } from "@/features/favorites/hooks/use-favorite-launches";
import { LaunchesTableRows } from "@/features/launches/components/launches-table-rows";
import {
  LaunchesTableSkeletonRows,
} from "@/features/launches/components/launches-table-skeleton";
import type {
  LaunchQueryDoc,
  LaunchQueryPaginatedResponse,
} from "@/lib/api/types/launch-query";

type LaunchesTableInfiniteProps = {
  filters: LaunchListFilters;
  initialResult: LaunchQueryPaginatedResponse;
};

const LOAD_MORE_SKELETON_ROWS = 4;
const FILTER_PENDING_SKELETON_ROWS = 10;

export function LaunchesTableInfinite({
  filters,
  initialResult,
}: LaunchesTableInfiniteProps) {
  const { isPending: isFilterNavPending } = useLaunchesListNav();
  const { favoriteIdSet } = useFavoriteLaunches();
  const [docs, setDocs] = useState<LaunchQueryDoc[]>(initialResult.docs);
  const [hasNextPage, setHasNextPage] = useState(initialResult.hasNextPage);
  const [nextOffset, setNextOffset] = useState(
    initialResult.offset + initialResult.docs.length,
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    try {
      const page = await loadMoreLaunches(filters, nextOffset);
      setDocs((prev) => {
        const seen = new Set(prev.map((d) => d.id));
        const merged = [...prev];
        for (const doc of page.docs) {
          if (!seen.has(doc.id)) {
            seen.add(doc.id);
            merged.push(doc);
          }
        }
        return merged;
      });
      setHasNextPage(page.hasNextPage);
      setNextOffset(page.offset + page.docs.length);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [filters, hasNextPage, nextOffset]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || isFilterNavPending || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) void fetchNextPage();
      },
      { root: null, rootMargin: "240px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFilterNavPending]);

  const showFilterSkeleton = isFilterNavPending;
  const showNoResults =
    !showFilterSkeleton && docs.length === 0 && !loadingMore;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-xl text-left text-sm">
          <LaunchesTableHead />
          <tbody>
            {showFilterSkeleton && (
              <LaunchesTableSkeletonRows rows={FILTER_PENDING_SKELETON_ROWS} />
            )}
            {showNoResults && <LaunchesTableNoResults />}
            {!showFilterSkeleton && docs.length > 0 && (
              <LaunchesTableRows docs={docs} favoriteIds={favoriteIdSet} />
            )}
            {!showFilterSkeleton && loadingMore && (
              <LaunchesTableSkeletonRows rows={LOAD_MORE_SKELETON_ROWS} />
            )}
            {!showFilterSkeleton && hasNextPage && (
              <tr aria-hidden className="border-0">
                <td className="p-0">
                  <div ref={sentinelRef} className="h-px w-full" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
