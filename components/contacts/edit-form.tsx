"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateContactInput, updateContactSchema } from "@/lib/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSkeleton } from "@/components/contacts/skeleton";
import { useContact, useUpdateContact } from "@/lib/hooks";
import { toast } from "sonner";
import { useEffect } from "react";
import { notFound } from "next/navigation";

const EditForm = ({ contactId }: { contactId: string }) => {
  const { data: contact, isLoading: isLoadingContact } = useContact(contactId);

  const form = useForm<UpdateContactInput>({
    resolver: zodResolver(updateContactSchema),
    defaultValues: {
      name: contact?.name ?? "",
      phone: contact?.phone ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (contact) {
      form.reset({
        name: contact.name ?? "",
        phone: contact.phone ?? "",
      });
    }
  }, [contact, form]);

  const updateMutation = useUpdateContact();

  const onSubmit = (data: UpdateContactInput) => {
    updateMutation.mutate(
      { id: contactId, data },
      {
        onSuccess: () => {
          toast.success("Succesfully update contact");
        },
        onError: () => toast.error("There was error while updated contact"),
      }
    );
  };

  if (isLoadingContact) return <FormSkeleton />;
  if (!contact) return notFound();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
