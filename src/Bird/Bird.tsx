import React,{useEffect, useRef} from 'react';
import { BirdCoordProps} from 'GameState/types';
import { GAME_DIMENSIONS } from 'GameState/constants';


type BirdProps = BirdCoordProps;
export function Bird(props:BirdProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const draw = (context:CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = "red";
        context.fillRect(50, props.birdCoords.topLeft.y, GAME_DIMENSIONS.BIRD_WIDTH, GAME_DIMENSIONS.BIRD_WIDTH);

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
        <canvas className="canvas-item" width={GAME_DIMENSIONS.GAME_WIDTH} height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef}/>
    )
}