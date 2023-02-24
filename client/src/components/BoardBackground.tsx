import React,{useEffect, useRef} from 'react';
import { BoardSize } from './BoardGame';

export function BoardBackground(props:BoardSize) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        if (canvasRef.current ) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                context.fillStyle = "#87CEEB";
                context.fillRect(0, 0, props.width,props.height);
            } 

        }
    },[])

    return (
        <canvas id="background-layer" width={props.width} height={props.height} ref={canvasRef}/>
    )
}
