export type FavoriteLaunchRecord = {
  id: string;
  name: string;
  flight_number: number;
  date_utc: string;
};

export const FAVORITE_LAUNCHES_STORAGE_KEY =
  "spacex-explorer:favorite-launches";

const CHANGE_EVENT = "spacex-explorer:favorite-launches-changed";

/** Stable empty list so `useSyncExternalStore` getSnapshot keeps referential equality. */
const EMPTY_FAVORITES: FavoriteLaunchRecord[] = [];

let cachedSnapshotRaw: string | null | undefined;
let cachedSnapshotList: FavoriteLaunchRecord[] = EMPTY_FAVORITES;

function parseStored(raw: string | null): FavoriteLaunchRecord[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    const out: FavoriteLaunchRecord[] = [];
    const seen = new Set<string>();
    for (const item of data) {
      if (
        typeof item !== "object" ||
        item === null ||
        typeof (item as FavoriteLaunchRecord).id !== "string" ||
        typeof (item as FavoriteLaunchRecord).name !== "string" ||
        typeof (item as FavoriteLaunchRecord).flight_number !== "number" ||
        typeof (item as FavoriteLaunchRecord).date_utc !== "string"
      ) {
        continue;
      }
      const rec = item as FavoriteLaunchRecord;
      if (seen.has(rec.id)) continue;
      seen.add(rec.id);
      out.push(rec);
    }
    return out;
  } catch {
    return [];
  }
}

function emitChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

/**
 * Snapshot for `useSyncExternalStore`: returns the same array reference until
 * localStorage content for this key changes (React requires stable getSnapshot).
 */
export function getFavoriteLaunchesSnapshot(): FavoriteLaunchRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(FAVORITE_LAUNCHES_STORAGE_KEY);
  if (raw === cachedSnapshotRaw) {
    return cachedSnapshotList;
  }
  cachedSnapshotRaw = raw;
  const parsed = parseStored(raw);
  cachedSnapshotList =
    parsed.length === 0 ? EMPTY_FAVORITES : parsed;
  return cachedSnapshotList;
}

export function readFavoriteLaunches(): FavoriteLaunchRecord[] {
  return getFavoriteLaunchesSnapshot();
}

export function setFavoriteLaunches(items: FavoriteLaunchRecord[]): void {
  if (typeof window === "undefined") return;
  const json = JSON.stringify(items);
  localStorage.setItem(FAVORITE_LAUNCHES_STORAGE_KEY, json);
  cachedSnapshotRaw = json;
  cachedSnapshotList =
    items.length === 0 ? EMPTY_FAVORITES : [...items];
  emitChange();
}

export function subscribeFavoriteLaunches(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (
      e.key === FAVORITE_LAUNCHES_STORAGE_KEY ||
      e.key === null
    ) {
      onStoreChange();
    }
  };
  const onCustom = () => onStoreChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onCustom);
  };
}

export function addFavoriteLaunch(launch: FavoriteLaunchRecord): void {
  const current = readFavoriteLaunches();
  const without = current.filter((x) => x.id !== launch.id);
  setFavoriteLaunches([launch, ...without]);
}

export function removeFavoriteLaunch(id: string): void {
  setFavoriteLaunches(readFavoriteLaunches().filter((x) => x.id !== id));
}

/** Returns true if the launch is favorited after the toggle. */
export function toggleFavoriteLaunch(launch: FavoriteLaunchRecord): boolean {
  const current = readFavoriteLaunches();
  const exists = current.some((x) => x.id === launch.id);
  if (exists) {
    removeFavoriteLaunch(launch.id);
    return false;
  }
  addFavoriteLaunch(launch);
  return true;
}
