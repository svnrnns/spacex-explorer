type LaunchWhenFilter = "all" | "upcoming" | "past";
type LaunchOutcomeFilter = "all" | "success" | "failure";
type LaunchSortOption = "date_desc" | "date_asc" | "name_asc" | "name_desc";

type LaunchListFilters = {
  q?: string;
  when: LaunchWhenFilter;
  outcome: LaunchOutcomeFilter;
  from?: string;
  to?: string;
  sort: LaunchSortOption;
};

const SORT_VALUES: LaunchSortOption[] = [
  "date_desc",
  "date_asc",
  "name_asc",
  "name_desc",
];

function firstString(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return undefined;
}

function parseLaunchListFilters(
  raw: Record<string, string | string[] | undefined>,
): LaunchListFilters {
  const getRawParam = (key: string) => firstString(raw[key]);

  const whenRaw = getRawParam("when");
  const when: LaunchWhenFilter =
    whenRaw === "upcoming" || whenRaw === "past" ? whenRaw : "all";

  const outcomeRaw = getRawParam("outcome");
  const outcome: LaunchOutcomeFilter =
    outcomeRaw === "success" || outcomeRaw === "failure" ? outcomeRaw : "all";

  const sortRaw = getRawParam("sort");
  const sort: LaunchSortOption = SORT_VALUES.includes(
    sortRaw as LaunchSortOption,
  )
    ? (sortRaw as LaunchSortOption)
    : "date_desc";

  const qRaw = getRawParam("q");
  const fromRaw = getRawParam("from");
  const toRaw = getRawParam("to");

  return {
    q: qRaw && qRaw.trim().length > 0 ? qRaw.trim() : undefined,
    when,
    outcome,
    from: fromRaw && fromRaw.trim().length > 0 ? fromRaw : undefined,
    to: toRaw && toRaw.trim().length > 0 ? toRaw : undefined,
    sort,
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export {
  parseLaunchListFilters,
  escapeRegex,
  type LaunchListFilters,
  type LaunchWhenFilter,
  type LaunchOutcomeFilter,
  type LaunchSortOption,
};
