import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:stroke-[2.5] gap-1 [&>svg]:pointer-events-none outline-none focus-visible:ring-4 aria-invalid:ring-destructive aria-invalid:ring transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-heading text-body [a&]:hover:bg-heading/90 focus-visible:ring-heading/10",
        secondary:
          "bg-secondary text-heading [a&]:hover:bg-secondary-foreground/10 focus-visible:ring-secondary-foreground/10",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground focus-visible:ring-border/70",
        primary:
          "bg-primary/10 text-primary [a&]:hover:bg-primary/20 focus-visible:ring-primary/50",
        destructive:
          "bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20 focus-visible:ring-destructive/50",
        success:
          "bg-success/10 text-success [a&]:hover:bg-success/20 focus-visible:ring-success/50",
        warning:
          "bg-warning/10 text-warning [a&]:hover:bg-warning/20 focus-visible:ring-warning/50",
        info: "bg-info/10 text-info [a&]:hover:bg-info/20 focus-visible:ring-info/50",
        ghost:
          "text-heading [a&]:hover:bg-accent hover:bg-muted/50 focus-visible:ring-muted/50",
      },
      size: {
        xs: "text-xxs h-4 px-1 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&_svg:not([class*='size-'])]:size-2.5",
        sm: "text-xs h-5 [&_svg:not([class*='size-'])]:size-3",
        md: "text-sm h-6 [&_svg:not([class*='size-'])]:size-3.5",
      },
      rounded: {
        full: "rounded-full",
        sm: "rounded-sm",
        xs: "rounded-[5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "full",
      size: "sm",
    },
  },
);

type BadgeVariants = VariantProps<typeof badgeVariants>;
type BadgeProps = useRender.ComponentProps<"span"> & BadgeVariants;

function Badge({
  className,
  variant,
  rounded,
  size,
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, rounded, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants, type BadgeVariants, type BadgeProps };
