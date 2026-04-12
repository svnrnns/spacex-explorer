"use client";

import { Star } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { useFavoriteLaunches } from "@/features/favorites/hooks/use-favorite-launches";
import type { FavoriteLaunchRecord } from "@/features/favorites/lib/favorite-launches-storage";

type LaunchDetailFavoriteButtonProps = {
  launch: FavoriteLaunchRecord;
};

export function LaunchDetailFavoriteButton({
  launch,
}: LaunchDetailFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoriteLaunches();
  const active = isFavorite(launch.id);

  const onClick = useCallback(() => {
    toggleFavorite(launch);
  }, [launch, toggleFavorite]);

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={onClick}
      className="gap-2 flex-1"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={active ? "size-3.5 fill-info text-info" : "size-3.5"}
        aria-hidden
      />
      {active ? "Favorited" : "Favorite"}
    </Button>
  );
}
