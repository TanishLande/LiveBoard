import { useSelf } from "@/liveblocks.config";
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbasr"

interface  CanvasProps{
    id: string;
}

export const Canvas = (
    {
        id
    }: CanvasProps
) =>{
    const info = useSelf((me)=> me.info);

    console.log(info);
    return(
        <main className="h-full w-full relative bg-neutral-200 touch-none" >
            <Info />
            <Participants />
            <Toolbar />
        </main>
    )
}