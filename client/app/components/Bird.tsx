import { useEffect, useRef, useState, memo, useMemo } from 'react';
import { BoxCoordinates, GAME_DIMENSIONS } from '@flappyblock/shared';
import Image from 'next/image';

interface Props {
    birdCoords: BoxCoordinates;
    isSelf: boolean;
    hasCollided: boolean;
}

export const Bird = memo(function Bird({isSelf, birdCoords, hasCollided}:Props) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", {willReadFrequently: true});

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [imgLoad, setImgLoad] = useState<boolean>(false);
    const img = imgRef.current;

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const playAudio = useMemo(() => {
        if (hasCollided) {
            audio?.play();
        }
    }, [hasCollided, audio])

    const onLoadCallBack = (): void => {
        setImgLoad(true);
    }


    
    useEffect(() => {
        const path = "/static/audio/die.ogg"
        setAudio(new Audio(path));
    }, [])

    useEffect(() => {
        
        const draw = (birdCoords: BoxCoordinates) => {
            if (context && img && imgLoad) {
                context.clearRect(0, 0, GAME_DIMENSIONS.GAME_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);

                context.drawImage(img, 50, birdCoords.topLeft.y, GAME_DIMENSIONS.BIRD_WIDTH, GAME_DIMENSIONS.BIRD_WIDTH);

                if (!isSelf) {
                    //Render gray scale for opponent
                    const myImageData = context.getImageData(0, 0, GAME_DIMENSIONS.GAME_WIDTH, GAME_DIMENSIONS.GAME_HEIGHT);
                    const data = myImageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                        data[i] = avg; // red
                        data[i + 1] = avg; // green
                        data[i + 2] = avg; // blue
                    }
                    context.putImageData(myImageData, 0, 0);
                }

                if (hasCollided) {
                    playAudio
                    if (context) {
                        context.beginPath();
            
                        context.moveTo(birdCoords.topLeft.x, birdCoords.topLeft.y);
                        context.lineTo(birdCoords.botRight.x, birdCoords.botRight.y);
                    
                        context.moveTo(birdCoords.botLeft.x, birdCoords.botLeft.y);
                        context.lineTo(birdCoords.topRight.x, birdCoords.topRight.y);
                        context.stroke();
                    }
                }
            }
        }

        if (context) {
            draw(birdCoords);
        }

    },[context, img, imgLoad, birdCoords, isSelf])

    return (
        <>
        <canvas className={"canvas-item"} width={GAME_DIMENSIONS.GAME_WIDTH} height={GAME_DIMENSIONS.GAME_HEIGHT} ref={canvasRef}/>
        <Image 
            ref={imgRef} 
            onLoadingComplete={onLoadCallBack} 
            priority={true} 
            id="bird" 
            className="sprite" 
            src="/static/images/bird.png" 
            alt="" 
            width={GAME_DIMENSIONS.GAME_WIDTH}  
            height={GAME_DIMENSIONS.GAME_HEIGHT}
        />
        </>
    )
})
