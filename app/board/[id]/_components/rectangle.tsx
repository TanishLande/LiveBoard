    import { RectangleLayer } from "@/type/canvas";

    interface RectangleProps {
        id: string;
        layer: RectangleLayer;
        onPointerDown: ( e: React.PointerEvent, id: string ) => void;
        selectionColor?: string | null;
    }

    export const Rectangle = ({
        id,
        layer,
        onPointerDown,
        selectionColor
    }: RectangleProps ) =>{
        const { 
            x,
            y,
            width,
            height,
            fill
        } = layer
        return(
            <rect 
                className="drop-shadow-md"
                onPointerDown={(e) => onPointerDown }
                style={{
                    transform: `translate(${x}px, ${y}px)`
                }}
                x={0}
                y={0}
                width={width}
                height={height}
                strokeWidth={1}
                fill="#000"
                stroke="transparent"
            />
        )
    }