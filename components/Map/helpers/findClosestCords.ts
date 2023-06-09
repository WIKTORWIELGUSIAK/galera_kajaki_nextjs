import type { Position } from "geojson";

export function findClosestCoords(
  coordsArray: Position[],
  clickCoords: Position
): Position {
  return coordsArray.reduce(
    (acc, curr) => {
      const currDistance = Math.sqrt(
        Math.pow(curr[0] - clickCoords[0], 2) +
          Math.pow(curr[1] - clickCoords[1], 2)
      );
      if (currDistance < acc.minDistance) {
        return { minDistance: currDistance, closestCoords: curr };
      }
      return acc;
    },
    { minDistance: Infinity, closestCoords: [] } as {
      minDistance: number;
      closestCoords: number[];
    }
  ).closestCoords;
}
