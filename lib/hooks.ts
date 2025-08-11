import {
  saveContact,
  getContacts,
  getContactById,
  deleteContact,
  updateContact,
} from "@/lib/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateContactInput } from "./schemas";

export const CONTACTS_QUERY_KEY = "contacts";

export const useContacts = (query: string, page: number) => {
  return useQuery({
    queryKey: [CONTACTS_QUERY_KEY, query, page],
    queryFn: () => getContacts(query, page),
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: [CONTACTS_QUERY_KEY, id],
    queryFn: () => getContactById(id),
    enabled: !!id,
  });
};

export const useSaveContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactInput }) =>
      updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
    },
  });
};
