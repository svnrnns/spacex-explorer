import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getLaunchById,
  getLaunchpadById,
  getRocketById,
} from "@/features/launch-detail/api/launch-detail-data";
import { LaunchDetail } from "@/features/launch-detail/components/launch-detail";

type LaunchPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: LaunchPageProps): Promise<Metadata> {
  const { id } = await params;
  const launch = await getLaunchById(id);
  if (!launch) {
    return { title: "Launch not found" };
  }
  const description =
    launch.details && launch.details.length > 160
      ? `${launch.details.slice(0, 157)}…`
      : (launch.details ?? undefined);
  return {
    title: `${launch.name} · Launches`,
    description,
  };
}

export default async function LaunchDetailPage({ params }: LaunchPageProps) {
  const { id } = await params;
  const launch = await getLaunchById(id);
  if (!launch) {
    notFound();
  }

  const [rocket, launchpad] = await Promise.all([
    launch.rocket ? getRocketById(launch.rocket) : Promise.resolve(null),
    launch.launchpad
      ? getLaunchpadById(launch.launchpad)
      : Promise.resolve(null),
  ]);

  const sharePath = `/launches/${id}`;

  return (
    <LaunchDetail
      launch={launch}
      rocket={rocket}
      launchpad={launchpad}
      sharePath={sharePath}
    />
  );
}
