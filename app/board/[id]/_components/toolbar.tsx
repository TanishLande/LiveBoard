import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import { Circle, MousePointer, Pencil, Redo, Redo2, Square, StickyNote, Type, Undo, Undo2 } from "lucide-react";
import { CanvasMode, LayerType } from "@/type/canvas";

type CanvasState = any;

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState:  CanvasState) => void;
    undo: ()=> void;
    redo: ()=> void;
    canUndo: boolean;
    canRedo: boolean;
}

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canRedo,
}: ToolbarProps ) => {


    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col items-center shadow-md gap-y-2">
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-sm">
                <ToolButton 
                    label="Select"
                    icon={MousePointer}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing

                    }
                />
                <ToolButton 
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({ 
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.text
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.text
                    }

                />
                <ToolButton 
                    label="Sticky Note"
                    icon={StickyNote}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />
                <ToolButton 
                    label="Rectangle"
                    icon={Square}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />
                <ToolButton 
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                />
                <ToolButton 
                    label="Pen"
                    icon={Pencil}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton 
                    label="Undo"
                    icon={Undo2}
                    onClick={()=>{}}
                    isDisabled={true}
                />
                <ToolButton 
                    label="Redo"
                    icon={Redo2}
                    onClick={()=>{}}
                    isDisabled={true}
                />
            </div>
        </div>
    );
};

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col items-center shadow-md gap-y-2">
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-sm">
                <Skeleton className="h-6 w-16 bg-muted-400 rounded-md mb-2" />
                <Skeleton className="h-6 w-16 bg-muted-400 rounded-md mb-2" />
                <Skeleton className="h-6 w-16 bg-muted-400 rounded-md mb-2" />
                <Skeleton className="h-6 w-16 bg-muted-400 rounded-md mb-2" />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <Skeleton className="h-6 w-16 bg-muted-400 rounded-md mb-2" />
                <Skeleton className="h-6 w-16 bg-muted-400 rounded-md" />
            </div>
        </div>
    );
};
