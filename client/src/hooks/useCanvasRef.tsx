import React, {useEffect,useRef} from 'react';
import { isFunctionExpression } from 'typescript';

type drawFunction = (canvas:HTMLCanvasElement,context:CanvasRenderingContext2D) => void;

const useCanvasRef = (draw:drawFunction) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
        }
        let raf:number
        const render = () => {
            
            raf = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(raf)
        }

    },[draw])

    return canvasRef

}