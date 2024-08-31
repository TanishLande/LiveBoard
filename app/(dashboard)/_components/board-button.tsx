"use client";

import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation"; // Corrected spelling for import
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BoardButtonProps {
  orgId?: string;
  disabled?: boolean;
}

export const BoardButton = ({
  orgId,
  disabled,
}: BoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Undefined",
    })
        .then((id)=>{
            toast.success("Board created sucessfully");
            router.push(`/board/${id}`);
        })
        .catch(()=>{
            toast.error("Failed to create board.")
        })
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick} 
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75"
      )}
    >
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">Add new board</p>
    </button>
  );
};
