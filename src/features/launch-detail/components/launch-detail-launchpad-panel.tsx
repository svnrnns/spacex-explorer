import { Badge } from "@/components/ui/badge";
import type { LaunchpadDoc } from "@/lib/api/types/launchpad";

type LaunchDetailLaunchpadPanelProps = {
  launchpad: LaunchpadDoc | null;
};

export function LaunchDetailLaunchpadPanel({
  launchpad,
}: LaunchDetailLaunchpadPanelProps) {
  return (
    <section className="flex flex-col gap-3 rounded-md border border-box bg-module p-4">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h2 className="text-sm font-medium text-heading">Launchpad</h2>
        {launchpad && (
          <Badge rounded="xs" variant="secondary" className="w-fit capitalize">
            {launchpad.status}
          </Badge>
        )}
      </div>
      {!launchpad && (
        <p className="text-sm text-font/80">
          Launchpad details are not available.
        </p>
      )}
      {launchpad && (
        <div className="flex flex-col gap-2 text-sm text-font">
          <p className="text-base font-medium text-heading">
            {launchpad.full_name}
          </p>
          <p className="text-font">
            {launchpad.locality}, {launchpad.region}
          </p>
          <dl className="grid grid-cols-1 gap-2 mt-2">
            <div className="space-y-1">
              <dt className="text-xs text-font/70">Timezone</dt>
              <dd className="font-mono text-xs text-heading sm:text-sm">
                {launchpad.timezone}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs text-font/70">Coordinates</dt>
              <dd className="tabular-nums text-heading">
                {launchpad.latitude.toFixed(4)},{" "}
                {launchpad.longitude.toFixed(4)}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs text-font/70">Launch record</dt>
              <dd className="text-heading">
                {launchpad.launch_successes} successes /{" "}
                {launchpad.launch_attempts} attempts
              </dd>
            </div>
          </dl>
          {launchpad.details && (
            <p className="border-t border-box pt-4 mt-2 text-sm leading-relaxed text-font/90">
              {launchpad.details}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
