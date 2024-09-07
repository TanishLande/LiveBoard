"use client";

import { Layers, LayerType } from "@/type/canvas";
import { useStorage } from "@liveblocks/react";
import React, { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
    id: string; // The unique ID of the layer
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void; // A function triggered on pointer down event
    selectionColor?: string | null; // The selection color, which could be a string or null
}

// Correct syntax for memoizing the functional component
const LayerPreviewComponent: React.FC<LayerPreviewProps> = ({
    id,
    onLayerPointerDown,
    selectionColor,
}: LayerPreviewProps) => {
    const layer = useStorage((root) => {
        // Ensure that 'layer' is properly accessed based on your data structure
        const layersMap = root?.layer as Map<string, Layers> | undefined;
        return layersMap?.get(id); // Use Map's get method if layersMap exists
    });

    if (!layer) {
        return null; // Return null if the layer doesn't exist
    }

    switch (layer.type) {
        case LayerType.Rectangle: 
        return(
            <Rectangle 
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />
        )
        default: {
            console.log("An error ha came")
            return null;
        }
    }
};

// Memoizing the component for performance optimization
export const LayerPreview = memo(LayerPreviewComponent);

// Explicitly setting the displayName for easier debugging in React DevTools
LayerPreview.displayName = "LayerPreview";
