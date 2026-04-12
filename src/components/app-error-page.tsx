"use client";

import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type AppErrorPageProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  reset: () => void;
};

export function AppErrorPage({
  icon: Icon,
  title,
  description,
  reset,
}: AppErrorPageProps) {
  useEffect(() => {
    const id = setInterval(reset, 5000);
    return () => clearInterval(id);
  }, [reset]);

  return (
    <div className="flex min-h-[min(60vh,28rem)] flex-col items-center justify-center py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 text-center">
        <div
          className="flex size-16 items-center justify-center rounded-2xl bg-danger/10"
          aria-hidden
        >
          <Icon className="size-8 text-danger stroke-[1.25]" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-medium tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-font/50">{description}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          className="self-center mt-3"
          onClick={reset}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
