"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createContactSchema,
  updateContactSchema,
  CreateContactInput,
  UpdateContactInput,
} from "@/lib/schemas";

export const getContacts = async (
  query: string = "",
  currentPage: number = 1
) => {
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const whereClause = {
    OR: [
      {
        name: {
          contains: query,
          mode: "insensitive" as const,
        },
      },
      {
        phone: {
          contains: query,
          mode: "insensitive" as const,
        },
      },
    ],
  };

  try {
    const [contacts, totalCount] = await Promise.all([
      prisma.contact.findMany({
        skip: offset,
        take: limit,
        where: whereClause,
      }),
      prisma.contact.count({
        where: whereClause,
      }),
    ]);

    return {
      contacts,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch contacts: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const getContactById = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch (error) {
    throw new Error(
      `Failed to save contact: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const saveContact = async (data: CreateContactInput) => {
  const parsed = createContactSchema.safeParse(data);

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    return { Error: formatted };
  }

  const { name, phone } = parsed.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        phone,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to save contact: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }

  revalidatePath("/contacts");
};

export const updateContact = async (id: string, data: UpdateContactInput) => {
  const parsed = updateContactSchema.safeParse(data);

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    return { Error: formatted };
  }

  try {
    await prisma.contact.update({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    throw new Error(
      `Failed to update contact: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }

  revalidatePath("/contacts");
};

export const deleteContact = async (id: string) => {
  if (!id) throw new Error("ID Contact not found");

  try {
    await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(
      `Failed to delete contacts: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }

  revalidatePath("/contacts");
};
