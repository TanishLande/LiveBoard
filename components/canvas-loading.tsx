import {  Loader } from "lucide-react";
import { Info } from "@/app/board/[id]/_components/info"
import { Participants } from "@/app/board/[id]/_components/participants";
import { Toolbar } from "@/app/board/[id]/_components/toolbasr";
export const Loading = () => {
    return (
        <main 
            className="h-full w-full bg-neutral-200 flex items-center justify-center"
        >
            <Loader 
                className="h-6 w-6 text-muted-foreground animate-spin"
            />
            <Info.Skeleton />
            <Participants.Skeletion />
            <Toolbar.Skeleton />
        </main>
    );
};
