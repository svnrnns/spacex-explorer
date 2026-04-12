import * as React from 'react';

import { cn } from "@/lib/utils";
import {
  inputContainerVariants,
  InputVariants,
  inputTextVariants,
} from './input-cva';

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>, InputVariants {
  nativeSize?: HTMLInputElement['size'];
}

function Input({
  size,
  nativeSize,
  className,
  type,
  target,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      size={nativeSize}
      data-slot="input"
      className={cn(
        inputContainerVariants({ size, target }),
        inputTextVariants({ size, target }),
        className
      )}
      {...props}
    />
  );
}

export { Input, type InputProps };
