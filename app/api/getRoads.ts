import { prisma } from "@/lib/prisma";
export async function getRoads() {
  const roads = await prisma.road.findMany({ where: {} });
  const result = roads.map((road) => ({
    ...road,
    properties: JSON.parse(road.properties),
    roadCoordinates: JSON.parse(road.roadCoordinates),
    selectedRivers: road.selectedRivers,
  }));
  return result;
}
