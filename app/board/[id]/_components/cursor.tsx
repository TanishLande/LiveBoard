"use client"

import { connectionIdtoColors } from "@/lib/utils";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface CursorProps {
    connectionId: number;
}

interface CursorPosition {
    x: number;
    y: number;
}

export const Cursor = memo(({
    connectionId
}: CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor) as CursorPosition | null;

    const name = info?.name || "Teammate";
    
    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;

    return (
        <foreignObject
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`
            }}
            height={50}
            width={name.length * 10 + 24}
            className="relative drop-shadow-md"

        >
            <MousePointer2 
                className="h-5 w-5"
                style={{
                    fill: connectionIdtoColors(connectionId),
                    color: connectionIdtoColors(connectionId)
                }}
            />
            <div
                className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
                style={{ backgroundColor: connectionIdtoColors(connectionId) }}
            >
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";
