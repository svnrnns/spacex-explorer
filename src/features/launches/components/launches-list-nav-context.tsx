"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
  type ReactNode,
} from "react";

import { launchesListHref } from "@/features/launches/utils/launches-list-href";

type LaunchesListNavContextValue = {
  isPending: boolean;
  navigateLaunchesList: (next: URLSearchParams) => void;
};

const LaunchesListNavContext =
  createContext<LaunchesListNavContextValue | null>(null);

export function LaunchesListNavProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigateLaunchesList = useCallback(
    (next: URLSearchParams) => {
      startTransition(() => {
        router.push(launchesListHref(next), { scroll: false });
      });
    },
    [router],
  );

  const value = useMemo(
    () => ({ isPending, navigateLaunchesList }),
    [isPending, navigateLaunchesList],
  );

  return (
    <LaunchesListNavContext.Provider value={value}>
      {children}
    </LaunchesListNavContext.Provider>
  );
}

export function useLaunchesListNav() {
  const ctx = useContext(LaunchesListNavContext);
  if (!ctx) {
    throw new Error(
      "useLaunchesListNav must be used within LaunchesListNavProvider",
    );
  }
  return ctx;
}
