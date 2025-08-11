import { BackButton } from "@/components/button";
import CreateForm from "@/components/contacts/create-form";

function CreateContactPage() {
  return (
    <div className="mx-auto mt-5 max-w-md">
      <BackButton />
      <h1 className="mb-4 text-2xl text-center">Add New Contact</h1>
      <CreateForm />
    </div>
  );
}

export default CreateContactPage;
