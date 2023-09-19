import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const roads = await prisma.road.findMany({ where: {} });
    const result = roads.map((road) => ({
      ...road,
      properties: JSON.parse(road.properties),
      roadCoordinates: JSON.parse(road.roadCoordinates),
      selectedRivers: road.selectedRivers,
    }));

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
