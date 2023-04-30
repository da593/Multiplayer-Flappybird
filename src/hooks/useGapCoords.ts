import {useEffect, useState} from 'react';
import {BoxCoordinates} from 'GameState/types'
import { calculateGapCoords, calculateNewGapCoords } from 'GameState/helper';
import { GAME_DIMENSIONS } from 'GameState/constants';
import { randomizeYGapLocation } from 'GameState/randomizeGapFunc';



export function useGapCoords() {

    const init_value = calculateGapCoords(GAME_DIMENSIONS.GAME_WIDTH, randomizeYGapLocation());
    const [gapCoords,setGapCoords] = useState<BoxCoordinates>(init_value);
    useEffect(() => {
        let raf:number;

        const render = () => {

            setGapCoords(prevGapCoords => calculateNewGapCoords(prevGapCoords));
    
            raf = window.requestAnimationFrame(render);
        }
        render();
        return () => {
            window.cancelAnimationFrame(raf);
        }
    },[])

    return gapCoords;

}