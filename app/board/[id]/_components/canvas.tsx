import { useSelf } from "@/liveblocks.config";
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { useState } from "react";
import { CanvasMode, CanvasState } from "@/type/canvas";
import { useCanRedo, useCanUndo, useHistory } from "@liveblocks/react";

interface  CanvasProps{
    id: string;
}

export const Canvas = (
    {
        id
    }: CanvasProps
) =>{
    const info = useSelf((me)=> me.info);

    const [ canvasState, setCanvasState ] = useState<CanvasState>({
        mode: CanvasMode.None, 
    });

    const history = useHistory();
    const canredo =  useCanRedo();
    const canundo = useCanUndo();

    return(
        <main className="h-full w-full relative bg-neutral-200 touch-none" >
            <Info boardId={id} />
            <Participants />
            <Toolbar 
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canredo}
                canUndo={canundo}
                undo={history.undo}
                redo={history.redo}
            />
        </main>
    )
}