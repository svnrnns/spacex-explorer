"use server";

import {
  buildLaunchesQueryPayload,
  type LaunchesQueryPagination,
} from "@/features/launches/api/launch-query-builder";
import type { LaunchListFilters } from "@/features/launches/api/launch-list-filters";
import { post } from "@/lib/api/service/api-service";
import type { LaunchQueryPaginatedResponse } from "@/lib/api/types/launch-query";

async function getLaunches(
  filters: LaunchListFilters,
  pagination?: LaunchesQueryPagination,
) {
  const payload = buildLaunchesQueryPayload(filters, pagination);
  const { data } = await post<LaunchQueryPaginatedResponse>({
    endpoint: "/launches/query",
    payload,
  });
  return data;
}

async function loadMoreLaunches(filters: LaunchListFilters, offset: number) {
  return getLaunches(filters, { offset });
}

export { getLaunches, loadMoreLaunches };
