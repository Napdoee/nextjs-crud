"use client";

import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/button";
import { useContacts } from "@/app/hooks/use-contacts";
import { TableSkeleton } from "@/components/skeleton";
import Pagination from "@/components/pagination";

const ContactTable = ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const { data, isLoading, error } = useContacts(query, currentPage);
  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = data?.totalPages;

  return (
    <div>
      <table className="w-full text-gray-500 text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Phone Number</th>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!data?.contacts.length ? (
            <tr>
              <td colSpan={5} className="text-center" height="90px">
                <h1>No Contact Found</h1>
              </td>
            </tr>
          ) : (
            data?.contacts.map((contact, index) => (
              <tr key={contact.id}>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{contact.name}</td>
                <td className="px-6 py-3">{contact.phone}</td>
                <td className="px-6 py-3">
                  {formatDate(contact.createdAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <EditButton id={contact.id} />
                  <DeleteButton id={contact.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end mt-5">
        <Pagination totalPages={totalPages ?? 1} />
      </div>
    </div>
  );
};

export default ContactTable;
