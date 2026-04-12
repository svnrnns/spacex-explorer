export type LaunchFairings = {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
} | null;

export type LaunchLinksPatch = {
  small: string | null;
  large: string | null;
};

export type LaunchLinksReddit = {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
};

export type LaunchLinksFlickr = {
  small: string[];
  original: string[];
};

export type LaunchLinks = {
  patch: LaunchLinksPatch;
  reddit: LaunchLinksReddit;
  flickr: LaunchLinksFlickr;
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
};

export type LaunchFailure = {
  time: number;
  altitude: number | null;
  reason: string;
};

export type LaunchCore = {
  core: string | null;
  flight: number | null;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
};

/** One document from `POST /launches/query` when the API returns a bare array of launches. */
export type LaunchQueryDoc = {
  fairings: LaunchFairings;
  links: LaunchLinks;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean | null;
  failures: LaunchFailure[];
  details: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: LaunchCore[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
};

export type LaunchQueryPaginatedResponse = {
  docs: LaunchQueryDoc[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};
