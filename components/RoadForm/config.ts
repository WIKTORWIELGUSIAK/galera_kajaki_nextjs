import type { InputProps } from "@/InputTypes";

export const formConfig: InputProps[] = [
  {
    label: "Nazwa trasy",
    id: "roadName",
    name: "roadName",
  },
  {
    label: "Opis trasy",
    id: "roadDescription",
    name: "roadDescription",
  },
  {
    label: "Kolor:",
    id: "roadColor",
    name: "roadColor",
    type: "color",
    className: "flex-row gap-x-2",
  },
];
