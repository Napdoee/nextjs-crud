import client from "@/lib/api/client";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type ContactListResponse = {
  contacts: Contact[];
  total: number;
  page: number;
  totalPages: number;
};

export interface CreateContactData {
  name?: string;
  phone?: string;
}

export const fetchContacts = async (
  query: string,
  currentPage: number
): Promise<ContactListResponse> => {
  const params = {
    query,
    page: currentPage,
  };

  const res = await client.get<ContactListResponse>("/contacts", { params });
  return res.data;
};
