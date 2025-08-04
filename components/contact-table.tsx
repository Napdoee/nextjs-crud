import { getContacts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/button";
import type { Contact } from "@prisma/client";

const ContactTable = async () => {
  const contacts = await getContacts();

  return (
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
        {contacts.map((contact: Contact, index: number) => (
          <tr key={contact.id}>
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{contact.name}</td>
            <td className="px-6 py-3">{contact.phone}</td>
            <td className="px-6 py-3">
              {formatDate(contact.createdAt.toString())}
            </td>
            <td className="flex justify-center gap-1 py-3">
              <EditButton id={contact.id} />
              <DeleteButton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
