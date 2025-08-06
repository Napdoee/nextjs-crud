import { NextRequest, NextResponse } from "next/server";
import { ContactService } from "@/lib/services/contact.service";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: paramsId } = await params;
    const contact = await ContactService.findContactById(paramsId);

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id: paramsId } = await params;
    const contact = await ContactService.updateContact(paramsId, body);

    return NextResponse.json(contact);
  } catch (error) {
    console.error("PUT /api/contacts/[id] error:", error);

    const isValidationError =
      error instanceof Error && error.message.startsWith("Validation failed:");

    return NextResponse.json(
      {
        error: isValidationError
          ? "Validation failed"
          : "Failed to update contact",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: isValidationError ? 400 : 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: paramsId } = await params;
    await ContactService.deleteContact(paramsId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/contacts/[id] error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete contact",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
