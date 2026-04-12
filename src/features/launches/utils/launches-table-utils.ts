const LAUNCH_DATE_UTC_FORMAT = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

function formatLaunchDateUtc(iso: string) {
  try {
    return LAUNCH_DATE_UTC_FORMAT.format(new Date(iso));
  } catch {
    return iso;
  }
}

function launchSuccessLabel(success: boolean | null) {
  if (success === true) return "Yes";
  if (success === false) return "No";
  return "N/A";
}

export { formatLaunchDateUtc, launchSuccessLabel };
