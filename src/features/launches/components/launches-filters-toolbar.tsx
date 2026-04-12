"use client";

import { ListFilter, Search, X } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/inputs/input-group";
import { LaunchesFiltersDrawerPanel } from "@/features/launches/components/launches-filters-drawer";
import { useLaunchesListNav } from "@/features/launches/components/launches-list-nav-context";

export function LaunchesFiltersToolbar({ totalDocs }: { totalDocs: number }) {
  const searchParams = useSearchParams();
  const { isPending: isFilterNavPending, navigateLaunchesList } =
    useLaunchesListNav();
  const missionInputRef = useRef<HTMLInputElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchParamsKey = searchParams.toString();
  const missionSearchFromUrl = searchParams.get("q") ?? "";

  useEffect(() => {
    const q = new URLSearchParams(searchParamsKey).get("q") ?? "";
    if (q.length === 0) {
      return;
    }
    const frame = requestAnimationFrame(() => {
      missionInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [searchParamsKey]);

  function clearMissionSearch() {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("q");
    navigateLaunchesList(next);
  }

  function onMissionSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    const next = new URLSearchParams(searchParams.toString());
    if (q.length > 0) {
      next.set("q", q);
    } else {
      next.delete("q");
    }
    navigateLaunchesList(next);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
      <p className="hidden sm:block shrink-0 text-sm text-font">
        {totalDocs} launch{totalDocs !== 1 && "es"} total
      </p>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
        <form
          key={searchParams.toString()}
          className="flex flex-1 items-center justify-end"
          onSubmit={onMissionSearchSubmit}
        >
          <input
            type="hidden"
            name="when"
            value={searchParams.get("when") ?? "all"}
          />
          <input
            type="hidden"
            name="outcome"
            value={searchParams.get("outcome") ?? "all"}
          />
          <input
            type="hidden"
            name="from"
            value={searchParams.get("from") ?? ""}
          />
          <input type="hidden" name="to" value={searchParams.get("to") ?? ""} />
          <input
            type="hidden"
            name="sort"
            value={searchParams.get("sort") ?? "date_desc"}
          />
          <InputGroup
            size="md"
            target="group"
            className="w-full min-w-0 max-w-96 gap-0"
          >
            <InputGroupAddon align="start" className="text-font/50 mr-2">
              <Search aria-hidden className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              ref={missionInputRef}
              name="q"
              type="text"
              placeholder="Search by mission name..."
              defaultValue={missionSearchFromUrl}
              autoComplete="off"
              enterKeyHint="search"
            />
            {missionSearchFromUrl.length > 0 && (
              <InputGroupButton
                type="button"
                align="end"
                variant="ghost"
                aria-label="Clear search"
                className="aspect-square"
                disabled={isFilterNavPending}
                onClick={clearMissionSearch}
              >
                <X className="size-4" />
              </InputGroupButton>
            )}
            <InputGroupButton
              type="submit"
              align="end"
              disabled={isFilterNavPending}
            >
              Search
            </InputGroupButton>
          </InputGroup>
        </form>
        <Drawer
          direction="right"
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        >
          <DrawerTrigger asChild>
            <Button variant="outline" size="md">
              <ListFilter className="size-4" aria-hidden />
              Filters
            </Button>
          </DrawerTrigger>
          <LaunchesFiltersDrawerPanel onApplied={() => setDrawerOpen(false)} />
        </Drawer>
      </div>
    </div>
  );
}
