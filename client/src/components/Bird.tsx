import React,{useEffect, useRef} from 'react';
import { BirdCoordinates, BoardSize } from './BoardGame';
import * as consts from "components/GameConstants";

export type BirdProps = BoardSize & BirdCoordinates
export function Bird(props:BirdProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const draw = (context:CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = "red";
        context.fillRect(50, props.yBirdLoc, consts.BIRD_WIDTH, consts.BIRD_WIDTH);

    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(context);
            }
        }
    },[props.yBirdLoc])

    return (
        <canvas id="bird" width={props.width} height={props.height} ref={canvasRef}/>
    )
}