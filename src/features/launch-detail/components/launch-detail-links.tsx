import { ArrowUpRight } from "lucide-react";

import type {
  LaunchLinks,
  LaunchLinksReddit,
} from "@/lib/api/types/launch-query";
import { cn } from "@/lib/utils";

type LinkItem = { href: string; label: string };

function collectLaunchLinks(links: LaunchLinks): LinkItem[] {
  const items: LinkItem[] = [];

  if (links.wikipedia) {
    items.push({ href: links.wikipedia, label: "Wikipedia" });
  }
  if (links.article) {
    items.push({ href: links.article, label: "Article" });
  }
  if (links.presskit) {
    items.push({ href: links.presskit, label: "Press kit" });
  }
  if (links.webcast) {
    items.push({ href: links.webcast, label: "Webcast" });
  }
  if (links.youtube_id) {
    items.push({
      href: `https://www.youtube.com/watch?v=${links.youtube_id}`,
      label: "YouTube",
    });
  }

  const reddit = links.reddit;
  const redditKeys: (keyof LaunchLinksReddit)[] = [
    "campaign",
    "launch",
    "media",
    "recovery",
  ];
  for (const key of redditKeys) {
    const href = reddit[key];
    if (href) {
      items.push({
        href,
        label: `Reddit (${key})`,
      });
    }
  }

  return items;
}

type LaunchDetailLinksProps = {
  links: LaunchLinks;
};

export function LaunchDetailLinks({ links }: LaunchDetailLinksProps) {
  const items = collectLaunchLinks(links);
  if (items.length === 0) {
    return (
      <p className="text-sm text-font/80">
        No external links listed for this launch.
      </p>
    );
  }

  return (
    <ul className="flex flex-nowrap flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
      {items.map((item) => (
        <li key={`${item.label}-${item.href}`}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 text-sm text-main hover:underline",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/35 focus-visible:ring-offset-2 focus-visible:ring-offset-body rounded-sm",
            )}
          >
            <ArrowUpRight
              className="size-3.5 shrink-0 opacity-80"
              aria-hidden
            />
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
