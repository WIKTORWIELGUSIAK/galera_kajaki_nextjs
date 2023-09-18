import type { Position } from "geojson";

export type RoadType = {
  id: number;
  name: string;
  roadCoordinates: Position[];
  selectedRivers: string;
  properties: {
    description: string;
    color: string;
  };
};
