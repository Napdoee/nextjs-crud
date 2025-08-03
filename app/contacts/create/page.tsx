import CreateForm from "@/components/create-form";

function CreateContactPage() {
  return (
    <div className="mx-auto mt-5 max-w-md">
      <h1 className="mb-2 text-2xl text-center">Add New Contact</h1>
      <CreateForm />
    </div>
  );
}

export default CreateContactPage;
