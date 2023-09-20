import { GAME_DIMENSIONS } from '@flappyblock/shared';
import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';

export function BoardBackground() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [imgLoad, setImgLoad] = useState<boolean>(false);
    const img = imgRef.current;

    const onLoadCallBack = (): void => {
        setImgLoad(true);
    }

    useEffect(() => {
        if (context && img && imgLoad) {
            context.drawImage(img, 0, 0, GAME_DIMENSIONS.GAME_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);
        }

    }, [context, img, imgLoad]) 

    return (
        <>
        <canvas id="background-layer" width={GAME_DIMENSIONS.GAME_WIDTH} height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef}/>
        <Image 
            ref={imgRef} 
            onLoadingComplete={onLoadCallBack} 
            priority={true} 
            id="background" 
            className="sprite" 
            src="/static/images/background.png" 
            alt="" 
            width={GAME_DIMENSIONS.GAME_WIDTH}  
            height={GAME_DIMENSIONS.GAME_HEIGHT}
        />
        </>
    )
}
