import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const selectedRivers = searchParams.get("selected_rivers");
  const rivers = selectedRivers?.split(",");
  if (rivers) {
    try {
      const riversData = await prisma.riversV2.findMany({
        where: {
          OR: rivers?.map((slug) => ({
            slug: {
              contains: slug,
            },
          })),
        },
        select: {
          id: true,
          name: true,
          coordinates: true,
          properties: true,
        },
      });

      const result = {
        names: rivers,
        slugs: selectedRivers,
        coordinates: riversData.map((river) => JSON.parse(river.coordinates)),
      };

      return NextResponse.json(result);
    } catch (err) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({
      names: "",
      slugs: "",
      coordinates: [[]],
    });
  }
}
