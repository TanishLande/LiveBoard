"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Poppins } from 'next/font/google';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/Hint";
import { useRouter } from "next/navigation";
import { useRenameModal } from "@/store/use-rename-modal";
import { Action } from "@/components/action";
import { Menu } from "lucide-react";

interface BoardIdProps {
    boardId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});


const Seperator = () =>{
    return(
        <div
        className="px-1.5 text-neutral-300">
          |
        </div>
    )
}

export const Info = ({ boardId }: BoardIdProps) => {
    const { onOpen } = useRenameModal();
    const router = useRouter();
    const handleDirection = () =>{
        router.push("/");
    }
    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    if (!data) return <InfoSkeleton />;

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
                <Hint label="Go to boards dashboard"  side="bottom" sideOffset={10}>
                <Button 
                    className="px-2"
                    variant="board"
                    onClick={handleDirection}
                >  
                <div className="flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="Board Logo"
                                height={40}
                                width={40}
                            />
                            <span
                                className={cn(
                                    "font-semibold text-xl ml-2 text-black",
                                    font.className
                                )}
                            >
                                Board
                            </span>
                        </div>
                </Button>
                </Hint>
                <Seperator />
                <Hint label="Edit title" side="bottom" sideOffset={10} >
                <Button
                    variant="board"
                    className="text-base font-normal px-2"
                    onClick={()=> onOpen(data._id, data.title)}
                >
                    {data.title}
                </Button>
                </Hint>
                <Seperator />
                <Action
                    id={data._id}
                    title={data.title}
                >
                    <div>
                        <Hint label="Main menu" side="bottom" sideOffset={10}>
                                <Button
                                size="icon"
                                variant="board"
                                >
                                    <Menu />
                                </Button>
                        </Hint>
                    </div>
                </Action>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
            <Skeleton
                className="h-full w-full bg-muted-400"
            />
        </div>
    );
};