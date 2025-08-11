import { BackButton } from "@/components/button";
import EditForm from "@/components/contacts/edit-form";

async function UpdateContactPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const contactId = id;

  return (
    <div className="mx-auto mt-5 max-w-md">
      <BackButton />
      <h1 className="mb-4 text-2xl text-center">Update Contact</h1>
      <EditForm contactId={contactId} />
    </div>
  );
}

export default UpdateContactPage;
