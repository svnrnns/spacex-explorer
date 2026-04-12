"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { LoaderCircle, Monitor, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

const items = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

function TriggerIcon({ theme }: { theme: string | undefined }) {
  if (theme === "dark") return <MoonIcon className="size-4 text-font/50" />;
  if (theme === "light") return <SunIcon className="size-4 text-font/50" />;
  return <Monitor className="size-4 text-font/50" />;
}

export function ThemeButton() {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  const applyTheme = useCallback(
    (value: string) => {
      document.cookie = `theme=${value}; path=/`;
      setTheme(value);
    },
    [setTheme],
  );

  if (!isMounted) {
    return (
      <Button type="button" variant="ghost" size="icon-xs" aria-label="Theme">
        <LoaderCircle className="size-4 animate-spin" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        render={(props) => (
          <Button
            {...props}
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Theme"
            className={cn(props.className)}
          >
            <TriggerIcon theme={theme} />
          </Button>
        )}
      />
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuRadioGroup
          value={theme ?? "system"}
          onValueChange={applyTheme}
        >
          {items.map(({ value, label, Icon }) => (
            <DropdownMenuRadioItem closeOnClick key={value} value={value}>
              <Icon className="size-4" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
