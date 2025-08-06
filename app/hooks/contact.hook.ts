import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactApi } from "@/lib/api/contacts";
import { ContactFilters } from "@/lib/types";

export const CONTACTS_QUERY_KEY = "contacts";

export const useContacts = (filters: ContactFilters) => {
  return useQuery({
    queryKey: [CONTACTS_QUERY_KEY, filters],
    queryFn: () => contactApi.fetchContacts(filters),
    // keepPreviousData: true,
    // cacheTime: 10 * 60 * 1000, // 10 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: [CONTACTS_QUERY_KEY, id],
    queryFn: () => contactApi.fetchContact(id),
    enabled: !!id,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactApi.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{ name: string; phone: string }>;
    }) => contactApi.updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactApi.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
    },
  });
};
