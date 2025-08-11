"use client";

import Link from "next/link";
import { IoArrowBack, IoAddSharp, IoPencil } from "react-icons/io5";
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
    <Button asChild>
      <Link href="/contacts/create">
        <IoAddSharp size={20} />
        Create
      </Link>
    </Button>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Button
      asChild
      size={"icon"}
      variant={"outline"}
      className="hover:bg-yellow-500 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
    >
      <Link href={`/contacts/edit/${id}`}>
        <IoPencil size={20} />
      </Link>
    </Button>
  );
};
