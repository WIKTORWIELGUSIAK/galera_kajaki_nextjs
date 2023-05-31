/** @format */

import { SERVER_URL } from "@/config";

export const getRiver = async (): Promise<any> => {
  console.log("test");
  try {
    const response = await fetch(`${SERVER_URL}/search_river?name=Wisła`);

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
