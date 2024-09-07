"use client"

import React from "react";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) =>void;
    selectionColor?:  string | null;
}

export const LayerPreview = ({
    id,
    onLayerPointerDown,
    selectionColor
}: LayerPreviewProps) =>{
    return(
        <div>

        </div>
    )
}