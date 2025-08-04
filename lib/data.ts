import { prisma } from "@/lib/prisma";

export const getContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany();
    return contacts;
  } catch {
    throw new Error("Failed to feetch contact data");
  }
};

export const getContactsById = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch {
    throw new Error("Failed to feetch contact data");
  }
};
