import React,{useContext, useEffect, useRef} from 'react';
import { GapCoordProps } from 'GameState/types';
import { DimensionContext } from 'hooks/DimensionsContext';


export function Pipe(props: GapCoordProps) {
  
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const dimensions = useContext(DimensionContext);
    
    const draw = (canvas:HTMLCanvasElement,context:CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        if (dimensions) {
            context.fillStyle = "green";
            context.fillRect(props.gapCoords.topLeft.x, 0, dimensions.PIPE_WIDTH, props.gapCoords.topLeft.y);
            context.fillRect(props.gapCoords.topLeft.x, props.gapCoords.botLeft.y, dimensions.PIPE_WIDTH, canvas.height)
    
            context.fillStyle= "#87CEEB"; 
            context.fillRect(props.gapCoords.topLeft.x, props.gapCoords.topLeft.y , dimensions.PIPE_WIDTH, dimensions.GAP_HEIGHT);
        }
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
        <canvas className="canvas-item" width={dimensions ? dimensions.GAME_WIDTH : undefined} height={dimensions ? dimensions.GAME_HEIGHT : undefined} ref={canvasRef} />
    )
}