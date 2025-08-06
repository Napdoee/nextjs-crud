import { z } from "zod";

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}

export const validateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> => {
  try {
    const result = schema.parse(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};

      error.flatten().formErrors.forEach((err) => {
        const path = err.split("").join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err);
      });

      return {
        success: false,
        errors,
      };
    }

    return {
      success: false,
      errors: { general: ["Validation error occurred"] },
    };
  }
};
