/** Document from `GET /launchpads/:id` (SpaceX API v4). */
export type LaunchpadDoc = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  status: string;
  timezone: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  details: string;
  images: {
    large: string[];
  };
};
