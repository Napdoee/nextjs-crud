"use client";

// import { SubmitButton } from "@/components/button";
import { useCreateContactForm } from "@/app/hooks/contact-form.hook";
import { useCreateContact } from "@/app/hooks/contact.hook";
import { CreateContactInput } from "@/lib/validations/contact.validation";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CreateForm = () => {
  const form = useCreateContactForm();
  const createContactMutation = useCreateContact();
  const router = useRouter();

  const onSubmit = (data: CreateContactInput) => {
    createContactMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        router.push("/contacts");
      },
      onError: (error) => {
        // Handle error
        console.error("Failed to create contact:", error);
      },
    });
  };

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
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateForm;
