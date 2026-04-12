import { cva } from 'class-variance-authority';

type _InputVariants = {
  size: Record<'sm' | 'md', string>;
  target: Record<'native' | 'group' | 'ghost', string>;
};

const defaultVariants = {
  size: 'md' as const,
  target: 'native' as const,
};

const inputContainerVariants = cva(
  'inline-flex items-center bg-module min-w-0 outline-none',
  {
    variants: {
      size: {
        sm: 'h-7 pl-3 pr-3 rounded-sm has-[[data-align=end]]:pr-1 has-[[data-align=start]]:pl-1 has-[[data-slot=input-group-addon][data-align=end]]:pr-2 has-[[data-slot=input-group-addon][data-align=start]]:pl-2',
        md: 'h-8 pl-3 pr-3 rounded-md has-[[data-align=end]]:pr-1 has-[[data-align=start]]:pl-1 has-[[data-slot=input-group-addon][data-align=end]]:pr-2 has-[[data-slot=input-group-addon][data-align=start]]:pl-2',
      },
      target: {
        native:
          'disabled:opacity-50 border border-border/70 shadow-xs aria-invalid:border-destructive focus-visible:border-main focus-visible:ring-2 focus-visible:ring-main/20 aria-invalid:focus-visible:ring-destructive/20',
        group:
          'has-[[data-slot=input-group-control]:disabled]:opacity-50 border border-border/70 shadow-xs has-[[data-slot=input-group-control][aria-invalid]]:border-destructive has-[[data-slot=input-group-control]:focus]:border-main has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-main/20 has-[[data-slot=input-group-control][aria-invalid]:focus-visible]:ring-destructive/20',
        ghost: 'border-none bg-transparent',
      },
    } satisfies _InputVariants,
    defaultVariants,
  }
);

const inputTextVariants = cva('outline-none', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
    target: {
      native: 'placeholder:text-placeholder text-heading',
      group: '',
      ghost: 'placeholder:text-placeholder text-heading',
    },
  } satisfies _InputVariants,
  defaultVariants,
});

type InputVariants = {
  [K in keyof _InputVariants]?: keyof _InputVariants[K] | null;
};

export { inputContainerVariants, inputTextVariants, type InputVariants };
