export const API = "http://localhost:3000/api";

export const endpoints = {
  roads: {
    addRoad: "add-road",
    updateRoad: "update-road",
    getRoads: "get-roads",
    getRivers: "get-rivers",
  },
} as const;
