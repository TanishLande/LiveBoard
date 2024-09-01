import { Skeleton } from "@/components/ui/skeleton";

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col items-center shadow-md gap-y-2">
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-sm">
                <div>Pencil</div>
                <div>Pencil</div>
                <div>Pencil</div>
                <div>Pencil</div>
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <div>Undo</div>
                <div>Redo</div>
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
