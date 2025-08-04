import { BackButton } from "@/components/button";
import EditForm from "@/components/edit-form";
import { getContactsById } from "@/lib/data";
import { notFound } from "next/navigation";

async function UpdateContactPage({ params }: { params: { id: string } }) {
  const id = await params.id;
  const contact = await getContactsById(id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="mx-auto mt-5 max-w-md">
      <BackButton />
      <h1 className="mb-2 text-2xl text-center">Update Contact</h1>
      <EditForm contact={contact} />
    </div>
  );
}

export default UpdateContactPage;
