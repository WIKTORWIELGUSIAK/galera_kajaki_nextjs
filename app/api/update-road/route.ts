import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { id, name, roadCoordinates, selectedRivers, properties } =
      await req.json();
    const roads = await prisma.road.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        roadCoordinates: roadCoordinates,
        selectedRivers: selectedRivers,
        properties: properties,
      },
    });
    return NextResponse.json(roads);
  } catch (err) {
    console.error("Error in API route:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
