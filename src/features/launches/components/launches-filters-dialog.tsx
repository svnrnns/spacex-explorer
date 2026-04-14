"use client";

import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { FormEvent, RefObject } from "react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import type {
  LaunchOutcomeFilter,
  LaunchSortOption,
  LaunchWhenFilter,
} from "@/features/launches/api/launch-list-filters";
import {
  LAUNCHES_FILTERS_DIALOG_FIELD_CLASS,
  LAUNCHES_OUTCOME_FILTER_OPTIONS,
  LAUNCHES_SORT_FILTER_OPTIONS,
  LAUNCHES_WHEN_FILTER_OPTIONS,
} from "@/features/launches/constants/launches-filters-dialog-constants";
import {
  parseOutcomeFilterFromSearchParams,
  parseSortFilterFromSearchParams,
  parseWhenFilterFromSearchParams,
} from "@/features/launches/utils/launches-filter-search-params";
import { useLaunchesListNav } from "@/features/launches/components/launches-list-nav-context";
import { cn } from "@/lib/utils";

type LaunchesFiltersDialogPanelProps = {
  onApplied: () => void;
};

type LaunchesFiltersDialogFormProps = {
  searchParamsKey: string;
  searchParams: ReturnType<typeof useSearchParams>;
  onApplied: () => void;
  menuPortalRef: RefObject<HTMLDivElement | null>;
};

function LaunchesFiltersDialogForm({
  searchParamsKey,
  searchParams,
  onApplied,
  menuPortalRef,
}: LaunchesFiltersDialogFormProps) {
  const { isPending: isFilterNavPending, navigateLaunchesList } =
    useLaunchesListNav();
  const initialParams = new URLSearchParams(searchParamsKey);
  const [whenFilter, setWhenFilter] = useState<LaunchWhenFilter>(() =>
    parseWhenFilterFromSearchParams(initialParams),
  );
  const [outcomeFilter, setOutcomeFilter] = useState<LaunchOutcomeFilter>(() =>
    parseOutcomeFilterFromSearchParams(initialParams),
  );
  const [sortFilter, setSortFilter] = useState<LaunchSortOption>(() =>
    parseSortFilterFromSearchParams(initialParams),
  );

  function applyFilters(formData: FormData) {
    const next = new URLSearchParams();

    const q = String(formData.get("q") ?? "").trim();
    if (q.length > 0) {
      next.set("q", q);
    }

    if (whenFilter !== "all") {
      next.set("when", whenFilter);
    }

    if (outcomeFilter !== "all") {
      next.set("outcome", outcomeFilter);
    }

    const from = String(formData.get("from") ?? "").trim();
    if (from.length > 0) {
      next.set("from", from);
    }

    const to = String(formData.get("to") ?? "").trim();
    if (to.length > 0) {
      next.set("to", to);
    }

    if (sortFilter !== "date_desc") {
      next.set("sort", sortFilter);
    }

    navigateLaunchesList(next);
    onApplied();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyFilters(new FormData(event.currentTarget));
  }

  function onReset() {
    navigateLaunchesList(new URLSearchParams());
    onApplied();
  }

  return (
    <>
      <form
        id="launches-filters-form"
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="q" value={searchParams.get("q") ?? ""} />
        <input type="hidden" name="when" value={whenFilter} />
        <input type="hidden" name="outcome" value={outcomeFilter} />
        <input type="hidden" name="sort" value={sortFilter} />

        <div className="space-y-1.5">
          <Label htmlFor="filter-when-trigger">Schedule</Label>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              id="filter-when-trigger"
              nativeButton={true}
              render={(props) => (
                <Button
                  {...props}
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-between font-normal",
                    props.className,
                  )}
                >
                  <span className="truncate">
                    {LAUNCHES_WHEN_FILTER_OPTIONS.find(
                      (option) => option.value === whenFilter,
                    )?.label ?? "All"}
                  </span>
                  <ChevronDown className="size-4 shrink-0 opacity-50" />
                </Button>
              )}
            />
            <DropdownMenuContent
              align="start"
              className="min-w-48"
              portalContainer={menuPortalRef}
              positionerClassName="z-[100]"
            >
              <DropdownMenuGroup>
                {LAUNCHES_WHEN_FILTER_OPTIONS.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    closeOnClick
                    checked={whenFilter === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setWhenFilter(option.value);
                      }
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="filter-outcome-trigger">Outcome</Label>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              id="filter-outcome-trigger"
              nativeButton={true}
              render={(props) => (
                <Button
                  {...props}
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-between font-normal",
                    props.className,
                  )}
                >
                  <span className="truncate">
                    {LAUNCHES_OUTCOME_FILTER_OPTIONS.find(
                      (option) => option.value === outcomeFilter,
                    )?.label ?? "All"}
                  </span>
                  <ChevronDown className="size-4 shrink-0 opacity-50" />
                </Button>
              )}
            />
            <DropdownMenuContent
              align="start"
              className="min-w-48"
              portalContainer={menuPortalRef}
              positionerClassName="z-[100]"
            >
              <DropdownMenuGroup>
                {LAUNCHES_OUTCOME_FILTER_OPTIONS.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    closeOnClick
                    checked={outcomeFilter === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setOutcomeFilter(option.value);
                      }
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="filter-from">From</Label>
            <input
              id="filter-from"
              name="from"
              type="date"
              className={LAUNCHES_FILTERS_DIALOG_FIELD_CLASS}
              defaultValue={searchParams.get("from") ?? ""}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="filter-to">To</Label>
            <input
              id="filter-to"
              name="to"
              type="date"
              className={LAUNCHES_FILTERS_DIALOG_FIELD_CLASS}
              defaultValue={searchParams.get("to") ?? ""}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="filter-sort-trigger">Sort by</Label>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              id="filter-sort-trigger"
              nativeButton={true}
              render={(props) => (
                <Button
                  {...props}
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-between font-normal",
                    props.className,
                  )}
                >
                  <span className="truncate">
                    {LAUNCHES_SORT_FILTER_OPTIONS.find(
                      (option) => option.value === sortFilter,
                    )?.label ?? "Date (newest first)"}
                  </span>
                  <ChevronDown className="size-4 shrink-0 opacity-50" />
                </Button>
              )}
            />
            <DropdownMenuContent
              align="start"
              className="min-w-56"
              portalContainer={menuPortalRef}
              positionerClassName="z-[100]"
            >
              <DropdownMenuGroup>
                {LAUNCHES_SORT_FILTER_OPTIONS.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    closeOnClick
                    checked={sortFilter === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSortFilter(option.value);
                      }
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
      <DialogFooter className="gap-2 px-6 pt-6 pb-4 sm:flex-row sm:flex-wrap sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isFilterNavPending}
          onClick={onReset}
        >
          Reset all
        </Button>
        <Button
          type="submit"
          form="launches-filters-form"
          disabled={isFilterNavPending}
        >
          Apply filters
        </Button>
      </DialogFooter>
    </>
  );
}

export function LaunchesFiltersDialogPanel({
  onApplied,
}: LaunchesFiltersDialogPanelProps) {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const menuPortalRef = useRef<HTMLDivElement>(null);

  return (
    <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
      <DialogHeader className="shrink-0 px-6 pt-6 pb-4 text-left sm:text-left">
        <DialogTitle>Filters</DialogTitle>
        <DialogDescription>
          Narrow launches by schedule, outcome, and date. Sorting applies to the
          table results.
        </DialogDescription>
      </DialogHeader>
      <div
        ref={menuPortalRef}
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
      >
        <LaunchesFiltersDialogForm
          key={searchParamsKey}
          searchParamsKey={searchParamsKey}
          searchParams={searchParams}
          onApplied={onApplied}
          menuPortalRef={menuPortalRef}
        />
      </div>
    </DialogContent>
  );
}
