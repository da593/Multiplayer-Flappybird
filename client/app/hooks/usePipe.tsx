'use client';

import { useEffect } from 'react';
import { BoxCoordinates, GAME_DIMENSIONS } from '@flappyblock/shared';

export function usePipe(
    context: CanvasRenderingContext2D | null | undefined, 
    pipe_up_img: HTMLImageElement | null, 
    pipe_up_load: boolean,
    pipe_down_img: HTMLImageElement | null, 
    pipe_down_load: boolean, 
    gapCoords: BoxCoordinates): void {

    useEffect(() => {
        const draw = (gapCoords: BoxCoordinates) => {
            if (context && pipe_up_img && pipe_up_load && pipe_down_img && pipe_down_load) {
                context.clearRect(0, 0, GAME_DIMENSIONS.GAME_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);

                //top pipe
                context.drawImage(pipe_down_img, gapCoords.topLeft.x, 0, GAME_DIMENSIONS.PIPE_WIDTH, gapCoords.topLeft.y);

                //bottom
                context.drawImage(pipe_up_img, gapCoords.topLeft.x, gapCoords.topLeft.y + GAME_DIMENSIONS.GAP_HEIGHT, GAME_DIMENSIONS.PIPE_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);
            }
        }

        if (context) {
            draw(gapCoords);
        }
        
    },[context, pipe_up_img, pipe_up_load, pipe_down_img, pipe_down_load, gapCoords])

}