import Link from "next/link";
import { ChevronLeft, RocketIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatLaunchDateUtc } from "@/features/launches/utils/launches-table-utils";
import { LaunchDetailGallery } from "@/features/launch-detail/components/launch-detail-gallery";
import { LaunchDetailLaunchpadPanel } from "@/features/launch-detail/components/launch-detail-launchpad-panel";
import { LaunchDetailLinks } from "@/features/launch-detail/components/launch-detail-links";
import { LaunchDetailRocketPanel } from "@/features/launch-detail/components/launch-detail-rocket-panel";
import { LaunchDetailFavoriteButton } from "@/features/launch-detail/components/launch-detail-favorite-button";
import { LaunchDetailShareButton } from "@/features/launch-detail/components/launch-detail-share-button";
import type { LaunchpadDoc } from "@/lib/api/types/launchpad";
import type { LaunchQueryDoc } from "@/lib/api/types/launch-query";
import type { RocketDoc } from "@/lib/api/types/rocket";
import { cn } from "@/lib/utils";
import { launchDetailBadgeLabel } from "../utils/launch-detail-utils";

function successBadgeVariant(success: boolean | null) {
  if (success === true) return "success" as const;
  if (success === false) return "destructive" as const;
  return "secondary" as const;
}

type LaunchDetailProps = {
  launch: LaunchQueryDoc;
  rocket: RocketDoc | null;
  launchpad: LaunchpadDoc | null;
  sharePath: string;
};

export function LaunchDetail({
  launch,
  rocket,
  launchpad,
  sharePath,
}: LaunchDetailProps) {
  const patchSrc = launch.links.patch.large ?? launch.links.patch.small;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 py-12">
      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className={cn(
            "inline-flex w-fit items-center gap-1 text-sm text-font hover:text-heading",
            "focus-visible:outline-none focus-visible:text-heading",
          )}
        >
          <ChevronLeft className="size-4" aria-hidden />
          Launches
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row items-start sm:gap-4">
            <div className="shrink-0 mx-0">
              {patchSrc && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={patchSrc}
                    alt="Flight patch"
                    draggable={false}
                    className="size-28 rounded-md border border-box bg-box object-contain p-2 sm:size-32"
                  />
                </>
              )}

              {!patchSrc && (
                <div className="size-28 rounded-md border border-box bg-box flex items-center justify-center p-2 sm:size-32">
                  <RocketIcon className="size-10 text-font" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex flex-col gap-2 text-left">
              <p className="tabular-nums text-sm text-font">
                Flight #{launch.flight_number}
              </p>
              <h1 className="text-2xl font-medium text-heading wrap-break-word">
                {launch.name}
              </h1>
              <p className="text-sm text-font">
                {formatLaunchDateUtc(launch.date_utc)}
                {launch.date_precision && launch.date_precision !== "hour" && (
                  <span className="text-font/70">
                    {" "}
                    · {launch.date_precision}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {launch.success !== null && (
                  <Badge
                    rounded="xs"
                    variant={successBadgeVariant(launch.success)}
                  >
                    {launchDetailBadgeLabel(launch.success)}
                  </Badge>
                )}
                {launch.upcoming && (
                  <Badge rounded="xs" variant="info">
                    Upcoming
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <LaunchDetailFavoriteButton
              launch={{
                id: launch.id,
                name: launch.name,
                flight_number: launch.flight_number,
                date_utc: launch.date_utc,
              }}
            />
            <LaunchDetailShareButton path={sharePath} />
          </div>
        </div>
      </div>

      {launch.details && (
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-heading">Details</h2>
          <p className="text-sm leading-relaxed text-font whitespace-pre-wrap">
            {launch.details}
          </p>
        </section>
      )}

      <LaunchDetailGallery name={launch.name} flickr={launch.links.flickr} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LaunchDetailRocketPanel rocket={rocket} />
        <LaunchDetailLaunchpadPanel launchpad={launchpad} />
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-heading">Links</h2>
        <LaunchDetailLinks links={launch.links} />
      </section>
    </div>
  );
}
