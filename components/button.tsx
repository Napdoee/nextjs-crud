"use client";

import { useDeleteContact } from "@/app/hooks/contact.hook";
import clsx from "clsx";
import Link from "next/link";
import {
  IoArrowBack,
  IoAddSharp,
  IoPencil,
  IoTrashOutline,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
  return (
    <Button variant={"outline"} size={"sm"} onClick={() => history.back()}>
      <IoArrowBack size={20} /> Back
    </Button>
  );
};

export const CreateButton = () => {
  return (
    <Link
      href="/contacts/create"
      className="inline-flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-white text-sm"
    >
      <IoAddSharp size={20} />
      Create
    </Link>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/contacts/edit/${id}`}
      className="hover:bg-gray-100 p-1 border rounded-sm"
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const DeleteContactWithId = useDeleteContact();
  const handleDelete = () => {
    DeleteContactWithId.mutate(id);
  };
  return (
    <form action={handleDelete}>
      <button className="hover:bg-gray-100 p-1 border rounded-sm">
        <IoTrashOutline size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({
  label,
  isPending,
}: {
  label: string;
  isPending: boolean;
}) => {
  const pending = isPending;

  const className = clsx("w-full", {
    "opacity-50 cursor-progress": pending,
  });

  return (
    <Button size={"lg"} type="submit" className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </Button>
  );
};
