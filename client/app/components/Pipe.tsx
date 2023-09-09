import { useEffect, useRef, useState } from 'react';
import { BoxCoordinates, GAME_DIMENSIONS, calculateNewGapCoords, game_tick } from '@flappyblock/shared';

interface Props {
    gapCoords: BoxCoordinates;
}
export function Pipe({gapCoords}: Props) {
  
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvas = canvasRef.current;
    let context: CanvasRenderingContext2D | null = null;
    if (canvas) {
        context = canvas.getContext("2d");
    }

    useEffect(() => {
        const draw = (gapCoords: BoxCoordinates) => {
            if (context && canvas) {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height)
                context.fillStyle = "green";
                context.fillRect(gapCoords.topLeft.x, 0, GAME_DIMENSIONS.PIPE_WIDTH, gapCoords.topLeft.y);
                context.fillRect(gapCoords.topLeft.x, gapCoords.botLeft.y, GAME_DIMENSIONS.PIPE_WIDTH, canvas.height)
        
                context.fillStyle= "#87CEEB"; 
                context.fillRect(gapCoords.topLeft.x, gapCoords.topLeft.y , GAME_DIMENSIONS.PIPE_WIDTH, GAME_DIMENSIONS.GAP_HEIGHT);
            }
        }

        if (context) {
            draw(gapCoords);
        }
        
    },[gapCoords, canvas, context])




    return (
        <canvas className="canvas-item" width={GAME_DIMENSIONS.GAME_WIDTH}  height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef} />
    )
}