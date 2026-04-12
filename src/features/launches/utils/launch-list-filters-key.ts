import type { LaunchListFilters } from "@/features/launches/api/launch-list-filters";

function launchListFiltersKey(filters: LaunchListFilters): string {
  return [
    filters.sort,
    filters.when,
    filters.outcome,
    filters.q ?? "",
    filters.from ?? "",
    filters.to ?? "",
  ].join("\u001f");
}

export { launchListFiltersKey };
