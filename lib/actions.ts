"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ContactProps = {
  name: string;
  phone: string;
};

const ContactSchema = z.object({
  name: z.string().min(6),
  phone: z.string().min(11),
});

export const saveContact = async (
  prevState: ContactProps,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.contact.create({
      data: {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone,
      },
    });
  } catch {
    return { message: "Failed to create contact" };
  }

  revalidatePath("/contacts");
  redirect("/contacts");
};
