import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const ITEMS_PER_PAGE = 5;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * ITEMS_PER_PAGE;

  try {
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: { createdAt: "desc" }, // optional
      }),
      prisma.contact.count({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      }),
    ]);

    return NextResponse.json({
      contacts,
      total,
      page,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
