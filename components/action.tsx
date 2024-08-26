import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContentProps,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "./confirm-model"; // Ensure this import path is correct
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Action = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link Copied!"))
      .catch(() => toast.error("Failed to copy the link."));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted successfully!"))
      .catch(() => toast.error("Failed to delete board."));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        onClick={(e) => e.stopPropagation()}
        className="w-60 z-50 bg-white"
      >
        <DropdownMenuItem
          className="p-3 cursor-pointer flex items-center hover:font-bold hover:text-black hover:bg-gray-100"
          onClick={onCopyLink}
        >
          <Link2 className="h-4 w-4 mr-2 hover:font-bold" />
          <span className="hover:font-bold">Copy board link</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer flex items-center hover:font-bold hover:text-black hover:bg-gray-100"
          onClick={() => onOpen(id,title)}
        >
          <Pencil className="h-4 w-4 mr-2 hover:font-bold" />
          <span className="hover:font-bold">Rename</span>
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete this Board?"
          description="This board and its content will be deleted forever."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer w-full bg-white border-none text-black hover:bg-gray-100 flex items-center hover:font-bold"
          >
            <Trash2 className="h-4 w-4 mr-2 hover:font-bold" />
            <span className="hover:font-bold">Delete</span>
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
