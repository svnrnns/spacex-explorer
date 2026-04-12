import { cva } from 'class-variance-authority';

type _TextareaVariants = {
  target: Record<'native' | 'ghost', string>;
};

const defaultVariants = {
  target: 'native' as const,
};

const textareaContainerClasses = 'min-h-32 p-3 rounded-md';

const textareaContainerVariants = cva(
  'flex field-sizing-content bg-module outline-none',
  {
    variants: {
      target: {
        native:
          'disabled:opacity-50 border border-border/70 shadow-xs aria-invalid:border-destructive focus-visible:border-main',

        ghost: 'border-none bg-transparent',
      },
    } satisfies _TextareaVariants,
    defaultVariants,
  }
);

const textareaTextVariants = cva('outline-none', {
  variants: {
    target: {
      native: 'placeholder:text-placeholder text-heading',
      ghost: 'placeholder:text-placeholder text-heading',
    },
  } satisfies _TextareaVariants,
  defaultVariants,
});

type TextareaVariants = {
  [K in keyof _TextareaVariants]?: keyof _TextareaVariants[K] | null;
};

export {
  textareaContainerClasses,
  textareaContainerVariants,
  textareaTextVariants,
  type TextareaVariants,
};
