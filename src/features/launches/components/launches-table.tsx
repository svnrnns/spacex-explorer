import { LaunchesTableHead } from "@/features/launches/components/launches-table-head";
import { LaunchesTableNoResults } from "@/features/launches/components/launches-table-no-results";
import { LaunchesTableRows } from "@/features/launches/components/launches-table-rows";
import type { LaunchQueryPaginatedResponse } from "@/lib/api/types/launch-query";

type LaunchesTableProps = {
  result: Pick<LaunchQueryPaginatedResponse, "docs" | "totalDocs">;
};

export function LaunchesTable({ result }: LaunchesTableProps) {
  const { docs } = result;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-xl text-left text-sm">
          <LaunchesTableHead />
          <tbody>
            {docs.length === 0 && <LaunchesTableNoResults />}
            {docs.length > 0 && <LaunchesTableRows docs={docs} />}
          </tbody>
        </table>
      </div>
    </div>
  );
}
