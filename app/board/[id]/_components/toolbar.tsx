import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import { Circle, MousePointer, Pencil, Redo, Redo2, Square, StickyNote, Type, Undo, Undo2 } from "lucide-react";

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col items-center shadow-md gap-y-2">
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-sm">
                <ToolButton 
                    label="Select"
                    icon={MousePointer}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton 
                    label="Text"
                    icon={Type}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton 
                    label="Sticky Note"
                    icon={StickyNote}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton 
                    label="Rectangle"
                    icon={Square}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton 
                    label="Ellipse"
                    icon={Circle}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton 
                    label="Pen"
                    icon={Pencil}
                    onClick={()=>{}}
                    isActive={false}
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
