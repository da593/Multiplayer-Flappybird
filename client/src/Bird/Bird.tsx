import React,{useEffect, useRef} from 'react';
import * as consts from "GameState/constants";
import { BirdCoordProps, GameSizeProps } from 'GameState/types';

type BirdProps = BirdCoordProps & GameSizeProps;
export function Bird(props:BirdProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const draw = (context:CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = "red";
        context.fillRect(50, props.birdCoords.topLeft.y, consts.BIRD_WIDTH, consts.BIRD_WIDTH);

    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(context);
            }
        }
    },[props])

    return (
        <canvas id="bird" width={props.width} height={props.height} ref={canvasRef}/>
    )
}