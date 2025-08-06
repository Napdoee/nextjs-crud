const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 5,
  MAX_LIMIT: 100,
} as const;

export const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

export const calculateTotalPages = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

export const validatePaginationParams = (page?: string, limit?: string) => {
  const validatedPage = Math.max(
    parseInt(page || String(PAGINATION_CONFIG.DEFAULT_PAGE)),
    1
  );
  const validatedLimit = Math.min(
    Math.max(parseInt(limit || String(PAGINATION_CONFIG.DEFAULT_LIMIT)), 1),
    PAGINATION_CONFIG.MAX_LIMIT
  );

  return { page: validatedPage, limit: validatedLimit };
};
