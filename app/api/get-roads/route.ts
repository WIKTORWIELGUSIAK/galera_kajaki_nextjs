import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const roads = (await prisma.road.findMany()).map((road) => ({
      ...road,
      properties: JSON.parse(road.properties),
      roadCoordinates: JSON.parse(road.roadCoordinates),
      selectedRivers: road.selectedRivers,
    }));
    return NextResponse.json(roads);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
