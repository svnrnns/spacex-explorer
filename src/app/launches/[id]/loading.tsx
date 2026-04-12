import { cn } from "@/lib/utils";

function Block({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-piece", className)}
      aria-hidden
    />
  );
}

export default function LaunchDetailLoading() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 py-12">
      <div className="flex flex-col gap-3">
        <Block className="h-4 w-24" />
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row items-start sm:gap-4">
            <Block className="size-28 shrink-0 rounded-md sm:size-32" />
            <div className="flex flex-1 flex-col gap-2">
              <Block className="h-4 w-20" />
              <Block className="h-8 w-full max-w-md mx-auto sm:mx-0" />
              <Block className="h-4 w-56 mx-auto sm:mx-0" />
              <div className="flex gap-2">
                <Block className="h-6 w-14 rounded-sm" />
                <Block className="h-6 w-20 rounded-sm" />
              </div>
            </div>
          </div>
          <Block className="h-8 w-28 shrink-0 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Block className="h-4 w-16" />
        <Block className="h-20 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Block className="h-4 w-14" />
        <Block className="h-16 w-full max-w-sm" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Block className="h-64 w-full rounded-md" />
        <Block className="h-64 w-full rounded-md" />
      </div>
    </div>
  );
}
