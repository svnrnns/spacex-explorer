import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LAUNCHES_TABLE_ROW_GRID_CLASS } from "@/features/launches/constants/launches-table-constants";
import {
  formatLaunchDateUtc,
  launchSuccessLabel,
} from "@/features/launches/utils/launches-table-utils";
import type { LaunchQueryDoc } from "@/lib/api/types/launch-query";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

function successBadgeVariant(success: boolean | null) {
  if (success === true) return "success" as const;
  if (success === false) return "destructive" as const;
  return "secondary" as const;
}

const EMPTY_FAVORITE_IDS = new Set<string>();

export function LaunchesTableRows({
  docs,
  favoriteIds = EMPTY_FAVORITE_IDS,
}: {
  docs: LaunchQueryDoc[];
  favoriteIds?: ReadonlySet<string>;
}) {
  return docs.map((launch) => (
    <tr key={launch.id} className="border-b border-box last:border-0">
      <td className="p-0 align-middle">
        <Link
          href={`/launches/${launch.id}`}
          prefetch={false}
          className={cn(
            LAUNCHES_TABLE_ROW_GRID_CLASS,
            "py-2.5 text-font hover:bg-box/50 w-full text-left no-underline items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/35 focus-visible:ring-offset-2 focus-visible:ring-offset-body",
          )}
        >
          <span className="tabular-nums text-heading">
            {launch.flight_number}
          </span>
          <span className="text-heading flex min-w-0 items-center gap-2">
            <span className="min-w-0 truncate">{launch.name}</span>
            {favoriteIds.has(launch.id) && (
              <Star className="size-3 shrink-0 text-info fill-info" />
            )}
          </span>
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
