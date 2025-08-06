"use client";

import { SubmitButton } from "@/components/button";
import { useUpdateContactForm } from "@/app/hooks/contact-form.hook";
import { useContact, useUpdateContact } from "@/app/hooks/contact.hook";
import { UpdateContactInput } from "@/lib/validations/contact.validation";
import { useEffect } from "react";

const EditForm = ({ contactId }: { contactId: string }) => {
  const {
    data: contact,
    isLoading: isLoadingContact,
    // error: contactError,
  } = useContact(contactId);

  const form = useUpdateContactForm({
    name: contact?.name,
    phone: contact?.phone,
  });
  const updateContactMutation = useUpdateContact();

  useEffect(() => {
    if (contact) {
      form.reset({
        name: contact.name,
        phone: contact.phone,
      });
    }
  }, [contact, form]);

  const onSubmit = (data: UpdateContactInput) => {
    updateContactMutation.mutate(
      { id: contactId, data },
      {
        onSuccess: () => {
          form.setValue("name", data.name);
          form.setValue("phone", data.phone);
        },
      }
    );
  };

  return (
    <div>
      {isLoadingContact ? (
        <h1> sabar manis </h1>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block font-medium text-gray-900 text-sm"
            >
              Full Name
            </label>
            <input
              type="text"
              {...form.register("name")}
              name="name"
              id="name"
              className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-sm focus:ring-blue-500 w-full text-gray-900 text-sm"
              placeholder="Full Name..."
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-red-600 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block font-medium text-gray-900 text-sm"
            >
              Phone Number
            </label>
            <input
              type="text"
              {...form.register("phone")}
              name="phone"
              id="phone"
              className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-sm focus:ring-blue-500 w-full text-gray-900 text-sm"
              placeholder="Phone Number..."
            />
            {form.formState.errors.phone && (
              <p className="mt-1 text-red-600 text-sm">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
          {/* <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-red-500 text-sm">{state?.message}</p>
        </div> */}
          <SubmitButton
            label="update"
            isPending={updateContactMutation.isPending}
          />
        </form>
      )}
    </div>
  );
};

export default EditForm;
