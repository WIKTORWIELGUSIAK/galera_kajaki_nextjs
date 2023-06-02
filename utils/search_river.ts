/** @format */

import { SERVER_URL } from "@/config";
export type River = {
  name: string;
  coordinates: Array<Array<Array<number>>>;
};
export const getRivers = async (river: string): Promise<River> => {
  try {
    const response = await fetch(`${SERVER_URL}/search_river?name=${river}`);

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
