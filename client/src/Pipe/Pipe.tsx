import React,{useEffect, useRef} from 'react';
import * as consts from "GameState/constants";
import { GameSizeProps, GapCoordProps } from 'GameState/types';

type PipeProps = GapCoordProps & GameSizeProps;
export function Pipe(props: PipeProps) {
  
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const draw = (canvas:HTMLCanvasElement,context:CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        context.fillStyle = "green";
        context.fillRect(props.gapCoords.topLeft.x, 0, consts.PIPE_WIDTH, props.gapCoords.topLeft.y);
        context.fillRect(props.gapCoords.topLeft.x, props.gapCoords.botLeft.y, consts.PIPE_WIDTH, canvas.height)

        context.fillStyle= "#87CEEB"; 
        context.fillRect(props.gapCoords.topLeft.x, props.gapCoords.topLeft.y , consts.PIPE_WIDTH, consts.GAP_HEIGHT);
        
    }



    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas ) {
            const context = canvas.getContext("2d");
            if (context) {
                draw(canvas,context);
            }
        }
    },[props])


    return (
        <canvas id="pipe" width={props.width} height={props.height} ref={canvasRef} />
    )
}