import { create } from "zustand";
import type { Position } from "geojson";

interface RoadStore {
  roadId: number | null;
  newRoadCoordinates: Position[] | null; // Nowa zmienna
  setRoadId: (newId: number | null) => void;
  setNewRoadCoordinates: (newCoordinates: Position[] | null) => void; // Setter dla newRoadCoordinates
}

const useStore = create<RoadStore>((set) => ({
  roadId: null,
  newRoadCoordinates: null,
  setRoadId: (newId) => set({ roadId: newId }),
  setNewRoadCoordinates: (newCoordinates) =>
    set({ newRoadCoordinates: newCoordinates }), // Implementacja settera
}));

export default useStore;
