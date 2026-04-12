import axios from "axios";
import { cache } from "react";

import { get } from "@/lib/api/service/api-service";
import type { LaunchpadDoc } from "@/lib/api/types/launchpad";
import type { LaunchQueryDoc } from "@/lib/api/types/launch-query";
import type { RocketDoc } from "@/lib/api/types/rocket";

async function safeGet<T>(endpoint: string): Promise<T | null> {
  try {
    const { data } = await get<T>({ endpoint });
    return data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return null;
    }
    throw e;
  }
}

const getLaunchById = cache(async (id: string): Promise<LaunchQueryDoc | null> => {
  const encoded = encodeURIComponent(id);
  return safeGet<LaunchQueryDoc>(`/launches/${encoded}`);
});

const getRocketById = cache(async (id: string): Promise<RocketDoc | null> => {
  const encoded = encodeURIComponent(id);
  return safeGet<RocketDoc>(`/rockets/${encoded}`);
});

const getLaunchpadById = cache(async (id: string): Promise<LaunchpadDoc | null> => {
  const encoded = encodeURIComponent(id);
  return safeGet<LaunchpadDoc>(`/launchpads/${encoded}`);
});

export { getLaunchById, getLaunchpadById, getRocketById };
