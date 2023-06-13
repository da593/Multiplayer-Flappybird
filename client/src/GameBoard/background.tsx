import { DimensionContext } from 'hooks/DimensionsContext';
import React,{useContext, useEffect, useRef} from 'react';



export function BoardBackground() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dimensions = useContext(DimensionContext);

    useEffect(() => {
        if (canvasRef.current ) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                if (dimensions) {
                    context.fillStyle = "#87CEEB";
                    context.fillRect(0, 0, dimensions.GAME_WIDTH, dimensions.GAME_HEIGHT);
                }
            } 

        }
    },[])

    return (
        <canvas id="background-layer" width={dimensions ? dimensions.GAME_WIDTH : undefined} height={dimensions ? dimensions.GAME_HEIGHT : undefined} ref={canvasRef}/>
    )
}
