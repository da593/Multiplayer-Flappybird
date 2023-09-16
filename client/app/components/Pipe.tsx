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

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [imgLoad, setImgLoad] = useState<boolean>(false);
    const img = imgRef.current;
    usePipe(context, img, imgLoad, gapCoords);

    const onLoadCallBack = (): void => {
        setImgLoad(true);
    }
    
    return (
        <>
        <canvas className="canvas-item" width={GAME_DIMENSIONS.GAME_WIDTH}  height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef} />
        <Image ref={imgRef} onLoadingComplete={onLoadCallBack} priority={true} id="pipe" className="sprite" src="/static/images/pipeUp.png" alt="" width={GAME_DIMENSIONS.GAME_WIDTH}  height={GAME_DIMENSIONS.GAME_HEIGHT}/>
        </>
    )
}