import type { Road } from "@/RoadTypes";

export function findObjectById(
  array: Road[],
  id: number | null | string
): Road | undefined {
  const parsedId = typeof id === "string" ? parseInt(id, 10) : id;
  return array.find((obj) => obj.id === parsedId);
}
