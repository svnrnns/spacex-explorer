import { ArrowUpRight, RocketIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { RocketDoc } from "@/lib/api/types/rocket";

type LaunchDetailRocketPanelProps = {
  rocket: RocketDoc | null;
};

export function LaunchDetailRocketPanel({
  rocket,
}: LaunchDetailRocketPanelProps) {
  return (
    <section className="flex flex-col gap-2 rounded-md border border-box bg-module p-4">
      <div className="w-full flex items-start justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-heading">Rocket</h2>
          {rocket && (
            <Badge
              rounded="xs"
              variant={rocket.active ? "success" : "secondary"}
            >
              {rocket.active ? "Active" : "Inactive"}
            </Badge>
          )}
        </div>
        <div className="size-5 bg-box rounded-[5px] flex items-center justify-center">
          <RocketIcon className="size-3 text-font" />
        </div>
      </div>
      {!rocket && (
        <p className="text-sm text-font/80">
          Rocket details are not available.
        </p>
      )}
      {rocket && (
        <div className="flex flex-col gap-4 text-sm text-font">
          <p className="text-base font-medium text-heading">{rocket.name}</p>
          <dl className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-xs text-font/70">First flight</dt>
              <dd className="text-heading">{rocket.first_flight}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs text-font/70">Country</dt>
              <dd className="text-heading">{rocket.country}</dd>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <dt className="text-xs text-font/70">Company</dt>
              <dd className="text-heading">{rocket.company}</dd>
            </div>
          </dl>
          {rocket.wikipedia && (
            <a
              href={rocket.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-main hover:underline"
            >
              <ArrowUpRight className="size-3.5" aria-hidden />
              Wikipedia
            </a>
          )}
          <p className="text-sm leading-relaxed text-font/90 pt-4 border-t border-box">
            {rocket.description}
          </p>
        </div>
      )}
    </section>
  );
}
