import React from "react";
import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, name, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      name={name}
      className={cn(
        "w-full rounded-md border-2 border-gray-300 focus:border-[#512b1e] focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
