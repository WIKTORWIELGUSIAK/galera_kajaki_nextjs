// store.js
import create from "zustand";

interface RoadStore {
  roadId: number | null;
  setRoadId: (newId: number | null) => void;
}

const useStore = create<RoadStore>((set) => ({
  roadId: null,
  setRoadId: (newId) => set({ roadId: newId }),
}));

export default useStore;
