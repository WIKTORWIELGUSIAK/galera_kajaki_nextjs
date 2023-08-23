import type { Position } from "geojson";
export type RoadProperties = {
  description: string;
  color: string;
};
export type Road = {
  id: number;
  name: string;
  properties: RoadProperties;
  roadCoordinates: Position[];
  selectedRivers: string;
};
