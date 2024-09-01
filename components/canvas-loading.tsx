import {  Loader } from "lucide-react";
import { ParticipantsSkeleton } from "@/app/board/[id]/_components/participants";
import { InfoSkeleton } from "@/app/board/[id]/_components/info"
import { ToolbarSkeleton } from "@/app/board/[id]/_components/toolbasr"


export const Loading = () => {
    return (
        <main 
            className="h-full w-full bg-neutral-200 flex items-center justify-center"
        >
            <Loader 
                className="h-6 w-6 text-muted-foreground animate-spin"
            />
            <InfoSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    );
};
