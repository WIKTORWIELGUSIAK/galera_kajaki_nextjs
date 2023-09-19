import { prisma } from "@/lib/prisma";
export async function getRivers(req: string[] | undefined) {
  const slugs = req?.toString();
  const nameArray = slugs?.split(",");
  if (!slugs) {
    return {
      name: nameArray,
      slugs: undefined,
      coordinates: [],
    };
  }
  const rivers = await prisma.riversV2.findMany({
    where: {
      OR: nameArray?.map((slug) => ({
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
    names: nameArray,
    slugs: slugs,
    coordinates: rivers.map((river) => JSON.parse(river.coordinates)),
  };
  return result;
}
