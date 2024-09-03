"use client"

import { useOthersConnectionIds } from "@liveblocks/react";
import { memo } from "react";
import { Cursor as CursorComponent } from "./cursor"; // Renamed import

const CursorList = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <CursorComponent
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    );
};

export const CursorPresence = memo(() => {
    return (
        <>
            <CursorList />
        </>
    );
});

CursorPresence.displayName = "CursorPresence";
