"use client";

import { StarOff } from "lucide-react";

import { AppErrorPage } from "@/components/app-error-page";

export default function FavoritesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppErrorPage
      icon={StarOff}
      title="Couldn't load favorites"
      description="Your saved launches are temporarily unavailable."
      reset={reset}
    />
  );
}
