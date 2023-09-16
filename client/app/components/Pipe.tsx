'use client';

import { useRef, useState } from "react";
import { usePipe } from "@/hooks/usePipe";
import { BoxCoordinates, GAME_DIMENSIONS } from "@flappyblock/shared";
import Image from 'next/image';

interface Props {
    gapCoords: BoxCoordinates
}

export function Pipe({gapCoords}: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const pipe_up_ref = useRef<HTMLImageElement | null>(null);
    const [pipe_up_load, set_pipe_up_load] = useState<boolean>(false);
    const pipe_up_img = pipe_up_ref.current;

    const pipe_down_ref = useRef<HTMLImageElement | null>(null);
    const [pipe_down_load, set_pipe_down_load] = useState<boolean>(false);
    const pipe_down_img = pipe_down_ref.current;

    usePipe(context, pipe_up_img, pipe_up_load, pipe_down_img, pipe_down_load, gapCoords);

    const onPipeUpImgLoad = (): void => {
        set_pipe_up_load(true);
    }

    const onPipeDownImgLoad = (): void => {
        set_pipe_down_load(true);
    }
    
    return (
        <>
        <canvas className="canvas-item" width={GAME_DIMENSIONS.GAME_WIDTH}  height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef} />
        <Image 
            ref={pipe_up_ref} 
            onLoadingComplete={onPipeUpImgLoad} 
            priority={true} 
            id="pipe_up" 
            className="sprite" 
            src="/static/images/pipe_up.gif" 
            alt="" 
            width={GAME_DIMENSIONS.GAME_WIDTH}  
            height={GAME_DIMENSIONS.GAME_HEIGHT}
        />
        <Image 
            ref={pipe_down_ref} 
            onLoadingComplete={onPipeDownImgLoad} 
            priority={true} 
            id="pipe_down" 
            className="sprite" 
            src="/static/images/pipe_down.gif" 
            alt="" 
            width={GAME_DIMENSIONS.GAME_WIDTH}  
            height={GAME_DIMENSIONS.GAME_HEIGHT}
        />
        </>
    )
}