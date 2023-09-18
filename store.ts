import { create } from "zustand";
import type { RoadType } from "@/RoadType";
import type { Position } from "geojson";
import type { MarkerProps } from "react-map-gl";

interface RoadStore {
  roadId: number | null;
  newRoadCoordinates: Position[];
  color: string;
  roads: RoadType[] | null;
  markers: MarkerProps[];
  setRoadId: (newId: number | null) => void;
  setNewRoadCoordinates: (newCoordinates: Position[]) => void;
  setColor: (newColor: string) => void;
  setRoads: (newRoads: RoadType[] | null) => void;
  addMarker: (newMarkerProps: MarkerProps) => void;
  setMarkers: (newMarkerProps: MarkerProps[]) => void;
}

const useStore = create<RoadStore>((set) => ({
  roadId: null,
  newRoadCoordinates: [],
  color: "#000000",
  roads: null,
  markers: [],
  setRoadId: (newId) => set({ roadId: newId }),
  setNewRoadCoordinates: (newCoordinates) =>
    set({ newRoadCoordinates: newCoordinates }),
  setColor: (newColor) => set({ color: newColor }),
  setRoads: (newRoads) => set({ roads: newRoads }),
  addMarker: (marker) => {
    set((state) => ({
      markers: [...state.markers, marker],
    }));
  },
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
}));

export default useStore;
