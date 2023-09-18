import type { Feature } from "geojson";
import type { ReactNode } from "react";

export type MapSourceType = {
  id: string;
  features: Feature[];
  children: ReactNode;
};
