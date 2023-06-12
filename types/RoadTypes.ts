import type { Position } from "geojson";
type RoadProperties = {
  description: string;
  color: string;
};
type SelectedRiverGeometry = {
  type: string;
  coordinates: Position[];
};
type SelectedRiverProperties = {
  RWB_NAME: string;
};
type SelectedRiver = {
  type: string;
  geometry: SelectedRiverGeometry;
  properties: SelectedRiverProperties;
};
export type Road = {
  id: number;
  name: string;
  properties: RoadProperties;
  roadCoordinates: Position[];
  selectedRivers: SelectedRiver[];
};
