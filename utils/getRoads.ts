import type { Road } from "@/RoadTypes";
import { SERVER_URL } from "@/config";

export const getRoads = async (): Promise<Road[]> => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${SERVER_URL}/getRoads`, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Roads not found");
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error("Unknown error occurred");
      }
    }

    return response.json();
  } catch (error) {
    console.error("Error in getRoads:", error);
    throw error;
  }
};
