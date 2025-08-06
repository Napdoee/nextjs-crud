import { prisma } from "@/lib/prisma";
import {
  ContactFilters,
  ContactListResponse,
  Contact,
  ContactData,
} from "@/lib/types";
import { calculateOffset, calculateTotalPages } from "@/lib/pagination";
import { validateData } from "@/lib/validation";
import {
  createContactSchema,
  updateContactSchema,
  CreateContactInput,
  UpdateContactInput,
} from "@/lib/validations/contact.validation";

export class ContactService {
  static async findContacts(
    filters: ContactFilters
  ): Promise<ContactListResponse> {
    const { query = "", page = 1, limit = 5 } = filters;
    const offset = calculateOffset(page, limit);

    const whereClause = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" as const } },
            { phone: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {};

    try {
      const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
          skip: offset,
          take: limit,
          where: whereClause,
          orderBy: { createdAt: "asc" },
        }),
        prisma.contact.count({ where: whereClause }),
      ]);

      return {
        contacts,
        total,
        page,
        totalPages: calculateTotalPages(total, limit),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch contacts: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async findContactById(id: string): Promise<Contact | null> {
    try {
      return await prisma.contact.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch contact: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async createContact(data: Contact): Promise<ContactData> {
    const validation = validateData(createContactSchema, data);

    if (!validation.success) {
      const errorMessage = Object.values(validation.errors || {})
        .flat()
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
    }

    try {
      return await prisma.contact.create({
        data: validation.data as CreateContactInput,
      });
    } catch (error) {
      throw new Error(
        `Failed to create contact: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async updateContact(id: string, data: unknown): Promise<Contact> {
    const validation = validateData(updateContactSchema, data);

    if (!validation.success) {
      const errorMessage = Object.values(validation.errors || {})
        .flat()
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
    }

    try {
      return await prisma.contact.update({
        where: { id },
        data: validation.data as UpdateContactInput,
      });
    } catch (error) {
      throw new Error(
        `Failed to update contact: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async deleteContact(id: string): Promise<void> {
    try {
      await prisma.contact.delete({ where: { id } });
    } catch (error) {
      throw new Error(
        `Failed to delete contact: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
