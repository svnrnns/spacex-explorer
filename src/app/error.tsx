"use client";

import { Orbit } from "lucide-react";

import { AppErrorPage } from "@/components/app-error-page";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppErrorPage
      icon={Orbit}
      title="Couldn't load launches"
      description="Something went wrong while fetching the launch list."
      reset={reset}
    />
  );
}
