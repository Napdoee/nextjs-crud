"use client";

import clsx from "clsx";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import {
  IoArrowBack,
  IoAddSharp,
  IoPencil,
  IoTrashOutline,
} from "react-icons/io5";

export const BackButton = () => {
  return (
    <button
      onClick={() => history.back()}
      className="inline-flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-white text-sm"
    >
      <IoArrowBack size={20} />
      Back
    </button>
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

export const DeleteButton = () => {
  return (
    <button className="hover:bg-gray-100 p-1 border rounded-sm">
      <IoTrashOutline size={20} />
    </button>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending }: { pending: boolean } = useFormStatus();

  const className = clsx(
    "bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-sm w-full font-medium text-white text-sm text-center",
    {
      "opacity-50 cursor-progress": pending,
    }
  );

  return (
    <button type="submit" className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
