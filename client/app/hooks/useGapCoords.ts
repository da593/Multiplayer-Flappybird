'use client';
import { BoxCoordinates, GAME_DIMENSIONS, calculateNewGapCoords } from '@flappyblock/shared';
import { calculateGapCoords, randomizeYGapLocation } from '@flappyblock/shared/';
import {useEffect, useState} from 'react';


export function useGapCoords() {
    const init_value = calculateGapCoords(GAME_DIMENSIONS.GAME_WIDTH, randomizeYGapLocation());
    const [gapCoords,setGapCoords] = useState<BoxCoordinates>(init_value);

    useEffect(() => {
        let raf:number;
        const PIPE_VELOCITY = 1;

        const render = () => {
            setGapCoords(prevGapCoords => calculateNewGapCoords(prevGapCoords, PIPE_VELOCITY));
            raf = window.requestAnimationFrame(render);
        }
        render();
        return () => {
            window.cancelAnimationFrame(raf);
        }
    },[])

    return gapCoords;

}