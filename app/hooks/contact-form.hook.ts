import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContactSchema,
  updateContactSchema,
} from "@/lib/validations/contact.validation";
import type {
  CreateContactInput,
  UpdateContactInput,
} from "@/lib/validations/contact.validation";

export const useCreateContactForm = () => {
  return useForm<CreateContactInput>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
    mode: "onChange",
  });
};

export const useUpdateContactForm = (
  defaultValues?: Partial<UpdateContactInput>
) => {
  return useForm<UpdateContactInput>({
    defaultValues,
    resolver: zodResolver(updateContactSchema),
    mode: "onChange",
  });
};
