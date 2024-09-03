"use client"

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layers } from "@/type/canvas";

interface RoomProps {
    children: ReactNode;
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
}

export const Room = ({
    children, 
    roomId,
    fallback
}: RoomProps) => {
    return (
        <RoomProvider 
            id={roomId} 
            initialPresence={{
                cursor: null,
                selection: [],
            }} 
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layers>>(),
                layerIds: new LiveList<string>([]), // Provide an empty array to initialize LiveList
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {children}
            </ClientSideSuspense>
        </RoomProvider>
    );
};
