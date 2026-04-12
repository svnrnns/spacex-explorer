"use client";

import { Check, Link2 } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

type LaunchDetailShareButtonProps = {
  path: string;
};

export function LaunchDetailShareButton({ path }: LaunchDetailShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [path]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => void onCopy()}
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-success" aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Link2 className="size-3.5" aria-hidden />
          Copy link
        </>
      )}
    </Button>
  );
}
