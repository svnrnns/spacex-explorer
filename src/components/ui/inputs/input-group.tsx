"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import {
  inputContainerVariants,
  inputTextVariants,
  InputVariants,
} from "./input-cva";
import { InputProps } from "./input";
import { Button, buttonVariants } from "../button";
import { TextareaProps } from "./textarea";
import {
  textareaContainerVariants,
  textareaTextVariants,
} from "./textarea-cva";

type InputGroupAddonAlign = "start" | "end";

const focusInputAvoidingButton = (e: React.MouseEvent<HTMLDivElement>) => {
  if ((e.target as HTMLElement).closest("button")) return;
  e.currentTarget.parentElement?.querySelector("input")?.focus();
};

function InputGroup({
  className,
  size,
  target = "group",
  ...props
}: React.ComponentProps<"div"> & InputVariants) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        inputContainerVariants({ size, target }),
        className,
      )}
      role="group"
      data-slot="input-group"
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  align,
  ...props
}: React.ComponentProps<"div"> & { align?: InputGroupAddonAlign }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn("aria-disabled:opacity-50", className)}
      role="group"
      onClick={focusInputAvoidingButton}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          focusInputAvoidingButton({
            ...e,
            currentTarget: e.currentTarget as unknown as HTMLDivElement,
            target: e.target as unknown as HTMLElement,
          } as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  align,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof buttonVariants> & {
    type?: "button" | "submit" | "reset";
    align?: InputGroupAddonAlign;
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      data-align={align}
      className={cn(buttonVariants({ size, variant }), "min-w-0", className)}
      {...props}
    />
  );
}

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "target">
>(function InputGroupInput({ className, size, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 min-w-0",
        inputTextVariants({ size, target: "native" }),
        className,
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
});

function InputGroupTextarea({
  className,
  ...props
}: Omit<TextareaProps, "target">) {
  return (
    <textarea
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 min-w-0 resize-none min-h-32",
        textareaTextVariants({ target: "ghost" }),
        textareaContainerVariants({ target: "ghost" }),
        className,
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupTextarea,
};
