function launchesListHref(params: URLSearchParams): string {
  const qs = params.toString();
  return qs.length > 0 ? `/?${qs}` : "/";
}

export { launchesListHref };
