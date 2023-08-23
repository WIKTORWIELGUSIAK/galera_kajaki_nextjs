import type { Road } from "@/RoadTypes";
import { API, endpoints } from "@/api/endpoints";

export default async function fetchRoads(): Promise<Road[]> {
  try {
    const response = await fetch(`${API}/${endpoints.roads.getRoads}`);
    if (!response.ok) {
      const errorMessage = `Failed to fetch roads data: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching roads:", error);
    throw new Error("An error occurred while fetching roads data.");
  }
}
