import type { Metadata } from "next";

import { FavoritesPageClient } from "@/features/favorites/components/favorites-page-client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Launches you saved from SpaceX Explorer. Stored in your browser.",
};

export default function FavoritesPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-4 py-12">
      <Link
        href="/"
        className={cn(
          "inline-flex w-fit items-center gap-1 text-sm text-font hover:text-heading",
          "focus-visible:outline-none focus-visible:text-heading",
        )}
      >
        <ChevronLeft className="size-4" aria-hidden />
        Launches
      </Link>

      <h1 className="text-2xl font-medium text-heading">Favorites</h1>
      <FavoritesPageClient />
    </div>
  );
}
