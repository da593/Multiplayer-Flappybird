import {useEffect, useState} from 'react';
import {BoxCoordinates, CollisionProps} from 'GameState/types'
import { calculateGapCoords, calculateNewGapCoords, randomizeYGapLocation } from 'GameState/helper';
import { GAME_DIMENSIONS } from 'GameState/constants';



export function useGapCoords({hasCollided}:CollisionProps) {

    const init_value = calculateGapCoords(GAME_DIMENSIONS.GAME_WIDTH,randomizeYGapLocation());
    const [gapCoords,setGapCoords] = useState<BoxCoordinates>(init_value);
    useEffect(() => {
        let raf:number;
        const frameCount = 1;
        const render = () => {
            if (!hasCollided) {
                setGapCoords(prevGapCoords => calculateNewGapCoords(prevGapCoords,frameCount));
            }

            raf = window.requestAnimationFrame(render);
        }
        render();
        return () => {
            window.cancelAnimationFrame(raf);
        }
    },[hasCollided])

    return gapCoords;

}