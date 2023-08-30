import {useContext, useEffect, useRef} from 'react';
import { DimensionContext } from 'hooks/DimensionsContext';
import { BoxCoordinates } from '@flappyblock/shared';

interface Props {
    birdCoords: BoxCoordinates;
    isSelf: boolean;
}

export function Bird({isSelf, birdCoords}:Props) {

    const dimensions = useContext(DimensionContext);
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {

        const draw = (context:CanvasRenderingContext2D) => {
            if (dimensions) {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height)
                context.fillStyle = isSelf ? "red" : "rgba(255, 165, 0, 0.3)";
                context.fillRect(50, birdCoords.topLeft.y, dimensions.BIRD_WIDTH, dimensions.BIRD_WIDTH);
            }
        }

        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(context);
            }
        }
    },[birdCoords, dimensions, isSelf])

    return (
        <canvas className={isSelf ? "canvas-item" : "canvas-item"} width={dimensions ? dimensions.GAME_WIDTH : undefined} height={dimensions ? dimensions.GAME_HEIGHT : undefined} ref={canvasRef}/>
    )
}