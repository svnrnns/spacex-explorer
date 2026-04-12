/** Document from `GET /rockets/:id` (SpaceX API v4). */
export type RocketDoc = {
  id: string;
  name: string;
  type: string;
  active: boolean;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string | null;
  description: string;
  flickr_images: string[];
};
