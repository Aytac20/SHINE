export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const results = await prisma.product.findMany({
    where: {
      description: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
      subCategory: true,
      images: true,
    },
    take: 15,
  });

  return NextResponse.json(results);
}
