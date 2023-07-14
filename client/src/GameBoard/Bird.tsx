import React,{useContext, useEffect, useRef} from 'react';
import { DimensionContext } from 'hooks/DimensionsContext';
import { BoxCoordinates } from '@flappyblock/shared';

interface Props {
    birdCoords: BoxCoordinates;
    isSelf: boolean;
}

export function Bird({isSelf, birdCoords}:Props) {

    const dimensions = useContext(DimensionContext);
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const draw = (context:CanvasRenderingContext2D) => {
        if (dimensions) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.fillStyle = isSelf ? "red" : "orange";
            context.fillRect(50, birdCoords.topLeft.y, dimensions.BIRD_WIDTH, dimensions.BIRD_WIDTH);
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
    },[birdCoords])

    return (
        <canvas className="canvas-item" width={dimensions ? dimensions.GAME_WIDTH : undefined} height={dimensions ? dimensions.GAME_HEIGHT : undefined} ref={canvasRef}/>
    )
}