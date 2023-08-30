import {useContext, useEffect, useRef} from 'react';
import { DimensionContext } from 'hooks/DimensionsContext';
import { BoxCoordinates } from '@flappyblock/shared';

interface Props {
    gapCoords: BoxCoordinates
}
export function Pipe({gapCoords}: Props) {
  
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const dimensions = useContext(DimensionContext);
    
    useEffect(() => {

        const draw = (canvas:HTMLCanvasElement,context:CanvasRenderingContext2D) => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            if (dimensions) {
                context.fillStyle = "green";
                context.fillRect(gapCoords.topLeft.x, 0, dimensions.PIPE_WIDTH, gapCoords.topLeft.y);
                context.fillRect(gapCoords.topLeft.x, gapCoords.botLeft.y, dimensions.PIPE_WIDTH, canvas.height)
        
                context.fillStyle= "#87CEEB"; 
                context.fillRect(gapCoords.topLeft.x, gapCoords.topLeft.y , dimensions.PIPE_WIDTH, dimensions.GAP_HEIGHT);
            }
        }

        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(canvas,context);
            }
        }
    },[gapCoords, dimensions])


    return (
        <canvas className="canvas-item" width={dimensions ? dimensions.GAME_WIDTH : undefined} height={dimensions ? dimensions.GAME_HEIGHT : undefined} ref={canvasRef} />
    )
}