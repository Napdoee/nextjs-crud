"use client";

import { updateContact } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/button";
import type { Contact } from "@prisma/client";

const EditForm = ({ contact }: { contact: Contact }) => {
  const updateContactWithId = updateContact.bind(null, contact.id);
  const [state, formAction] = useActionState(updateContactWithId, null);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block font-medium text-gray-900 text-sm"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-sm focus:ring-blue-500 w-full text-gray-900 text-sm"
            placeholder="Full Name..."
            defaultValue={contact.name}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-red-500 text-sm">{state?.Error?.name}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block font-medium text-gray-900 text-sm"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-sm focus:ring-blue-500 w-full text-gray-900 text-sm"
            placeholder="Phone Number..."
            defaultValue={contact.phone}
          />
          <div id="phone-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-red-500 text-sm">{state?.Error?.phone}</p>
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-red-500 text-sm">{state?.message}</p>
        </div>
        <SubmitButton label="update" />
      </form>
    </div>
  );
};

export default EditForm;
