"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { FavoritesListSkeleton } from "@/features/favorites/components/favorites-list-skeleton";
import { formatLaunchDateUtc } from "@/features/launches/utils/launches-table-utils";
import { useFavoriteLaunches } from "@/features/favorites/hooks/use-favorite-launches";
import { cn } from "@/lib/utils";

export function FavoritesPageClient() {
  const { favorites, removeFavorite } = useFavoriteLaunches();
  const [listReady, setListReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setListReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!listReady) {
    return <FavoritesListSkeleton />;
  }

  if (favorites.length === 0) {
    return (
      <p className="text-sm text-font">
        No favorites yet. Open a launch and mark it as{" "}
        <span className="text-heading">Favorite</span>.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {favorites.map((item) => (
        <li
          key={item.id}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-box last:border-0 pb-4"
        >
          <div className="min-w-0 flex-1 flex flex-col gap-0.5">
            <Link
              href={`/launches/${item.id}`}
              prefetch={false}
              className="text-sm font-medium text-heading hover:underline truncate"
            >
              {item.name}
            </Link>
            <p className="text-xs text-font tabular-nums">
              Flight #{item.flight_number} ·{" "}
              {formatLaunchDateUtc(item.date_utc)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/launches/${item.id}`}
              prefetch={false}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "no-underline",
              )}
            >
              View
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${item.name} from favorites`}
              onClick={() => removeFavorite(item.id)}
            >
              <Trash2 className="size-4" aria-hidden />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
