"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update);
    const {
        isOpen,
        onClose,
        initialValue
    } = useRenameModal();
    const [title, setTitle] = useState(initialValue.title);

    useEffect(() => {
        setTitle(initialValue.title);
    }, [initialValue.title]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({
            id: initialValue.id,
            title,
        })
        .then(()=>{
            toast.success("Board created!");
            onClose();
        })
        .catch(()=>{
            toast.error("Failed to rename board");
        })
    }
       

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit board title.</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for your board.
                </DialogDescription>
                <form onSubmit={handleSubmit}>
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
        
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />
                    <div className="flex justify-end mt-4">
                        <DialogClose>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="outline" className="ml-2 bg-black text-white hover:bg-black hover:text-white ">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
