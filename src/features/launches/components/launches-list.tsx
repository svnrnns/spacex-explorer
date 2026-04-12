import { getLaunches } from "@/features/launches/api/launches-actions";
import { parseLaunchListFilters } from "@/features/launches/api/launch-list-filters";
import { LaunchesFiltersToolbar } from "@/features/launches/components/launches-filters-toolbar";
import { LaunchesListNavProvider } from "@/features/launches/components/launches-list-nav-context";
import { LaunchesTableInfinite } from "@/features/launches/components/launches-table-infinite";
import { launchListFiltersKey } from "@/features/launches/utils/launch-list-filters-key";

export default async function LaunchesList({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawSearchParams = await searchParams;
  const filters = parseLaunchListFilters(rawSearchParams);
  const launches = await getLaunches(filters);

  return (
    <LaunchesListNavProvider>
      <div className="flex flex-col gap-4 sm:gap-2 py-12">
        <h1 className="text-2xl font-medium text-heading">Launches</h1>
        <LaunchesFiltersToolbar totalDocs={launches.totalDocs} />
        <LaunchesTableInfinite
          key={launchListFiltersKey(filters)}
          filters={filters}
          initialResult={launches}
        />
      </div>
    </LaunchesListNavProvider>
  );
}
