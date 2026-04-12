import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LAUNCHES_TABLE_ROW_GRID_CLASS } from "@/features/launches/constants/launches-table-constants";
import {
  formatLaunchDateUtc,
  launchSuccessLabel,
} from "@/features/launches/utils/launches-table-utils";
import type { LaunchQueryDoc } from "@/lib/api/types/launch-query";
import { cn } from "@/lib/utils";

function successBadgeVariant(success: boolean | null) {
  if (success === true) return "success" as const;
  if (success === false) return "destructive" as const;
  return "secondary" as const;
}

export function LaunchesTableRows({ docs }: { docs: LaunchQueryDoc[] }) {
  return docs.map((launch) => (
    <tr key={launch.id} className="border-b border-box last:border-0">
      <td className="p-0 align-middle">
        <Link
          href={`/launches/${launch.id}`}
          prefetch
          className={cn(
            LAUNCHES_TABLE_ROW_GRID_CLASS,
            "py-2.5 text-font hover:bg-box/50 w-full text-left no-underline items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/35 focus-visible:ring-offset-2 focus-visible:ring-offset-body",
          )}
        >
          <span className="tabular-nums text-heading">{launch.flight_number}</span>
          <span className="text-heading min-w-0 truncate">{launch.name}</span>
          <span className="whitespace-nowrap">
            {formatLaunchDateUtc(launch.date_utc)}
          </span>
          <Badge rounded="xs" variant={successBadgeVariant(launch.success)}>
            {launchSuccessLabel(launch.success)}
          </Badge>
          {launch.upcoming && (
            <Badge rounded="xs" variant="info">
              Yes
            </Badge>
          )}
          {!launch.upcoming && (
            <Badge rounded="xs" variant="secondary">
              No
            </Badge>
          )}
        </Link>
      </td>
    </tr>
  ));
}
