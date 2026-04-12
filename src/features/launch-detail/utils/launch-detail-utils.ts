function launchDetailBadgeLabel(success: boolean | null) {
  if (success === true) return "Success";
  if (success === false) return "Failure";
  return "Success N/A";
}

export { launchDetailBadgeLabel };
