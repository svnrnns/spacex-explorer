import {
  escapeRegex,
  type LaunchListFilters,
} from "@/features/launches/api/launch-list-filters";
import { LAUNCHES_PAGE_SIZE } from "@/features/launches/constants/launches-table-constants";

type SpaceXQuery = Record<string, unknown>;

type LaunchesQueryPagination = {
  limit?: number;
  offset?: number;
};

const SORT_TO_PAYLOAD: Record<
  LaunchListFilters["sort"],
  Record<string, "asc" | "desc">
> = {
  date_desc: { date_utc: "desc" },
  date_asc: { date_utc: "asc" },
  name_asc: { name: "asc" },
  name_desc: { name: "desc" },
};

function buildLaunchesQueryPayload(
  filters: LaunchListFilters,
  pagination?: LaunchesQueryPagination,
) {
  const query: SpaceXQuery = {};
  const limit = pagination?.limit ?? LAUNCHES_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  const q = filters.q?.trim();
  if (q) {
    query.name = { $regex: escapeRegex(q), $options: "i" };
  }

  if (filters.when === "upcoming") {
    query.upcoming = true;
  }
  if (filters.when === "past") {
    query.upcoming = false;
  }

  if (filters.outcome === "success") {
    query.success = true;
  }
  if (filters.outcome === "failure") {
    query.success = false;
  }

  const dateCond: Record<string, string> = {};
  if (filters.from) {
    dateCond.$gte = `${filters.from}T00:00:00.000Z`;
  }
  if (filters.to) {
    dateCond.$lte = `${filters.to}T23:59:59.999Z`;
  }
  if (Object.keys(dateCond).length > 0) {
    query.date_utc = dateCond;
  }

  return {
    query,
    options: {
      limit,
      offset,
      sort: SORT_TO_PAYLOAD[filters.sort],
    },
  };
}

export { buildLaunchesQueryPayload, type LaunchesQueryPagination };
