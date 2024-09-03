import { useSelf } from "@/liveblocks.config";
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { useCallback, useState } from "react";
import { camera, CanvasMode, CanvasState, Color, Layers, LayerType, Point } from "@/type/canvas";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@liveblocks/react";
import { CursorPresence } from "./cursor-presence";
import { Cursor } from "./cursor";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid"
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";


const MAX_LAYERS = 100;

interface  CanvasProps{
    id: string;
}

export const Canvas = (
    {
        id
    }: CanvasProps
) =>{
    

    const info = useSelf((me)=> me.info);

    const layerIds = useStorage((root)=> root.layerIds)

    const [ canvasState, setCanvasState ] = useState<CanvasState>({
        mode: CanvasMode.None, 
    });

    const history = useHistory();
    const canredo =  useCanRedo();
    const canundo = useCanUndo();
    const [camera, setCamera  ] = useState<camera>({ x: 0, y:0 });
    const [ lastUsedColor, setLastUsedColor ] = useState<Color>({
        r: 0,
        g: 0,
        b: 0
    });

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.text | LayerType.Note,
        position: Point
    ) => {
        const liveLayers = storage.get("layers") as LiveMap<string, LiveObject<Layers>>;
        const liveLayerIds = storage.get("layerIds") as LiveList<string>;
    
        if (liveLayers.size >= MAX_LAYERS) {
            return; // Exit if the maximum number of layers is reached
        }
    
        const layerId = nanoid(); // Generate a unique ID for the new layer
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor
        });
    
        liveLayerIds.push(layerId); // Add the new layer ID to the list of layer IDs
        liveLayers.set(layerId, layer); // Store the new layer in the live layers map
    
        setMyPresence({ Selection: [layerId] }, { addToHistory: true }); // Update presence with selected layer ID
        setCanvasState({ mode: CanvasMode.None }); // Reset canvas mode
    
    }, []);

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }));
    }, [lastUsedColor]);
    

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
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px )  `
                    }}
                >
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}