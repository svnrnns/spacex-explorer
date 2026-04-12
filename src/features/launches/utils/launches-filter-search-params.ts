import type {
  LaunchOutcomeFilter,
  LaunchSortOption,
  LaunchWhenFilter,
} from "@/features/launches/api/launch-list-filters";

function parseWhenFilterFromSearchParams(
  params: URLSearchParams,
): LaunchWhenFilter {
  const whenRaw = params.get("when");
  if (whenRaw === "upcoming") {
    return "upcoming";
  }
  if (whenRaw === "past") {
    return "past";
  }
  return "all";
}

function parseOutcomeFilterFromSearchParams(
  params: URLSearchParams,
): LaunchOutcomeFilter {
  const outcomeRaw = params.get("outcome");
  if (outcomeRaw === "success") {
    return "success";
  }
  if (outcomeRaw === "failure") {
    return "failure";
  }
  return "all";
}

function parseSortFilterFromSearchParams(
  params: URLSearchParams,
): LaunchSortOption {
  const sortRaw = params.get("sort");
  if (
    sortRaw === "date_asc" ||
    sortRaw === "name_asc" ||
    sortRaw === "name_desc"
  ) {
    return sortRaw;
  }
  return "date_desc";
}

export {
  parseWhenFilterFromSearchParams,
  parseOutcomeFilterFromSearchParams,
  parseSortFilterFromSearchParams,
};
