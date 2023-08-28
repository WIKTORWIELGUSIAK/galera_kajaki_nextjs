import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const roadsData = await req.json();
    const roads = await prisma.road.create({
      data: {
        name: roadsData.name,
        roadCoordinates: roadsData.roadCoordinates,
        selectedRivers: roadsData.selectedRivers,
        properties: roadsData.properties,
      },
    });
    return NextResponse.json(roads);
  } catch (err) {
    console.error("Error in API route:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
