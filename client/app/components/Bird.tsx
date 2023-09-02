import {useContext, useEffect, useRef} from 'react';
import { DimensionContext } from 'hooks/DimensionsContext';
import { BoxCoordinates } from '@flappyblock/shared';

interface Props {
    birdCoords: BoxCoordinates;
    isSelf: boolean;
    hasCollided: boolean;
}

export function Bird({isSelf, birdCoords, hasCollided}:Props) {

    const dimensions = useContext(DimensionContext);
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {

        const draw = (context:CanvasRenderingContext2D) => {
            if (dimensions) {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height)
                context.fillStyle = isSelf ? "red" : "rgba(255, 165, 0, 0.3)";
                context.fillRect(50, birdCoords.topLeft.y, dimensions.BIRD_WIDTH, dimensions.BIRD_WIDTH);
                if (hasCollided) {
                    context.beginPath();
    
                    context.moveTo(birdCoords.topLeft.x, birdCoords.topLeft.y);
                    context.lineTo(birdCoords.botRight.x, birdCoords.botRight.y);
                
                    context.moveTo(birdCoords.botLeft.x, birdCoords.botLeft.y);
                    context.lineTo(birdCoords.topRight.x, birdCoords.topRight.y);
                    context.stroke();
                }
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
        <canvas className={"canvas-item"} width={dimensions ? dimensions.GAME_WIDTH : undefined} height={dimensions ? dimensions.GAME_HEIGHT : undefined} ref={canvasRef}/>
    )
}