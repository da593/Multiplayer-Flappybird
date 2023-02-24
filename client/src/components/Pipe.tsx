import React,{useEffect, useRef} from 'react';
import { BoardSize,PipeCoordinates } from './BoardGame';
import * as consts from "components/GameConstants";

export type PipeProps = BoardSize & PipeCoordinates
export function Pipe(props: PipeProps) {
  
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const draw = (canvas:HTMLCanvasElement,context:CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        context.fillStyle = "green";
        context.fillRect(props.xPipeLoc, 0, - consts.PIPE_WIDTH, props.yGapLoc);
        context.fillRect(props.xPipeLoc, props.yGapLoc + consts.GAP_HEIGHT, - consts.PIPE_WIDTH, canvas.height)

        context.fillStyle= "#87CEEB"; 
        context.fillRect(props.xPipeLoc, props.yGapLoc , - consts.PIPE_WIDTH, consts.GAP_HEIGHT);
        
    }



    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(canvas,context);
            }
        }
    },[props.xPipeLoc])


    return (
        <canvas id="pipe" width={props.width} height={props.height} ref={canvasRef} />
    )
}