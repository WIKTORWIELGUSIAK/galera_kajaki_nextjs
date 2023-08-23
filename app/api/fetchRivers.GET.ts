import type { Rivers } from "@/RiverTypes";
import { API, endpoints } from "@/api/endpoints";
import { pick } from "@/helpers/pick";

export default async function fetchRivers(
  searchParams: Record<string, string> | undefined
): Promise<Rivers> {
  const actualParams = pick("selected_rivers", searchParams);
  const params = new URLSearchParams(actualParams);
  const url = new URL(`${API}/${endpoints.roads.getRivers}`);
  url.search = params.toString();

  //   url.search = `selected_rivers=${params.("selected_rivers")}`;
  console.log(url.toString());
  try {
    const response = await fetch(url.href);

    if (!response.ok) {
      const errorMessage = `Failed to fetch rivers data: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const riversData = await response.json();

    return riversData;
  } catch (error) {
    console.error("Error fetching rivers:", error);
    throw new Error("An error occurred while fetching rivers data.");
  }
}
