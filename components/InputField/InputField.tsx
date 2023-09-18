import React from "react";
import Input from "@/Input/Input";
import Label from "@/Label/Label";
import { cn } from "@/utils";
import type { ChangeEvent, InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLDivElement> {
  type?: string;
  name: string;
  label: string;
  handleChange: ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export default React.forwardRef<HTMLDivElement, FieldProps>(function InputField(
  { className, type, name, label, value, handleChange, ...props }: FieldProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-y-2", className)}
      {...props}
    >
      <Label label={label} htmlFor={name} />
      <Input type={type} name={name} value={value} onChange={handleChange} />
    </div>
  );
});
