import type { LaunchLinksFlickr } from "@/lib/api/types/launch-query";
import { cn } from "@/lib/utils";

function flickrGalleryUrls(flickr: LaunchLinksFlickr): string[] {
  const originals = flickr.original.filter(Boolean);
  if (originals.length > 0) return originals;
  return flickr.small.filter(Boolean);
}

type LaunchDetailGalleryProps = {
  name: string;
  flickr: LaunchLinksFlickr;
};

export function LaunchDetailGallery({
  name,
  flickr,
}: LaunchDetailGalleryProps) {
  const urls = flickrGalleryUrls(flickr);
  if (urls.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-medium text-heading">Gallery</h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {urls.map((src, i) => (
          <li
            key={`${src}-${i}`}
            className="overflow-hidden rounded-md border border-box bg-box"
          >
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus-visible:outline-none focus-visible:scale-110 hover:scale-105 transition-transform duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- remote Flickr URLs; no next/image domain config */}
              <img
                src={src}
                alt={`${name} — photo ${i + 1}`}
                className={cn(
                  "aspect-video w-full object-cover",
                  "transition-opacity hover:opacity-90",
                )}
                loading="lazy"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
