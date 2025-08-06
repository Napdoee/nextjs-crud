import { NextRequest, NextResponse } from "next/server";
import { ContactService } from "@/lib/services/contact.service";
import { validatePaginationParams } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const { page, limit } = validatePaginationParams(
      searchParams.get("page") ?? "1",
      searchParams.get("limit") ?? ""
    );

    const result = await ContactService.findContacts({ query, page, limit });

    return NextResponse.json(result);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contact = await ContactService.createContact(body);

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("POST /api/contacts error:", error);

    const isValidationError =
      error instanceof Error && error.message.startsWith("Validation failed:");

    return NextResponse.json(
      {
        error: isValidationError
          ? "Validation failed"
          : "Failed to create contact",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: isValidationError ? 400 : 500 }
    );
  }
}
