import { getContacts } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") ?? "";
    const page = searchParams.get("page") ?? "1";

    const result = await getContacts(query, Number(page));

    if (!result.contacts.length)
      return NextResponse.json(
        {
          data: [],
          message: "Not data found in database",
        },
        { status: 201 }
      );

    return NextResponse.json(
      {
        data: result,
        message: "Succesfully to fetch contacts",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/contacts error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch contacts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
