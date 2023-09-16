import { usePipe } from "@/hooks/usePipe";
import { BoxCoordinates, GAME_DIMENSIONS } from "@flappyblock/shared";
import { useRef } from "react";

interface Props {
    gapCoords: BoxCoordinates
}

export function Pipe({gapCoords}: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    usePipe(context, gapCoords);
    
    return (
        <canvas className="canvas-item" width={GAME_DIMENSIONS.GAME_WIDTH}  height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef} />
    )
}