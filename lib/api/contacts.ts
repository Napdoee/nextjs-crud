import client from "@/lib/api/client";
import { ContactListResponse, ContactFilters, Contact } from "@/lib/types";

export const contactApi = {
  async fetchContacts(filters: ContactFilters): Promise<ContactListResponse> {
    const params = new URLSearchParams();

    if (filters.query) params.append("query", filters.query);
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));

    const response = await client.get<ContactListResponse>(
      `/contacts?${params}`
    );
    return response.data;
  },

  async fetchContact(id: string): Promise<Contact> {
    const response = await client.get<Contact>(`/contacts/${id}`);
    return response.data;
  },

  async createContact(data: { name: string; phone: string }): Promise<Contact> {
    const response = await client.post<Contact>("/contacts", data);
    return response.data;
  },

  async updateContact(
    id: string,
    data: Partial<{ name: string; phone: string }>
  ): Promise<Contact> {
    const response = await client.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  },

  async deleteContact(id: string): Promise<void> {
    await client.delete(`/contacts/${id}`);
  },
};
