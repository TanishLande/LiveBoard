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
    return(
        <main className="h-full w-full relative bg-neutral-200 touch-none" >
            <Info />
            <Participants />
            <Toolbar />
        </main>
    )
}