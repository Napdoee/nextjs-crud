import { z } from "zod";

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
  query: {
    maxLength: 100,
  },
  pagination: {
    minPage: 1,
    maxPage: 1000,
    minLimit: 1,
    maxLimit: 100,
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
  query: {
    maxLength: `Pencarian maksimal ${ValidationRules.query.maxLength} karakter`,
  },
  pagination: {
    page: {
      min: `Halaman minimal ${ValidationRules.pagination.minPage}`,
      max: `Halaman maksimal ${ValidationRules.pagination.maxPage}`,
      invalid: "Halaman harus berupa angka",
    },
    limit: {
      min: `Limit minimal ${ValidationRules.pagination.minLimit}`,
      max: `Limit maksimal ${ValidationRules.pagination.maxLimit}`,
      invalid: "Limit harus berupa angka",
    },
  },
} as const;

// Schema untuk create contact
export const createContactSchema = z.object({
  name: z
    .string(ValidationMessages.name.required)
    .min(ValidationRules.name.minLength, ValidationMessages.name.minLength)
    .max(ValidationRules.name.maxLength, ValidationMessages.name.maxLength)
    .regex(ValidationRules.name.pattern, ValidationMessages.name.pattern)
    .transform((val) => val.trim()),

  phone: z
    .string(ValidationMessages.name.required)
    .min(ValidationRules.phone.minLength, ValidationMessages.phone.minLength)
    .max(ValidationRules.phone.maxLength, ValidationMessages.phone.maxLength)
    .regex(ValidationRules.phone.pattern, ValidationMessages.phone.pattern)
    .transform((val) => val.replace(/\s+/g, "")), // Remove spaces
});

// Schema untuk update contact (semua field optional)
export const updateContactSchema = z.object({
  name: z
    .string()
    .min(ValidationRules.name.minLength, ValidationMessages.name.minLength)
    .max(ValidationRules.name.maxLength, ValidationMessages.name.maxLength)
    .regex(ValidationRules.name.pattern, ValidationMessages.name.pattern)
    .transform((val) => val.trim())
    .optional(),

  phone: z
    .string()
    .min(ValidationRules.phone.minLength, ValidationMessages.phone.minLength)
    .max(ValidationRules.phone.maxLength, ValidationMessages.phone.maxLength)
    .regex(ValidationRules.phone.pattern, ValidationMessages.phone.pattern)
    .transform((val) => val.replace(/\s+/g, ""))
    .optional(),
});

// Export types dari schema
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
