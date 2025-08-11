"use client";

import { useContacts } from "@/lib/hooks";
import { formatDate } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import { TableSkeleton } from "@/components/contacts/skeleton";
import { EditButton } from "@/components/button";
import { DeleteButton } from "@/components/delete-button";

const ContactTable = ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const { data, isLoading } = useContacts(query, currentPage);

  return (
    <>
      <Table>
        <TableCaption>A list of your contacts</TableCaption>
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton />
          ) : !data?.contacts.length ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) : (
            data.contacts?.map((contact, index) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">
                  {(currentPage - 1) * 5 + index + 1}
                </TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  {formatDate(contact.createdAt.toString())}
                </TableCell>
                <TableCell className="flex justify-end gap-1 text-right">
                  <EditButton id={contact.id} />
                  <DeleteButton id={contact.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-5">
        <Pagination totalPages={data?.totalPages ?? 1} />
      </div>
    </>
  );
};

export default ContactTable;
