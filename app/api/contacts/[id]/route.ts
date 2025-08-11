import { NextRequest, NextResponse } from "next/server";
import { getContactById } from "@/lib/actions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: paramsId } = await params;
    const contact = await getContactById(paramsId);

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("GET /api/contacts/[id] error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch contact",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
