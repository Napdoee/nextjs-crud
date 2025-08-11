export interface Contact {
  id: string;
  name: string;
  phone: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ContactList {
  contacts: Contact[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ContactData {
  name?: string;
  phone?: string;
}
