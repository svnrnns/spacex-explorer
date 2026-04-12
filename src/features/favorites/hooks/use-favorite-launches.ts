"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  addFavoriteLaunch,
  getFavoriteLaunchesSnapshot,
  removeFavoriteLaunch,
  subscribeFavoriteLaunches,
  toggleFavoriteLaunch,
  type FavoriteLaunchRecord,
} from "@/features/favorites/lib/favorite-launches-storage";

const serverSnapshot: FavoriteLaunchRecord[] = [];

export function useFavoriteLaunches() {
  const favorites = useSyncExternalStore(
    subscribeFavoriteLaunches,
    getFavoriteLaunchesSnapshot,
    () => serverSnapshot,
  );

  const favoriteIdSet = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites],
  );

  const isFavorite = useCallback(
    (id: string) => favoriteIdSet.has(id),
    [favoriteIdSet],
  );

  const toggleFavorite = useCallback((launch: FavoriteLaunchRecord) => {
    return toggleFavoriteLaunch(launch);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    removeFavoriteLaunch(id);
  }, []);

  const addFavorite = useCallback((launch: FavoriteLaunchRecord) => {
    addFavoriteLaunch(launch);
  }, []);

  return {
    favorites,
    favoriteIdSet,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    addFavorite,
  };
}
