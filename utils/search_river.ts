/** @format */

import type { River } from "@/RiverTypes";
import { SERVER_URL } from "@/config";

export const getRiversBySlug = async (
  slug: string | string[] | undefined
): Promise<River> => {
  try {
    const response = await fetch(
      `${SERVER_URL}/get_rivers_by_slug?slug=${slug}`
    );

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
