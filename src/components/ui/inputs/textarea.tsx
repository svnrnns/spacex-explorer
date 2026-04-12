import { cn } from "@/lib/utils";
import {
  type TextareaVariants,
  textareaContainerClasses,
  textareaContainerVariants,
  textareaTextVariants,
} from './textarea-cva';

type TextareaProps = React.ComponentProps<'textarea'> & TextareaVariants;

function Textarea({ className, target, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        textareaContainerVariants({ target }),
        textareaTextVariants({ target }),
        textareaContainerClasses,
        className
      )}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps };
