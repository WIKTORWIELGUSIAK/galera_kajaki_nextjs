import React from "react";
import { cn } from "@/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, label, name, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <label className="text-s font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full rounded-md border-2 border-gray-300 focus:border-[#512b1e] focus:outline-none"
        ref={ref}
        {...props}
      />
    </div>
  );
});
