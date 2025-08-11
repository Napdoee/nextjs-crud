"use client";

import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteContact } from "@/lib/hooks";
import { toast } from "sonner";

interface DeleteButtonProps {
  id: string;
  title?: string;
  description?: string;
  itemName?: string; // Untuk personalisasi pesan
}

export const DeleteButton = ({
  id,
  title = "Are you absolutely sure?",
  description,
  itemName = "this item",
}: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: deleteContact, isPending } = useDeleteContact();

  const handleDelete = () => {
    deleteContact(id, {
      onSuccess: () => toast.info("Succesfully delete a contact"),
      onError: () => toast.error("There was error while deleted contact"),
    });
  };

  const defaultDescription =
    description ||
    `This action cannot be undone. This will permanently delete ${itemName} and remove the data from our servers.`;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors"
          aria-label={`Delete ${itemName}`}
        >
          <IoTrashOutline size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{defaultDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 focus:ring-destructive text-destructive-foreground"
          >
            {isPending ? (
              <>
                <div className="mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
