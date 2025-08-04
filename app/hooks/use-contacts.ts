import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "@/lib/api/contacts";

export const useContacts = (query: string, page: number) => {
  return useQuery({
    queryKey: ["contacts", query, page],
    queryFn: () => fetchContacts(query, page),
    // keepPreviousData: true,
  });
};
