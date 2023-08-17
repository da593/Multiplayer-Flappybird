'use client';
import { BoxCoordinates, Dimensions_I } from '@flappyblock/shared';
import { calculateGapCoords, calculateNewGapCoords, randomizeYGapLocation } from '@flappyblock/shared/';
import {useEffect, useState} from 'react';


export function useGapCoords(dimensions: Dimensions_I) {
    const init_value = calculateGapCoords(dimensions.GAME_WIDTH, randomizeYGapLocation());
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