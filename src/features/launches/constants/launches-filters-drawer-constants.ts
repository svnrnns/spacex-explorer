import type {
  LaunchOutcomeFilter,
  LaunchSortOption,
  LaunchWhenFilter,
} from "@/features/launches/api/launch-list-filters";

const LAUNCHES_FILTERS_DRAWER_FIELD_CLASS =
  "w-full rounded-md border border-border/70 bg-background px-3 py-2 text-sm text-heading shadow-xs outline-none focus-visible:border-main focus-visible:ring-2 focus-visible:ring-main/20";

const LAUNCHES_WHEN_FILTER_OPTIONS: {
  value: LaunchWhenFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

const LAUNCHES_OUTCOME_FILTER_OPTIONS: {
  value: LaunchOutcomeFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "success", label: "Success" },
  { value: "failure", label: "Failure" },
];

const LAUNCHES_SORT_FILTER_OPTIONS: {
  value: LaunchSortOption;
  label: string;
}[] = [
  { value: "date_desc", label: "Date (newest first)" },
  { value: "date_asc", label: "Date (oldest first)" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
];

export {
  LAUNCHES_FILTERS_DRAWER_FIELD_CLASS,
  LAUNCHES_WHEN_FILTER_OPTIONS,
  LAUNCHES_OUTCOME_FILTER_OPTIONS,
  LAUNCHES_SORT_FILTER_OPTIONS,
};
