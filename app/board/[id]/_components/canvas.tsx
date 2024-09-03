import { useSelf } from "@/liveblocks.config";
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { useCallback, useState } from "react";
import { camera, CanvasMode, CanvasState } from "@/type/canvas";
import { useCanRedo, useCanUndo, useHistory, useMutation } from "@liveblocks/react";
import { CursorPresence } from "./cursor-presence";
import { Cursor } from "./cursor";
import { pointerEventToCanvasPoint } from "@/lib/utils";

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
    const [camera, setCamera  ] = useState<camera>({ x: 0, y:0 });

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }));
    }, []);
    

    const onPointerMove = useMutation((
        { setMyPresence },
        e: React.PointerEvent
    ) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        setMyPresence({ cursor: current })
    }, []);


    const onPointerLeave = useMutation((
        {setMyPresence}
    )=>{
        setMyPresence({ cursor: null });
    },[]);

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
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g>
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}