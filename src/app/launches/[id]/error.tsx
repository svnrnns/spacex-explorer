"use client";

import { RocketIcon } from "lucide-react";

import { AppErrorPage } from "@/components/app-error-page";

export default function LaunchDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppErrorPage
      icon={RocketIcon}
      title="Couldn't load this launch"
      description="Mission details failed to load."
      reset={reset}
    />
  );
}
