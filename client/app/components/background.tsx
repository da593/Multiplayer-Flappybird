import { GAME_DIMENSIONS } from '@flappyblock/shared';
import {useEffect, useRef} from 'react';

export function BoardBackground() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current ) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                context.fillStyle = "#87CEEB";
                context.fillRect(0, 0, GAME_DIMENSIONS.GAME_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);
                
            } 

        }
    }, []) 

    return (
        <canvas id="background-layer" width={GAME_DIMENSIONS.GAME_WIDTH} height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef}/>
    )
}
