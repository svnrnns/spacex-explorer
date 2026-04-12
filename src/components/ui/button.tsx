"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex select-none items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 [&:not(:has(span))]:leading-none [&_span]:leading-none outline-none aria-invalid:border aria-invalid:border-destructive active:scale-[0.95] data-[key-press]:scale-[0.95]",
  {
    variants: {
      variant: {
        default:
          "bg-heading text-body hover:bg-heading/80 focus-visible:ring-4 focus-visible:ring-heading/20 data-[state=open]:bg-heading/80",
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/80 focus-visible:ring-4 focus-visible:ring-primary/20 data-[state=open]:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-piece focus-visible:ring-4 focus-visible:ring-piece data-[state=open]:bg-piece",
        outline:
          "text-foreground border border-border/70 bg-background shadow-xs hover:bg-box hover:text-accent-foreground focus-visible:ring-4 focus-visible:ring-secondary/70 data-[state=open]:bg-box",
        destructive:
          "bg-destructive text-white hover:bg-destructive/80 focus-visible:ring-4 focus-visible:ring-destructive/30 data-[state=open]:bg-destructive/80",
        ghost:
          "hover:bg-box hover:text-accent-foreground focus-visible:bg-box focus-visible:text-foreground data-[state=open]:bg-box data-[state=open]:text-accent-foreground",
        link: "text-primary decoration-primary/40 underline-offset-2 decoration-2 hover:underline focus-visible:bg-primary/10",
      },
      size: {
        xxs: "text-xxs min-w-12 h-5 px-2 rounded-[min(var(--radius-sm),5px)] gap-1.5 has-[svg]:px-2 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "text-xs min-w-16 h-6 px-3 rounded-[min(var(--radius-sm),6px)] gap-1.5 has-[svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "text-xs min-w-18 h-7 px-3 rounded-sm gap-1.5 has-[svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "text-sm min-w-20 h-8 px-3 rounded-md gap-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "text-sm min-w-22 h-9 px-4 rounded gap-2.5 has-[svg]:px-3.5 [&_svg:not([class*='size-'])]:size-4",
        xl: "text-base min-w-24 h-10 px-4 rounded gap-3 has-[svg]:px-3.5 [&_svg:not([class*='size-'])]:size-4.5",
        "icon-xxs":
          "size-5 flex-center p-0 rounded-[min(var(--radius-md),6px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),7px)] [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),8px)] [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-8 rounded [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-9 rounded-lg [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-10 rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;
type ButtonProps = ButtonPrimitive.Props & ButtonVariants;

function Button({
  className,
  variant,
  size,
  onKeyDown,
  ...props
}: ButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isKeyPress, setIsKeyPress] = React.useState(false);
  const keyPressTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const handleKeyDown: NonNullable<ButtonProps["onKeyDown"]> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (keyPressTimeoutRef.current) clearTimeout(keyPressTimeoutRef.current);
      setIsKeyPress(true);
      keyPressTimeoutRef.current = setTimeout(() => {
        keyPressTimeoutRef.current = null;
        setIsKeyPress(false);
      }, 150);
      buttonRef.current?.click();
    }
    onKeyDown?.(event);
  };

  React.useEffect(
    () => () => {
      if (keyPressTimeoutRef.current) clearTimeout(keyPressTimeoutRef.current);
    },
    [],
  );

  return (
    <ButtonPrimitive
      ref={buttonRef}
      data-slot="button"
      data-key-press={isKeyPress || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonVariants, type ButtonProps };
