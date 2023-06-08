/** @format */

import type { River } from "@/RiverTypes";
import { SERVER_URL } from "@/config";

export const createRiver = async (newRiver: River) => {
  try {
    const response = await fetch(`${SERVER_URL}/addNewRiverV2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRiver),
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error("Unknown error occurred");
      }
    }

    return response.json();
  } catch (error) {
    console.error("Error in createRoad:", error);
    throw error;
  }
};
