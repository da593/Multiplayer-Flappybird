import React,{useEffect, useRef} from 'react';
import { GapCoordProps } from 'GameState/types';
import { GAME_DIMENSIONS } from 'GameState/constants';

type PipeProps = GapCoordProps;
export function Pipe(props: PipeProps) {
  
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const draw = (canvas:HTMLCanvasElement,context:CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        context.fillStyle = "green";
        context.fillRect(props.gapCoords.topLeft.x, 0, GAME_DIMENSIONS.PIPE_WIDTH, props.gapCoords.topLeft.y);
        context.fillRect(props.gapCoords.topLeft.x, props.gapCoords.botLeft.y, GAME_DIMENSIONS.PIPE_WIDTH, canvas.height)

        context.fillStyle= "#87CEEB"; 
        context.fillRect(props.gapCoords.topLeft.x, props.gapCoords.topLeft.y , GAME_DIMENSIONS.PIPE_WIDTH, GAME_DIMENSIONS.GAP_HEIGHT);
        
    }



    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(canvas,context);
            }
        }
    },[props])


    return (
        <canvas className="canvas-item" width={GAME_DIMENSIONS.GAME_WIDTH} height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef} />
    )
}