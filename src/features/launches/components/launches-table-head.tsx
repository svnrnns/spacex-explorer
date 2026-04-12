import { LAUNCHES_TABLE_ROW_GRID_CLASS } from "@/features/launches/constants/launches-table-constants";
import { cn } from "@/lib/utils";

export function LaunchesTableHead() {
  return (
    <thead>
      <tr
        className={cn(
          LAUNCHES_TABLE_ROW_GRID_CLASS,
          "border-b border-piece py-2 items-center",
        )}
      >
        <th className="font-medium text-left">#</th>
        <th className="font-medium text-left">Mission</th>
        <th className="font-medium text-left">Date (UTC)</th>
        <th className="font-medium text-left">Success</th>
        <th className="font-medium text-left">Upcoming</th>
      </tr>
    </thead>
  );
}
