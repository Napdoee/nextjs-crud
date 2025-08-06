import { BackButton } from "@/components/button";
import EditForm from "@/components/edit-form";

async function UpdateContactPage({ params }: { params: { id: string } }) {
  const { id: contactId } = await params;

  return (
    <div className="mx-auto mt-5 max-w-md">
      <BackButton />
      <h1 className="mb-2 text-2xl text-center">Update Contact</h1>
      <EditForm contactId={contactId} />
    </div>
  );
}

export default UpdateContactPage;
