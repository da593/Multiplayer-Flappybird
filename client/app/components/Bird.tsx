import { useEffect, useRef } from 'react';
import { BoxCoordinates, GAME_DIMENSIONS, calculateNewBirdCoords, game_tick } from '@flappyblock/shared';

interface Props {
    birdCoords: BoxCoordinates;
    isSelf: boolean;
    hasCollided: boolean;
    hasStarted: boolean;
}

export function Bird({isSelf, birdCoords, hasCollided, hasStarted}:Props) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvas = canvasRef.current;
    let context: CanvasRenderingContext2D | null = null;
    if (canvas) {
        context = canvas.getContext("2d");
    }

    useEffect(() => {
        
        const draw = (context:CanvasRenderingContext2D, birdCoords: BoxCoordinates) => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.fillStyle = isSelf ? "red" : "rgba(255, 165, 0, 0.3)";
            context.fillRect(50, birdCoords.topLeft.y, GAME_DIMENSIONS.BIRD_WIDTH, GAME_DIMENSIONS.BIRD_WIDTH);
            if (hasCollided) {
                context.beginPath();

                context.moveTo(birdCoords.topLeft.x, birdCoords.topLeft.y);
                context.lineTo(birdCoords.botRight.x, birdCoords.botRight.y);
            
                context.moveTo(birdCoords.botLeft.x, birdCoords.botLeft.y);
                context.lineTo(birdCoords.topRight.x, birdCoords.topRight.y);
                context.stroke();
            }
        }

        if (context) {
            draw(context, birdCoords);
        }

    },[birdCoords, isSelf, hasStarted, hasCollided, canvas, context])

    return (
        <canvas className={"canvas-item"} width={GAME_DIMENSIONS.GAME_WIDTH} height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef}/>
    )
}