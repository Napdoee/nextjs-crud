import z from "zod";

// Base validation rules yang bisa dikonfigurasi
export const ValidationRules = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  phone: {
    pattern: /^(\+62|62|0)[0-9]{9,13}$/,
    minLength: 10,
    maxLength: 15,
  },
} as const;

// Custom error messages
export const ValidationMessages = {
  name: {
    required: "Nama wajib diisi",
    minLength: `Nama minimal ${ValidationRules.name.minLength} karakter`,
    maxLength: `Nama maksimal ${ValidationRules.name.maxLength} karakter`,
    pattern: "Nama hanya boleh mengandung huruf dan spasi",
  },
  phone: {
    required: "Nomor telepon wajib diisi",
    minLength: `Nomor telepon minimal ${ValidationRules.phone.minLength} digit`,
    maxLength: `Nomor telepon maksimal ${ValidationRules.phone.maxLength} digit`,
    pattern: "Format nomor telepon tidak valid (contoh: +6281234567890)",
  },
} as const;

const nameSchema = z
  .string(ValidationMessages.name.required)
  .min(ValidationRules.name.minLength, ValidationMessages.name.minLength)
  .max(ValidationRules.name.maxLength, ValidationMessages.name.maxLength)
  .regex(ValidationRules.name.pattern, ValidationMessages.name.pattern)
  .transform((val) => val.trim());

const phoneSchema = z
  .string(ValidationMessages.name.required)
  .min(ValidationRules.phone.minLength, ValidationMessages.phone.minLength)
  .max(ValidationRules.phone.maxLength, ValidationMessages.phone.maxLength)
  .regex(ValidationRules.phone.pattern, ValidationMessages.phone.pattern)
  .transform((val) => val.replace(/\s+/g, "")); // Remove spaces

export const createContactSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});
export const updateContactSchema = z.object({
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
