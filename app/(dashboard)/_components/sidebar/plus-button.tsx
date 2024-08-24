"use client"

import { CreateOrganization } from "@clerk/nextjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Hint } from "@/components/Hint";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint 
          label="Create new organization"
          side="right"
          align="start"
          sideOffset={18}
          >
          <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
            <Plus className="text-white" />
          </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Provide details to create a new organization.
          </DialogDescription>
        </DialogHeader>
        <CreateOrganization routing="hash" />
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
