export interface Contact {
  id: string;
  name: string;
  phone: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface ContactListResponse {
  contacts: Contact[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ContactData {
  name?: string;
  phone?: string;
}

export interface ContactFilters {
  query?: string;
  page?: number;
  limit?: number;
}
