import { API, endpoints } from "@/api/endpoints";
import type { Road } from "@prisma/client";

export default async function updateRoad(
  roadDetails: Omit<Road, "id">
): Promise<Road> {
  try {
    const response = await fetch(`${API}/${endpoints.roads.updateRoad}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roadDetails),
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch road data: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching road:", error);
    throw new Error("An error occurred while fetching roads data.");
  }
}
