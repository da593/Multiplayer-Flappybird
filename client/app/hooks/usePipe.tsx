'use client';

import { useEffect } from 'react';
import { BoxCoordinates, GAME_DIMENSIONS } from '@flappyblock/shared';

export function usePipe(context: CanvasRenderingContext2D | null | undefined, img: HTMLImageElement | null, imgload: boolean, gapCoords: BoxCoordinates): void {

    useEffect(() => {
        const draw = (gapCoords: BoxCoordinates) => {
            if (context && img && imgload) {
                context.clearRect(0, 0, GAME_DIMENSIONS.GAME_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);

                context.save();
                //top pipe: rotate image 90 degrees by moving canvas origin to image center
                const xCenter = (gapCoords.topLeft.x + GAME_DIMENSIONS.PIPE_WIDTH) / 2;
                const yCenter = (gapCoords.topLeft.y / 2);

                context.translate(xCenter, yCenter);
                context.rotate(Math.PI);
                context.translate(-xCenter, -yCenter);
                context.drawImage(img, 0, 0, GAME_DIMENSIONS.PIPE_WIDTH, gapCoords.topLeft.y);
                
                context.restore();

                //bottom
                context.drawImage(img, gapCoords.topLeft.x, gapCoords.topLeft.y + GAME_DIMENSIONS.GAP_HEIGHT, GAME_DIMENSIONS.PIPE_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);
            }
        }

        if (context) {
            draw(gapCoords);
        }
        
    },[context, img, imgload, gapCoords])

}