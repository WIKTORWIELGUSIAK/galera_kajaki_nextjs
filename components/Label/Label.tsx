import React from "react";
import { cn } from "@/utils";
import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  htmlFor: string;
}

export default React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, label, htmlFor, ...props }: LabelProps,
  ref: React.Ref<HTMLLabelElement>
) {
  return (
    <label
      ref={ref}
      className={cn("text-s font-medium", className)}
      htmlFor={htmlFor}
      {...props}
    >
      {label}
    </label>
  );
});
