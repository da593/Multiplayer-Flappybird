import React,{useContext, useEffect, useRef} from 'react';
import { BirdCoordProps} from 'GameState/types';
import { DimensionContext } from 'hooks/DimensionsContext';


export function Bird(props:BirdCoordProps) {

    const dimensions = useContext(DimensionContext);
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const draw = (context:CanvasRenderingContext2D) => {
        if (dimensions) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.fillStyle = "red";
            context.fillRect(50, props.birdCoords.topLeft.y, dimensions.BIRD_WIDTH, dimensions.BIRD_WIDTH);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(context);
            }
        }
    },[props])

    return (
        <canvas className="canvas-item" width={dimensions ? dimensions.GAME_WIDTH : undefined} height={dimensions ? dimensions.GAME_HEIGHT : undefined} ref={canvasRef}/>
    )
}